import { signOut } from "firebase/auth";

const LogoutFunc = (auth) => {
  signOut(auth);
  localStorage.removeItem("authorization");
  localStorage.removeItem("user");
};
export default LogoutFunc;
