 import { MdDelete } from "react-icons/md";
 import { useCart } from "../Context/UseCart";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";



function Cart() {

  const {
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeItem, 
  subtotal
 
} = useCart();

  const [shippingType, setShippingType] = useState("free");
const [shippingAmount, setShippingAmount] = useState(0);
const navigate = useNavigate();

useEffect(() => {
  const fetchShippingSettings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/shipping-settings"
      );

      const data = await response.json();

      if (data.success) {
  console.log("SHIPPING SETTINGS:", data.data);

  setShippingType(data.data.shippingType);
  setShippingAmount(
    Number(data.data.shippingAmount) || 0
  );
}
    } catch (error) {
      console.error("Error fetching shipping settings:", error);
    }
  };

  fetchShippingSettings();
}, []);


const shipping =
cartItems.length === 0
    ? 0
    :shippingType === "free"
    ? 0
    : shippingAmount;

    const total = subtotal + shipping;
 
  return (
    <div>
      <Navbar />
      <section className= "max-w-7xl mx-auto px-6 bg-gray-100  py-12 ">
       
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Shopping Cart</h1>

              <div className="grid lg:grid-cols-3  gap-8">
                {/* Cart Products */}
                <div className="lg:col-span-2 space-y-5">

                    {cartItems.length === 0 ? (
                      
                      <div className="bg-white rounded-xl shadow p-10 text-center">
                        <h2 className="text-2xl font-bold text-gray-700">
                          Your Cart is Empty
                        </h2>

                        {/* Shopping Button */}
                        <div className="mt-6   text-center">
                          <Link
                            to="/product"
                            className="inline-block rounded-lg bg-amber-500 px-6 py-3 font-medium text-white transition hover:bg-amber-600"
                          >
                            Continue Shopping
                          </Link>
                        </div>
                      </div>

                    ) : (

                     cartItems.map((item) => (
                      
                      <div 
                      
                        key={item.id}
                        className="relative
                        bg-white rounded-xl shadow p-5
                        flex items-center gap-5">
                          
                          <img src={item.image}
                           alt={item.name}
                           className="w-28 h-28 rounded-lg object-cover" />
                            
                           <div className="flex-1">
  <h2 className="text-xl font-bold">
    {item.name}
  </h2>

  {/* Unit Price */}
  <p className="text-gray-500 text-sm mt-2">
    Unit Price:
    <span className="font-semibold text-gray-700 ml-1">
      Rs. {item.price}
    </span>
  </p>

  {/* Quantity */}
  <div className="flex items-center gap-3 mt-4">
    <button
      onClick={() => decreaseQuantity(item.id)}
      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded"
    >
      -
    </button>

    <span className="font-bold">
      {item.quantity}
    </span>

    <button
      onClick={() => increaseQuantity(item.id)}
      className="w-8 h-8 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
    >
      +
    </button>
  </div>
</div>

{/* Total Price - Bottom Right */}
<div className="absolute bottom-5 right-5 text-right">
  <p className="text-sm text-gray-500">
    Total Price
  </p>

  <p className="text-xl font-bold text-yellow-600">
    Rs. {item.price * item.quantity}
  </p>
</div>

                           <button 
                              onClick={() => removeItem(item.id)}                             
                              className="absolute w-10 h-10 flex items-center justify-center rounded-full bg-red-100
                              text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300
                              shadow-md hover:shadow-lg top-4 right-4"
                              >
                                <MdDelete className="text-xl "/>
                              </button>
                        </div>
                    ))
                  )}
                </div>
                
{/* card ended */}

                {/* Order Summary */}
<div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-6">

  <h2 className="text-2xl font-bold text-gray-800">
    Order Summary
  </h2>

  {/* Products */}
  <div className="mt-6 space-y-4">
    {cartItems.map((item) => (
      <div
        key={item.id}
        className="flex justify-between items-start gap-4"
      >
        <div>
          <p className="font-medium text-gray-700">
            {item.name}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Qty: {item.quantity}
          </p>
        </div>

        <span className="font-semibold text-gray-800 whitespace-nowrap">
          Rs. {item.price * item.quantity}
        </span>
      </div>
    ))}
  </div>

  {/* Divider */}
  <div className="border-t border-gray-200 my-6"></div>

  {/* Subtotal */}
  <div className="flex justify-between text-gray-600">
    <span>Subtotal</span>

    <span className="font-semibold text-gray-800">
      Rs. {subtotal}
    </span>
  </div>

  {/* Shipping */}
  <div className="flex justify-between mt-4 text-gray-600">
  <span>Shipping</span>

  {cartItems.length === 0 || shippingType === "free" ? (
    <span className="font-semibold text-green-600">
      Rs. 0
    </span>
  ) : (
    <span className="font-semibold text-gray-800">
      Rs. {shippingAmount}
    </span>
  )}
</div>

  {/* Divider */}
  <div className="border-t border-gray-200 my-5"></div>

  {/* Total */}
  <div className="flex justify-between items-center">
    <span className="text-lg font-bold text-gray-800">
      Total
    </span>

    <span className="text-2xl font-bold text-yellow-600">
      Rs. {total}
    </span>
  </div>

  {/* Checkout */}
  {/* <button
    className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600
    text-white py-3.5 rounded-xl font-semibold
    transition duration-300"
  >
    Proceed to Checkout
  </button> */}
  <button
  onClick={() => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/checkout");
  }}
  className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600
  text-white py-3.5 rounded-xl font-semibold
  transition duration-300"
>
  Proceed to Checkout
</button>

</div>
              </div>
        
      </section>
      <Footer />
    </div>
  )
}

export default Cart


