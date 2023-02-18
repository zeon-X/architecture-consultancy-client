import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import { auth } from "../firebase.init";
import Swal from "sweetalert2";
import "./Header.css";
import LogoutFunc from "../utilities/Functions/LogoutFunc";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./Loading";
import axiosInstance from "../utilities/axiosInstance/axiosInstance";
import { useQuery } from "react-query";

const Header = () => {
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

  const {
    isLoading,
    isError,
    data: category,
    error1,
  } = useQuery(["servicecategorys"], async () => {
    let data = await axiosInstance.get("service-category/get");

    return data.data;
  });

  const [cat, setCat] = useState([]);

  useEffect(() => {
    let tem = category;
    let main = tem?.filter((x) => x?.parentId === null);
    let sub = tem?.filter((x) => x?.parentId !== null);

    // console.log(main);
    // console.log(sub);

    main?.map((x) => {
      let subCat = sub?.filter((y) => y?.parentId === x?._id);
      x.sub = subCat;
    });
    setCat(main);
    // console.log(main);
  }, [category]);

  // console.log(category);

  return (
    <div className="w-full main_header relative text-sm bg-white z-50 flex flex-col justify-center items-center">
      {/* Navbar Main + sticky */}
      <div className="py-4  text-black z-50 flex justify-evenly items-center navbar w-full border-b border-t border-gray-200  lg:px-20 sm:px-2">
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
            className="hover:cursor-pointer font-semibold lg:text-xl sm:text-[16px]"
            onClick={() => navigate("/")}
          >
            Imran's Creation
          </p>
        </div>
        {/* CENTER */}
        <div className="navbar-center flex-none hidden lg:block mx-auto">
          <ul className="menu menu-horizontal justify-center items-center text-xs">
            {/* <!-- center portion here --> */}
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/#hs1">What We Are</a>
            </li>

            <li tabindex="0">
              <a href="/#hs2">
                Service
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul
                tabindex="0"
                className="menu menu-compact bg-base-100 w-56 p-2 rounded-box shadow-2xl"
              >
                {cat?.map((x, index) => {
                  return (
                    <li key={index}>
                      <a
                        tabindex="1"
                        className="flex justify-between"
                        onClick={() => {
                          navigate(`/article-details/${x?.categoryCode}`);
                        }}
                      >
                        {x?.categoryTitle}
                        {x?.sub?.length !== 0 && (
                          <svg
                            className="fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        )}
                      </a>
                      {x?.sub?.length !== 0 && (
                        <ul
                          tabIndex={1}
                          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          {x?.sub?.map((y, index) => {
                            return (
                              <li key={index}>
                                <a
                                  onClick={() => {
                                    navigate(
                                      `/article-details/${y?.categoryCode}`
                                    );
                                  }}
                                >
                                  {y?.categoryTitle}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>

            <li>
              <a href="/#hs3">Our Latest Works</a>
            </li>

            <li>
              <a href="/#hs5">What's Client's Say</a>
            </li>
            {/* <li>
              <a href="/#contact-us">Contact Us</a>
            </li> */}

            <li>
              <a href="/blogs">Blog</a>
            </li>
          </ul>
        </div>

        {/* END */}
        <div className="navbar-end flex justify-end gap-3 ">
          {/* ending right portion here */}

          <div className="dropdown dropdown-end lg:block sm:hidden md:hidden">
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
              {user && userInfo?.role === "user" && (
                <>
                  <li onClick={() => navigate("/pricing/#pricing-top")}>
                    <a className="">Place an Order</a>
                  </li>
                  <li onClick={() => navigate("/my-orders")}>
                    <a>My Orders</a>
                  </li>
                </>
              )}

              {user && userInfo?.role === "admin" && (
                <>
                  <li
                    className=""
                    onClick={() => navigate("/dashboard-admin/manage-orders")}
                  >
                    <a className="bg-gray-100">Admin Dashboard</a>
                  </li>
                  <li onClick={() => navigate("/dashboard-admin/manage-hero")}>
                    <a className="">Manage Hero Projects</a>
                  </li>
                  <li
                    onClick={() => navigate("/dashboard-admin/manage-orders")}
                  >
                    <a className="">Manage Orders</a>
                  </li>
                  <li
                    onClick={() =>
                      navigate("/dashboard-admin/manage-add-category")
                    }
                  >
                    <a className="">Add Category</a>
                  </li>
                  <li
                    onClick={() => navigate("/dashboard-admin/manage-category")}
                  >
                    <a className="">Manage Category</a>
                  </li>
                  <li
                    onClick={() =>
                      navigate("/dashboard-admin/manage-add-project")
                    }
                  >
                    <a className="">Add Project</a>
                  </li>
                  <li
                    onClick={() => navigate("/dashboard-admin/manage-projects")}
                  >
                    <a className="">Manage Project</a>
                  </li>
                  <li
                    onClick={() =>
                      navigate("/dashboard-admin/manage-add-custom-review")
                    }
                  >
                    <a className="">Add Custom Review</a>
                  </li>
                  <li
                    onClick={() => navigate("/dashboard-admin/manage-review")}
                  >
                    <a className="">Manage Review</a>
                  </li>
                  <li
                    onClick={() => navigate("/dashboard-admin/manage-add-blog")}
                  >
                    <a className="">Add Blog</a>
                  </li>
                  <li onClick={() => navigate("/dashboard-admin/manage-blog")}>
                    <a className="">Manage Blog</a>
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
                    <label htmlFor="login-modal" className="">
                      Login
                    </label>
                  </li>
                  <li>
                    <label htmlFor="register-modal" className="">
                      Register
                    </label>
                  </li>
                </>
              )}
            </ul>
          </div>

          <button
            onClick={() => navigate("/pricing/#pricing-top")}
            className="btn  shadow-xl  text-white box"
          >
            <p className="lg:block md:hidden sm:hidden">Get a Quick Quote</p>
            <p className="lg:hidden md:block sm:block">Get a Quote</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
