import Navbar from "../../Components/Navbar"
import Footer from "../../Components/Footer"
import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { UserRound, Package, LogOut } from "lucide-react";

const Myaccount = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Profile");
    const [formData, setFormData] = useState({
  name: "",
  email: "",
  mobile: "",
  address: "",
  apartment: "",
  city: "",
  postalCode: "",
});

const handleLogout = () => {
  localStorage.removeItem("customerToken");
  localStorage.removeItem("customer");

  window.dispatchEvent(new Event("customerLogin"));
  navigate("/customerlogin");
};

    useEffect(() =>{
        const fetchProfile=async () => {
            const token = localStorage.getItem("customerToken");

            if(!token){
                setMessage("please log in to view your account.");
                setLoading(false);
                return;
            }

            try{
                const response = await fetch(
                    "http://localhost:5000/api/profile",
                    {
                        headers:{
                            Authorization: `Bearer ${token}`,
                        }
                    }
                )
                const data= await response.json();
                if(!response.ok){
                    throw new Error (data.message || "Failed  to load  profile.");
                }
                setUser(data.user);
                setFormData({
                            name: data.user.name || "",
                            email: data.user.email || "",
                            mobile: data.user.mobile || "",
                            address: data.user.address || "",
                            apartment: data.user.apartment || "",
                            city: data.user.city || "",
                            postalCode: data.user.postalCode || "",
                            });
            }catch(error){
                setMessage(error.message || "Something went wrong")
            }finally{
                setLoading(false);
            }
        }
        fetchProfile();
    },[])

    const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSaveProfile = async (e) => {
  e.preventDefault();
  setMessage("");

  const token = localStorage.getItem("customerToken");

  try {
    const response = await fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        postalCode: formData.postalCode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile.");
    }

    setUser(data.user);
    setMessage("Profile updated successfully!");
  } catch (error) {
    setMessage(error.message || "Something went wrong.");
  }
};



return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />

    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">
        My Account
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to your HoneyTop Foods account.
      </p>

      {message && (
        <p className="mt-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          {message}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Sidebar */}
        {/* <aside className="h-fit rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("Profile")}
            className={`mb-2 w-full rounded-lg px-4 py-3 text-left text-sm transition ${
              activeTab === "Profile"
                ? "bg-amber-50 font-semibold text-amber-700"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Profile
          </button>

          <Link
            to="/myorders"
            className="mb-2 block rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-amber-50 hover:text-amber-700"
          >
            My Orders
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
          >
            Sign Out
          </button>
        </aside> */}

        
<aside className="h-fit rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
  <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
    Account Menu
  </p>

  <button
    type="button"
    onClick={() => setActiveTab("Profile")}
    className={`mb-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
      activeTab === "Profile"
        ? "bg-amber-50 font-semibold text-amber-700"
        : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    <UserRound size={18} />
    Profile
  </button>

  <Link
    to="/myorders"
    className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-600 transition hover:bg-amber-50 hover:text-amber-700"
  >
    <Package size={18} />
    My Orders
  </Link>

  <div className="my-3 border-t border-gray-100" />

  <button
    type="button"
    onClick={handleLogout}
    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
  >
    <LogOut size={18} />
    Sign Out
  </button>
</aside>


        {/* Main Content */}
        <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 md:col-span-3">
          {loading ? (
            <p className="py-6 text-gray-600">
              Loading your account...
            </p>
          ) : user ? (
            <>
              
<div className="mb-6 flex items-center gap-4 border-b border-gray-100 pb-6">
  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold uppercase text-amber-700">
    {formData.name?.trim()?.charAt(0) ||
      formData.email?.charAt(0) ||
      "U"}
  </div>

  <div className="min-w-0">
    <h2 className="truncate text-xl font-semibold text-gray-900">
      {formData.name || "Customer"}
    </h2>

    <p className="mt-1 truncate text-sm text-gray-500">
      {formData.email}
    </p>

    <p className="mt-2 text-xs font-medium text-amber-700">
      HoneyTop Foods Customer
    </p>
  </div>
</div>

<div className="mb-6">
  <h3 className="text-lg font-semibold text-gray-900">
    Personal Information
  </h3>

  <p className="mt-1 text-sm text-gray-500">
    Manage your personal details and contact information.
  </p>
</div>



<div className="mb-6 rounded-xl border border-amber-100 bg-amber-50/50 p-5">
  <div className="flex items-start justify-between gap-3">
    <div>
      <h3 className="font-semibold text-gray-900">
        Saved Delivery Address
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Your default address for future orders
      </p>
    </div>

    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-amber-700">
      Default
    </span>
  </div>

  <div className="mt-4 text-sm leading-6 text-gray-700">
    {formData.name && (
      <p className="font-medium">{formData.name}</p>
    )}

    {formData.address ? (
      <p>{formData.address}</p>
    ) : (
      <p className="text-gray-400">Street address not added</p>
    )}

    {formData.apartment && <p>{formData.apartment}</p>}

    {(formData.city || formData.postalCode) && (
      <p>
        {[formData.city, formData.postalCode]
          .filter(Boolean)
          .join(", ")}
      </p>
    )}

    {formData.mobile && <p>{formData.mobile}</p>}
  </div>

  <button
    type="button"
    onClick={() =>
      document.getElementById("delivery-address")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
    className="mt-4 text-sm font-semibold text-amber-700 hover:text-amber-800"
  >
    Edit Address
  </button>
</div>



              <form onSubmit={handleSaveProfile}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-3 text-sm text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-6">
                  <h3
                    id="delivery-address"
                    className="text-lg font-semibold text-gray-900"
                  >
                    Delivery Address
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Your saved address for future orders.
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Apartment / House Details
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Please log in
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Log in to view and manage your account.
              </p>
              <Link
                to="/customerlogin"
                className="mt-5 inline-block rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-600"
              >
                Customer Login
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>

    <Footer />
  </div>
);

}

export default Myaccount
