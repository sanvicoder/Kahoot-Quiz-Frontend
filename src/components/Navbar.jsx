import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAdminLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAdminLoggedIn(false);
    navigate("/admin/login"); // redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>

        {!isAdminLoggedIn && (
          <>
            <Link to="/admin/register">Register</Link>
            <Link to="/admin/login">Login</Link>
          </>
        )}

        <Link to="/player/join">Player</Link>

        {isAdminLoggedIn && (
          <>
            <Link to="/quiz/create">Create Quiz</Link>
            <Link to="/quiz/add-question">Add Question</Link>
            <Link to="/quiz/view">View Quiz</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
