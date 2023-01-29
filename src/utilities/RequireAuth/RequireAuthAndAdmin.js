import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../../firebase.init";
import LogoutFunc from "../Functions/LogoutFunc";

const RequireAuthAndAdmin = ({ children }) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const userInfo = JSON.parse(localStorage.getItem("user"));

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
    return Swal.showLoading();
  }
  if (!user || !userInfo) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (user && userInfo.role !== "admin") {
    logout();
    return <Navigate to="/login" state={{ from: location }} />;
  }
  Swal.close();
  return children;
};

export default RequireAuthAndAdmin;
