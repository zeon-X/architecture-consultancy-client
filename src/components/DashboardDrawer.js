import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const DashboardDrawer = () => {
  const navigate = useNavigate();
  let userInfo = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="drawer drawer-mobile ">
      <input
        id="dashboardnavigationlinks"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content min-h-screen max-w-7xl mx-auto flex flex-col items-start justify-start w-full">
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

          {/* admin links */}

          <li>
            <NavLink to="manage-orders">Manage Orders</NavLink>
          </li>

          <li>
            <NavLink to="manage-add-category">Add a Category</NavLink>
          </li>

          <li>
            <NavLink to="manage-category">Manage Category</NavLink>
          </li>

          <li>
            <NavLink to="manage-add-project">Add A Project</NavLink>
          </li>

          <li>
            <NavLink to="manage-projects">Manage Projects</NavLink>
          </li>

          <li>
            <NavLink to="manage-add-custom-review">Add Custom Review</NavLink>
          </li>

          <li>
            <NavLink to="manage-review">Manage All Reviews</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardDrawer;
