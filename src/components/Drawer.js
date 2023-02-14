import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../firebase.init";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

import LogoutFunc from "../utilities/Functions/LogoutFunc";

const Drawer = ({ children }) => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [user, loading, error] = useAuthState(auth);
  const logout = () => {
    Swal.fire({
      icon: "success",
      title: "You account has been logged out",
      showConfirmButton: false,
      timer: 1000,
    });
    LogoutFunc(auth);
    userInfo = {};
  };
  return (
    <div>
      <div className="drawer">
        <input id="normalmenusm" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col overflow-hidden">
          {/*  Navbar */}

          <Header></Header>

          <div className=" mx-auto w-full  bg-gray-100">
            {/* Page content here ||||| max-w-7xl  */}
            {children}
            {/*  Footer  */}
          </div>
          <Footer></Footer>
        </div>

        {/* drawer for mobile */}
        <div className="drawer-side">
          <label htmlFor="normalmenusm" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100">
            {/* <!-- Sidebar content here --> */}

            <li>
              <NavLink to="/#hs0">Home</NavLink>
            </li>
            <li>
              <NavLink to="/#hs1">Service</NavLink>
            </li>
            <li>
              <NavLink to="/#hs2">What We Do</NavLink>
            </li>

            <li>
              <NavLink to="/all-projects">Our Latest Works</NavLink>
            </li>

            <li>
              <NavLink to="/blogs">Blog</NavLink>
            </li>

            {user && userInfo?.role === "user" && (
              <>
                <li>
                  <NavLink to="/pricing/#pricing-top">Place an Order</NavLink>
                </li>
                <li>
                  <NavLink to={"/my-orders"}>My Orders</NavLink>
                </li>
              </>
            )}

            {user && userInfo?.role === "admin" && (
              <>
                <li>
                  <NavLink to="/dashboard-admin/manage-orders">
                    Admin Dashboard
                  </NavLink>
                </li>
              </>
            )}

            {user && userInfo && (
              <>
                <li onClick={logout}>
                  <a>Logout</a>
                </li>
              </>
            )}

            {(!user || !userInfo) && (
              <>
                <li>
                  {/* <label htmlFor="login-modal" className="">
                    Login
                  </label> */}
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  {/* <label htmlFor="register-modal" className="">
                    Register
                  </label> */}
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
