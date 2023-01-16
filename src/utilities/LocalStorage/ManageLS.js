const handleAccessToken = (token, status, email) => {
  localStorage.setItem("authorization", `Barear ${token}`);
  localStorage.setItem("status", status);
  localStorage.setItem("user", email);
};
const handleUserEmail = () => {
  return localStorage.getItem("user");
};
export { handleAccessToken, handleUserEmail };
