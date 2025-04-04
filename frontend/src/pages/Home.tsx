// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Role } from "../utils/types";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import CustomerTestimonials from "../components/CustomerTestimonials";
import Description from "../components/Description";

interface HomeProps {
  account: string;
  role: Role;
}

const Home: React.FC<HomeProps> = ({ account, role }) => (
  <div>
    <Header />
    <div>
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to ProofMint</h1>
        <p>
          Connected as: {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Not Connected"} (
          {role || "No Role"})
        </p>
        <Link
          to="/dashboard"
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
    <HeroSection />
    <Description />
    <HowItWorks />
    <CustomerTestimonials />
    <FAQ />
    <Footer />
  </div>
);

export default Home;