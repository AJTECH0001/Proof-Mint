import { Link } from "react-router";

const Description = () => {
  const featureCards = [
    {
      icon: 'token',
      title: 'NFT Receipts',
      description: 'Get unique NFT receipts for every purchase as proof of ownership.',
    },
    {
      icon: 'recycling',
      title: 'Track Recycling',
      description: 'Monitor your electronics’ lifecycle and contribute to sustainable e-waste management.',
    },
    {
      icon: 'swap_horiz',
      title: 'Easy Transfers',
      description: 'Seamlessly transfer ownership when reselling or gifting your electronics.',
    },
    {
      icon: 'security',
      title: 'Secure Platform',
      description: 'Blockchain-powered security for all your transactions.',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-20">
        {featureCards.map((card, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow hover:-translate-y-1"
          >
            <span className="material-symbols-outlined text-4xl mb-4">{card.icon}</span>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-green-50 to-blue-50 p-6 md:p-12 rounded-3xl">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            Revolutionizing Electronics Ownership
          </h2>
          <p className="text-lg mb-6 md:mb-8 text-gray-600">
            Our blockchain-powered platform ensures secure transactions, verifiable ownership, and responsible recycling tracking for all your electronic devices.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/marketplace">
              <button className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 hover:scale-105 transition-all">
                Shop Now
              </button>
            </Link>
            <Link to="/about">
              <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-full hover:bg-green-50 hover:scale-105 transition-all">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
          <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-3xl blur-lg opacity-50"></div>
          <img
            src="/images/nft-receipt.png"
            alt="Example NFT receipt for electronics purchase"
            className="relative w-full rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            loading="lazy"
          />
        </div>
      </div>
    </main>
  );
};

export default Description;