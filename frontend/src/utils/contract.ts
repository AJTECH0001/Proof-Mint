// src/utils/contract.ts
import { ethers } from "ethers";

// Replace with your deployed contract address
export const contractAddress = "0x954Da409811bf70f7d5cDEC7392acd6B9aC7cF32";

// ABI from ProofMintMarketplace.sol (simplified for this example)
export const contractABI = [
  "function hasRole(bytes32 role, address account) view returns (bool)",
  "function listGadget(string name, uint256 price) external",
  "function purchaseGadget(uint256 gadgetId) external payable",
  "function requestRecycling(uint256 tokenId) external",
  "function gadgets(uint256) view returns (string, uint256, address, bool)",
  "function getLifecycleEvents(uint256 tokenId) view returns (tuple(string, uint256, string)[])",
] as const;

export const getContract = (signer: ethers.Signer): ethers.Contract => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const checkRole = async (signer: ethers.Signer, account: string): Promise<Role> => {
  const contract = getContract(signer);
  const roles: { name: Role; hash: string }[] = [
    { name: "ADMIN_ROLE", hash: ethers.keccak256(ethers.toUtf8Bytes("ADMIN_ROLE")) },
    { name: "SELLER_ROLE", hash: ethers.keccak256(ethers.toUtf8Bytes("SELLER_ROLE")) },
    { name: "BUYER_ROLE", hash: ethers.keccak256(ethers.toUtf8Bytes("BUYER_ROLE")) },
    { name: "RECYCLER_ROLE", hash: ethers.keccak256(ethers.toUtf8Bytes("RECYCLER_ROLE")) },
  ];

  for (const role of roles) {
    if (await contract.hasRole(role.hash, account)) {
      return role.name;
    }
  }
  return "";
};