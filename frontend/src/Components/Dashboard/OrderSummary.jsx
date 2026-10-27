import {
  CheckCircle,
  Clock,
  PackageCheck,
  XCircle,
} from "lucide-react";

const OrderSummary = () => {
  const orders = [
    {
      title: "Delivered",
      count: 856,
      percentage: 69,
      icon: CheckCircle,
      bg: "bg-green-100",
      color: "text-green-600",
      bar: "bg-green-500",
    },
    {
      title: "Processing",
      count: 344,
      percentage: 28,
      icon: PackageCheck,
      bg: "bg-blue-100",
      color: "text-blue-600",
      bar: "bg-blue-500",
    },
    {
      title: "Pending",
      count: 48,
      percentage: 4,
      icon: Clock,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
      bar: "bg-yellow-500",
    },
    {
      title: "Cancelled",
      count: 12,
      percentage: 1,
      icon: XCircle,
      bg: "bg-red-100",
      color: "text-red-600",
      bar: "bg-red-500",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Order Summary
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Overview of your order status
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">
            Total
          </p>

          <p className="text-2xl font-bold text-gray-800">
            1,260
          </p>
        </div>
      </div>

      {/* Orders */}
      <div className="mt-7 space-y-6">

        {orders.map((order) => {
          const Icon = order.icon;

          return (
            <div key={order.title}>

              {/* Top */}
              <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div
                    className={`w-10 h-10 rounded-xl ${order.bg} ${order.color} flex items-center justify-center`}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {order.title}
                    </p>

                    <p className="text-xs text-gray-500">
                      {order.count} orders
                    </p>
                  </div>

                </div>

                <span className="font-semibold text-gray-700">
                  {order.percentage}%
                </span>

              </div>

              {/* Progress */}
              <div className="mt-3 w-full h-2 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className={`h-full ${order.bar} rounded-full transition-all duration-500`}
                  style={{
                    width: `${order.percentage}%`,
                  }}
                ></div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default OrderSummary;