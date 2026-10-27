import { useState, useEffect } from "react";
import {  Menu, X } from "lucide-react";
import { FiShoppingBag, FiStar, FiUser } from 'react-icons/fi';
import logo from "../assets/honeyfoodlogo.png"
import { IoClose, IoSearchOutline } from 'react-icons/io5';
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../Context/UseCart";

const Navbar = () => {
  const {
  totalItems,
 
} = useCart();

  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [searchText,setSearchText] = useState("");
  const [customer, setCustomer] = useState(() => {
    try{
      return JSON.parse(localStorage.getItem("customer")) || null;
    }catch{
      return null
    }
  })

  const [accountOpen, setAccountOpen] = useState(false);
  
useEffect(() => {
  const updateCustomer = () => {
    try {
      setCustomer(
        JSON.parse(localStorage.getItem("customer")) || null
      );
    } catch {
      setCustomer(null);
    }
  };

  window.addEventListener("customerLogin", updateCustomer);
  window.addEventListener("storage", updateCustomer);

  return () => {
    window.removeEventListener("customerLogin", updateCustomer);
    window.removeEventListener("storage", updateCustomer);
  };
}, []);


  const menuItems = [
    {title:'Home', link:'/'},
    {title:"Shop", link:'/product'},
    {
      title:"Categories",
      children: [
      {
        title: "Sidr Honey",
        link: "/sidr",
      },
      {
        title: "Wild Honey",
        link: "/nature",
      },
      {
        title: "View All",
        link: "/view",
      },
    ],
    },
    {title:"About", link:'/about'},
    {title:"Blog", link:'/blog'},
    {title:"Contact", link:'/contact'},
  ];


  return (
    
        <div className="w-full bg-white shadow-md ">

      <nav className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 ">
        
        <div className="h-25 flex items-center gap-5 justify-between">


          {/* Logo */}
          <div className="w-40 ">
            <img src={logo} alt="logo" />
          </div>



          {/* Desktop Menu */}

          <ul className="hidden md:flex gap-4 lg:gap-8 text-sm lg:text-base font-medium text-gray-700">
          {menuItems.map((item, index) => (
            <li key={index} className="relative group flex items-center h-full"
             onMouseEnter={() => item.children && setOpenCategory(true)}
             onMouseLeave={() => item.children && setOpenCategory(false)}
            >
              {item.children ? (
                <>
                  <button
                    onClick={() => setOpenCategory(!openCategory)}
                    className="flex items-center gap-1 hover:text-yellow-600 transition duration-300"
                  >
                    {item.title}
                  </button>

                  {openCategory && (
                    <ul className="absolute left-0 top-full pt-2 w-56 bg-white rounded-md shadow-lg border z-50">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <NavLink
                            to={child.link}
                            onClick={() => setOpenCategory(false)}
                            className="block px-4 py-3 hover:bg-yellow-100 hover:text-yellow-600"
                          >
                            {child.title}
                            </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.link}
                  className="hover:text-yellow-600 transition duration-300"
                >
                  {item.title}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
            <div className="hidden md:flex ml-auto flex items-center gap-3">
                <input type="text" placeholder="Search..." 
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                className="w-full flex-1 rounded-full text-gray-900 text-lg
                placeholder:text-base placeholder:tracking-wide shadow-sm
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                placeholder:font-normal focus:ring-1 focus:ring-darkText sm:text-sm
                px-4 py-1 "/>
                { searchText ? (
                    <IoClose 
                    onClick={() => setSearchText("")}
                    className="absolute right-33 top-10 text-xl hover:text-red-500
                    cursor-pointer duration-200 "/>
                ):(
                    <IoSearchOutline 
                    className="absolute right-38 top-10 text-xl"/>
                )
                }
            </div>
              <div
               className='flex items-center gap-x-6 text-2xl '>
          {/* <Link to='/customerlogin'>
        <FiUser className='hover:text-yellow-600 duration-200 cursor-pointer'/>
        </Link> */}



<div className="relative">
  {customer ? (
    <button
      type="button"
      onClick={() => setAccountOpen(!accountOpen)}
      className="w-9 h-9 rounded-full bg-amber-500 text-white
                 flex items-center justify-center font-semibold
                 uppercase hover:bg-amber-600 transition"
      aria-label="Open customer account"
    >
      {customer.name?.trim()?.charAt(0) ||
        customer.email?.charAt(0) ||
        "U"}
    </button>
  ) : (
    <Link
      to="/customerlogin"
      aria-label="Customer login"
      className="flex items-center"
    >
      <FiUser className="text-xl" />
    </Link>
  )}

  {customer && accountOpen && (
  <div className="absolute right-0 top-12 z-50 w-56
                  overflow-hidden rounded-xl border border-gray-200
                  bg-white shadow-xl">

    {/* Customer Information */}
    <div className="px-4 py-3 border-b border-gray-100">
      <div className="flex items-center gap-3">

        {/* Initial */}
        <div className="flex h-10 w-10 shrink-0 items-center
                        justify-center rounded-full bg-amber-500
                        text-lg font-semibold text-white uppercase">
          {customer.name?.trim()?.charAt(0) ||
            customer.email?.charAt(0) ||
            "U"}
        </div>

        {/* Name + Email */}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-800">
            {customer.name || "Customer"}
          </p>

          <p className="truncate text-xs text-gray-500">
            {customer.email}
          </p>
        </div>

      </div>
    </div>

    {/* My Account */}
    <Link
      to="/myaccount"
      onClick={() => setAccountOpen(false)}
      className="block px-4 py-3 text-sm text-gray-700
                 transition hover:bg-yellow-50 hover:text-yellow-700"
    >
      My Account
    </Link>

    {/* My Orders */}
    <Link
      to="/myorders"
      onClick={() => setAccountOpen(false)}
      className="block px-4 py-3 text-sm text-gray-700
                 transition hover:bg-yellow-50 hover:text-yellow-700"
    >
      My Orders
    </Link>

    {/* Logout */}
    <button
      onClick={() => {
        localStorage.removeItem("customer");
        localStorage.removeItem("customerToken");

        setCustomer(null);
        setAccountOpen(false);

        window.dispatchEvent(new Event("customerLogin"));
      }}
      className="w-full border-t border-gray-100 px-4 py-3
                 text-left text-sm text-red-500
                 transition hover:bg-red-50"
    >
      Logout
    </button>

  </div>
)}
</div>





      <div className='relative block'>
        <Link to='/cart'>
        <FiShoppingBag className='hover:text-yellow-600 duration-200 cursor-pointer'/>  
        </Link>
        <span className='inline-flex items-center h-.5 justify-center bg-red-500 
        text-white absolute -top-1 right-0 text-[12px] 
        rounded-full h-4 w-4'>
          {totalItems}</span>
      </div>
          
      </div>
              

          {/* Mobile Button */}

          <button
            onClick={()=>setOpen(!open)}
            className="md:hidden text-gray-700"
          >

            {
              open 
              ? <X size={26}/>
              : <Menu size={26}/>
            }

          </button>


        </div>



        {/* Mobile Menu */}

        {
          open && (

            <div className="md:hidden border-t py-4">

              <ul className="flex flex-col gap-4 text-gray-700 font-medium">

                {
                  menuItems.map((item,index)=>(

                    <li
                      key={index}
                      className="
                      px-2
                      py-2
                      rounded-md
                      hover:bg-yellow-50
                      hover:text-yellow-600
                      cursor-pointer
                      ">
                        <NavLink to={item.link}>
                      {item.title}</NavLink>
                    </li>

                  ))
                }

              </ul>

            </div>

          )
        }


      </nav>

    </div>
    
  );
};

export default Navbar;