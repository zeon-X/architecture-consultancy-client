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
    <div>
      <div className="drawer">
        <input id="normalmenusm" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col overflow-hidden">
          {/*  Navbar */}

          <Header></Header>

          <div className=" mx-auto w-full ">
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
              <NavLink to="/">HOME</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
