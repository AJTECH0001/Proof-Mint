// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import standard OpenZeppelin v5.0.2 contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title ProofMint - An ERC-721 contract for tracking gadget ownership
/// @notice This contract allows minting, transferring, flagging, and recycling gadgets as NFTs with role-based access
/// @dev Uses standard OpenZeppelin v5.0.2 contracts with custom URI storage and token ID counter
contract ProofMint is ERC721, AccessControl {
    uint256 private _tokenIdCounter; // Custom token ID counter

    // Roles for access control
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
    mapping(string => uint256) public imeiToTokenId; // IMEI to token ID
    mapping(uint256 => string) private _tokenURIs; // Custom token URI storage

    // ERC-20 reward token and recycling reward amount
    address public rewardToken;
    uint256 public recyclingReward;

    // Events
    event GadgetMinted(uint256 indexed tokenId, address indexed buyer, string serialNumber, string imei, string metadataURI);
    event GadgetTransferred(uint256 indexed tokenId, address indexed from, address indexed to);
    event GadgetRecycled(uint256 indexed tokenId, address indexed recycler);
    event GadgetFlaggedAsStolen(uint256 indexed tokenId, address indexed owner);
    event SellerApproved(address indexed seller);
    event RecyclerApproved(address indexed recycler);
    event RecyclingRewardUpdated(uint256 newReward);

    // Errors
    error InvalidAddress();
    error InvalidIMEI();
    error IMEIAlreadyRegistered();
    error TokenDoesNotExist();
    error NotTokenOwner();
    error GadgetNotActive();
    error NotApprovedSeller();
    error NotApprovedRecycler();

    /// @notice Initializes the contract with the reward token address
    /// @param _rewardToken Address of the ERC-20 reward token
    constructor(address _rewardToken) ERC721("ProofMint", "PMT") {
        if (_rewardToken == address(0)) revert InvalidAddress();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);

        rewardToken = _rewardToken;
        recyclingReward = 10 * 10**18; // 10 tokens
        _tokenIdCounter = 0; // Initialize counter
    }

    /// @notice Approves a seller to mint gadgets
    /// @param seller Address to grant SELLER_ROLE
    function approveSeller(address seller) external onlyRole(ADMIN_ROLE) {
        _grantRole(SELLER_ROLE, seller);
        emit SellerApproved(seller);
    }

    /// @notice Approves a recycler to recycle gadgets
    /// @param recycler Address to grant RECYCLER_ROLE
    function approveRecycler(address recycler) external onlyRole(ADMIN_ROLE) {
        _grantRole(RECYCLER_ROLE, recycler);
        emit RecyclerApproved(recycler);
    }

    /// @notice Mints an NFT for a gadget purchase
    /// @param buyer Address of the buyer
    /// @param serialNumber Gadget serial number
    /// @param imei Gadget IMEI (unique identifier)
    /// @param specs Gadget specifications
    /// @param metadataURI Token metadata URI
    /// @return tokenId The minted token ID
    function mintGadget(
        address buyer,
        string memory serialNumber,
        string memory imei,
        string memory specs,
        string memory metadataURI
    ) external returns (uint256) {
        if (!hasRole(SELLER_ROLE, msg.sender)) revert NotApprovedSeller();
        if (buyer == address(0)) revert InvalidAddress();
        if (bytes(imei).length == 0) revert InvalidIMEI();
        if (imeiToTokenId[imei] != 0) revert IMEIAlreadyRegistered();

        _tokenIdCounter++; // Increment counter
        uint256 tokenId = _tokenIdCounter;

        _safeMint(buyer, tokenId);
        _setTokenURI(tokenId, metadataURI);

        gadgets[tokenId] = Gadget({
            serialNumber: serialNumber,
            imei: imei,
            specs: specs,
            status: GadgetStatus.Active,
            currentOwner: buyer
        });
        imeiToTokenId[imei] = tokenId;

        emit GadgetMinted(tokenId, buyer, serialNumber, imei, metadataURI);
        return tokenId;
    }

    /// @notice Flags a gadget as stolen, preventing transfers
    /// @param tokenId The token ID of the gadget
    function flagAsStolen(uint256 tokenId) external {
        if (!_exists(tokenId)) revert TokenDoesNotExist();
        if (ownerOf(tokenId) != msg.sender) revert NotTokenOwner();
        if (gadgets[tokenId].status != GadgetStatus.Active) revert GadgetNotActive();

        gadgets[tokenId].status = GadgetStatus.Stolen;
        emit GadgetFlaggedAsStolen(tokenId, msg.sender);
    }

    /// @notice Transfers a gadget to a new owner
    /// @param tokenId The token ID of the gadget
    /// @param to The new owner’s address
    function transferGadget(uint256 tokenId, address to) external {
        if (!_exists(tokenId)) revert TokenDoesNotExist();
        if (ownerOf(tokenId) != msg.sender) revert NotTokenOwner();
        if (gadgets[tokenId].status != GadgetStatus.Active) revert GadgetNotActive();
        if (to == address(0)) revert InvalidAddress();

        _transfer(msg.sender, to, tokenId);
        gadgets[tokenId].currentOwner = to;
        emit GadgetTransferred(tokenId, msg.sender, to);
    }

    /// @notice Recycles a gadget, burns the NFT, and rewards the owner
    /// @param tokenId The token ID of the gadget
    function recycleGadget(uint256 tokenId) external {
        if (!hasRole(RECYCLER_ROLE, msg.sender)) revert NotApprovedRecycler();
        if (!_exists(tokenId)) revert TokenDoesNotExist();
        if (gadgets[tokenId].status != GadgetStatus.Active) revert GadgetNotActive();

        address owner = ownerOf(tokenId);
        gadgets[tokenId].status = GadgetStatus.Recycled;

        IERC20(rewardToken).transfer(owner, recyclingReward);
        _burn(tokenId);

        emit GadgetRecycled(tokenId, msg.sender);
    }

    /// @notice Updates the recycling reward amount
    /// @param newReward The new reward amount in wei
    function setRecyclingReward(uint256 newReward) external onlyRole(ADMIN_ROLE) {
        recyclingReward = newReward;
        emit RecyclingRewardUpdated(newReward);
    }

   // ------------------- //

    /// @notice Checks gadget status by token ID
    /// @param tokenId The token ID of the gadget
    function checkGadgetStatusByTokenID(uint256 tokenId) external view returns (GadgetStatus, address) {
        if (!_exists(tokenId)) revert TokenDoesNotExist();
        return (gadgets[tokenId].status, gadgets[tokenId].currentOwner);
    }
    function getGadgetDetails(uint256 tokenId)
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
        if (!_exists(tokenId)) revert TokenDoesNotExist();
        Gadget memory gadget = gadgets[tokenId];
        return (
            gadget.serialNumber,
            gadget.imei,
            gadget.specs,
            gadget.status,
            gadget.currentOwner
        );
    }

    /// @notice Checks gadget status by IMEI
    /// @param imei The gadget’s IMEI
    /// @return status The gadget’s status
    /// @return tokenId The associated token ID
    function checkGadgetStatusByIMEI(string memory imei) external view returns (GadgetStatus, uint256) {
        uint256 tokenId = imeiToTokenId[imei];
        if (tokenId == 0) revert InvalidIMEI();
        return (gadgets[tokenId].status, tokenId);
    }

    /// @notice Sets the token URI for a given token
    /// @param tokenId The token ID
    /// @param _tokenURI The token URI
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        if (!_exists(tokenId)) revert TokenDoesNotExist();
        _tokenURIs[tokenId] = _tokenURI;
    }

    /// @notice Returns the token URI for a given token
    /// @param tokenId The token ID
    /// @return The token URI
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) revert TokenDoesNotExist();
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        return super.tokenURI(tokenId);
    }

    /// @notice Checks if a token exists
    /// @param tokenId The token ID
    /// @return True if the token exists, false otherwise
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    /// @notice Cleans up token URI during burns
    /// @param to The recipient address
    /// @param tokenId The token ID
    function _beforeTokenTransfer(address /* from */, address to, uint256 tokenId, uint256 /* batchSize */) internal {
        if (to == address(0)) {
            delete _tokenURIs[tokenId];
        }
    }

    /// @notice Checks supported interfaces
    /// @param interfaceId The interface ID
    /// @return True if the interface is supported
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}