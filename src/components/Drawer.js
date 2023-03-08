import React from "react";
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
  let userInfo = JSON.parse(localStorage.getItem("user"));
  const [user] = useAuthState(auth);
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

  const { data: category } = useQuery(["servicecategoryssssss"], async () => {
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

          <div
            style={{ backgroundColor: "rgb(242, 243, 245,0.4)" }}
            className=" mx-auto w-full  "
          >
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

            <div className="collapse collapse-arrow">
              <input type="checkbox" className="peer" />
              <div className="collapse-title ">Our Services</div>
              <div className="collapse-content">
                {category?.map((x, index) => {
                  return (
                    <li key={index}>
                      <div
                        className=""
                        onClick={() => {
                          navigate(`/article-details/${x?.categoryCode}`);
                        }}
                      >
                        {x?.categoryTitle}
                      </div>
                    </li>
                  );
                })}

                <li>
                  <div
                    className=""
                    onClick={() => {
                      navigate(`/all-services`);
                    }}
                  >
                    See All services
                  </div>
                </li>
              </div>
            </div>

            {/* <li>
              <NavLink to="/#hs2">What We Do</NavLink>
            </li> */}

            <li>
              <NavLink to="/all-projects">Our Latest Works</NavLink>
            </li>

            <li>
              <NavLink to="/blogs">Our Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/pricing/#pricing-top">Place an Order</NavLink>
            </li>

            {user && userInfo?.role === "user" && (
              <>
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
                  <div>Logout</div>
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
