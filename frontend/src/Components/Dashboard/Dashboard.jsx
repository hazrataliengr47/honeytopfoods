import { Outlet } from "react-router-dom";
import Sidebar from "../../Pages/Dashboard/Sidebar";
import DashboardHeader from "./DashboardHeader";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 shrink-0">
      <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-x-hidden p-4 sm:p-6">
        <DashboardHeader />
        <Outlet />
      </main>

    </div>
  );
};

export default Dashboard;






