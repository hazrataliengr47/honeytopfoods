import { TrendingUp } from "lucide-react";

const TopProducts = () => {
  const products = [
    {
      name: "Premium Sidr Honey",
      category: "Sidr Honey",
      sold: 245,
      revenue: "Rs. 856,755",
      progress: 95,
    },
    {
      name: "Wild Sidr Honey",
      category: "Wild Honey",
      sold: 198,
      revenue: "Rs. 692,802",
      progress: 80,
    },
    {
      name: "Wildflower Honey",
      category: "Natural Honey",
      sold: 176,
      revenue: "Rs. 272,800",
      progress: 70,
    },
    {
      name: "Natural Honey",
      category: "Natural Honey",
      sold: 156,
      revenue: "Rs. 343,200",
      progress: 62,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Top Selling Products
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Best performing products
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
          <TrendingUp size={20} />
        </div>

      </div>

      {/* Products */}
      <div className="mt-7 space-y-6">

        {products.map((product, index) => (

          <div key={product.name}>

            <div className="flex items-center gap-3">

              {/* Number */}
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                {index + 1}
              </div>

              {/* Product */}
              <div className="flex-1 min-w-0">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">

                  <div>
                    <p className="font-semibold text-gray-800 truncate">
                      {product.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {product.category}
                    </p>
                  </div>

                  <div className="sm:text-right">

                    <p className="text-sm font-semibold text-gray-800">
                      {product.sold} sold
                    </p>

                    <p className="text-xs text-gray-400">
                      {product.revenue}
                    </p>

                  </div>

                </div>

                {/* Progress */}
                <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${product.progress}%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default TopProducts;