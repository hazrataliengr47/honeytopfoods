import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {logo} from '../assets'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] =useState("");
  const [password,setPAssword] = useState("");

  const {login} = useAuth();
  const navigate = useNavigate();

  
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/admin-login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Invalid admin credentials.");
      return;
    }

    localStorage.setItem("adminToken", data.token);
    login();
    navigate("/dashboard");
  } catch{
    alert("Unable to connect to the server. Please try again.");
  }
};

  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  

  return (
    <main className="min-h-screen bg-[#fffaf0] flex items-center justify-center px-4 py-8 sm:py-12">
      {/* Background Decorations */}
      <div className="fixed -top-32 -left-32 w-80 h-80 rounded-full bg-[#f6b51d]/10 blur-3xl pointer-events-none" />

      <div className="fixed -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#d99600]/10 blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="relative w-full max-w-6xl bg-white rounded-[2rem] shadow-[0_20px_70px_rgba(80,50,0,0.12)] overflow-hidden grid lg:grid-cols-2">

        {/* =========================================
            LEFT SIDE - HONEYTOP BRAND
        ========================================== */}
        <section className="relative hidden lg:flex min-h-[650px] bg-gradient-to-br from-[#f8c33b] via-[#f3b51b] to-[#d99600] items-center justify-center overflow-hidden">

          {/* Decorative Circles */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full border border-white/20" />

          <div className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full border border-white/20" />

          <div className="absolute top-20 right-20 w-8 h-8 rounded-full bg-white/20" />

          <div className="absolute bottom-28 left-20 w-5 h-5 rounded-full bg-white/20" />

          {/* Brand Content */}
          <div className="relative z-10 text-center text-white px-10 max-w-lg">

            {/* Honey Icon */}
            <div className="mx-auto mb-7 w-30 h-30 backdrop-blur-sm flex items-center justify-center ">

              <span className="text-4xl">
                <img src={logo} alt="logo" />
              </span>

            </div>

            <p className="text-sm uppercase tracking-[5px] font-semibold text-white/90">
              HoneyTop Foods
            </p>

            <h1 className="text-5xl xl:text-6xl font-extrabold mt-5 leading-[1.05]">
              Pure Nature.
              <br />
              Pure Honey.
            </h1>

            <p className="mt-6 text-white/90 text-base leading-7 max-w-md mx-auto">
              Discover premium natural honey, carefully selected
              and delivered to your doorstep with care.
            </p>

            {/* Small Features */}
            <div className="flex items-center justify-center gap-6 mt-10 text-sm">

              <div className="flex items-center gap-2">
                <ShieldCheck size={19} />
                <span>Natural</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-white/60" />

              <div className="flex items-center gap-2">
                <ShieldCheck size={19} />
                <span>Premium Quality</span>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================
            RIGHT SIDE - LOGIN FORM
        ========================================== */}
        <section className="min-h-[650px] flex items-center justify-center p-6 sm:p-10 lg:p-14 xl:p-20">

          <div className="w-full max-w-md">

            {/* Mobile Brand */}
            <div className="lg:hidden text-center mb-8">

              <div className="inline-flex w-20 h-20  items-center justify-center mb-4">
                <span className="text-3xl">
                  <img src={logo} alt="logo" />
                </span>
              </div>

              <p className="text-xs uppercase tracking-[4px] font-bold text-[#d99600]">
                HoneyTop Foods
              </p>

            </div>


            {/* Heading */}
            <div
            className="mb-8" >

              <p className="text-sm font-semibold text-[#d99600] mb-2">
                Welcome back
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Login to your account
              </h2>

              <p className="mt-3 text-gray-500 leading-6">
                Enter your details to continue shopping with HoneyTop.
              </p>

            </div>


            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full h-14 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-[#f6b51d] focus:ring-4 focus:ring-[#f6b51d]/10"
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <div className="flex items-center justify-between mb-2">

                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-[#d99600] hover:text-[#b77d00] transition"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="relative">

                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPAssword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full h-14 pl-11 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-[#f6b51d] focus:ring-4 focus:ring-[#f6b51d]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>


              {/* Remember Me */}
              <div className="flex items-center">

                <label className="flex items-center gap-2 cursor-pointer">

                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#f6b51d] cursor-pointer"
                  />

                  <span className="text-sm text-gray-600">
                    Remember me
                  </span>

                </label>

              </div>


              {/* Login Button */}
              <button
                type="submit"
                className="group w-full h-14 bg-[#f6b51d] hover:bg-[#e5a900] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#f6b51d]/20 hover:shadow-xl hover:shadow-[#f6b51d]/30 transition-all duration-300"
              >
                <span>Login</span>

                <ArrowRight
                  size={19}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

            </form>


            {/* Divider */}
            <div className="flex items-center gap-4 my-8">

              <div className="h-px bg-gray-200 flex-1" />

              <span className="text-xs text-gray-400 uppercase tracking-wider">
                New to HoneyTop?
              </span>

              <div className="h-px bg-gray-200 flex-1" />

            </div>


            {/* Register */}
            <Link
              to="/register"
              className="w-full h-14 border-2 border-gray-200 hover:border-[#f6b51d] hover:bg-[#fffaf0] rounded-xl flex items-center justify-center text-gray-700 hover:text-[#b77d00] font-semibold transition-all duration-300"
            >
              Create a new account
            </Link>


            {/* Footer Text */}
            <p className="text-center text-xs text-gray-400 mt-7">
              By continuing, you agree to our Terms & Privacy Policy.
            </p>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Login
