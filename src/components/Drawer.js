import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../firebase.init";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import axiosInstance from "../utilities/axiosInstance/axiosInstance";

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

  const {
    isLoading,
    isError,
    data: category,
    error1,
  } = useQuery(["servicecategorys"], async () => {
    let data = await axiosInstance.get("service-category/get");

    return data.data;
  });

  // const [cat, setCat] = useState([]);

  // useEffect(() => {
  //   let tem = category;
  //   let main = tem?.filter((x) => x?.parentId === null);
  //   let sub = tem?.filter((x) => x?.parentId !== null);

  //   // console.log(main);
  //   // console.log(sub);

  //   main?.map((x) => {
  //     let subCat = sub?.filter((y) => y?.parentId === x?._id);
  //     x.sub = subCat;
  //   });
  //   setCat(main);
  //   // console.log(main);
  // }, [category]);

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
            {/* <li tabindex="0">
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
                className="p-2 bg-base-100 rounded-box shadow-2xl"
              >
                {cat?.map((x) => {
                  return (
                    <li>
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
                        <ul tabIndex={1} className="p-2 bg-base-100">
                          {x?.sub?.map((y) => {
                            return (
                              <li>
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
            </li> */}

            <div className="collapse collapse-arrow">
              <input type="checkbox" className="peer" />
              <div className="collapse-title ">Service</div>
              <div className="collapse-content">
                <ul className="menu p-4  bg-base-100">
                  {category?.map((x) => {
                    return (
                      <li>
                        <a
                          className=""
                          onClick={() => {
                            navigate(`/article-details/${x?.categoryCode}`);
                          }}
                        >
                          {x?.categoryTitle}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

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
