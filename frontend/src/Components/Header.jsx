import {banner1 } from '../assets';
const Header = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto px-0 py-0 ">
        
        <div className="relative overflow-hidden">

          {/* Header Image */}
          <img
            src={banner1}
            alt="Honey Banner"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 md:px-12 max-w-lg">
              
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
                Pure Natural Honey
              </h1>

              <p className="mt-3 text-sm sm:text-lg text-white">
                Fresh organic honey directly from nature.
              </p>

              <button className="mt-5 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold">
                Shop Now
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Header;