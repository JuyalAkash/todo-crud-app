import Todo from "../../models/todo.model.js";
import CustomError from "../../utils/customError.js";

// GET ALL TODO'S
const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().exec();
    if (!todos) {
      return next(new CustomError("Todos not found", 204));
    }
    return res
      .status(200)
      .json({ message: "Get all todos successfully.", todos: todos });
  } catch (error) {
    next(error);
  }
};

// GET A TODO BY ID
const getATodo = async (req, res, next) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const { id: todoId } = req?.params?.id;
  try {
    const aTodo = await Todo.findOne({ _id: todoId }).exec();
    if (!aTodo) {
      return next(new CustomError(`No todo with id: ${todoId}`, 204));
    }
    return res
      .status(200)
      .json({ message: "Get all todos successfully.", todos: todos });
  } catch (error) {
    next(error);
  }
};

// CREATE NEW TODO
const createTodo = async (req, res, next) => {
  if (!req?.body?.title || !req?.body?.content) {
    return res.status(400).json({ message: "Content is required" });
  }
  try {
    const newTodo = await Todo.create({
      title: req.body.title,
      content: req.body.content,
    });
    return res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

// UPDATE TODO BY ID
const updateTodo = async (req, res, next) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const { id: todoId } = req?.params?.id;
  try {
    const todo = await Todo.findByIdAndUpdate(todoId, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    if (!todo) {
      return res.status(404).json({ message: `No todo with id: ${todoId}` });
    }
    return res.status(200).json({
      message: `Todo with id: ${todoId} updated successfully.`,
      todo,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE TODO BY ID
const deleteTodo = async (req, res, next) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const { id: todoId } = req?.params?.id;

  try {
    const todo = await Todo.findByIdAndDelete(todoId).exec();
    if (!todo) {
      return res.status(404).json({ msg: `No todo with id: ${todoId}` });
    }
    return res.status(200).json({
      message: `Todo with id: ${todoId} deleted successfully.`,
      todo,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllTodos,
  getATodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
