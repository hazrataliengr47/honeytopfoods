    import { Link } from "react-router-dom";
    import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    } from "react-icons/fa";
    import {logo} from '../assets'

const Footer = () => {
  return (
    <footer className="bg-[#1f2937] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <img
    src={logo}
    alt="HoneyTop Foods Logo"
    className="
      w-36 
      sm:w-40 
      md:w-48 
      h-auto 
      object-contain 
      mb-5
      hover:scale-105
      transition-transform
      duration-300
    "
  />

  <p className="text-gray-300 leading-7 text-sm">
    Since 1991, Beekeeping & Honey Packing has been dedicated to producing 100% pure natural honey.
     Our commitment to quality is evident through our PSQCA, ISO, and HALAL International certifications.
  </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="https://wa.me/923091993307"
                className="w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center duration-300"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-5">
              Quick Links
            </h2>

            <ul className="space-y-3 text-gray-300">

              <li>
                <Link to="/" className="hover:text-yellow-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/product" className="hover:text-yellow-400">
                  Products
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-yellow-400">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/blog" className="hover:text-yellow-400">
                  Blog
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-yellow-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h2 className="text-xl font-semibold mb-5">
              Working Hours
            </h2>

            <div className="space-y-3 text-gray-300 text-sm">
              <p>Monday - Friday</p>
              <p className="font-medium text-white">
                09:00 AM - 06:00 PM
              </p>

              <p>Saturday</p>
              <p className="font-medium text-white">
                07:00 AM - 08:00 PM
              </p>

              <p>Sunday</p>
              <p className="font-medium text-red-400">
                Closed
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-5">
              Contact Us
            </h2>

            <div className="space-y-5 text-gray-300">

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-yellow-400 mt-1" />
                <p className="text-sm leading-6">
                  Office No.1, Naran Street, GT Road,
                  Opposite Kala Mal Mandi,
                  Near Attock Filling Station,
                  Tarnab, Peshawar,
                  Pakistan.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-yellow-400" />
                <span>0309-1993307</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-400" />
                <span>info@honeytopfoods.com</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <Link to="/dashboard">login</Link>
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">

          <p>
            © {new Date().getFullYear()} HoneyTop Foods. All Rights Reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-yellow-400">
              Privacy Policy
            </Link>

            <Link to="/shipping-return" className="hover:text-yellow-400">
              Shipping Policy
            </Link>

            <Link to="/terms" className="hover:text-yellow-400">
              Terms & Conditions
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;













