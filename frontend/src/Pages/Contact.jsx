import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Contact = () => {
  return (
    <>
    <Navbar />
      {/* Hero Section */}
      <section className="bg-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-5xl font-bold text-white">
            Contact Us
          </h1>

          <p className="mt-4 text-white text-lg max-w-2xl mx-auto">
            Have questions about our honey products? We'd love to hear from
            you. Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-5">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-yellow-600 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-bold text-xl text-gray-800">
                      Address
                    </h3>

                    <p className="text-gray-600 mt-2">
                      PrimeLink Traders
                      <br />
                      Nowshera, KPK, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                    <FaPhoneAlt className="text-yellow-600 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-bold text-xl text-gray-800">
                      Phone
                    </h3>

                    <p className="text-gray-600 mt-2">
                      +92 309 1993307
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                    <FaEnvelope className="text-yellow-600 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-bold text-xl text-gray-800">
                      Email
                    </h3>

                    <p className="text-gray-600 mt-2">
                      info@honeytopfoods.com
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Send Us a Message
              </h2>

              <form className="space-y-6">

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="block mb-2 font-medium">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="03XXXXXXXXX"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="Enter subject"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Message
                  </label>

                  <textarea
                    rows="6"
                    placeholder="Write your message..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-lg font-semibold transition duration-300"
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;