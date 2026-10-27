import {
  AlertTriangle,
  Package,
  Plus,
} from "lucide-react";

const LowStock = () => {
  const products = [
    {
      name: "Premium Sidr Honey",
      sku: "SIDR-1000",
      stock: 5,
      status: "Low Stock",
    },
    {
      name: "Wildflower Honey",
      sku: "WILD-1000",
      stock: 8,
      status: "Low Stock",
    },
    {
      name: "Natural Honey",
      sku: "NAT-500",
      stock: 3,
      status: "Critical",
    },
    {
      name: "Wild Sidr Honey",
      sku: "WS-1000",
      stock: 12,
      status: "Low Stock",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Low Stock Products
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Products that need attention
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
          <AlertTriangle size={20} />
        </div>

      </div>

      {/* Products */}
      <div className="mt-7 space-y-4">

        {products.map((product) => (

          <div
            key={product.sku}
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
          >

            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500">
              <Package size={19} />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">

              <p className="font-semibold text-gray-800 truncate">
                {product.name}
              </p>

              <p className="text-xs text-gray-400 mt-0.5">
                SKU: {product.sku}
              </p>

            </div>

            {/* Stock */}
            <div className="text-right">

              <p
                className={`font-bold ${
                  product.stock <= 3
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {product.stock}
              </p>

              <p className="text-xs text-gray-400">
                units
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Add Stock Button */}
      <button className="w-full mt-6 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold transition">

        <Plus size={18} />

        Add Stock

      </button>

    </div>
  );
};

export default LowStock;