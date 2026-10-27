import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const MyOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("customerToken");

      if(!token){
        navigate("/customerlogin")
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/my-orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load order.");
        }

        setOrder(data.order);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] bg-gray-50 px-4 py-10">
          <p className="py-10 text-center text-gray-600">
            Loading order details...
          </p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] bg-gray-50 px-4 py-10">
          <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="mb-5 text-red-600">{error}</p>

            <Link
              to="/myorders"
              className="inline-block rounded-lg bg-amber-500 px-5 py-2 font-medium text-white hover:bg-amber-600"
            >
              Back to My Orders
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-[60vh] bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-5xl">

          <Link
            to="/myorders"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-800"
          >
            ← Back to My Orders
          </Link>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Order Details
            </h1>

            <p className="mt-2 text-gray-500">
              Order #{order.orderNumber || order._id}
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* Order Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-gray-50/70 px-5 py-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order Date
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {order.date
                    ? new Date(order.date).toLocaleDateString()
                    : "Date unavailable"}
                </p>
              </div>

              
<span
  className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
    order.status === "Delivered"
      ? "bg-green-100 text-green-800"
      : order.status === "Cancelled"
      ? "bg-red-100 text-red-800"
      : order.status === "Processing"
      ? "bg-blue-100 text-blue-800"
      : order.status === "Shipped"
      ? "bg-purple-100 text-purple-800"
      : "bg-amber-100 text-amber-800"
  }`}
>
  {order.status || "Pending"}
</span>

            </div>

            {/* Products */}
            <div className="p-5">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Products
              </h2>

              <div className="space-y-4">
                {(order.products || []).map((product, index) => {
                  const imageUrl = product.image
                    ? product.image.startsWith("http")
                      ? product.image
                      : `http://localhost:5000/${product.image.replace(
                          /^\/+/,
                          ""
                        )}`
                    : "";

                  return (
                    <div
                      key={product.productId || index}
                      className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0"
                    >
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-gray-50">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="h-full w-full object-contain p-1"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            No image
                          </span>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {product.quantity}
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                          Rs. {Number(product.price || 0).toLocaleString()} each
                        </p>
                      </div>

                      <p className="font-semibold text-gray-900">
                        Rs.{" "}
                        {Number(
                          product.lineTotal || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="border-t border-gray-100 p-5">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Delivery Information
              </h2>

              <div className="grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                <p>
                  <span className="font-medium text-gray-800">Name:</span>{" "}
                  {order.customer}
                </p>

                <p>
                  <span className="font-medium text-gray-800">Email:</span>{" "}
                  {order.email || "—"}
                </p>

                <p>
                  <span className="font-medium text-gray-800">Mobile:</span>{" "}
                  {order.mobile || "—"}
                </p>

                <p>
                  <span className="font-medium text-gray-800">City:</span>{" "}
                  {order.city || "—"}
                </p>

                <p className="sm:col-span-2">
                  <span className="font-medium text-gray-800">
                    Address:
                  </span>{" "}
                  {order.address || "—"}
                </p>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-100 bg-gray-50 px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  Shipping
                </span>

                <span className="text-gray-800">
                  Rs.{" "}
                  {Number(
                    order.shippingCharges || 0
                  ).toLocaleString()}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-800">
                  Order Total
                </span>

                <span className="text-xl font-bold text-gray-900">
                  Rs.{" "}
                  {Number(
                    order.amount || order.totalAmount || 0
                  ).toLocaleString()}
                </span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Shopping Button */}
      <div className="mt-3 mb-2 text-center">
  <Link
    to="/product"
    className="inline-block rounded-lg bg-amber-500 px-6 py-3 font-medium text-white transition hover:bg-amber-600"
  >
    Continue Shopping
  </Link>
</div>

      <Footer />
    </>
  );
};

export default MyOrderDetails;