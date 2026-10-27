
import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Neworder = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  
const productsSubtotal = selectedProducts.reduce(
  (total, product) =>
    total + Number(product.price) * Number(product.quantity),
  0
);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (!event.target.closest(".product-dropdown")) {
      setShowProducts(false);
    }
  };

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/contact"
      );

      const data = await response.json();

      setProducts(data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);

useEffect(() => {
  const fetchShippingSettings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/shipping-settings"
      );

      const data = await response.json();

      if (data.success) {
        setOrder((prev) => ({
          ...prev,
          shippingCharges:
            data.data.shippingType === "free"
              ? 0
              : data.data.shippingAmount,
        }));
      }
    } catch (error) {
      console.error("Error fetching shipping settings:", error);
    }
  };

  fetchShippingSettings();
}, []);


  const [order, setOrder] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",

    // Order information
    productId: "",
    product: "",
    price : "",
    amount: "",
    quantity:1,
    shippingCharges: "",
  });

  //toggle function
  
const toggleProduct = (product) => {
  setSelectedProducts((prev) => {
    const alreadySelected = prev.some(
      (item) => item.productId === product._id
    );

    if (alreadySelected) {
      return prev.filter(
        (item) => item.productId !== product._id
      );
    }

    return [
      ...prev,
      {
        productId: product._id,
        name: product.name,
        price: Number(product.price) || 0,
        quantity: 1,
        image: product.image,
      },
    ];
  });
};

  // handle change
  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "quantity") {
    const quantity = Math.max(1, Number(value));

    setOrder({
      ...order,
      quantity,
      amount: Number(order.price) * quantity,
    });

    return;
  }

  setOrder({
    ...order,
    [name]: value,
  });
};

  // Submit new order

const handleSubmit = async (e) => {
  e.preventDefault();

  if (selectedProducts.length === 0) {
    alert("Please select at least one product.");
    return;
  }

  const totalQuantity = selectedProducts.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  const newOrder = {
    customer: `${order.firstName} ${order.lastName}`.trim(),
    email: order.email,
    mobile: order.mobile,
    address: order.address,
    apartment: order.apartment,
    city: order.city,
    postalCode: order.postalCode,

    // Keep these fields for compatibility with existing orders pages
    product: selectedProducts.map((item) => item.name).join(", "),
    price: productsSubtotal,
    quantity: totalQuantity,

    // Save each selected product separately
    products: selectedProducts.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
      image: item.image || "",
      lineTotal: Number(item.price) * Number(item.quantity),
    })),

    amount: productsSubtotal,
    shippingCharges: Number(order.shippingCharges || 0),
    date: new Date().toLocaleDateString("en-CA"),
    status: "Pending",
  };

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      alert("Order created successfully!");
      navigate("/dashboard/order");
    } else {
      alert(data.message || "Failed to create order.");
      console.error("Backend error:", data);
    }
  } catch (error) {
    console.error("Error creating order:", error);
    alert("Unable to create order. Please check that your backend is running.");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Checkout
            </h1>

            <p className="text-gray-500 mt-1">
              Complete your order information
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Contact */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Contact
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              We'll use this information to contact you about your order.
            </p>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={order.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="mobile"
              placeholder="Phone number"
              value={order.mobile}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3.5 mt-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </section>

          {/* Delivery */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">
              Delivery
            </h2>

            <div className="space-y-4">

              {/* Country */}
              <select
                defaultValue="Pakistan"
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pakistan">Pakistan</option>
              </select>

              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={order.firstName}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={order.lastName}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* Address */}
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={order.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Apartment */}
              <input
                type="text"
                name="apartment"
                placeholder="Apartment, suite, etc. (optional)"
                value={order.apartment}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* City + Postal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={order.city}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal code (optional)"
                  value={order.postalCode}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>
            </div>
          </section>

         
            {/* Order Information */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">
                Order Information
            </h2>

            <div className="relative product-dropdown">
              {/* Selected Product */}
              
<button
  type="button"
  onClick={() => setShowProducts(!showProducts)}
  className="w-full border border-gray-300 rounded-xl px-4 py-3.5 flex items-center justify-between bg-white hover:bg-gray-50"
>
  <span className="text-gray-800">
    {selectedProducts.length > 0
      ? `${selectedProducts.length} product(s) selected`
      : "Select Products"}
  </span>

  <span className="text-gray-500">
    {showProducts ? "▲" : "▼"}
  </span>
</button>

              {/* Product List 379 - 413*/}
              {showProducts && (
                // <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-72 overflow-y-auto">
                //   {products.map((product) => (
                    
                //     <button
                //       key={product._id}
                //       type="button"
                //       onClick={() => {
                        
                //         setOrder({
                //           ...order,
                //           productId: product._id,
                //           product: product.name,
                //           price: product.price,
                //           amount: product.price,
                //           quantity: 1,
                //         });

                //         setShowProducts(false);
                //       }}
                //       className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                //     >
                //       <img
                //         src={`http://localhost:5000${product.image}`}
                //         alt={product.name}
                //         className="w-12 h-12 object-cover rounded-lg"
                //       />
                      

                //       <span className="text-gray-800 font-medium">
                        
                //         {product.name}
                //       </span>
                //     </button>
                //   ))}
                // </div>
                
<div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-72 overflow-y-auto">
  {products.map((product) => {
    const isSelected = selectedProducts.some(
      (item) => item.productId === product._id
    );

    return (
      <button
        key={product._id}
        type="button"
        onClick={() => toggleProduct(product)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
          isSelected ? "bg-amber-50" : "hover:bg-gray-50"
        }`}
      >
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-12 h-12 object-cover rounded-lg"
        />

        <span className="flex-1 text-gray-800 font-medium">
          {product.name}
        </span>

        <span className="text-sm text-gray-600">
          Rs. {Number(product.price).toLocaleString()}
        </span>

        <span
          className={`text-sm font-semibold ${
            isSelected ? "text-green-600" : "text-gray-400"
          }`}
        >
          {isSelected ? "✓ Selected" : "+ Select"}
        </span>
      </button>
    );
  })}
</div>
              )}

              
{/* Selected Products */}
<div className="mt-5 space-y-4">
  {selectedProducts.map((product) => (
    <div
      key={product.productId}
      className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl"
    >
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
        className="w-16 h-16 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Rs. {product.price.toLocaleString()} each
        </p>

        <p className="font-semibold text-gray-800 mt-1">
          Rs. {(product.price * product.quantity).toLocaleString()}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            setSelectedProducts((prev) =>
              prev.map((item) =>
                item.productId === product.productId
                  ? {
                      ...item,
                      quantity: Math.max(1, item.quantity - 1),
                    }
                  : item
              )
            )
          }
          className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          −
        </button>

        <span className="w-6 text-center font-medium">
          {product.quantity}
        </span>

        <button
          type="button"
          onClick={() =>
            setSelectedProducts((prev) =>
              prev.map((item) =>
                item.productId === product.productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            )
          }
          className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => toggleProduct({
          _id: product.productId,
        })}
        className="text-red-500 hover:text-red-700"
        title="Remove product"
      >
        Remove
      </button>
    </div>
  ))}
</div>
            </div>

            <div className="space-y-4">

{/* Order Total */}
<div className="mt-4 p-4 bg-gray-50 rounded-xl">
  <div className="flex justify-between items-center">
    <span className="text-gray-600">Products Subtotal</span>
    <span className="font-semibold text-gray-800">
      Rs. {productsSubtotal.toLocaleString()}
    </span>
  </div>

  <div className="flex justify-between items-center mt-3">
    <span className="text-gray-600">Shipping</span>
    <span className="font-semibold text-gray-800">
      Rs. {Number(order.shippingCharges || 0).toLocaleString()}
    </span>
  </div>

  <div className="flex justify-between items-center border-t border-gray-200 mt-4 pt-4">
    <span className="text-lg font-semibold text-gray-700">
      Total Amount
    </span>
    <span className="text-xl font-bold text-gray-900">
      Rs. {(productsSubtotal + Number(order.shippingCharges || 0)).toLocaleString()}
    </span>
  </div>
</div>

            </div>
            
            </section>



          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Create Order
          </button>

        </form>
      </div>
    </div>
  );
};

export default Neworder;
