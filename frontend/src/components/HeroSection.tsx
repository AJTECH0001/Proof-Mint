import proofmint from '../assets/proofmint.png';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-8 lg:pt-32 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="mx-auto font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-tight">
          Decentralized Electronics with NFT Receipts
        </h1>
        <p className="max-w-sm mx-auto text-2xl font-normal text-gray-600 mb-9">
          Secure. Unique. Future-Proof.
        </p>
        <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-700">
          Buy electronics securely, receive NFT receipts, and track your products’ lifecycle while contributing to responsible e-waste management.
        </p>
        <Link to="/marketplace">
          <button className="px-8 py-3 mb-8 bg-green-600 text-white rounded-full hover:bg-green-700 hover:scale-105 transition-all">
            Browse Products
          </button>
        </Link>
       
        <div className="flex justify-center">
          <img
            src={proofmint}
            alt="ProofMint dashboard showing NFT receipts and gadget tracking"
            className="w-full max-w-[950px] h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;