import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-gray-100 backdrop-blur-lg">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" aria-label="ProofMint Home">
            <span className="material-symbols-outlined text-green-500 text-2xl">receipt_long</span>
            <h1 className="text-xl font-bold">ProofMint</h1>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="hover:scale-105 transition-transform">Marketplace</Link>
            <Link to="/nft-receipts" className="hover:scale-105 transition-transform">NFT Receipts</Link>
            <Link to="/recycling" className="hover:scale-105 transition-transform">Recycling</Link>
            <Link to="/track" className="hover:scale-105 transition-transform">Track Items</Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* <ConnectButton showBalance={false} /> */}
            <Link to="/signup">
              <button className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition-colors">
                Get Started
              </button>
            </Link>
            <button className="md:hidden" onClick={toggleMobileMenu} aria-label="Toggle Menu">
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 mt-4 pb-4">
            <Link to="/marketplace" className="hover:text-green-600">Marketplace</Link>
            <Link to="/nft-receipts" className="hover:text-green-600">NFT Receipts</Link>
            <Link to="/recycling" className="hover:text-green-600">Recycling</Link>
            <Link to="/track" className="hover:text-green-600">Track Items</Link>
          </div>
        )}
      </nav>
    </header>
  );
}