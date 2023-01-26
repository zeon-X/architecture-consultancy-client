import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import { auth } from "../firebase.init";
import Swal from "sweetalert2";
import "./Header.css";
import LogoutFunc from "../utilities/Functions/LogoutFunc";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./Loading";

const Header = () => {
  const location = useLocation();
  console.log(location?.pathname?.includes("dashboard"));
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [user, loading, error] = useAuthState(auth);
  const logout = () => {
    LogoutFunc(auth);
    userInfo = {};
    Swal.fire({
      icon: "success",
      title: "You account has been logged out",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <div className="w-full main_header relative text-sm bg-white z-50 flex flex-col justify-center items-center">
      {/* Navbar Main + sticky */}
      <div className="bg-white text-black z-50 flex justify-evenly items-center navbar w-full border-b border-t border-gray-200 py-5 lg:px-20 sm:px-2">
        {/* TOGGLE BTN MOBILE SM DEVICE */}
        <div className="flex-none lg:hidden">
          <label htmlFor="normalmenusm" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        {/* START */}
        <div className="navbar-start flex lg:justify-start md:justify-end sm:justify-end items-center px-2 mx-2">
          {/* starting left portion here */}
          {/* <img
            className="hover:cursor-pointer"
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
          /> */}

          <p
            className="hover:cursor-pointer font-semibold text-xl"
            onClick={() => navigate("/")}
          >
            Imran's Creation
          </p>
        </div>
        {/* CENTER */}
        <div className="navbar-center flex-none hidden lg:block mx-auto">
          <ul className="menu menu-horizontal justify-center items-center">
            {/* <!-- center portion here --> */}
            <li>
              <a href="/#hs0">Home</a>
            </li>
            <li>
              <a href="/#hs2">What We Do</a>
            </li>
            <li>
              <a href="/#hs1">Service</a>
            </li>
            <li>
              <a href="/#hs3">Our Latest Works</a>
            </li>
            <li>
              <a href="/#hs6">Pricing</a>
            </li>
            <li>
              <a href="">Contact Us</a>
            </li>
            <li>
              <a href="/#hs5">What's Client's Say</a>
            </li>
          </ul>
        </div>

        {/* END */}
        <div className="navbar-end flex justify-end gap-3 ">
          {/* ending right portion here */}

          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
              clipRule="evenodd"
            />
          </svg> */}

          {/* <div className="border-l h-[30px] border-gray-800"></div> */}

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow border border-gray-100 bg-base-100 rounded-box w-52"
            >
              <li onClick={() => navigate("/dashboard/manage-orders")}>
                <a className="">Dashboard</a>
              </li>
              <li onClick={() => navigate("/place-order")}>
                <a className="">Place an Order</a>
              </li>
              <li onClick={() => navigate("/login")}>
                <a className="">Login</a>
              </li>
              <li onClick={() => navigate("/register")}>
                <a>Register</a>
              </li>
              <li onClick={() => navigate("/my-orders")}>
                <a>My Orders</a>
              </li>

              <li onClick={() => {}}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
