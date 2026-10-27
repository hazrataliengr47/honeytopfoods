import {Routes, Route} from 'react-router-dom'

import MyOrders from './Pages/Customer/MyOrders.jsx';
import OrderSuccess from "./Pages/OrderSuccess.jsx";
import Home from './Pages/Home'
import Products from './Pages/Products'
import Blog from './Pages/Blog'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Categories from './Pages/Categories'
import Profile from './Pages/Profile'
import Customerlogin from './Pages/Customer/customerLogin.jsx';
import Cart from './Pages/Cart'
import Favourite from './Pages/Favourite'
import Sidrhoney from './Pages/Sidrhoney'
import Naturalhoney from './Pages/Naturalhoney'
import Viewall from './Pages/Viewall'
import BlogDetail from './Pages/BlogDetail'
import ProductDetail from './Pages/Productdetail'
import ScrollToTop from './Pages/ScrollToTop.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import Login from './Pages/Login.jsx'
import Customers from './Pages/Dashboard/Customers.jsx'
import Checkout from './Pages/Checkout.jsx'
import Myaccount from './Pages/Customer/Myaccount.jsx';
import Myorderdetails from './Pages/Customer/MyOrdereDetails.jsx'


import Dashboard from './Components/Dashboard/Dashboard.jsx'
import Neworder from './Pages/Dashboard/Neworder.jsx'
import Dashboardhome from "./Pages/Dashboard/Dashboardhome.jsx";
import Orders from './Pages/Dashboard/Orders.jsx'
import DashboardProducts from "./Pages/Dashboard/DashboardProducts.jsx";
import Settings from "./Pages/Dashboard/Settings.jsx";
import Orderreview from './Pages/Dashboard/Orderreview.jsx';
import ShippingCharges from "./Pages/Dashboard/ShippingCharges.jsx";



function App() {



  return (
    <>
      <ScrollToTop />
    

    <main>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/product' element={<Products />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/about' element={<About />} />
      <Route path='/Contact' element={<Contact />} />
      <Route path='/category' element={<Categories />} />
      <Route path='/wp-admin' element={<Profile />} />
      <Route path='/customerlogin' element={<Customerlogin />}/>
      <Route path='/favourite' element={<Favourite />} />
      <Route path='/cart'  element={<Cart />} />
      <Route path='/sidr' element={<Sidrhoney />} />
      <Route path='/nature' element={<Naturalhoney />} />
      <Route path='/view' element={<Viewall />} />
      <Route path='/ordersuccess' element={<OrderSuccess />} />
      <Route path='/blog/blogdetail' element={<BlogDetail />}/>
      <Route path='/product/pdetail' element={<ProductDetail />}/>
      <Route path='/login' element={<Login />}/>
      {/* <Route path="/neworder" element={<Neworder />} /> */}
      <Route path='/checkout' element={<Checkout />}/>
      <Route path='/myaccount' element= {<Myaccount />}/>
      <Route path='/myorders' element={<MyOrders />} />
      <Route path='/myorders/:id' element={<Myorderdetails />}/>
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
>
  <Route index element={<Dashboardhome />} />

  <Route path="order" element={<Orders />} />

  <Route 
  path="order/review/:id"
  element={<Orderreview />}
/>

    <Route
  path="order/new"
  element={<Neworder />}
/>
   <Route
    path="products"
    element={<DashboardProducts />}
  />
  <Route path="customers" element={<Customers />} />
  <Route
  path="shipping-charges"
  element={<ShippingCharges />}
/>
  <Route
  path="settings"
  element={<Settings />}
/>
    
</Route>
    
    </Routes>
    </main>
    

    </>
  )
}

export default App
