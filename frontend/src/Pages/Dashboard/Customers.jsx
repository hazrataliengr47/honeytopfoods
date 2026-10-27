import {
  Search,
  Users,
  UserPlus,
  ShoppingCart,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  X,
} from "lucide-react";

import { useState } from "react";

const Customers = () => {
  // ================= CUSTOMERS =================

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Ali Khan",
      email: "ali@gmail.com",
      phone: "0300-1234567",
      orders: 12,
      spent: 45800,
      status: "Active",
      address: "Peshawar, Pakistan",
    },
    {
      id: 2,
      name: "Ahmed Raza",
      email: "ahmed@gmail.com",
      phone: "0311-2345678",
      orders: 8,
      spent: 28400,
      status: "Active",
      address: "Islamabad, Pakistan",
    },
    {
      id: 3,
      name: "Usman Ali",
      email: "usman@gmail.com",
      phone: "0322-3456789",
      orders: 5,
      spent: 16200,
      status: "Active",
      address: "Nowshera, Pakistan",
    },
    {
      id: 4,
      name: "Bilal Ahmed",
      email: "bilal@gmail.com",
      phone: "0333-4567890",
      orders: 2,
      spent: 7200,
      status: "Inactive",
      address: "Lahore, Pakistan",
    },
    {
      id: 5,
      name: "Hassan Ali",
      email: "hassan@gmail.com",
      phone: "0344-5678901",
      orders: 15,
      spent: 62500,
      status: "Active",
      address: "Karachi, Pakistan",
    },
  ]);

  // ================= STATES =================

  const [search, setSearch] = useState("");

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

    const [showCustomerModal, setShowCustomerModal] =
  useState(false);

const [editingCustomer, setEditingCustomer] =
  useState(null);

const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
  status: "Active",
});

  // ================= SEARCH =================

  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(searchText) ||
      customer.email.toLowerCase().includes(searchText) ||
      customer.phone.includes(searchText)
    );
  });

  // ================= VIEW =================

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setShowViewModal(true);
  };

  // ================= DELETE =================

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setCustomers((prev) =>
      prev.filter(
        (customer) =>
          customer.id !== selectedCustomer.id
      )
    );

    setSelectedCustomer(null);
    setShowDeleteModal(false);
  };


  const handleFormChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};



const handleAddCustomer = (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.address
  ) {
    alert("Please fill all fields.");
    return;
  }

  // ================= EDIT =================

  if (editingCustomer) {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === editingCustomer.id
          ? {
              ...customer,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              status: formData.status,
            }
          : customer
      )
    );
  }

  // ================= ADD =================

  else {
    const newCustomer = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      orders: 0,
      spent: 0,
      status: formData.status,
    };

    setCustomers((prev) => [
      newCustomer,
      ...prev,
    ]);
  }

  resetCustomerForm();
};





const resetCustomerForm = () => {
  setFormData({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  });

  setEditingCustomer(null);
  setShowCustomerModal(false);
};


const handleEdit = (customer) => {
  setEditingCustomer(customer);

  setFormData({
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    status: customer.status,
  });

  setShowCustomerModal(true);
};
  return (
    <div className="w-full">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Customers
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your customers and their information
          </p>
        </div>

        <button
  onClick={() => {
    setEditingCustomer(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      status: "Active",
    });

    setShowCustomerModal(true);
  }}
  className="w-full lg:w-auto flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl font-semibold transition"
>
          <UserPlus size={19} />

          Add Customer
        </button>

      </div>

      {/* ================================================= */}
      {/* STATISTICS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* Total Customers */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Total Customers
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                {customers.length}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <Users size={21} />
            </div>

          </div>

          <p className="text-sm text-green-600 mt-4">
            +12.5% this month
          </p>

        </div>

        {/* Active */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Active Customers
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                {
                  customers.filter(
                    (customer) =>
                      customer.status === "Active"
                  ).length
                }
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <Users size={21} />
            </div>

          </div>

          <p className="text-sm text-green-600 mt-4">
            Currently active
          </p>

        </div>

        {/* Total Orders */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Total Orders
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                {customers.reduce(
                  (total, customer) =>
                    total + customer.orders,
                  0
                )}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShoppingCart size={21} />
            </div>

          </div>

          <p className="text-sm text-blue-600 mt-4">
            From all customers
          </p>

        </div>

        {/* Total Revenue */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Customer Revenue
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                Rs.{" "}
                {customers
                  .reduce(
                    (total, customer) =>
                      total + customer.spent,
                    0
                  )
                  .toLocaleString()}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <DollarSign size={21} />
            </div>

          </div>

          <p className="text-sm text-purple-600 mt-4">
            Total customer spending
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* SEARCH */}
      {/* ================================================= */}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-5 mb-6">

        <div className="relative">

          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
          />

        </div>

      </div>

      {/* ================================================= */}
      {/* CUSTOMER TABLE */}
      {/* ================================================= */}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 sm:p-6 border-b border-gray-200">

          <h2 className="text-xl font-bold text-gray-800">
            All Customers
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {filteredCustomers.length} customers found
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-gray-50">

              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">

                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Phone
                </th>

                <th className="px-6 py-4">
                  Orders
                </th>

                <th className="px-6 py-4">
                  Total Spent
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredCustomers.length > 0 ? (

                filteredCustomers.map((customer) => (

                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* Customer */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold shrink-0">
                          {customer.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <p className="font-semibold text-gray-800">
                            {customer.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            {customer.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Phone */}

                    <td className="px-6 py-4 text-gray-600">
                      {customer.phone}
                    </td>

                    {/* Orders */}

                    <td className="px-6 py-4">

                      <span className="font-semibold text-gray-800">
                        {customer.orders}
                      </span>

                    </td>

                    {/* Spent */}

                    <td className="px-6 py-4">

                      <span className="font-semibold text-gray-800">
                        Rs.{" "}
                        {customer.spent.toLocaleString()}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          customer.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {customer.status}
                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">

                      <div className="flex items-center justify-center gap-2">

                        {/* View */}

                        <button
                          onClick={() =>
                            handleView(customer)
                          }
                          title="View"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                          <Eye size={17} />
                        </button>

                        {/* Edit */}

                        <button
                           onClick={() => handleEdit(customer)}
                          title="Edit"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-yellow-50 hover:text-yellow-600 transition"
                        >
                          <Edit size={17} />
                        </button>

                        {/* Delete */}

                        <button
                          onClick={() =>
                            handleDeleteClick(customer)
                          }
                          title="Delete"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-500"
                  >
                    No customers found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================================================= */}
      {/* VIEW CUSTOMER MODAL */}
      {/* ================================================= */}

      {showViewModal && selectedCustomer && (

        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">

          <div
            onClick={() =>
              setShowViewModal(false)
            }
            className="absolute inset-0 bg-black/50"
          ></div>

          <div className="relative z-10 bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

            {/* Header */}

            <div className="flex items-center justify-between px-6 py-4 border-b">

              <div>

                <h2 className="text-xl font-bold text-gray-800">
                  Customer Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Customer information
                </p>

              </div>

              <button
                onClick={() =>
                  setShowViewModal(false)
                }
                className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"
              >
                <X size={20} />
              </button>

            </div>

            {/* Customer */}

            <div className="p-6">

              <div className="w-20 h-20 mx-auto rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-3xl font-bold">
                {selectedCustomer.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <h3 className="text-2xl font-bold text-center text-gray-800 mt-4">
                {selectedCustomer.name}
              </h3>

              <p className="text-center text-gray-500 mt-1">
                {selectedCustomer.email}
              </p>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between border-b pb-3 gap-5">

                  <span className="text-gray-500">
                    Phone
                  </span>

                  <span className="font-semibold text-gray-800">
                    {selectedCustomer.phone}
                  </span>

                </div>

                <div className="flex justify-between border-b pb-3 gap-5">

                  <span className="text-gray-500">
                    Orders
                  </span>

                  <span className="font-semibold text-gray-800">
                    {selectedCustomer.orders}
                  </span>

                </div>

                <div className="flex justify-between border-b pb-3 gap-5">

                  <span className="text-gray-500">
                    Total Spent
                  </span>

                  <span className="font-semibold text-gray-800">
                    Rs.{" "}
                    {selectedCustomer.spent.toLocaleString()}
                  </span>

                </div>

                <div className="flex justify-between border-b pb-3 gap-5">

                  <span className="text-gray-500">
                    Status
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedCustomer.status ===
                      "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {selectedCustomer.status}
                  </span>

                </div>

                <div>

                  <p className="text-gray-500 mb-2">
                    Address
                  </p>

                  <p className="text-gray-700">
                    {selectedCustomer.address}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setShowViewModal(false)
                }
                className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* DELETE MODAL */}
      {/* ================================================= */}

      {showDeleteModal && selectedCustomer && (

        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">

          <div
            onClick={() =>
              setShowDeleteModal(false)
            }
            className="absolute inset-0 bg-black/50"
          ></div>

          <div className="relative z-10 bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">

            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">

              <Trash2 size={25} />

            </div>

            <h2 className="text-xl font-bold text-center text-gray-800 mt-5">
              Delete Customer?
            </h2>

            <p className="text-center text-gray-500 mt-2">
              Are you sure you want to delete
              <span className="font-semibold text-gray-700">
                {" "}{selectedCustomer.name}
              </span>
              ?
            </p>

            <p className="text-center text-sm text-red-500 mt-2">
              This action cannot be undone.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">

              <button
                onClick={() =>
                  setShowDeleteModal(false)
                }
                className="py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}





      {/* ================================================= */}
{/* ADD / EDIT CUSTOMER MODAL */}
{/* ================================================= */}

{showCustomerModal && (

  <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">

    {/* Overlay */}

    <div
      onClick={resetCustomerForm}
      className="absolute inset-0 bg-black/50"
    ></div>

    {/* Modal */}

    <div className="relative z-10 bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b">

        <div>

          <h2 className="text-xl font-bold text-gray-800">

            {editingCustomer
              ? "Edit Customer"
              : "Add New Customer"}

          </h2>

          <p className="text-sm text-gray-500 mt-1">

            {editingCustomer
              ? "Update customer information"
              : "Add a new customer to your store"}

          </p>

        </div>

        <button
          onClick={resetCustomerForm}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          <X size={20} />
        </button>

      </div>

      {/* Form */}

      <form
        onSubmit={handleAddCustomer}
        className="p-6"
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Name */}

          <div className="sm:col-span-2">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Enter customer name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
            />

          </div>

          {/* Email */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="customer@gmail.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
            />

          </div>

          {/* Phone */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              placeholder="0300-1234567"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
            />

          </div>

          {/* Address */}

          <div className="sm:col-span-2">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              rows="3"
              placeholder="Enter customer address"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
            ></textarea>

          </div>

          {/* Status */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
            >

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7">

          <button
            type="button"
            onClick={resetCustomerForm}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
          >

            {editingCustomer
              ? "Update Customer"
              : "Add Customer"}

          </button>

        </div>

      </form>

    </div>

  </div>

)}
    </div>
  );
};

export default Customers;