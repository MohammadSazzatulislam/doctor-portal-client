import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import useToken from "../../Hooks/useToken";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { signInUser } = useContext(AuthContext);

  const [loginErrors, setLoginErrors] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
    setLoginErrors("");
    signInUser(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login successfully");
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginErrors(error.message);
      });
  };

  return (
    <div className="w-full mx-auto flex flex-col my-32 justify-center items-center">
      <div className="h-[500px] w-[385px] rounded border shadow-lg p-7 ">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="text-sm">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email Address is required" })}
              placeholder="Email"
              className="input input-bordered text-black w-full "
            />
            {errors.email && (
              <p className="text-red-600 text-xs">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="text-sm">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "password must be 6 cherecters or longer",
                },
              })}
              placeholder="Password"
              className="input input-bordered text-black w-full "
            />
            {errors.password && (
              <p className="text-red-600 text-xs">{errors.password?.message}</p>
            )}
            <label className="label">
              <span className="text-sm">Forgot Password ?</span>
            </label>
          </div>
          <input
            className="btn btn-accent text-white w-full "
            type="submit"
            value="Login"
          />
          {loginErrors && (
            <label className="label">
              <span className=" text-red-600 text-xs">{loginErrors}</span>
            </label>
          )}
          <label className="label flex gap-3">
            <span className="">New To Doctors Portal ? </span>
            <Link to="/signup">
              <span className="label-text-alt text-secondary font-semibold ">
                Create New Account
              </span>
            </Link>
          </label>
        </form>
        <div className="divider ">OR</div>
        <input
          className="btn btn-primary text-white  w-full "
          type="submit"
          value=" continue with google"
        />
      </div>
    </div>
  );
};

export default Login;
