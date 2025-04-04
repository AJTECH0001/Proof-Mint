
const CustomerTestimonials = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 ">
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <img
                  src="https://placehold.co/100x100"
                  alt="Customer"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Verified Buyer</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="material-symbols-outlined text-yellow-400"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-gray-600">
                The NFT receipt system gives me peace of mind knowing my
                purchase is securely recorded on the blockchain.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <img
                  src="https://placehold.co/100x100"
                  alt="Customer"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-gray-600">Tech Enthusiast</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="material-symbols-outlined text-yellow-400"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-gray-600">
                Love how easy it is to track my device's lifecycle and
                contribute to sustainable electronics.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <img
                  src="https://placehold.co/100x100"
                  alt="Customer"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Emma Williams</h4>
                  <p className="text-sm text-gray-600">Early Adopter</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="material-symbols-outlined text-yellow-400"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-gray-600">
                The platform makes it incredibly simple to resell my devices
                while maintaining proof of authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomerTestimonials;
