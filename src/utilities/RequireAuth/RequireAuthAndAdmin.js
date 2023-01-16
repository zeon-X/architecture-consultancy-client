import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../../firebase.init";
import Loading from "../../shared/Loading";
import axiosInstance from "../axiosInstance/axiosInstance";
import LogoutFunc from "../Functions/LogoutFunc";

const RequireAuthAndAdmin = ({ children }) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  // const {
  //   isLoading,
  //   isError,
  //   data: userdata,
  //   error1,
  // } = useQuery(["user"], async () => {
  //   let fetchedData;

  //   fetchedData = await axiosInstance.get(
  //     `/user/find?_id=${JSON.parse(localStorage.getItem("user"))?._id}`
  //   );
  //   return fetchedData.data;
  // });

  const logout = () => {
    LogoutFunc(auth);
    Swal.fire({
      icon: "warning",
      title: "You account has been logged out due to your action",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user || !userInfo) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (user && userInfo.role !== "admin") {
    logout();
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuthAndAdmin;
