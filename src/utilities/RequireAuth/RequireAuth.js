import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase.init";
import Loading from "../../shared/Loading";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user || !userInfo) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
