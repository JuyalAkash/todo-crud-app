/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function BaseLayout({ children }) {
  return (
    <div className="container mx-auto">
      <header className="lg:w-12/12 pb-10 pt-5 w-full p-16 flex flex-wrap justify-around shadow-2xl">
        <h1 className=" text-slate-900 font-bold text-lg">
          <Link to="/">ToDO Application</Link>
        </h1>
        <nav>
          <ul className="flex justify-between space-x-8 font-semibold text-slate-900">
            <Link to="/new-todo">Create</Link>
            <Link to="/todo-all">List</Link>
          </ul>
        </nav>
        <button>Sign Out</button>
      </header>
      <main className="w-full h-[78vh]">{children}</main>
      <footer className="lg:w-12/12 pb-10 pt-5 w-full p-10 flex flex-wrap justify-around shadow-2xl">
        <p className="font-bold">&copy; Copyright reserved ToDO Application</p>
      </footer>
    </div>
  );
}

export default BaseLayout;
