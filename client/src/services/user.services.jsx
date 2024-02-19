import { axiosInstance as httpAPI } from "api/api.request";
import { USER_REGISTER_API_URL, USER_LOGIN_API_URL } from "constants/constants";

// USER REGISTER SERVICE
const userRegisterService = async (userData) => {
  const response = await httpAPI.post(
    `${USER_REGISTER_API_URL}/api/register`,
    userData
  );
  return response.data;
};

// USER LOGIN SERVICE
const userLoginService = async (credential) => {
  const response = await httpAPI.post(`${USER_LOGIN_API_URL}/api/`, credential);
  console.log("---response login---", response.data);
  return response.data;
};

// USER LOGOUT SERVICE
const userLogoutService = () => {};

export const userServices = {
  userRegisterService,
  userLoginService,
  userLogoutService,
};
