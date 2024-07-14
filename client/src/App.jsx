import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./Pages/Auth/SignUp";
import { Login } from "./Pages/Auth/Login";
// import Dashboard from "./Pages/Admin/Table";
// import UserLayout from "./Components/Admin/UserLayout";
import Admin from "./Pages/Admin/Admin";
import Librarian from "./Pages/Librarian/Librarian";
import Report from "./Pages/Report/Report";

// import AdminPage from "./Pages/Admin/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      
        <Route path="" element={<Admin />}/>
        <Route path="/librarian" element={<Librarian/>}/>
        <Route path="/report" element={<Report/>}/>

      </Routes>
    </>
  );
}

export default App;
