// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import OpenZeppelin contracts
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract ProofMint is
    Initializable,
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    AccessControlUpgradeable,
    UUPSUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIdCounter;

    // Roles
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant SELLER_ROLE = keccak256("SELLER_ROLE");
    bytes32 public constant RECYCLER_ROLE = keccak256("RECYCLER_ROLE");

    // Enum for gadget status
    enum GadgetStatus { Active, Stolen, Recycled }

    // Struct to store gadget details
    struct Gadget {
        string serialNumber;
        string imei;
        string specs;
        GadgetStatus status;
        address currentOwner;
    }

    // Mappings
    mapping(uint256 => Gadget) public gadgets; // Token ID to gadget details
    mapping(string => uint256) public imeiToTokenId; // IMEI to token ID for lookup

    // Address of the reward token contract
    address public rewardToken;
    uint256 public recyclingReward;

    // Events
    event GadgetPurchased(
        uint256 indexed tokenId,
        address indexed buyer,
        string serialNumber,
        string imei,
        string metadataURI
    );
    event OwnershipTransferred(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to
    );
    event GadgetRecycled(uint256 indexed tokenId, address indexed recycler);
    event GadgetFlaggedAsStolen(uint256 indexed tokenId, address indexed owner);
    event SellerApproved(address indexed seller);
    event RecyclingRewardUpdated(uint256 newReward);

    // Modifiers
    modifier onlyApprovedSeller() {
        require(hasRole(SELLER_ROLE, msg.sender), "ProofMint: Caller is not an approved seller");
        _;
    }

    modifier onlyRecycler() {
        require(hasRole(RECYCLER_ROLE, msg.sender), "ProofMint: Caller is not a recycler");
        _;
    }

    // Initialize
    function initialize(address _rewardToken) public initializer {
        __ERC721_init("ProofMint", "PMT");
        __ERC721URIStorage_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);

        rewardToken = _rewardToken;
        recyclingReward = 10 * 10**18; // 10 tokens
    }

    // Authorize upgrades
    function _authorizeUpgrade(address newImplementation) internal override onlyRole(ADMIN_ROLE) {}

    // Approve seller
    function approveSeller(address seller) external onlyRole(ADMIN_ROLE) {
        _grantRole(SELLER_ROLE, seller);
        emit SellerApproved(seller);
    }

    // Approve recycler
    function approveRecycler(address recycler) external onlyRole(ADMIN_ROLE) {
        _grantRole(RECYCLER_ROLE, recycler);
    }

    // Mint NFT receipt for a gadget purchase
    function mintGadget(
        address buyer,
        string memory serialNumber,
        string memory imei,
        string memory specs,
        string memory metadataURI
    ) external onlyApprovedSeller returns (uint256) {
        require(buyer != address(0), "ProofMint: Invalid buyer address");
        require(bytes(imei).length > 0, "ProofMint: IMEI cannot be empty");
        require(imeiToTokenId[imei] == 0, "ProofMint: IMEI already registered");

        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        // Mint NFT
        _safeMint(buyer, tokenId);
        _setTokenURI(tokenId, metadataURI);

        // Store gadget details
        gadgets[tokenId] = Gadget({
            serialNumber: serialNumber,
            imei: imei,
            specs: specs,
            status: GadgetStatus.Active,
            currentOwner: buyer
        });

        // Map IMEI to token ID
        imeiToTokenId[imei] = tokenId;

        emit GadgetPurchased(tokenId, buyer, serialNumber, imei, metadataURI);
        return tokenId;
    }

    // Flag gadget as stolen
    function flagAsStolen(uint256 tokenId) external {
        require(_ownerOf(tokenId) != address(0), "ProofMint: Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "ProofMint: Caller is not the owner");
        require(gadgets[tokenId].status == GadgetStatus.Active, "ProofMint: Gadget is not active");

        gadgets[tokenId].status = GadgetStatus.Stolen;
        emit GadgetFlaggedAsStolen(tokenId, msg.sender);
    }

    // Check gadget status by IMEI
    function checkGadgetStatusByIMEI(string memory imei) external view returns (GadgetStatus, uint256) {
        uint256 tokenId = imeiToTokenId[imei];
        require(tokenId != 0, "ProofMint: Gadget not found for this IMEI");
        return (gadgets[tokenId].status, tokenId);
    }

    // Transfer gadget ownership
    function transferGadget(uint256 tokenId, address to) external {
        require(_ownerOf(tokenId) != address(0), "ProofMint: Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "ProofMint: Caller is not the owner");
        require(gadgets[tokenId].status == GadgetStatus.Active, "ProofMint: Gadget is stolen or recycled");
        require(to != address(0), "ProofMint: Invalid recipient");

        _transfer(msg.sender, to, tokenId);
        gadgets[tokenId].currentOwner = to;

        emit OwnershipTransferred(tokenId, msg.sender, to);
    }

    // Update recycling status
    function recycleGadget(uint256 tokenId) external onlyRecycler {
        require(_ownerOf(tokenId) != address(0), "ProofMint: Token does not exist");
        require(gadgets[tokenId].status == GadgetStatus.Active, "ProofMint: Gadget is stolen or already recycled");

        gadgets[tokenId].status = GadgetStatus.Recycled;

        address owner = ownerOf(tokenId);
        IERC20Upgradeable(rewardToken).transfer(owner, recyclingReward);

        emit GadgetRecycled(tokenId, msg.sender);
    }

    // Update recycling reward
    function setRecyclingReward(uint256 newReward) external onlyRole(ADMIN_ROLE) {
        recyclingReward = newReward;
        emit RecyclingRewardUpdated(newReward);
    }

    // Get gadget details
    function getGadgetDetails(
        uint256 tokenId
    )
        external
        view
        returns (
            string memory serialNumber,
            string memory imei,
            string memory specs,
            GadgetStatus status,
            address currentOwner
        )
    {
        require(_ownerOf(tokenId) != address(0), "ProofMint: Token does not exist");
        Gadget memory gadget = gadgets[tokenId];
        return (
            gadget.serialNumber,
            gadget.imei,
            gadget.specs,
            gadget.status,
            gadget.currentOwner
        );
    }

    // Override tokenURI
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // Override supportsInterface
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, AccessControlUpgradeable, ERC721URIStorageUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Override _burn
   // Override _burn
function _burn(uint256 tokenId)
    internal
    override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
{
    super._burn(tokenId);
}
}