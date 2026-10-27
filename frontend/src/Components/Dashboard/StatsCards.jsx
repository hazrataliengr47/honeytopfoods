import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "Rs. 144,500",
      change: "+12.5%",
      text: "from last month",
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      positive: true,
    },
    {
      title: "Total Orders",
      value: "1,248",
      change: "+8.2%",
      text: "from last month",
      icon: ShoppingCart,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      positive: true,
    },
    {
      title: "Customers",
      value: "3,842",
      change: "+15.4%",
      text: "from last month",
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      positive: true,
    },
    {
      title: "Products",
      value: "156",
      change: "-2.4%",
      text: "from last month",
      icon: Package,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      positive: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Top */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
                  {stat.value}
                </h2>
              </div>

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center`}
              >
                <Icon size={24} />
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center gap-2 mt-5">
              <span
                className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.positive ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}

                {stat.change}
              </span>

              <span className="text-sm text-gray-400">
                {stat.text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;