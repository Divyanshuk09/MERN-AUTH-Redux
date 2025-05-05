import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/auth/authActions";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbEyeClosed, TbLockPassword, TbEye } from "react-icons/tb";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [state, setState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state === "Sign-Up" && password !== confirmPass) {
      setErrorMsg("Passwords do not match! Re-Type Password");
      return;
    }

    try {
        if (state === "Login") {
          await dispatch(loginUser({ email, password })).unwrap();
          navigate('/', { replace: true });
        } else {
          await dispatch(registerUser({ name, email, password })).unwrap();
          navigate('/', { replace: true });
        }
      } catch (error) {
        // Error is already handled in authSlice
        console.error("Auth error:", error);
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={logo}
        onClick={() => navigate("/")}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-15 sm:w-18 cursor-pointer rounded-full"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign-Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign-Up" ? "Create Your Account" : "Login to your account"}
        </p>

        <form onSubmit={handleSubmit}>
          {state === "Sign-Up" && (
            <div className="mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]">
              <FaRegUser size={18} />
              <input
                className="outline-none bg-transparent w-full"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]">
            <MdOutlineAlternateEmail size={20} />
            <input
              className="outline-none bg-transparent w-full"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]">
            <TbLockPassword size={25} />
            <input
              className="outline-none bg-transparent w-full"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
              {showPassword ? <TbEye size={20} /> : <TbEyeClosed size={20} />}
            </span>
          </div>

          {state === "Sign-Up" && (
            <div className="mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]">
              <TbLockPassword size={25} />
              <input
                className="outline-none bg-transparent w-full"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPass}
                placeholder="Re-Enter Password"
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <TbEye size={20} /> : <TbEyeClosed size={20} />}
              </span>
            </div>
          )}

          {(errorMsg || error) && (
            <p className="text-red-400 mb-2 text-center font-extralight">
              {errorMsg || error}
            </p>
          )}

          {state === "Login" && (
            <p
              onClick={() => navigate("/reset-password")}
              className="mb-4 text-indigo-500 cursor-pointer"
            >
              Forgot Password?
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-900 text-white font-semibold shadow-md hover:scale-105 transition-all duration-300"
          >
            {loading ? "Please wait..." : state === "Sign-Up" ? "Create Account" : "Login"}
          </button>

          <p className="mt-4 text-center">
            {state === "Sign-Up"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span
              onClick={() =>
                setState((prev) => (prev === "Sign-Up" ? "Login" : "Sign-Up"))
              }
              className="text-blue-400 hover:underline cursor-pointer"
            >
              {state === "Sign-Up" ? "Login Here" : "Sign up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
