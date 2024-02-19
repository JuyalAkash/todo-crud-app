import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { userLoginReducer, userRegisterReducer } from "redux/auth/reducer";
import { createTodoReducer, getAllTodoReducer } from "redux/todos/reducer";

const rootReducer = combineSlices({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  createNewTodo: createTodoReducer,
  getAllTodo: getAllTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});
