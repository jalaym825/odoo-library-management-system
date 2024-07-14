import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./Pages/Auth/SignUp";
import { Login } from "./Pages/Auth/Login";
// import Dashboard from "./Pages/Admin/Table";
// import UserLayout from "./Components/Admin/UserLayout";
import Admin from "./Pages/Admin/Admin";
import Home from "./Pages/Home";
import UserLayout from "./Components/UserLayout/UserLayout";
import Global from "./Utils/Global";
import Dashboard from "./Pages/Librarian/Librarian";

// import AdminPage from "./Pages/Admin/Navbar";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const user = await Global.getUser();
        if (user) {
          Global.user = user;
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    })()
  }, []);

  return (
    <>
      {
        loading ? (
          <div className="flex justify-center items-center h-screen">
            <img src={reactLogo} alt="React Logo" className="animate-spin h-16 w-16 mr-2" />
            <img src={viteLogo} alt="Vite Logo" className="animate-pulse h-16 w-16" />
          </div>
        ) : <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route path="" element={<Home />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/librarian-dashboard" element={<Dashboard />} />
        </Routes>
      }
    </>
  );
}

export default App;
