// src/components/SellerDashboard.tsx
import React, { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/contract";

interface SellerDashboardProps {
  account: string;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ account }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const listGadget = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const priceWei = ethers.parseEther(price);
      const tx = await contract.listGadget(name, priceWei);
      await tx.wait();
      alert(`Listed ${name} for ${price} ETH`);
      setName("");
      setPrice("");
    } catch (err) {
      console.error(err);
      alert("Error listing gadget");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>
      <p>Connected: {account}</p>
      <div className="mt-4">
        <h3 className="text-lg">List Gadget</h3>
        <input
          type="text"
          placeholder="Gadget Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2 w-64"
        />
        <input
          type="text"
          placeholder="Price (ETH)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 mr-2 w-32"
        />
        <button
          onClick={listGadget}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          List Gadget
        </button>
      </div>
    </div>
  );
};

export default SellerDashboard;