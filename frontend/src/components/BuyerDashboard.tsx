// src/components/BuyerDashboard.tsx
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/contract";
import { Gadget } from "../utils/types";

interface BuyerDashboardProps {
  account: string;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ account }) => {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [tokenId, setTokenId] = useState<string>("");

  useEffect(() => {
    const fetchGadgets = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const gadgetList: Gadget[] = [];
      // Fetch gadgets (assuming first 10 for demo; adjust based on contract)
      for (let i = 0; i < 10; i++) {
        try {
          const [name, price, seller, sold] = await contract.gadgets(i);
          if (!sold) {
            gadgetList.push({ id: i, name, price: ethers.formatEther(price), seller, sold });
          }
        } catch {}
      }
      setGadgets(gadgetList);
    };
    fetchGadgets();
  }, []);

  const purchaseGadget = async (gadgetId: number, price: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const tx = await contract.purchaseGadget(gadgetId, { value: ethers.parseEther(price) });
      await tx.wait();
      alert("Purchase successful!");
      setGadgets(gadgets.filter((g) => g.id !== gadgetId));
    } catch (err) {
      console.error(err);
      alert("Error purchasing gadget");
    }
  };

  const requestRecycling = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const tx = await contract.requestRecycling(parseInt(tokenId));
      await tx.wait();
      alert(`Recycling requested for NFT #${tokenId}`);
      setTokenId("");
    } catch (err) {
      console.error(err);
      alert("Error requesting recycling");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Buyer Dashboard</h2>
      <p>Connected: {account}</p>
      <div className="mt-4">
        <h3 className="text-lg">Available Gadgets</h3>
        {gadgets.map((gadget) => (
          <div key={gadget.id} className="flex justify-between border-b py-2">
            <span>
              {gadget.name} - {gadget.price} ETH
            </span>
            <button
              onClick={() => purchaseGadget(gadget.id, gadget.price)}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-lg">Request Recycling</h3>
        <input
          type="text"
          placeholder="NFT Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="border p-2 mr-2 w-32"
        />
        <button
          onClick={requestRecycling}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Request
        </button>
      </div>
    </div>
  );
};

export default BuyerDashboard;