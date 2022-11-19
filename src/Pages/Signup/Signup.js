import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import useToken from "../../Hooks/useToken";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, userNameUpdate } = useContext(AuthContext);
  const [createEmail, setCreateEmail] = useState("");
  const [token] = useToken(createEmail);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const handleSignUp = (data) => {
    createUser(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;

        userNameUpdate(data.name)
          .then(() => {
            userInfo(data.name, data.email);
          })
          .catch((error) => {});
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const userInfo = (name, email) => {
    const users = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreateEmail(email);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="w-full mx-auto flex flex-col my-32 justify-center items-center">
      <div className="h-[590px] w-[385px] border rounded shadow-lg p-7 ">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="text-sm">Name</span>
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              type="text"
              placeholder="Name"
              className="input input-bordered text-black w-full "
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="text-sm">Email</span>
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Email"
              className="input input-bordered text-black w-full "
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="text-sm">Password</span>
            </label>
            <input
              {...register("password", {
                required: "password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                },
              })}
              type="password"
              placeholder="Password"
              className="input input-bordered text-black w-full "
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <input
            className="btn btn-accent text-white mt-4 w-full "
            type="submit"
            value="Sign Up"
          />
          <label className="label flex gap-3">
            <span className="text-sm">Alredy have an account ? </span>
            <Link to="/login">
              <span className="label-text-alt text-secondary font-semibold ">
                Please LogIn
              </span>
            </Link>
          </label>
        </form>
        <div className="divider">OR</div>
        <input
          className="btn btn-primary text-white mt-4 w-full "
          type="submit"
          value=" continue with google"
        />
      </div>
    </div>
  );
};

export default Signup;
