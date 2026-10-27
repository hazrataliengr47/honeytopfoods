import Navbar from "../../Components/Navbar"
import Footer from "../../Components/Footer"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const customerLogin = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const [loading,setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    // start handle send otp
    const handleSendOtp= async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try{
            const response = await fetch(
                "http://localhost:5000/api/auth/send-otp",
                {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({email})
                }
            )
            const data =await response.json();
            if(!response.ok){
                throw new Error (data.message || "Failed to send OTP.");
            }
            setMessage(data.message || "Send OTP successfully.");
            setOtpSent(true);
        }catch(error){
            setMessage(error.message || "Sometong went wrong")
        }finally{
            setLoading(false)
        }
    };
    // finish handle send otp

    // start handle verify otp
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try{
            const response = await fetch(
                "http://localhost:5000/api/auth/verify-otp",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({email,otp}),
                }
            );
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "OTP Verification Failed")
            }
            localStorage.setItem("customerToken", data.token);
            localStorage.setItem("customer", JSON.stringify(data.user));
            window.dispatchEvent(new Event("customerLogin"));
            setMessage("Customer Login Successfully");
            navigate("/myaccount");
        }catch(error){
            setMessage(error.message || "Something went wrong")
        }finally{
            setLoading(false);
        }
    } 
    // finish handle verify otp
  return (
    <div>
        <Navbar />
              <div className="mx-auto my-12 max-w-md rounded-xl bg-white p-8 shadow-md">
                <h1 className="mb-6 text-2xl text-center font-bold">
                    Customer Login
                </h1>
                <form onSubmit={handleSendOtp}>
                    {!otpSent?(
                        <>
                    <label className="mb-2 block font-medium">
                        Email Address
                    </label>

                    <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your email addres"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 
                    outline-none focus:border-amber-500"
                     />

                     <button type="submit"
                     disabled={loading}
                      className=" mt-5 w-full rounded-lg bg-amber-500 px-4 py-3
                     font-semibold text-white transition hover:bg-amber-600">
                        {loading ? "Sending OTP..." : "Send Verification Code"}
                     </button>
                     </>
                    ):(
                        <div>
                            <label className="mb-2 block font-medium">
                            Enter OTP
                            </label>

                        <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        inputMode="numeric"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-amber-500"
                        />
                        <button type="button"
                        onClick={handleVerifyOtp}
                        disabled={loading || otp.length !==6}
                        className="mt-5 w-full rounded-lg bg-amber-500 px-4 py-3 font-semibold text-white
                         hover:bg-amber-600 disabled:opacity-60">
                            {loading ? "verifying..." : "Verify & Login"}
                        </button>

                        </div>
                    )}
                </form>
                {message && 
                <p className="mt-4 text-center text-sm text-gray-700">
                    {message}
                </p>
                }
              </div>
        <Footer />
    </div>
  )
}

export default customerLogin

