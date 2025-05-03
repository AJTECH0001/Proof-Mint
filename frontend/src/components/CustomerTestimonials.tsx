const PartnerTestimonials = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6">
      <section className="py-16  bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl  mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Hear from our partners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* SWEAT Testimonial */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <img
                  src="https://placehold.co/100x100"
                  alt="SWEAT Logo"
                  className="w-12 h-12"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">SWEAT</h4>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Ramp Network significantly increased our success rate in
                countries where other providers failed.
              </p>
              <div className="flex items-center">
                <img
                  src="https://placehold.co/40x40"
                  alt="Illa R."
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-2">
                  <p className="text-sm font-semibold">Illa R.</p>
                  <p className="text-xs text-gray-600">Product Head at SWEAT Wallet</p>
                </div>
              </div>
            </div>

            {/* Brave Testimonial */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <img
                  src="https://placehold.co/100x100"
                  alt="Brave Logo"
                  className="w-12 h-12"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Brave</h4>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Ramp Network helps bring Web3 to our 55+ million users.
              </p>
              <div className="flex items-center">
                <img
                  src="https://placehold.co/40x40"
                  alt="Brendan Eich"
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-2">
                  <p className="text-sm font-semibold">Brendan Eich</p>
                  <p className="text-xs text-gray-600">Co-founder & CEO of Brave</p>
                </div>
              </div>
            </div>

            {/* Sorare Testimonial */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <img
                  src="https://placehold.co/100x100"
                  alt="Sorare Logo"
                  className="w-12 h-12"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Sorare</h4>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Ramp Network is the ultimate low friction on-ramp.
              </p>
              <div className="flex items-center">
                <img
                  src="https://placehold.co/40x40"
                  alt="Brian O'Hagan"
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-2">
                  <p className="text-sm font-semibold">Brian O'Hagan</p>
                  <p className="text-xs text-gray-600">Growth Lead at Sorare</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PartnerTestimonials;