
import { useContext, useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, subtotal, setCartItems } = useContext(CartContext);

  const [shippingCharges, setShippingCharges] = useState(0);
  const grandTotal = Number(subtotal) + shippingCharges;

  const [formData, setFormData] = useState({
  email: "",
  firstName: "",
  lastName: "",
  mobile: "",
  address: "",
  apartment: "",
  city: "",
  postalCode: "",
});

  const [loading, setLoading] = useState(false);

  const [saveInfo, setSaveInfo] = useState(false);

const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");


  // useEffect  
useEffect(() => {
  const fetchShippingSettings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/shipping-settings"
      );

      const data = await response.json();

      if (data.success) {
        setShippingCharges(
          data.data.shippingType === "free"
            ? 0
            : Number(data.data.shippingAmount || 0)
        );
      }
    } catch (error) {
      console.error("Error fetching shipping settings:", error);
    }
  };

  fetchShippingSettings();
}, []);
useEffect(() => {
  const fetchCustomerProfile = async () => {
    const token = localStorage.getItem("customerToken");

    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Profile API response:", data);
console.log("Customer token:", token);

      if (!response.ok) {
        throw new Error(data.message || "Unable to load customer profile.");
      }

      const customer = data.user;

      setFormData((prev) => ({
        ...prev,
        email: customer.email || "",
        firstName: customer.name?.split(" ")[0] || "",
        lastName: customer.name?.split(" ").slice(1).join(" ") || "",
        mobile: customer.mobile || "",
        address: customer.address || "",
        apartment: customer.apartment || "",
        city: customer.city || "",
        postalCode: customer.postalCode || "",
      }));
    } catch (error) {
      console.error("Error fetching customer profile:", error);
    }
  };

  fetchCustomerProfile();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

   

const products = cartItems.map((item) => ({
  productId: item.id || item._id,
  name: item.name,
  price: Number(item.price),
  quantity: Number(item.quantity),
  image: item.image || "",
  lineTotal: Number(item.price) * Number(item.quantity),
}));

    const orderData = {
      customer: `${formData.firstName} ${formData.lastName}`.trim(),
email: formData.email,
mobile: formData.mobile,
address: formData.address,
apartment: formData.apartment,
city: formData.city,
postalCode: formData.postalCode,
  saveInfo,
  paymentMethod,

      products,
product: products.map(item => `${item.name} x ${item.quantity}`).join(", "),
price: Number(subtotal),
quantity: products.reduce((total, item) => total + item.quantity, 0),
amount: Number(subtotal) + Number(shippingCharges),
      shippingCharges,
      totalAmount: grandTotal,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
    };

    try {
      setLoading(true);

      
const token = localStorage.getItem("customerToken");

const response = await fetch(
  "http://localhost:5000/api/orders",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(orderData),
  }
);


      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to place order.");
      }

      

const savedOrder =
  result.data?.order || result.data || orderData;

const finalOrder = {
  ...orderData,
  ...savedOrder,
  products:
    savedOrder.products?.length > 0
      ? savedOrder.products
      : orderData.products,
};

setCartItems([]);

navigate("/ordersuccess", {
  state: {
    order: finalOrder,
  },
});



    } catch (error) {
      console.error("Checkout error:", error);
      alert(error.message || "Unable to place your order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Your cart is empty
        </h2>

        <button
          onClick={() => navigate("/")}
          className="mt-5 rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-gray-200 pb-5">
  <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-yellow-600">
    HONEYTOP FOODS
  </p>

  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    Checkout
  </h1>

  <p className="mt-2 text-sm text-gray-500">
    Complete your details below to place your order.
  </p>
</div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {/* Customer Information */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">
              <div className="mb-6 border-b border-gray-100 pb-4">
  <h2 className="text-xl font-bold text-gray-900">
    Customer Information
  </h2>
  <p className="mt-1 text-sm text-gray-500">
    Enter your contact details and delivery address.
  </p>
</div>

              
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <input
    type="text"
    name="firstName"
    value={formData.firstName}
    onChange={handleChange}
    placeholder="First name"
    required
    className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-100"
  />

  <input
    type="text"
    name="lastName"
    value={formData.lastName}
    onChange={handleChange}
    placeholder="Last name"
    required
    className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-100"
  />

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-100"
                />

                <input
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-100"
                />

                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-100"
                />

                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Complete Delivery Address"
                  required
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-100 sm:col-span-2"
                />

                <input
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder="Apartment / House / Area (optional)"
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-100"
                />

                <input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-100"
                />
                

              </div>

              <div className="mt-5 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="saveInfo"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
                />

                <label
                  htmlFor="saveInfo"
                  className="text-sm font-medium text-gray-700"
                >
                  Save this information for next time
                </label>
              </div>
            </div>


           
            {/* Shipping Method */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">

                  <div className="mb-5 border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      Shipping Method
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Select your preferred shipping method.
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border-2 border-blue-500 bg-blue-50 p-5">

                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎁</span>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {shippingCharges === 0
                            ? "FREE Shipping on This Order — Limited Time"
                            : "Standard Shipping"}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Delivery charges are calculated automatically.
                        </p>
                      </div>
                    </div>

                    <span className="whitespace-nowrap font-bold text-gray-900">
                      {shippingCharges === 0
                        ? "FREE"
                        : `Rs. ${shippingCharges.toLocaleString()}`}
                    </span>

                  </div>
                </div>

                {/* Payment */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">

                  <div className="mb-5 border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      Payment
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      All transactions are secure and encrypted.
                    </p>
                  </div>

                  <label className="flex cursor-pointer items-center rounded-xl border-2 border-blue-500 bg-blue-50 p-5">

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={paymentMethod === "Cash on Delivery"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-4 h-5 w-5"
                    />

                    <span className="font-semibold text-gray-900">
                      Cash on Delivery (COD)
                    </span>

                  </label>

                </div>

            
          
</div>
          {/* Order Summary */}
          <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-7 lg:sticky lg:top-6">
            
            {/* Products */}
            {/* <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:p-8"> */}
               <div className="mb-6 border-b border-gray-100 pb-4">
  <h2 className="text-xl font-bold text-gray-900">
    Order Summary
  </h2>
  <p className="mt-1 text-sm text-gray-500">
    Your order total and delivery charges.
  </p>
</div>

              <div className="divide-y divide-gray-100">
                <div className="mt-5 space-y-4">
  {cartItems.map((item) => (
    <div
      key={item.id || item._id}
      className="flex items-center gap-3"
    >
      {/* Product Image */}
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
        <img
          src={item.image || "/images/honey1.png"}
          alt={item.name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-gray-800">
          {item.name}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Rs. {Number(item.price).toLocaleString()} ×{" "}
          {item.quantity}
        </p>
      </div>

      {/* Total */}
      <p className="whitespace-nowrap font-semibold text-gray-800">
        Rs.{" "}
        {(
          Number(item.price) * Number(item.quantity)
        ).toLocaleString()}
      </p>
    </div>
  ))}
</div>
              </div>
            {/* </div> */}
            
           

            <div className="space-y-4">
                            <div className="flex justify-between border-t pt-4 text-gray-600">
                <span>Products Subtotal</span>
                <span>Rs. {Number(subtotal).toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping Charges</span>
                <span>Rs. {shippingCharges.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-yellow-50 p-4">
              <span className="font-semibold text-gray-800">
                Grand Total
              </span>
              <span className="text-xl font-bold text-yellow-700">
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>

              
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-yellow-500 py-4 font-bold text-gray-900 shadow-sm transition duration-200 hover:bg-yellow-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;