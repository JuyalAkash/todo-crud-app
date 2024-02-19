import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { todoServices } from "services/todo.services";

// CREATE ACTION'S TYPE
const createTodoType = createAction("todo/createTodoType");
const getAllTodosType = createAction("todo/getAllTodosType");

// CREATE NEW TODO ACTION
export const createTodoAction = createAsyncThunk(
  createTodoType,
  async ({ title, content }, thunkApi) => {
    try {
      await todoServices.createTodoServices({ title, content });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// GET ALL TODO'S ACTION
export const getAllTodosAction = createAsyncThunk(
  getAllTodosType,
  async (_, thunkApi) => {
    try {
      await todoServices.getAllTodoServices();
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      return thunkApi.rejectWithValue(message);
    }
  }
);
