import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./Pages/Auth/SignUp";
import { Login } from "./Pages/Auth/Login";
// import Dashboard from "./Pages/Admin/Table";
// import UserLayout from "./Components/Admin/UserLayout";
// import Admin from "./Pages/Admin/Admin";
import Home from "./Pages/User/Home";
import MainHome from "./Pages/User/MainHome";
import UserLayout from "./Components/UserLayout/UserLayout";

// import AdminPage from "./Pages/Admin/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserLayout />}>
        <Route path="" element={<MainHome />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
