import  {useEffect, useState } from "react";

const ShippingCharges = () => {
  const [shippingType, setShippingType] = useState("free");
  const [shippingAmount, setShippingAmount] = useState("");

  useEffect(() => {
  const fetchShippingSettings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/shipping-settings"
      );

      const data = await response.json();

      if (data.success) {
        setShippingType(data.data.shippingType);
        setShippingAmount(data.data.shippingAmount);
      }
    } catch (error) {
      console.error("Error fetching shipping settings:", error);
    }
  };

  fetchShippingSettings();
}, []);

  const handleSave = async () => {
  if (
    shippingType === "manual" &&
    (!shippingAmount || Number(shippingAmount) < 0)
  ) {
    alert("Please enter a valid shipping amount.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/shipping-settings",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingType,
          shippingAmount:
            shippingType === "free"
              ? 0
              : Number(shippingAmount),
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Shipping settings saved successfully!");
    } else {
      alert(data.message || "Failed to save shipping settings.");
    }
  } catch (error) {
    console.error("Error saving shipping settings:", error);
    alert("Server error. Please try again.");
  }
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Shipping Charges
      </h1>

      <p className="text-gray-500 mt-1">
        Choose how shipping charges should be applied to orders.
      </p>

      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 max-w-xl">
        {/* Free Shipping */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="shippingType"
            value="free"
            checked={shippingType === "free"}
            onChange={() => setShippingType("free")}
            className="w-4 h-4"
          />

          <span className="text-gray-700 font-medium">
            Free Shipping
          </span>
        </label>

        {/* Manual Shipping */}
        <label className="flex items-center gap-3 cursor-pointer mt-5">
          <input
            type="radio"
            name="shippingType"
            value="manual"
            checked={shippingType === "manual"}
            onChange={() => setShippingType("manual")}
            className="w-4 h-4"
          />

          <span className="text-gray-700 font-medium">
            Manual Shipping
          </span>
        </label>

        {/* Manual Amount */}
        {shippingType === "manual" && (
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Shipping Amount
            </label>

            <input
              type="number"
              min="0"
              value={shippingAmount}
              onChange={(e) => setShippingAmount(e.target.value)}
              placeholder="Enter shipping amount"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleSave}
          className="mt-6 px-5 py-3 rounded-xl bg-yellow-500 text-white font-semibold hover:bg-yellow-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ShippingCharges;