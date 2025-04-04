import proofmint from "../assets/proofmint.png";

const HeroSection = () => {
  return (
    <section className="pt-8 lg:pt-32 bg-gray-100 bg-center bg-cover">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
      
        <h1 className=" text-wrap mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]">
          Decentralized Electronics with NFT Receipts
        </h1>
        <p className="max-w-sm mx-auto text-center text-2xl font-normal leading-7 text-gray-500 mb-9">
          Secure. Unique. Future-Proof.
        </p>

        <p className="text-xl max-w-2xl mx-auto mb-8">
          Buy electronics securely, receive NFT receipts, and track your
          products' lifecycle while contributing to responsible e-waste
          management.
        </p>
        {/* <button className="px-8 py-3 mb-8 bg-green-600 text-white rounded-full hover:bg-green-700 transform hover:scale-105 transition-all">
          Browse Products
        </button> */}
        <div className="border border-green-600 p-1 w-60 mx-auto rounded-full flex items-center justify-between mb-4">
              <span className="font-inter text-xs font-medium text-gray-900 ml-3"
              >Explore how to use for brands.</span>
              <a href="javascript:;" className="w-8 h-8 rounded-full flex justify-center items-center bg-green-600">
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
                          stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
              </a>
          </div>
         
          
        <div className="flex justify-center">
          <img
            src={proofmint}
            alt="Dashboard image "
            style={{ width: "950px", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
