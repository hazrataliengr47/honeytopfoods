import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const SaleChart = () => {
  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 18000 },
    { month: "Mar", sales: 15000 },
    { month: "Apr", sales: 23000 },
    { month: "May", sales: 19000 },
    { month: "Jun", sales: 28000 },
    { month: "Jul", sales: 25000 },
    { month: "Aug", sales: 32000 },
    { month: "Sep", sales: 29000 },
    { month: "Oct", sales: 36000 },
    { month: "Nov", sales: 33000 },
    { month: "Dec", sales: 42000 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Sales Overview
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Track your sales performance throughout the year
          </p>
        </div>

        {/* Year Selector */}
        <select
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white outline-none focus:border-yellow-500"
        >
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
        </select>

      </div>

      {/* Total */}
      <div className="mt-6">

        <p className="text-sm text-gray-500">
          Total Sales
        </p>

        <div className="flex items-center gap-3 mt-1">

          <h3 className="text-3xl font-bold text-gray-800">
            Rs. 312,000
          </h3>

          <span className="text-sm font-semibold text-green-600">
            +12.5%
          </span>

        </div>

      </div>

      {/* Chart */}
      <div className="w-full h-[320px] mt-6">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={salesData}>

            <defs>
              <linearGradient
                id="salesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopOpacity={0.3}
                />

                <stop
                  offset="100%"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => [
                `Rs. ${value.toLocaleString()}`,
                "Sales",
              ]}
              labelStyle={{
                fontWeight: "600",
              }}
            />

            <Area
              type="monotone"
              dataKey="sales"
              strokeWidth={3}
              fill="url(#salesGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default SaleChart;