import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      image: '/images/purchase.png',
      alt: 'Purchasing electronics from partnered stores',
      title: 'Step 1: Purchase',
      description: 'Buy your item from our partnered stores.',
    },
    {
      image: '/images/nft-receipt.png',
      alt: 'Receiving NFT receipt in digital wallet',
      title: 'Step 2: Receive NFT',
      description: 'Get a unique NFT receipt in your wallet.',
    },
    {
      image: '/images/verify.png',
      alt: 'Verifying purchase details with NFT receipt',
      title: 'Step 3: Verify',
      description: 'Easily verify or share your purchase details.',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
            >
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-3xl blur-lg opacity-0 hover:opacity-50 transition-opacity"></div>
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="relative rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-lg text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/marketplace">
            <button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 hover:scale-105 transition-all">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HowItWorks;