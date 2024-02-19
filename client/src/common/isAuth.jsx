import Cookies from "js-cookie";

export const setIsAuth = (token) => {
  return Cookies.set("authToken", token) ? Cookies.set("authToken", token) : "";
};

export const getIsAuth = () => {
  const token = Cookies.get("authToken");
  return token;
};

export const removeIsAuth = () => {
  return Cookies.remove("authToken");
};
