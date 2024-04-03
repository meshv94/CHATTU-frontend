import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { useState } from "react";

function App() {
  const [user, setuser] = useState(localStorage.getItem("user") || null);
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <BrowserRouter>
          <Routes>
          <Route
              path="/"
              element={<Login />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/home"
              element={<Home />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
