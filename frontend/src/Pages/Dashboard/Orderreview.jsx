import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  CalendarDays,
  CreditCard,
  ShoppingBag,
} from "lucide-react";

const Orderreview = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(location.state?.order || null);
  const [status, setStatus] = useState(order?.status || "Pending");

  useEffect(() => {
  const fetchOrder = async () => {
    try {
      const response = await fetch(
  `http://localhost:5000/api/orders/${id}`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  }
);

      const data = await response.json();

      if (data.success) {
        setOrder(data.data);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  fetchOrder();
}, [id]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
            <Package className="mx-auto text-gray-400" size={50} />

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              Order Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              The order details are not available.
            </p>

            <button
              onClick={() => navigate("/dashboard/order")}
              className="mt-6 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              <ArrowLeft size={18} />
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  const cleanOrderId = String(order.orderNumber || order.id || order._id).replace("#", "");

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <div>
            <button
              onClick={() => navigate("/dashboard/order")}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-3 transition"
            >
              <ArrowLeft size={18} />
              Back to Orders
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Order Review
            </h1>

            <p className="text-gray-500 mt-1">
              Review complete order information
            </p>
          </div>

          {/* Order Status */}
          <div className="bg-white border rounded-xl px-5 py-3 shadow-sm">

            <p className="text-xs text-gray-500 mb-1">
              Order Status
            </p>

            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : status === "Processing"
                  ? "bg-blue-100 text-blue-700"
                  : status === "Shipped"
                  ? "bg-purple-100 text-purple-700"
                  : status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {status}
            </span>

          </div>

        </div>


        {/* Order Top Card */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 sm:p-6 mb-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <ShoppingBag
                  size={24}
                  className="text-yellow-600"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Order ID
                </p>

                <h2 className="text-xl font-bold text-gray-800">
                  #{cleanOrderId}
                </h2>
              </div>

            </div>


            <div className="flex items-center gap-3 text-gray-500">

              <CalendarDays size={19} />

              <div>
                <p className="text-xs text-gray-400">
                  Order Date
                </p>

                <p className="font-semibold text-gray-700">
  {new Date(order.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</p>
              </div>

            </div>

          </div>

        </div>


        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">


            {/* Customer Information */}
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b bg-gray-50">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User
                      size={20}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-800">
                      Customer Information
                    </h2>

                    <p className="text-xs text-gray-500">
                      Customer contact details
                    </p>
                  </div>

                </div>

              </div>


              <div className="p-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  <div className="flex gap-3">

                    <User
                      size={18}
                      className="text-gray-400 mt-1"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Customer Name
                      </p>

                      <p className="font-semibold text-gray-800 mt-1">
                        {order.customer}
                      </p>
                    </div>

                  </div>


                  <div className="flex gap-3">

                    <Mail
                      size={18}
                      className="text-gray-400 mt-1"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Email Address
                      </p>

                      <p className="font-semibold text-gray-800 mt-1 break-all">
                        {order.email || "Not provided"}
                      </p>
                    </div>

                  </div>


                  <div className="flex gap-3">

                    <Phone
                      size={18}
                      className="text-gray-400 mt-1"
                    />

                    <div>
                      <p className="text-xs text-gray-400">
                        Mobile Number
                      </p>

                      <p className="font-semibold text-gray-800 mt-1">
                        {order.mobile || "Not provided"}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* Delivery Information */}
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b bg-gray-50">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin
                      size={20}
                      className="text-green-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-800">
                      Delivery Information
                    </h2>

                    <p className="text-xs text-gray-500">
                      Shipping and delivery address
                    </p>
                  </div>

                </div>

              </div>


              <div className="p-6">

                <div className="space-y-5">

                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Delivery Address
                    </p>

                    <p className="font-semibold text-gray-800">
                      {order.address || "Not provided"}
                    </p>
                  </div>


                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                    <div>
                      <p className="text-xs text-gray-400">
                        Apartment
                      </p>

                      <p className="font-semibold text-gray-800 mt-1">
                        {order.apartment || "—"}
                      </p>
                    </div>


                    <div>
                      <p className="text-xs text-gray-400">
                        City
                      </p>

                      <p className="font-semibold text-gray-800 mt-1">
                        {order.city || "—"}
                      </p>
                    </div>


                    <div>
                      <p className="text-xs text-gray-400">
                        Postal Code
                      </p>

                      <p className="font-semibold text-gray-800 mt-1">
                        {order.postalCode || "—"}
                      </p>
                    </div>

                  </div>


                  <div className="pt-4 border-t">

                    <p className="text-xs text-gray-400">
                      Country
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      Pakistan
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* Product Information */}
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b bg-gray-50">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Package
                      size={20}
                      className="text-yellow-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-800">
                      Product Information
                    </h2>

                    <p className="text-xs text-gray-500">
                      Ordered product details
                    </p>
                  </div>

                </div>

              </div>


              {/* <div className="p-6">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div>

                    <p className="text-xs text-gray-400">
                      Product
                    </p>

                    <h3 className="text-lg font-bold text-gray-800 mt-1">
                      {order.product}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Quantity: <span className="font-semibold text-gray-700">
                        {order.quantity || 1}
                      </span>
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
  Unit Price: <span className="font-semibold text-gray-700">
    Rs. {Number(order.price || 0).toLocaleString()}
  </span>
</p>
<p className="text-xs text-gray-400 mt-1">
  {Number(order.price || 0).toLocaleString()} ×{" "}
  {order.quantity || 1}
</p>
                  </div>


                  <div className="sm:text-right">

                    <p className="text-xs text-gray-400">
                      Product Amount
                    </p>

                    <p className="text-xl font-bold text-yellow-600 mt-1">
  Rs. {Number(order.amount || 0).toLocaleString()}
</p>

                  </div>

                </div>

              </div> */}

              
<div className="p-6">
  {order.products && order.products.length > 0 ? (
    <div className="space-y-5">
      {order.products.map((item, index) => (
        <div
          key={item._id || item.productId || index}
          className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-100 pb-5 last:border-b-0 last:pb-0"
        >
          <img
            src={
              item.image
                ? `http://localhost:5000${item.image}`
                : "/honey-placeholder.png"
            }
            alt={item.name}
            className="w-20 h-20 rounded-xl object-cover border border-gray-200"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div className="flex-1">
            <h3 className="font-bold text-gray-800">
              {item.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Unit Price: Rs.{" "}
              {Number(item.price || 0).toLocaleString()}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Quantity:{" "}
              <span className="font-semibold text-gray-700">
                {item.quantity}
              </span>
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-xs text-gray-400">
              Line Total
            </p>

            <p className="text-lg font-bold text-yellow-600 mt-1">
              Rs.{" "}
              {Number(
                item.lineTotal ??
                  Number(item.price || 0) *
                    Number(item.quantity || 0)
              ).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <h3 className="text-lg font-bold text-gray-800">
        {order.product}
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        Quantity: {order.quantity || 1}
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Unit Price: Rs.{" "}
        {Number(order.price || 0).toLocaleString()}
      </p>

      <p className="text-xl font-bold text-yellow-600 mt-3">
        Product Amount: Rs.{" "}
        {Number(order.amount || 0).toLocaleString()}
      </p>
    </div>
  )}
</div>

            </div>

          </div>


          {/* Right Side */}
          <div className="space-y-6">


            {/* Payment Summary */}
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b bg-gray-50">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CreditCard
                      size={20}
                      className="text-purple-600"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-800">
                      Order Summary
                    </h2>

                    <p className="text-xs text-gray-500">
                      Payment information
                    </p>
                  </div>

                </div>

              </div>


              <div className="p-6 space-y-4">
                {order.products && order.products.length > 0 ? (
  <div className="space-y-4">
    {order.products.map((item, index) => (
      <div
        key={item._id || item.productId || index}
        className="border-b border-gray-100 pb-4"
      >
        <div className="flex justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-800">
              {item.name}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Rs. {Number(item.price || 0).toLocaleString()} ×{" "}
              {item.quantity}
            </p>
          </div>

          <p className="font-semibold text-gray-800 whitespace-nowrap">
            Rs.{" "}
            {Number(
              item.lineTotal ??
                Number(item.price || 0) * Number(item.quantity || 0)
            ).toLocaleString()}
          </p>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="flex justify-between">
    <span>Product</span>
    <span>
      Rs. {Number(order.amount || 0).toLocaleString()}
    </span>
  </div>
)}
                

                <div className="flex justify-between text-gray-600">

                  
  <span>Products Subtotal</span>

  <span className="font-medium">
    Rs.{" "}
    {Number(
      order.products && order.products.length > 0
        ? order.products.reduce(
            (total, item) =>
              total +
              Number(
                item.lineTotal ??
                  Number(item.price || 0) * Number(item.quantity || 0)
              ),
            0
          )
        : order.amount || 0
    ).toLocaleString()}
  </span>
</div>

<div className="flex justify-between text-gray-600">
  <span>Shipping Charges</span>

  <span className="font-medium">
    Rs. {Number(order.shippingCharges || 0).toLocaleString()}
  </span>
</div>

<div className="border-t pt-4 flex justify-between items-center">
  <span className="font-bold text-gray-800">
    Grand Total
  </span>

  <span className="text-2xl font-bold text-yellow-600">
    Rs.{" "}
    {(
      Number(
        order.products && order.products.length > 0
          ? order.products.reduce(
              (total, item) =>
                total +
                Number(
                  item.lineTotal ??
                    Number(item.price || 0) * Number(item.quantity || 0)
                ),
              0
            )
          : order.amount || 0
      ) + Number(order.shippingCharges || 0)
    ).toLocaleString()}
  </span>
</div>

              </div>

            </div>


            {/* Order Status */}
            
            <div className="bg-white rounded-2xl border shadow-sm p-6">

              <h2 className="font-bold text-gray-800 mb-4">
                Order Status
              </h2>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                onClick={async () => {
                  // const savedOrders =
                  //   JSON.parse(localStorage.getItem("orders")) || [];

                  // const updatedOrders = savedOrders.map((savedOrder) =>
                  //   String(savedOrder.id) === String(order.id)
                  //     ? {
                  //         ...savedOrder,
                  //         status: status,
                  //       }
                  //     : savedOrder
                  // );

                  // localStorage.setItem(
                  //   "orders",
                  //   JSON.stringify(updatedOrders)
                  // );

                  const response = await fetch(
                    `http://localhost:5000/api/orders/${id}`,
                    {
                      method: "PUT",
                      headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                              },
                      body: JSON.stringify({
                        status: status,
                      }),
                    }
                  );

                  if (response.ok) {
                    alert("Order status updated successfully!");
                    navigate("/dashboard/order");
                  } else {
                    console.error("Failed to update order status");
                  }
                }}
                className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold transition"
              >
                Update Status
              </button>

            </div>


            {/* Back Button */}
            <button
              onClick={() => navigate("/dashboard/order")}
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3.5 rounded-xl font-semibold transition shadow-sm"
            >
              <ArrowLeft size={18} />
              Back to Orders
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Orderreview;