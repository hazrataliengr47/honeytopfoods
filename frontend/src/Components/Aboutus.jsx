import { FaLeaf, FaAward, FaTruck, FaHandsHelping } from "react-icons/fa";
import {aboutImage} from "../assets";

const Aboutus = () => {
  const features = [
    {
      icon: <FaLeaf className="text-4xl text-yellow-500" />,
      title: "100% Natural",
      description:
        "Our honey is collected from natural sources without any artificial additives or preservatives.",
    },
    {
      icon: <FaAward className="text-4xl text-yellow-500" />,
      title: "Premium Quality",
      description:
        "Every jar is carefully tested to ensure purity, freshness, and exceptional taste.",
    },
    {
      icon: <FaTruck className="text-4xl text-yellow-500" />,
      title: "Fast Delivery",
      description:
        "We deliver fresh honey safely to customers all across Pakistan.",
    },
    {
      icon: <FaHandsHelping className="text-4xl text-yellow-500" />,
      title: "Customer Satisfaction",
      description:
        "We are committed to providing excellent products and outstanding customer service.",
    },
  ];
  const message = [
    {
      imag: aboutImage,
      title1:"Who We Are",
      title2:"Pure Honey From Nature",
      description:`HoneyTop Foods is dedicated to producing premium-quality natural honey sourced from trusted beekeepers. We focus on purity, freshness, and maintaining the natural nutritional value of every drop of honey.
                  Our mission is to provide healthy, delicious, and authentic honey products while maintaining the highest quality standards and building lasting trust with our customers.`,
    },
  ];
  

  return (
    <div className="bg-gray-50">
      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {message.map((item, index) => (
          
        <div
        key={index}
        className="grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <img
              src={item.imag}
              alt="HoneyTop Foods"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>

          <div>
            <span className="text-yellow-600 font-semibold uppercase">
              {item.title1}
            </span>

            <h2 className="text-4xl font-bold mt-3 text-gray-800">
              {item.title2}
            </h2>

            <p className="text-gray-600 leading-8 mt-6">
              {item.description}
            </p>

            <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition">
              Explore Products
            </button>
          </div>
        </div>
        ))}
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">
              Why Choose HoneyTop Foods?
            </h2>

            <p className="text-gray-600 mt-4">
              We believe in delivering only the finest quality honey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {features.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 text-center shadow hover:shadow-lg transition"
              >
                <div className="flex justify-center mb-5">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Mission */}
      <section className="bg-yellow-500 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-white">
            Our Mission
          </h2>

          <p className="text-white mt-6 leading-8 text-lg">
            To provide pure, natural, and healthy honey products that improve
            everyday life while supporting sustainable beekeeping and customer
            satisfaction.
          </p>

        </div>
      </section>
    </div>
  );
};

export default Aboutus;
