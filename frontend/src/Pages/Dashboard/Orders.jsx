import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Orders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("All");
    const [editingOrder, setEditingOrder] = useState(null);
    // const [showNewOrder, setShowNewOrder] = useState(false);
    const [orders, setOrders] = useState([]);
//     const [newOrder, setNewOrder] = useState({
//   customer: "",
//   email: "",
//    mobile: "",
//   address: "",
//   product: "",
//     amount: "Rs." +" ",
//   status: "Pending",
// });
    


useEffect(() => {
  fetch("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
  .then((res) => res.json())
  .then((data) => {
  console.log("Orders from backend:", data);
  setOrders(
  data.data.map((order) => ({
    ...order,
    id: order.orderNumber || order._id,
  }))
);
})
  .catch((error) => {
    console.error("Error fetching orders:", error);
  });
 }, []);

const filterByDate = (order) => {
  if (dateFilter === "All") {
    return true;
  }

  const orderDate = order.date.split("T")[0];

  const today = new Date();

  const todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const yesterdayString = `${yesterday.getFullYear()}-${String(
    yesterday.getMonth() + 1
  ).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

  if (dateFilter === "Today") {
    return orderDate === todayString;
  }

  if (dateFilter === "Yesterday") {
    return orderDate === yesterdayString;
  }

  if (
    dateFilter === "Last 7 Days" ||
    dateFilter === "Last 30 Days"
  ) {
    const days =
      dateFilter === "Last 7 Days" ? 7 : 30;

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days);

    const startDateString = `${startDate.getFullYear()}-${String(
      startDate.getMonth() + 1
    ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;

    return (
      orderDate >= startDateString &&
      orderDate <= todayString
    );
  }

  return true;
};
  return (
    <div >
      {/* Heading */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your customer orders here.
        </p>
      </div>
      <Link
    to={`/dashboard/order/new`}
    className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-lg font-semibold"
  >
    + Add New Order
  </Link>


      </div>


        
        <div className="mb-4 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by customer, product or order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-96 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-52 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full sm:w-52 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="All">All Dates</option>
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>

             {/* Clear Filters */}
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setDateFilter("All");
              }}
              className="px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Clear Filters
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-3">
            {(() => {
              const count = orders
                .filter((order) =>
                  `${order.id} ${order.customer} ${order.product}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .filter((order) =>
                  statusFilter === "All"
                    ? true
                    : order.status === statusFilter
                )
                .filter(filterByDate).length;

              return `${count} ${count === 1 ? "Order" : "Orders"} Found`;
            })()}
          </p>


    {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full">

        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[700px]">

            {/* Table Header */}
            <thead className="bg-gray-50 border-b">

              <tr className="text-left text-sm text-gray-600">

                <th className="px-6 py-4">
                  Order ID
                </th>

                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Product
                </th>

                <th className="px-6 py-4">
                  Quantity
                </th>

                <th className="px-6 py-4">
                  Amount
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                    Action
                </th>

              </tr>

            </thead>

            {/* Table Body */}
            <tbody className="divide-y">

             {orders
              .filter((order) =>
                `${order.id} ${order.customer} ${order.product}`
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .filter((order) =>
                statusFilter === "All"
                  ? true
                  : order.status === statusFilter
              )
              .filter(filterByDate)
              .length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-8 text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders
                  .filter((order) =>
                    `${order.id} ${order.customer} ${order.product}`
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .filter((order) =>
                    statusFilter === "All"
                      ? true
                      : order.status === statusFilter
                  )
                  .filter(filterByDate)
                  .map((order) => (
                <tr
                key={String(order.id)}
                  className="hover:bg-gray-50"
                >

                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {order.id}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {order.customer}
                  </td>

                   {/* show multiple products */}
                   {/* <td>
                    {order.product}
                   </td> */}
                  
<td className="px-6 py-4 text-gray-600">
  {order.products && order.products.length > 0 ? (
    <div className="space-y-2 min-w-[220px]">
      {order.products.map((item, index) => (
        <div key={item._id || item.productId || index}>
          <p className="font-medium text-gray-800">
            {item.name}
          </p>

          <p className="text-xs text-gray-500">
            Rs. {Number(item.price).toLocaleString()} ×{" "}
            {item.quantity} = Rs.{" "}
            {Number(item.lineTotal).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <span>{order.product}</span>
  )}
</td>

                  <td className="px-6 py-4 text-gray-600">
                    {order.quantity || 1}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-800">
                    Rs. {Number(order.amount).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
  {order.date
    ? new Date(
        order.date.split("T")[0] + "T12:00:00"
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""}
</td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Shipped"
                            ? "bg-purple-100 text-purple-700"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2">

                        <Link
                        to={`/dashboard/order/review/${String(order.id).replace("#", "")}`}
                        state={{ order }}
                        className="px-3 py-1 rounded-lg bg-blue-100 text-blue-600 text-sm hover:bg-blue-200"
                        >
                        Review
                        </Link>



                        
                        {/*   this is for edit button
                        <button
                        onClick={() => setEditingOrder(order)}
                        className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-600 text-sm hover:bg-yellow-200"
                        >
                        Edit
                        </button> */}


                          
                        {/* this is for delete order
                         <button
                            onClick={() => {
                                const confirmDelete = window.confirm(
                                    `Are you sure you want to delete order ${order.id}?`
                                );
                                if(confirmDelete){
                                    deleteOrder(order.id);
                                }
                            }}
                            className="px-3 py-1 rounded-lg bg-red-100 text-red-600 text-sm hover:bg-red-200"
                            >
                            Delete
                        </button> */}

                    </div>

                    </td>

                </tr>
              ))
            )}

            </tbody>
            </table>
        </div>
        </div>

        {selectedOrder && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

    <div className="bg-white w-full max-w-md rounded-2xl p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-bold text-gray-800">
          Order Details
        </h2>

        <button
          onClick={() => setSelectedOrder(null)}
          className="text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

      </div>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-gray-500">
            Order ID
          </p>

          <p className="font-semibold">
            {selectedOrder.id}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Customer
          </p>

          <p className="font-semibold">
            {selectedOrder.customer}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Product
          </p>

          <p className="font-semibold">
            {selectedOrder.product}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Amount
          </p>

          <p className="font-semibold">
            {selectedOrder.amount}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <p className="font-semibold">
            {selectedOrder.status}
          </p>
        </div>

      </div>

      <button
        onClick={() => setSelectedOrder(null)}
        className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
      >
        Close
      </button>

    </div>
    </div>
        )}

    {/* Editing orders */}

    {editingOrder && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

    <div className="bg-white w-full max-w-md rounded-2xl p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-bold text-gray-800">
          Edit Order
        </h2>

        <button
          onClick={() => setEditingOrder(null)}
          className="text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

      </div>

      <div className="space-y-4">

        {/* Customer */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Customer
          </label>

          <input
            type="text"
            value={editingOrder.customer}
            onChange={(e) =>
              setEditingOrder({
                ...editingOrder,
                customer: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Product */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Product
          </label>

          <input
            type="text"
            value={editingOrder.product}
            onChange={(e) =>
              setEditingOrder({
                ...editingOrder,
                product: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Amount
          </label>

          <input
            type="text"
            value={editingOrder.amount}
            onChange={(e) =>
              setEditingOrder({
                ...editingOrder,
                amount: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Status
          </label>

          <select
            value={editingOrder.status}
            onChange={(e) =>
              setEditingOrder({
                ...editingOrder,
                status: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">

        <button
          onClick={() => setEditingOrder(null)}
          className="flex-1 border border-gray-300 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setOrders(
              orders.map((order) =>
                order.id === editingOrder.id
                  ? editingOrder
                  : order
              )
            );

            setEditingOrder(null);
          }}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold"
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}
   


    </div>


  )
}

export default Orders
