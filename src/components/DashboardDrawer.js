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
      <div
        id="db-top"
        className="relative drawer-content min-h-screen  flex flex-col items-start justify-start w-full"
      >
        {/* Nav to drawer */}
        <div className="flex justify-between items-center w-full p-6 shadow main_header">
          <label
            htmlFor="dashboardnavigationlinks"
            className="btn btn-outline border-none drawer-button lg:hidden"
          >
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          </label>
          <p>Imrans Creation Admin</p>
        </div>

        {/* <!-- Page content here --> */}
        <Outlet />
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="dashboardnavigationlinks"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 bg-gray-100 text-base-content gap-1">
          {/* <!-- Sidebar content here --> */}

          {/* <li>
            <NavLink className="bg-green-600" to="/dashboard-admin">
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Dashboard
            </NavLink>
          </li> */}

          <li>
            <NavLink className="bg-gray-300 " to="/">
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
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              Back To Home
            </NavLink>
          </li>

          {/* admin links */}

          <li>
            <NavLink to="manage-hero">Manage Hero Projects</NavLink>
          </li>
          <li>
            <NavLink to="manage-client-page-component-wwa">
              Manage Section2
            </NavLink>
          </li>

          <li>
            <NavLink to="manage-orders">Manage Orders</NavLink>
          </li>

          {/* <li>
            <NavLink to="manage-add-category">Add a Category</NavLink>
          </li>
          <li>
            <NavLink to="manage-category">Manage Category</NavLink>
          </li> */}

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

          <li>
            <NavLink to="manage-add-blog">Add a Blog</NavLink>
          </li>
          <li>
            <NavLink to="manage-blog">Manage All Blog</NavLink>
          </li>

          <li>
            <NavLink to="manage-add-servicecategory">
              Add Serv. Category
            </NavLink>
          </li>
          <li>
            <NavLink to="manage-servicecategory">Manage Serv. Category</NavLink>
          </li>
          <li>
            <NavLink to="manage-add-article">Add Article</NavLink>
          </li>
          <li>
            <NavLink to="manage-article">Manage Article</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardDrawer;
