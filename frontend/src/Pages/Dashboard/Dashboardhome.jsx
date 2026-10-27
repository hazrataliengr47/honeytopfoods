import StatsCards from "../../Components/Dashboard/StatsCards";
import SaleChart from "../../Components/Dashboard/SaleChart";
import OrderSummary from "../../Components/Dashboard/OrderSummary";
import RecentOrders from "../../Components/Dashboard/RecentOrders";
import TopProducts from "../../Components/Dashboard/TopProducts";
import LowStock from "../../Components/Dashboard/LowStock";
import QuickActions from "../../Components/Dashboard/QuickActions";
import RecentActivity from "../../Components/Dashboard/RecentActivity";


const Dashboardhome = () => {
  return (
    <div className="mt-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back, admin
          </p>
        </div>

        

      </div>
      {/* Statistics */}
      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

      {/* Sales Analytics */}
      <div className="xl:col-span-2">
        <SaleChart />
      </div>

      {/* Order Summary */}
      <div>
        <OrderSummary />
      </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />

      {/* Products Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <TopProducts />

        <LowStock />

      </div>

      {/* Quick Actions & Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

          <QuickActions />

          <RecentActivity />

        </div>
    </div>
  );
};

export default Dashboardhome;