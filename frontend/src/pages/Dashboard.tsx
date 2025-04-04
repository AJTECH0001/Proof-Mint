// src/pages/Dashboard.tsx
import React from "react";
import AdminDashboard from "../components/AdminDashboard";
import SellerDashboard from "../components/SellerDashboard";
import BuyerDashboard from "../components/BuyerDashboard";
import { Role } from "../utils/types";

interface DashboardProps {
  account: string;
  role: Role;
}

const Dashboard: React.FC<DashboardProps> = ({ account, role }) => {
  const renderDashboard = () => {
    switch (role) {
      case "ADMIN_ROLE":
        return <AdminDashboard account={account} />;
      case "SELLER_ROLE":
        return <SellerDashboard account={account} />;
      case "BUYER_ROLE":
        return <BuyerDashboard account={account} />;
      default:
        return <p className="text-red-500">No role assigned. Contact the Administrator.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;