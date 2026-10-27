
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Package, ShoppingBag } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 text-center shadow-lg sm:p-10">

        <div className="mb-5 flex justify-center">
          <CheckCircle
            size={76}
            className="text-green-500"
            strokeWidth={1.5}
          />
        </div>

        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-yellow-600">
          HONEYTOP FOODS
        </p>

        <h1 className="text-3xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 leading-7 text-gray-600">
          Thank you for shopping with HoneyTop Foods.
          Your order has been received successfully.
          We will contact you regarding delivery.
        </p>

        <div className="mt-8 rounded-xl border border-green-100 bg-green-50 p-5 text-left">
          <div className="mb-4 flex items-center gap-3">
            <Package className="text-green-600" size={25} />
            <h2 className="text-lg font-bold text-gray-900">
              Order Details
            </h2>
          </div>

          {order ? (
            <>
              <p className="mb-3 text-sm text-gray-600">
                <span className="font-semibold text-gray-800">
                  Customer:
                </span>{" "}
                {order.customer}
              </p>

              <div className="space-y-3 border-t border-green-200 pt-4">
                {order.products?.map((item, index) => (
                  <div
                    key={item.productId || index}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={
  item.image
    ? item.image.startsWith("http")
      ? item.image
      : `http://localhost:5000${item.image.startsWith("/") ? "" : "/"}${item.image}`
    : "/images/honey1.png"
}
                      alt={item.name}
                      className="h-14 w-14 rounded-lg border border-gray-200 bg-white object-contain"
                    />

                    <div className="min-w-0 flex-1 text-left">
                      <p className="font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Rs. {Number(item.price).toLocaleString()} ×{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm font-bold text-gray-800">
                      Rs. {Number(item.lineTotal).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2 border-t border-green-200 pt-4 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-gray-600">Shipping Charges</span>
                  <span>
                    Rs. {Number(order.shippingCharges || 0).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-base font-bold">
                  <span>Grand Total</span>
                  <span className="text-green-700">
                    Rs. {Number(
                      order.totalAmount ?? order.amount ?? 0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-600">
              Your order was submitted. Thank you for your purchase!
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-gray-900 transition hover:bg-yellow-600"
          >
            <ShoppingBag size={19} />
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
