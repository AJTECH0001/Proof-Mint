import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Role } from "./utils/types";
import { checkRole, getContract } from "./utils/contract";
import Signup from "./pages/signup";
import Signin from "./pages/signin";

const App: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [role, setRole] = useState<Role>("");

  useEffect(() => {
    const fetchRole = async () => {
      if (isConnected && address) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const userRole = await checkRole(signer, address);
          setRole(userRole);
        } catch (err) {
          console.error("Error fetching role:", err);
          setRole("");
        }
      }
    };
    fetchRole();
  }, [isConnected, address]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Routes>
          <Route path="/" element={<Home account={address || ""} role={role} />} />
          <Route path="/dashboard" element={<Dashboard account={address || ""} role={role} />} />
          <Route path="/dashboard" element={<Dashboard account={address || ""} role={role} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;