import { Link } from "react-router-dom"
const Sidebar = () => {
  return (
    <div > 
       {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r">
        <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-yellow-600">
          HoneyTop
        </h1>
        <p className="text-sm text-gray-500">
          Admin Dashboard
        </p>
        </div>

        <nav className="p-6 ">
          <Link 
          to="/dashboard"
          className="block w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-100 hover:text-yellow-700 font-semibold">
      Dashboard
    </Link>

    <Link 
    to="/dashboard/order"
    className="block w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-100 hover:text-yellow-700 font-semibold mt-2">
      Orders
    </Link>

    <Link 
    to="/dashboard/products"
    className="block w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-100 hover:text-yellow-700 font-semibold mt-2">
      Products
    </Link>

    <Link 
    to="/dashboard/customers"
    className="block w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-100 hover:text-yellow-700 font-semibold mt-2">
      Customers
    </Link>

    <Link 
    to="/dashboard/shipping-charges"
      className="block w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-100 hover:text-yellow-700 font-semibold mt-2">
      Shipping Charges
    </Link>

    <Link 
    to="/dashboard/settings"
    className="block w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-100 hover:text-yellow-700 font-semibold mt-2">
      Settings
    </Link>
    
    <Link 
    to="/dashboard/logout"
    className="block w-full text-left px-4 py-3 rounded-lg  hover:bg-yellow-100 hover:text-yellow-700 font-semibold mt-2">
      Logout
    </Link>
        </nav>
      </aside>
    </div>
  )
}

export default Sidebar
