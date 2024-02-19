import { useForm } from "react-hook-form";
import { registerFormFields } from "common/formFields";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "redux/auth/actions";
import { SelectUserRegister } from "redux/auth/reducer";
import { useEffect } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userDetail = useSelector(SelectUserRegister);
  const { userInfo, isLoading, successMsg, isSuccess, errMessage } = userDetail;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (data) => {
    const { password, confirmpassword } = data;
    if (!password || !confirmpassword) {
      window.alert("Password and Confirm password must be match");
    }
    dispatch(userRegisterAction(data));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  if (isLoading) return <p>Loading...</p>;
  if (!userInfo) return <pre>Something went wrong with data.</pre>;
  if (errMessage) return <pre>{JSON.stringify(errMessage, null, 2)}</pre>;

  return (
    <div>
      <div className="container mx-auto">
        <div className="lg:w-7/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-2xl my-20 rounded-md mx-auto">
          <div className="pb-5">
            <h1 className="text-3xl font-bold">Register Form</h1>
          </div>
          {isSuccess ? window.alert(successMsg) : ""}
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex flex-col justify-start items-center w-full m-auto"
          >
            <div className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-3 w-full">
              {registerFormFields.map((field, index) => (
                <div
                  key={index}
                  className={`text-left flex flex-col gap-2 w-full ${
                    field.gridCols === 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <label className="font-semibold">{field.label}</label>
                  <input
                    {...register(field.name, {
                      required: field.required,
                      maxLength: field.maxLength,
                      validate: {
                        matchPattern: (v) => field.regExp.test(v),
                      },
                    })}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-green-500 ${
                      field.gridCols === 2 ? "md:w-full" : ""
                    }`}
                  />
                  {errors[field.name]?.type === "required" && (
                    <span className="text-red-600">{field.error}</span>
                  )}
                  {errors[field.name]?.type === "matchPattern" && (
                    <span className="text-red-600">{field.regExpError}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full text-left">
              <button
                type="submit"
                className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-green-800 text-white text-md font-bold border border-green-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6"
              >
                <span>Register</span>
              </button>
            </div>
            <div className="flex flex-wrap w-full p-4">
              <span className="text-md font-bold">
                Have an account?
                <Link
                  to="/"
                  className="text-blue-800 hover:text-purple-800 text-md font-semibold"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
