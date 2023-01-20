import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const DashboardDrawer = () => {
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState({});
  // useEffect(() => {
  //   setUserInfo();
  // }, []);
  // let userInfo = JSON.parse(localStorage.getItem("user"));
  let userInfo = {
    role: "admin",
  };
  // console.log(userInfo);
  return (
    <div className="drawer drawer-mobile ">
      <input
        id="dashboardnavigationlinks"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col items-start justify-start w-full">
        {/* <!-- Page content here --> */}
        {/* sm btn to drawer */}

        {/* <!-- Page content here --> */}
        <Outlet />
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="dashboardnavigationlinks"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 bg-gray-100 text-base-content">
          {/* <!-- Sidebar content here --> */}

          {userInfo && (
            <li>
              <NavLink to="my-account">My Account</NavLink>
            </li>
          )}
          {/* user links */}
          {/* {userInfo.role === "user" && (
              <li>
                <NavLink to="my-wishlist">My Wishlist</NavLink>
              </li>
            )} */}
          {userInfo.role === "user" && (
            <li>
              <NavLink to="my-orders">My Orders</NavLink>
            </li>
          )}
          {userInfo && userInfo?.role === "user" && (
            <li>
              <NavLink to="my-reviews">Add Reviews</NavLink>
            </li>
          )}

          {/* admin links */}

          {userInfo && userInfo?.role === "admin" && (
            <li>
              <NavLink to="manage-orders">Manage Orders</NavLink>
            </li>
          )}
          {userInfo && userInfo?.role === "admin" && (
            <li>
              <NavLink to="manage-add-category">Add a Category</NavLink>
            </li>
          )}
          {userInfo && userInfo?.role === "admin" && (
            <li>
              <NavLink to="manage-category">Manage Category</NavLink>
            </li>
          )}
          {userInfo && userInfo?.role === "admin" && (
            <li>
              <NavLink to="manage-add-project">Add A Project</NavLink>
            </li>
          )}
          {userInfo && userInfo?.role === "admin" && (
            <li>
              <NavLink to="manage-projects">Manage Projects</NavLink>
            </li>
          )}
          {userInfo && userInfo?.role === "admin" && (
            <li>
              <NavLink to="manage-add-custom-review">Add Custom Review</NavLink>
            </li>
          )}
          {userInfo && userInfo?.role === "admin" && (
            <li>
              <NavLink to="manage-review">Manage All Reviews</NavLink>
            </li>
          )}
          {userInfo && userInfo?.role === "admin" && (
            <li>
              <NavLink to="manage-admin">Make Admin</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardDrawer;
