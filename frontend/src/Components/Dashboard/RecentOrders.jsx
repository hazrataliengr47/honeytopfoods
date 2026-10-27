import { Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const RecentOrders = () => {
  const orders = [
    {
      id: "#1001",
      customer: "Ali Khan",
      email: "ali@gmail.com",
      product: "Premium Sidr Honey",
      date: "17 Aug 2026",
      amount: "Rs. 3,499",
      status: "Delivered",
      avatar: "AK",
    },
    {
      id: "#1002",
      customer: "Ahmed Raza",
      email: "ahmed@gmail.com",
      product: "Wildflower Honey",
      date: "16 Aug 2026",
      amount: "Rs. 1,550",
      status: "Pending",
      avatar: "AR",
    },
    {
      id: "#1003",
      customer: "Usman Ali",
      email: "usman@gmail.com",
      product: "Natural Honey",
      date: "15 Aug 2026",
      amount: "Rs. 2,200",
      status: "Processing",
      avatar: "UA",
    },
    {
      id: "#1004",
      customer: "Bilal Ahmed",
      email: "bilal@gmail.com",
      product: "Sidr Honey",
      date: "14 Aug 2026",
      amount: "Rs. 4,200",
      status: "Delivered",
      avatar: "BA",
    },
    {
      id: "#1005",
      customer: "Hamza Khan",
      email: "hamza@gmail.com",
      product: "Wild Sidr Honey",
      date: "13 Aug 2026",
      amount: "Rs. 3,499",
      status: "Cancelled",
      avatar: "HK",
    },
  ];

  const statusStyle = {
    Delivered: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-8 overflow-hidden">

      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Recent Orders
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest orders from your customers
          </p>
        </div>

        <Link
          to="/dashboard/order"
          className="flex items-center justify-center gap-2 text-sm font-semibold text-yellow-600 hover:text-yellow-700 transition"
        >
          View All
          <ArrowRight size={17} />
        </Link>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead className="bg-gray-50">

            <tr className="text-left text-xs uppercase tracking-wide text-gray-500">

              <th className="px-5 sm:px-6 py-4">
                Order
              </th>

              <th className="px-5 sm:px-6 py-4">
                Customer
              </th>

              <th className="px-5 sm:px-6 py-4">
                Product
              </th>

              <th className="px-5 sm:px-6 py-4">
                Date
              </th>

              <th className="px-5 sm:px-6 py-4">
                Amount
              </th>

              <th className="px-5 sm:px-6 py-4">
                Status
              </th>

              <th className="px-5 sm:px-6 py-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {orders.map((order) => (

              <tr
                key={order.id}
                className="hover:bg-gray-50 transition"
              >

                {/* Order */}
                <td className="px-5 sm:px-6 py-4">

                  <span className="font-semibold text-gray-800">
                    {order.id}
                  </span>

                </td>

                {/* Customer */}
                <td className="px-5 sm:px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-semibold text-sm">
                      {order.avatar}
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {order.customer}
                      </p>

                      <p className="text-xs text-gray-400">
                        {order.email}
                      </p>
                    </div>

                  </div>

                </td>

                {/* Product */}
                <td className="px-5 sm:px-6 py-4">

                  <span className="text-gray-600">
                    {order.product}
                  </span>

                </td>

                {/* Date */}
                <td className="px-5 sm:px-6 py-4">

                  <span className="text-gray-500 text-sm">
                    {order.date}
                  </span>

                </td>

                {/* Amount */}
                <td className="px-5 sm:px-6 py-4">

                  <span className="font-semibold text-gray-800">
                    {order.amount}
                  </span>

                </td>

                {/* Status */}
                <td className="px-5 sm:px-6 py-4">

                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyle[order.status]
                    }`}
                  >
                    {order.status}
                  </span>

                </td>

                {/* Action */}
                <td className="px-5 sm:px-6 py-4 text-center">

                  <button
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 transition"
                    title="View Order"
                  >
                    <Eye size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default RecentOrders;