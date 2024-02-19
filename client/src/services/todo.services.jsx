import { axiosInstance as httpAPI } from "api/api.request";
import { CREATE_TODO_API_URL, GET_ALL_TODO_API_URL } from "constants/constants";

// CREATE  NEW TODO SERVICE
const createTodoServices = async ({ title, content }) => {
  const response = await httpAPI.post(CREATE_TODO_API_URL, { title, content });
  console.log("newtodo ", response.data);
  return response.data;
};

// GET ALL TODO'S
const getAllTodoServices = async () => {
  const response = await httpAPI.get(GET_ALL_TODO_API_URL);
  console.log("all todo ", response.data);
  return response.data;
};

export const todoServices = { createTodoServices, getAllTodoServices };
