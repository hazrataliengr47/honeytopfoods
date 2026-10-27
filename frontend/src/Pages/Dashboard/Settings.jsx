import { useState } from "react";

import {
  User,
  Store,
  Bell,
  Lock,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";

const Settings = () => {

  // ================= TAB =================

  const [activeTab, setActiveTab] = useState("profile");

  // ================= PROFILE =================

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@gmail.com",
    phone: "0300-1234567",
    role: "Administrator",
  });

  // ================= STORE =================

  const [store, setStore] = useState({
    name: "HoneyTop Foods",
    email: "info@honeytopfoods.com",
    phone: "0300-1234567",
    address: "Peshawar, Pakistan",
    currency: "PKR",
  });

  // ================= NOTIFICATIONS =================

  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    newCustomers: true,
    lowStock: true,
    marketing: false,
  });

  // ================= PASSWORD =================

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ================= MESSAGE =================

  const [saved, setSaved] = useState(false);

  // ================= PROFILE CHANGE =================

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= STORE CHANGE =================

  const handleStoreChange = (e) => {
    const { name, value } = e.target;

    setStore((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= PASSWORD CHANGE =================

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SAVE =================

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="w-full">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your dashboard and store settings
        </p>

      </div>

      {/* ================================================= */}
      {/* SUCCESS MESSAGE */}
      {/* ================================================= */}

      {saved && (

        <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl">

          <CheckCircle size={20} />

          <p className="font-medium">
            Settings saved successfully.
          </p>

        </div>

      )}

      {/* ================================================= */}
      {/* SETTINGS LAYOUT */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">

        {/* ================================================= */}
        {/* SIDEBAR */}
        {/* ================================================= */}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-3 h-fit">

          {/* Profile */}

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
              activeTab === "profile"
                ? "bg-yellow-100 text-yellow-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >

            <User size={19} />

            <span className="font-medium">
              Profile
            </span>

          </button>

          {/* Store */}

          <button
            onClick={() => setActiveTab("store")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
              activeTab === "store"
                ? "bg-yellow-100 text-yellow-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >

            <Store size={19} />

            <span className="font-medium">
              Store
            </span>

          </button>

          {/* Notifications */}

          <button
            onClick={() =>
              setActiveTab("notifications")
            }
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
              activeTab === "notifications"
                ? "bg-yellow-100 text-yellow-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >

            <Bell size={19} />

            <span className="font-medium">
              Notifications
            </span>

          </button>

          {/* Security */}

          <button
            onClick={() =>
              setActiveTab("security")
            }
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
              activeTab === "security"
                ? "bg-yellow-100 text-yellow-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >

            <Lock size={19} />

            <span className="font-medium">
              Security
            </span>

          </button>

        </div>

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">

          {/* ================================================= */}
          {/* PROFILE */}
          {/* ================================================= */}

          {activeTab === "profile" && (

            <div>

              <div className="px-6 py-5 border-b">

                <h2 className="text-xl font-bold text-gray-800">
                  Profile Settings
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update your administrator information
                </p>

              </div>

              <div className="p-6">

                {/* Avatar */}

                <div className="flex items-center gap-4 mb-8">

                  <div className="w-20 h-20 rounded-full bg-yellow-500 text-white flex items-center justify-center text-3xl font-bold">
                    A
                  </div>

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      Administrator
                    </h3>

                    <p className="text-sm text-gray-500">
                      Admin account
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Name */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
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
                      value={profile.email}
                      onChange={handleProfileChange}
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
                      value={profile.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                    />

                  </div>

                  {/* Role */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Role
                    </label>

                    <input
                      type="text"
                      name="role"
                      value={profile.role}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                    />

                  </div>

                </div>

                <div className="flex justify-end mt-7">

                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >

                    <Save size={18} />

                    Save Changes

                  </button>

                </div>

              </div>

            </div>

          )}

          {/* ================================================= */}
          {/* STORE */}
          {/* ================================================= */}

          {activeTab === "store" && (

            <div>

              <div className="px-6 py-5 border-b">

                <h2 className="text-xl font-bold text-gray-800">
                  Store Settings
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Manage your store information
                </p>

              </div>

              <div className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Store Name */}

                  <div className="md:col-span-2">

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Store Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={store.name}
                      onChange={handleStoreChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                    />

                  </div>

                  {/* Email */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Store Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={store.email}
                      onChange={handleStoreChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                    />

                  </div>

                  {/* Phone */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Store Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={store.phone}
                      onChange={handleStoreChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                    />

                  </div>

                  {/* Address */}

                  <div className="md:col-span-2">

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Store Address
                    </label>

                    <textarea
                      name="address"
                      value={store.address}
                      onChange={handleStoreChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                    ></textarea>

                  </div>

                  {/* Currency */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Currency
                    </label>

                    <select
                      name="currency"
                      value={store.currency}
                      onChange={handleStoreChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
                    >

                      <option value="PKR">
                        PKR - Pakistani Rupee
                      </option>

                      <option value="USD">
                        USD - US Dollar
                      </option>

                    </select>

                  </div>

                </div>

                <div className="flex justify-end mt-7">

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >

                    <Save size={18} />

                    Save Changes

                  </button>

                </div>

              </div>

            </div>

          )}

          {/* ================================================= */}
          {/* NOTIFICATIONS */}
          {/* ================================================= */}

          {activeTab === "notifications" && (

            <div>

              <div className="px-6 py-5 border-b">

                <h2 className="text-xl font-bold text-gray-800">
                  Notification Settings
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Choose which notifications you want to receive
                </p>

              </div>

              <div className="p-6 space-y-1">

                {/* New Orders */}

                <div className="flex items-center justify-between gap-5 py-5 border-b">

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      New Orders
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Get notified when a new order is placed
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        newOrders:
                          !prev.newOrders,
                      }))
                    }
                    className={`relative w-12 h-6 rounded-full transition ${
                      notifications.newOrders
                        ? "bg-yellow-500"
                        : "bg-gray-300"
                    }`}
                  >

                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                        notifications.newOrders
                          ? "left-7"
                          : "left-1"
                      }`}
                    ></span>

                  </button>

                </div>

                {/* Order Updates */}

                <div className="flex items-center justify-between gap-5 py-5 border-b">

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      Order Updates
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Receive updates about order status
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        orderUpdates:
                          !prev.orderUpdates,
                      }))
                    }
                    className={`relative w-12 h-6 rounded-full transition ${
                      notifications.orderUpdates
                        ? "bg-yellow-500"
                        : "bg-gray-300"
                    }`}
                  >

                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                        notifications.orderUpdates
                          ? "left-7"
                          : "left-1"
                      }`}
                    ></span>

                  </button>

                </div>

                {/* New Customers */}

                <div className="flex items-center justify-between gap-5 py-5 border-b">

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      New Customers
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Get notified when a new customer registers
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        newCustomers:
                          !prev.newCustomers,
                      }))
                    }
                    className={`relative w-12 h-6 rounded-full transition ${
                      notifications.newCustomers
                        ? "bg-yellow-500"
                        : "bg-gray-300"
                    }`}
                  >

                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                        notifications.newCustomers
                          ? "left-7"
                          : "left-1"
                      }`}
                    ></span>

                  </button>

                </div>

                {/* Low Stock */}

                <div className="flex items-center justify-between gap-5 py-5 border-b">

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      Low Stock Alerts
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Get notified when products are running low
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        lowStock:
                          !prev.lowStock,
                      }))
                    }
                    className={`relative w-12 h-6 rounded-full transition ${
                      notifications.lowStock
                        ? "bg-yellow-500"
                        : "bg-gray-300"
                    }`}
                  >

                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                        notifications.lowStock
                          ? "left-7"
                          : "left-1"
                      }`}
                    ></span>

                  </button>

                </div>

                {/* Marketing */}

                <div className="flex items-center justify-between gap-5 py-5">

                  <div>

                    <h3 className="font-semibold text-gray-800">
                      Marketing Emails
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Receive promotional and marketing emails
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        marketing:
                          !prev.marketing,
                      }))
                    }
                    className={`relative w-12 h-6 rounded-full transition ${
                      notifications.marketing
                        ? "bg-yellow-500"
                        : "bg-gray-300"
                    }`}
                  >

                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                        notifications.marketing
                          ? "left-7"
                          : "left-1"
                      }`}
                    ></span>

                  </button>

                </div>

                <div className="flex justify-end pt-5">

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold"
                  >

                    <Save size={18} />

                    Save Changes

                  </button>

                </div>

              </div>

            </div>

          )}

          {/* ================================================= */}
          {/* SECURITY */}
          {/* ================================================= */}

          {activeTab === "security" && (

            <div>

              <div className="px-6 py-5 border-b">

                <h2 className="text-xl font-bold text-gray-800">
                  Security
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Change your account password
                </p>

              </div>

              <div className="p-6 max-w-xl">

                {/* Current */}

                <div className="mb-5">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showCurrent
                          ? "text"
                          : "password"
                      }
                      name="current"
                      value={passwords.current}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl outline-none focus:border-yellow-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrent(
                          !showCurrent
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >

                      {showCurrent ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}

                    </button>

                  </div>

                </div>

                {/* New */}

                <div className="mb-5">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showNew
                          ? "text"
                          : "password"
                      }
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl outline-none focus:border-yellow-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNew(!showNew)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >

                      {showNew ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}

                    </button>

                  </div>

                </div>

                {/* Confirm */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm New Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showConfirm
                          ? "text"
                          : "password"
                      }
                      name="confirm"
                      value={passwords.confirm}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl outline-none focus:border-yellow-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirm(
                          !showConfirm
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >

                      {showConfirm ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}

                    </button>

                  </div>

                </div>

                <div className="flex justify-end mt-7">

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold"
                  >

                    <Save size={18} />

                    Update Password

                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Settings;