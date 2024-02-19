import express from "express";
import * as todoController from "../../controllers/todo/todo.controller.js";
// import isAuth from "../../middlewares/auth.js";

const router = express.Router();

// ROUTES FOR TODO'S
router.get("/todo-all", todoController.default.getAllTodos);
router.get("/todo/:id", todoController.default.getATodo);
router.post("/new-todo", todoController.default.createTodo);
router.put("/todo/:id", todoController.default.updateTodo);
router.delete("/todo/:id", todoController.default.deleteTodo);

export default router;
