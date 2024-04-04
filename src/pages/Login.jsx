import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log(data)
    try {
      let result = await fetch("https://chattu-server.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // console.log(result)
      if (result.ok) {
        result = await result.json();
        // console.log(result)
        localStorage.setItem("jwt", result.jwt);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/home");
        window.location.reload(true);
      } else {
        alert(result.msg || result.issues[0].message);
      }
      setIsLoading(false);
      setData({
        username: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" w-4/5 sm:w-2/6 bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 flex flex-col justify-items-center align-middle text-center p-6">
        <h1 className="text-2xl font-bold text-white p-4">
          Login
          <span className="text-blue-600 ml-2">ChatApp</span>
        </h1>
        <form
          className="flex flex-col justify-center align-middle w-3/4 mx-auto my-4"
          onSubmit={handleSubmit}
        >
          <label className="input input-bordered flex items-center gap-2 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              value={data.username}
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
              className="grow"
              placeholder="Username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              placeholder="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="grow"
            />
          </label>
          <button type="submit" className="btn bg-blue-600">
            {isLoading ? (
              <span className="loading loading-spinner text-info"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="font-medium">
          Don't have an account ?{" "}
          <NavLink
            to="/register"
            className="text-blue-500 text-lg font-semibold"
          >
            SignUp
          </NavLink>
        </p>
      </div>
    </>
  );
};
