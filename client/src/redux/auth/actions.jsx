import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { userServices } from "services/user.services";

// CREATE ACTION'S TYPE
const userRegisterType = createAction("user/userRegisterType");
const userLoginType = createAction("user/userLoginType");
const userLogoutType = createAction("user/userLogoutType");

// CREATE USER REGISTER ACTION
export const userRegisterAction = createAsyncThunk(
  userRegisterType,
  async (userData, thunkApi) => {
    try {
      await userServices.userRegisterService(userData);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// CREATE USER LOGIN ACTION
export const userLoginAction = createAsyncThunk(
  userLoginType,
  async (credentials, thunkApi) => {
    try {
      await userServices.userLoginService(credentials);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// CREATE USER LOGOUT ACTION
export const userLogoutAction = createAsyncThunk(userLogoutType, () => {
  userServices.userLogoutService();
});
