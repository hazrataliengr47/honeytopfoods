import { useState  } from "react";
import {
  ShoppingBag,
  Plus,
  Minus,
  MessageCircle,
} from "lucide-react";
import { useCart } from "../Context/UseCart";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const ProductDetail = () => {
    const {addToCart} = useCart();
    const location = useLocation();
  const product = location.state?.products;
  console.log("Product ID on page:", product?._id);
//   console.log(product)
  const [quantity, setQuantity] = useState(1);

 

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Add to cart
  const handleAddToCart = () => {
      addToCart({
      ...product,
      quantity,
      
    });
  };

  // Buy now
  const handleBuyNow = () => {
    console.log("Buy now:", {
      ...product,
      quantity,
    });
  };

  // WhatsApp
  const handleWhatsApp = () => {
    const message = `Hello, I want to order ${product.name}. Quantity: ${quantity}`;

    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Main Product Section */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-8 lg:gap-12">

          {/* =========================
              LEFT - PRODUCT IMAGE
          ========================== */}
          <div className="flex items-start lg:col-span-2 justify-center">

            <div className="w-full max-w-[500px] sticky top-24   aspect-square flex items-center  overflow-hidden">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-6"
              />

            </div>

          </div>


          {/* =========================
              RIGHT - PRODUCT DETAILS
          ========================== */}
          <div className="flex flex-col">

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-[38px] leading-[1.1] font-bold tracking-tight text-[#303030]">
              {product.name}
            </h1>


            {/* Price */}
            <div className="flex items-center gap-2 mt-4">

              <span className="text-md text-[#333]">
                Rs.{product.price.toLocaleString("en-PK", {
                  minimumFractionDigits: 2,
                })}
              </span>

              <span className="text-md text-gray-400 line-through">
                Rs.{product.oldPrice.toLocaleString("en-PK", {
                  minimumFractionDigits: 2,
                })}
              </span>

            </div>


            {/* Divider */}
            <div className="w-full h-px bg-gray-200 mt-4 mb-6" />


            {/* Quantity + Add Cart */}
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-4">

              {/* Quantity */}
              <div className="h-14 border border-gray-200 rounded-2xl flex items-center justify-between px-6">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="text-gray-500 hover:text-black transition"
                >
                  <Minus size={22} strokeWidth={1.5} />
                </button>

                <span className="text-lg text-gray-700">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="text-gray-500 hover:text-black transition"
                >
                  <Plus size={22} strokeWidth={1.5} />
                </button>

              </div>


              {/* Add To Cart */}

              <button
                type="button"
                onClick={handleAddToCart}
                className="h-14 bg-black hover:bg-[#222] text-white rounded-2xl flex items-center justify-center gap-3 text-lg font-medium transition duration-300"
              >
                <ShoppingBag size={22} strokeWidth={1.8} />

                <span>
                  Add to cart
                </span>
              </button>

            </div>


            {/* Buy Now */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full h-14 mt-2 bg-black hover:bg-[#222] text-white rounded-2xl text-lg font-medium transition duration-300"
            >
              Buy it now
            </button>


            {/* WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full h-14 mt-2 bg-[#20d463] hover:bg-[#19bd57] text-white rounded-md flex items-center justify-center gap-3 text-lg font-bold tracking-wide transition duration-300"
            >
              <MessageCircle size={22} fill="white" />

              <span>
                ORDER ON WHATSAPP
              </span>
            </button>


            {/* Product Description */}
            <div className="mt-12">

              <h2 className="text-xl font-bold text-[#333] leading-7">
                Pure Wild Sidr Honey 1000gm — Pakistan's Finest
                Natural Honey
              </h2>

              <p className="mt-7 text-lg leading-8 text-[#444]">
                Naran Foods Wild Sidr Honey 1000gm is Pakistan's
                most premium natural honey, harvested directly from
                the pristine Sidr forests. Known for its rich taste,
                natural aroma, and exceptional quality, this honey
                is carefully packed to preserve its natural goodness.
              </p>

              <p className="mt-5 text-lg leading-8 text-[#444]">
                Enjoy pure, natural honey with every spoonful.
                Perfect for daily use, breakfast, drinks, desserts,
                and traditional recipes.
              </p>

            </div>

          </div>

        </div>

            </section>

      

      <Footer />
    </div>
  );
};

export default ProductDetail;