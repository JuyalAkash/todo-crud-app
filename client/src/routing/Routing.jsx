import Login from "components/auth/Login";
import Register from "components/auth/Register";
import CreateTodo from "pages/todos/CreateTodo";
import Todos from "pages/todos/Todos";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/new-todo" element={<CreateTodo />} />
      <Route path="/todo-all" element={<Todos />} />
    </Routes>
  );
};

export default Routing;
