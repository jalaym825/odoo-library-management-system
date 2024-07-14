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
import LibrarianDashboard from './Pages/Librarian/Librarian'

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
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      
        <Route path="/admin" element={<Admin />}/>
        <Route path="/librarian" element={<LibrarianDashboard />}/>

      </Routes>
    </>
  );
}

export default App;
