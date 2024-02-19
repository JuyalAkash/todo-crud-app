/* eslint-disable react-refresh/only-export-components */
import { createReducer } from "@reduxjs/toolkit";
import * as action from "redux/todos/actions";

const initialState = {
  todos: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errMsg: "",
};

// CREATE NEW TODO REDUCER
export const createTodoReducer = createReducer(initialState, (builder) => {
  const { pending, fulfilled, rejected } = action.createTodoAction;
  builder.addCase(pending, (state) => {
    return { ...state, isLoading: true };
  });
  builder.addCase(fulfilled, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      todos: payload?.newtodo,
      isSuccess: true,
      isError: false,
    };
  });
  builder.addCase(rejected, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      todos: null,
      isSuccess: false,
      isError: true,
      errMsg: payload.error,
    };
  });
});

// GET ALL TODO'S ACTION
export const getAllTodoReducer = createReducer(initialState, (builder) => {
  const { pending, fulfilled, rejected } = action.getAllTodosAction;
  builder.addCase(pending, (state) => {
    return { ...state, isLoading: true };
  });
  builder.addCase(fulfilled, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      todos: payload,
      isSuccess: true,
      isError: false,
    };
  });
  builder.addCase(rejected, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      todos: null,
      isSuccess: false,
      isError: true,
      errMsg: payload.error,
    };
  });
});

export const SelectNewTodo = (state) => state.createNewTodo;
export const SelectAllTodo = (state) => state.getAllTodo;
