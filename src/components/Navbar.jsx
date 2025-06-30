import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isPlayerActive, setIsPlayerActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // admin token
    const playerInfo = localStorage.getItem("playerInfo"); // player info object
    setIsAdminLoggedIn(!!token);
    setIsPlayerActive(!!playerInfo);
  }, [localStorage.getItem("token"), localStorage.getItem("playerInfo")]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAdminLoggedIn(false);
    setIsPlayerActive(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>

        {/* When no one is logged in */}
        {!isAdminLoggedIn && !isPlayerActive && (
          <>
            <Link to="/admin/register">Register</Link>
            <Link to="/admin/login">Login</Link>
            {/* <Link to="/player/join">Player</Link> */}
          </>
        )}

        {/* Admin-only options */}
        {isAdminLoggedIn && (
          <>
            <Link to="/quiz/create">Create Quiz</Link>
            <Link to="/quiz/add-question">Add Question</Link>
            <Link to="/quiz/view">View Quiz</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        )}

        {/* Player-only Logout */}
        {isPlayerActive && !isAdminLoggedIn && (
          <button onClick={handleLogout} className="logout-button">Exit</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
