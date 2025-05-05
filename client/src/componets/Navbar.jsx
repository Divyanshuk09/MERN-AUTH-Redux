import React from "react";
import Logo from '../assets/Logo.png'
import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth/authActions";

const Navbar = () => {
  const { accessToken, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 z-10">
      <img className="rounded-full w-10 sm:w-14" src={Logo} alt="Logo" />
      {user ? (
        <div className="cursor-pointer rounded-full border-2 border-cyan-700 bg-white text-black w-8 h-8 flex justify-center items-center relative group hover:shadow-[0_0_15px_5px_rgba(6,182,212,0.6)]">
          {user.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-white rounded pt-10">
            <ul className="list-none w-fit m-0 p-1 bg-gray-900 text-sm">
              <li className="py-1 text-center cursor-auto bg-[#2b2b2b5c] gap-1 mb-4  px-1.5 rounded ">
               {user.name}
               <div className="flex items-center">
               {user.email}
                </div>
              </li>
              <li
                onClick={handleLogout}
                className="py-1 px-1.5 hover:bg-gray-800 rounded  cursor-pointer">
                LogOut
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-4 sm:px-6 py-2 text-gray-100 hover:bg-gray-800 cursor-pointer transition-all text-sm sm:text-base"
        >
          Login <FaLongArrowAltRight />
        </button>
      )}
    </div>
  );
};

export default Navbar;
