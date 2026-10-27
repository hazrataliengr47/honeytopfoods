
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = localStorage.getItem("customerToken");

      if (!token) {
        setError("Please log in to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load your orders.");
        }

        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-[60vh] bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-5xl">
            <Link
                to="/myaccount"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-amber-700 transition hover:text-amber-800"
            >
                <span aria-hidden="true">←</span>
                Back to My Account
            </Link>

          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            My Orders
          </h1>
          <p className="mb-8 text-gray-600">
            View your HoneyTop Foods order history.
          </p>

          {loading ? (
            <p className="py-10 text-center">Loading your orders...</p>
          ) : error ? (
            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <p className="mb-4 text-red-600">{error}</p>
              <Link
                to="/customerlogin"
                className="inline-block rounded-lg bg-amber-500 px-5 py-2 font-medium text-white hover:bg-amber-600"
              >
                Customer Login
              </Link>
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-lg bg-white p-8 text-center shadow-sm">
              <p className="mb-4 text-lg text-gray-700">
                You haven't placed any orders yet.
              </p>
              <Link
                to="/product"
                className="inline-block rounded-lg bg-amber-500 px-5 py-2 font-medium text-white hover:bg-amber-600"
              >
                Shop Products
              </Link>
            </div>
          ) : (
            // <div className="space-y-4">
            //   {orders.map((order) => (
            //     <div
            //       key={order._id}
            //       className="rounded-xl border bg-white p-5 shadow-sm"
            //     >
            //       <div className="flex flex-wrap items-start justify-between gap-3">
            //         <div>
            //           <h2 className="font-semibold text-gray-800">
            //             Order #{order.orderNumber || order._id}
            //           </h2>
            //           <p className="mt-1 text-sm text-gray-500">
            //             {order.date
            //               ? new Date(order.date).toLocaleDateString()
            //               : "Date unavailable"}
            //           </p>
            //         </div>

            //         <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
            //           {order.status || "Pending"}
            //         </span>
            //       </div>

            //       <div className="mt-4 flex flex-wrap justify-between gap-3 border-t pt-4">
            //         <p className="text-gray-600">
            //           Items: {order.quantity || 0}
            //         </p>
            //         <p className="font-semibold text-gray-900">
            //           Total: Rs. {Number(
            //             order.totalAmount ?? order.amount ?? order.price ?? 0
            //           ).toLocaleString()}
            //         </p>
            //       </div>
            //     </div>
            //   ))}
            // </div>

            
<div className="space-y-5">
  {orders.map((order) => {
    const status = (order.status || "Pending").toLowerCase();

    const statusStyle =
      status === "delivered"
        ? "bg-green-100 text-green-700"
        : status === "cancelled"
        ? "bg-red-100 text-red-700"
        : status === "processing"  
        ? "bg-blue-100 text-blue-700"
        : status === "shipped"
        ? "bg-purple-100 text-purple-700"
        : "bg-amber-100 text-amber-800";

    const products = order.products || [];

    const itemCount = products.reduce(
      (total, product) =>
        total + Number(product.quantity || 1),
      0
    );

    return (
      <div
        key={order._id}
        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
      >
        {/* Order Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-gray-50/70 px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Order Number
            </p>

            <h2 className="mt-1 font-semibold text-gray-900">
              #{order.orderNumber || order._id}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {order.date
                ? new Date(order.date).toLocaleDateString()
                : "Date unavailable"}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${statusStyle}`}
          >
            {order.status || "Pending"}
          </span>
        </div>

        {/* Products */}
        <div className="space-y-4 p-5">
          <h3 className="text-sm font-semibold text-gray-800">
            Order Items
          </h3>

          {products.length > 0 ? (
            products.map((product, index) => {
              const imageUrl = product.image
                ? product.image.startsWith("http")
                  ? product.image
                  : `http://localhost:5000/${product.image.replace(/^\/+/, "")}`
                : "";

              return (
                <div
                  key={product.productId || index}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name || "Product"}
                        className="h-full w-full object-contain p-1"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="px-1 text-center text-xs text-gray-400">
                        No image
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900">
                      {product.name || "HoneyTop Foods Product"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {product.quantity || 1}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      Rs. {Number(product.price || 0).toLocaleString()}
                      {" "}each
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-gray-900">
                    Rs. {Number(
                      product.lineTotal ??
                      Number(product.price || 0) *
                        Number(product.quantity || 1)
                    ).toLocaleString()}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500">
              Product details are unavailable for this order.
            </p>
          )}
          
        </div>

        {/* Order Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4">
          <p className="text-sm text-gray-600">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>

          <div className="text-right">
            <p className="text-xs text-gray-500">
              Order Total
            </p>

            <p className="mt-1 text-lg font-bold text-gray-900">
              Rs. {Number(
                order.totalAmount ??
                order.amount ??
                order.price ??
                0
              ).toLocaleString()}
            </p>
            
          <Link
                to={`/myorders/${order._id}`}
                className="inline-block mt-4 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
                >
                View Details
                </Link>
          </div>
        </div>
      </div>
    );
  })}
</div>

          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MyOrders;
