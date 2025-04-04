// src/components/AdminDashboard.tsx
import React, { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/contract";

interface AdminDashboardProps {
  account: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ account }) => {
  const [newUser, setNewUser] = useState<string>("");
  const [role, setRole] = useState<string>("SELLER_ROLE");

  const assignRole = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const roleHash = ethers.keccak256(ethers.toUtf8Bytes(role));
      const tx = await contract.assignRole(newUser, roleHash);
      await tx.wait();
      alert(`Assigned ${role} to ${newUser}`);
    } catch (err) {
      console.error(err);
      alert("Error assigning role");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p>Connected: {account}</p>
      <div className="mt-4">
        <h3 className="text-lg">Assign Role</h3>
        <input
          type="text"
          placeholder="User Address"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          className="border p-2 mr-2 w-64"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="SELLER_ROLE">Seller</option>
          <option value="BUYER_ROLE">Buyer</option>
          <option value="RECYCLER_ROLE">Recycler</option>
        </select>
        <button
          onClick={assignRole}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;