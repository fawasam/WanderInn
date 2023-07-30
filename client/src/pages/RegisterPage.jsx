import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import toast from "react-hot-toast";
import axios from "axios";

const RegisterPage = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [verificationCode]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !phone) {
      toast.error("Please enter all required fields");
    } else {
      setLoading(true);
    }
    try {
      const res = await axios.post("/api/users/register", {
        username,
        email,
        password,
        phone,
      });
      setLoading(false);
      if (!res.data.requiresVerification) {
        setVerificationSent(true);
      } else {
        toast.success("Registration successful.");
        console.log("Registration successful.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Registration error:", error.response.data.message);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/verify-sms", { phone, verificationCode });
      toast.success("Registration successful.");
      navigate("/");
    } catch (error) {
      toast.error("verification failed.");
      console.error("Verification error:", error);
    }
  };

  return (
    <div className="mt-20 grow flex justify-around items-center ">
      {!verificationSent ? (
        <div className="mb-64 ">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          {error && (
            <div className="flex text-center justify-center text-red-500">
              {error}
            </div>
          )}
          <form action="" className="max-w-md mx-auto " onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
            />
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="your@gmail.com"
            />
            <input
              type="number"
              id="number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="+91"
            />
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="password"
            />
            <button className="primary">
              {loading ? (
                <div className=" flex justify-center">
                  <img src={loader} className="w-8 h-8 flex justify-center" />
                </div>
              ) : (
                "Register"
              )}
            </button>
            <div className="text-center py-2 text-gray-500">
              Already a member?{" "}
              <Link className="underline text-black" to={"/login"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">
            Mobile Number verification
          </h1>

          <form onSubmit={handleVerifyCode}>
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button type="submit" className="primary">
              Verify Code
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
