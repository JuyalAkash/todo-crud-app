import BaseLayout from "components/baseLayout/BaseLayout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodoAction } from "redux/todos/actions";
import { SelectNewTodo } from "redux/todos/reducer";

const CreateTodo = () => {
  const [state, setState] = useState({ title: "", content: "" });

  const newTodo = useSelector(SelectNewTodo);
  console.log("--newTodo--", newTodo);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { title, content } = state;
    if (!title || !content) {
      window.alert("Please fill the both title and content");
    }
    dispatch(createTodoAction({ title, content }));
  };

  return (
    <BaseLayout>
      <div className="container mx-auto">
        <div className="lg:w-7/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-2xl my-12 rounded-md mx-auto">
          <div className="pb-5">
            <h1 className="text-3xl font-bold">Create ToDo</h1>
          </div>
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col justify-start items-center w-full m-auto"
          >
            <div className="grid grid-cols-1 mb-6 md:col-span-2 gap-3 w-full">
              <div className="text-left flex flex-col gap-2 w-full">
                <label htmlFor="title" className="font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={state.title}
                  onChange={handleInputChange}
                  placeholder="Enter a title"
                  className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-green-500"
                />
                <label htmlFor="content" className="font-semibold">
                  Content
                </label>
                <textarea
                  name="content"
                  id="content"
                  value={state.content}
                  onChange={handleInputChange}
                  cols="30"
                  rows="10"
                  placeholder="Write a content"
                  className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-green-500"
                />
              </div>
            </div>
            <div className="w-full text-left">
              <button
                type="submit"
                className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-green-800 text-white text-md font-semibold border border-green-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6"
              >
                <span>Create ToDo</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </BaseLayout>
  );
};

export default CreateTodo;
