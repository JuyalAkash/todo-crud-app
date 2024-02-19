import BaseLayout from "components/baseLayout/BaseLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodosAction } from "redux/todos/actions";
import { SelectAllTodo } from "redux/todos/reducer";

const Todos = () => {
  const todos = useSelector(SelectAllTodo);
  console.log("todos ", todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTodosAction());
  }, [dispatch]);

  return (
    <BaseLayout>
      <div className="container">
        <h1>Todos List</h1>
      </div>
    </BaseLayout>
  );
};

export default Todos;
