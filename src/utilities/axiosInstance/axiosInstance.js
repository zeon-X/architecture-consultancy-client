import axios from "axios";

// const api = "http://localhost:5000/api/";
// const api = "https://menufacturer-website.herokuapp.com/api/";
const api = "https://menufacturer-website.onrender.com/api/";
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    authorization: localStorage.getItem("authorization") || "load takes time",
  },
});
const printAuth = () => {
  console.log(localStorage.getItem("authorization"));
};
printAuth();
export default axiosInstance;
