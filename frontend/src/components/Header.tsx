import { Link } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function NewHeader() {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6    sticky top-0 z-50">
      <nav className="py-4 px-6 backdrop-blur-lg bg-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 ">
            <span className="material-symbols-outlined text-green-500 text-2xl">
              receipt_long
            </span>
            <h1 className="text-xl font-bold">ProofMint</h1>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#" className="hover:scale-105 transition-transform">
              Marketplace
            </Link>
            <Link to="#" className="hover:scale-105 transition-transform">
              NFT Receipts
            </Link>
            <Link to="#" className="hover:scale-105 transition-transform">
              Recycling
            </Link>
            <Link to="#" className="hover:scale-105 transition-transform">
              Track Items
            </Link>
          </div>
          <div className="flex items-center space-x-4">
           
          <ConnectButton />
          </div>
        </div>
      </nav>
    </main>
  );
}
