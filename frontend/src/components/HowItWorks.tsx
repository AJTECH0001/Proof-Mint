import React from "react";

const HowItWorks = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 ">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 group">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <img
                  src="/images/step1.png"
                  alt="Purchase Process"
                  className="relative rounded-2xl shadow-xl group-hover:shadow-2xl transition-all transform group-hover:-translate-y-2"
                />
              </div>
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-4">Step 1:</h3>
              <p className="text-lg">
                Purchase your item from our partnered stores.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="md:w-1/2 group">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-green-200 rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <img
                  src="/images/step2.png"
                  alt="NFT Receipt"
                  className="relative rounded-2xl shadow-xl group-hover:shadow-2xl transition-all transform group-hover:-translate-y-2"
                />
              </div>
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-4">Step 2:</h3>
              <p className="text-lg">
                Receive a unique NFT receipt directly in your wallet.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 group">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <img
                  src="/images/step3.png"
                  alt="Verification Process"
                  className="relative rounded-2xl shadow-xl group-hover:shadow-2xl transition-all transform group-hover:-translate-y-2"
                />
              </div>
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-4">Step 3:</h3>
              <p className="text-lg">
                Easily verify or share your purchase details anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HowItWorks;
