import {
  Plus,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "Add Product",
      description: "Create a new product",
      icon: Package,
      path: "/dashboard/products",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Add Order",
      description: "Create a new order",
      icon: ShoppingCart,
      path: "/dashboard/order",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Customers",
      description: "Manage customers",
      icon: Users,
      path: "/dashboard/customers",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Analytics",
      description: "View sales analytics",
      icon: BarChart3,
      path: "/dashboard/analytics",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Quick Actions
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Quickly access important features
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
          <Plus size={20} />
        </div>

      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.path}
              className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-yellow-300 hover:bg-yellow-50 transition"
            >

              <div
                className={`w-11 h-11 rounded-xl ${action.iconBg} ${action.iconColor} flex items-center justify-center shrink-0`}
              >
                <Icon size={21} />
              </div>

              <div className="min-w-0">
                <p className="font-semibold text-gray-800 group-hover:text-yellow-700">
                  {action.title}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {action.description}
                </p>
              </div>

            </Link>
          );
        })}

      </div>

    </div>
  );
};

export default QuickActions;