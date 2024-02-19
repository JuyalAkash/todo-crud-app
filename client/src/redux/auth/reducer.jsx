/* eslint-disable react-refresh/only-export-components */
import { createReducer } from "@reduxjs/toolkit";
import * as action from "redux/auth/actions";

// INITIALIZE THE STATE
const initialState = {
  userInfo: {},
  userToken: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  successMsg: null,
  errorMsg: null,
};

// CREATE USER REGISTER REDUCER
export const userRegisterReducer = createReducer(initialState, (builder) => {
  const { pending, fulfilled, rejected } = action.userRegisterAction;
  builder.addCase(pending, (state) => {
    return { ...state, isLoading: true };
  });
  builder.addCase(fulfilled, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      userInfo: payload?.user,
      userToken: payload?.user?.token,
      isSuccess: true,
      isError: false,
      successMsg: payload?.message,
      errorMsg: null,
    };
  });
  builder.addCase(rejected, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      userInfo: {},
      userToken: null,
      isSuccess: false,
      isError: true,
      successMsg: null,
      errorMsg: payload?.error,
    };
  });
});

// CREATE USER LOGIN REDUCER
export const userLoginReducer = createReducer(initialState, (builder) => {
  const { pending, fulfilled, rejected } = action.userLoginAction;
  builder.addCase(pending, (state) => {
    return { ...state, isLoading: true };
  });
  builder.addCase(fulfilled, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      userInfo: payload?.user,
      userToken: payload?.user?.token,
      isSuccess: true,
      isError: false,
      successMsg: payload?.message,
      errorMsg: null,
    };
  });
  builder.addCase(rejected, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      userInfo: {},
      userToken: null,
      isSuccess: false,
      isError: true,
      successMsg: null,
      errorMsg: payload?.error,
    };
  });
});

// CREATE USER LOGOUT REDUCER
export const userLogOutRedcuer = createReducer(initialState, (builder) => {
  const { fulfilled } = action.userLogoutAction;
  builder.addCase(fulfilled, (state) => {
    return { ...state, userInfo: {}, userToken: null };
  });
});

export const SelectUserRegister = (state) => state.userRegister;
export const SelectUserLogin = (state) => state.userLogin;
