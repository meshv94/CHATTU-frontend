import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./User";

export const SliderBar = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  const getData = async () => {
    // console.log("token", { jwt: localStorage.getItem("jwt") });
    try {
      let data = await fetch("https://chattu-server.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jwt: localStorage.getItem("jwt") }),
      });
      if (data.ok) {
        data = await data.json();
        // console.log(data);
        setData(data);
      } else {
        data = await data.json();
        // console.log(data);
        alert("please login to access");
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(true);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="drawer lg:drawer-open w-full lg:w-fit bg-base-100 h-fit">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col z-20 navbar">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-active drawer-button lg:hidden rounded-none place-self-end bg-base-100"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/10890/10890008.png"
              width={30}
            />
          </label>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-100 min-h-full bg-base-200 text-base-content">
            {/* <SearchBar /> */}

            {/* searchbar code */}
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>

            {/* Sidebar content here */}
            {data &&
              data.map((item, index) => {
                if (item.username.match(search)) {
                  return (
                    <li key={index} className="my-0.5">
                      <User user={item} />
                    </li>
                  );
                }
              })}
            <li>
              <button
                className="btn btn-active h-20 flex flex-row p-1 mt-3 hover:bg-sky-500"
                onClick={logout}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1286/1286907.png"
                  alt="logout"
                  width={23}
                />
                <p className="self-center text-base font-bold text-white">
                  Logout
                </p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
