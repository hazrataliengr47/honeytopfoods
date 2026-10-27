import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const DashboardHeader = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search orders, products..."
            className="w-full bg-gray-100 border border-transparent rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:bg-white focus:border-yellow-400 transition"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Notification */}
          <button className="relative w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-100 transition">
            <Bell size={21} className="text-gray-600" />

            {/* Notification Dot */}
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Profile */}
          <div className="relative">

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 transition"
            >

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                A
              </div>

              {/* Name */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-800">
                  Admin
                </p>

                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={18}
                className={`hidden sm:block text-gray-500 transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />

            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-14 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">

                <div className="px-4 py-3 border-b">
                  <p className="font-semibold text-gray-800">
                    Admin
                  </p>

                  <p className="text-sm text-gray-500">
                    admin@gmail.com
                  </p>
                </div>

                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                  <User size={18} />
                  My Profile
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings size={18} />
                  Settings
                </button>

                <div className="border-t my-1"></div>

                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50">
                  <LogOut size={18} />
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </header>
  );
};

export default DashboardHeader;