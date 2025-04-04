const Description = () => {
    // Define the card data in an array
    const featureCards = [
      {
        icon: "token",
        title: "NFT Receipts",
        description: "Get unique NFT receipts for every purchase as proof of ownership.",
      },
      {
        icon: "recycling",
        title: "Track Recycling",
        description: "Monitor your electronics' lifecycle and contribute to sustainable e-waste management.",
      },
      {
        icon: "swap_horiz",
        title: "Easy Transfers",
        description: "Seamlessly transfer ownership when reselling or gifting your electronics.",
      },
      // Removed the duplicate Easy Transfers entry and keeping only unique items
      {
        icon: "security",
        title: "Secure Platform",
        description: "Blockchain-powered security for all your transactions.",
      },
    ];
  
    return (
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-20">
          {featureCards.map((card, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1"
            >
              <span className="material-symbols-outlined text-3xl md:text-4xl mb-4">
                {card.icon}
              </span>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
  
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 bg-gradient-to-r from-green-50 to-blue-50 p-6 md:p-12 rounded-3xl">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Revolutionizing Electronics Ownership
            </h2>
            <p className="text-base md:text-lg mb-6 md:mb-8">
              Our blockchain-powered platform ensures secure transactions,
              verifiable ownership, and responsible recycling tracking for all your
              electronic devices.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transform hover:scale-105 transition-all">
                Shop Now
              </button>
              <button className="px-6 py-3 border-2 border-green-600 rounded-full hover:bg-green-50 transform hover:scale-105 transition-all">
                Learn More
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-3xl blur-lg opacity-50"></div>
            <img
              src="https://placehold.co/600x400"
              alt="NFT Receipt Example"
              className="relative w-full rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
            />
          </div>
        </div>
      </main>
    );
  };
  
  export default Description;