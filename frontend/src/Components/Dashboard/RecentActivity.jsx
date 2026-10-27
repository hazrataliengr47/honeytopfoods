import {
  ShoppingCart,
  UserPlus,
  Package,
  CheckCircle,
} from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      icon: ShoppingCart,
      title: "New order received",
      description: "Order #1006 was placed by Hassan Ali",
      time: "5 minutes ago",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      icon: UserPlus,
      title: "New customer registered",
      description: "Muhammad Usman created an account",
      time: "32 minutes ago",
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      icon: Package,
      title: "Product stock updated",
      description: "Premium Sidr Honey stock was updated",
      time: "1 hour ago",
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      icon: CheckCircle,
      title: "Order delivered",
      description: "Order #1001 was successfully delivered",
      time: "2 hours ago",
      bg: "bg-green-100",
      color: "text-green-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Recent Activity
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Latest activity in your store
        </p>
      </div>

      {/* Activity List */}
      <div className="mt-6">

        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className={`flex gap-4 py-4 ${
                index !== activities.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >

              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl ${activity.bg} ${activity.color} flex items-center justify-center shrink-0`}
              >
                <Icon size={19} />
              </div>

              {/* Content */}
              <div className="min-w-0">

                <p className="font-semibold text-gray-800">
                  {activity.title}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {activity.description}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {activity.time}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default RecentActivity;