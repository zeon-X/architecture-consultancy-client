import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../../firebase.init";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  if (loading) {
    return Swal.showLoading();
  }
  if (!user || !userInfo) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  Swal.close();
  return children;
};

export default RequireAuth;
