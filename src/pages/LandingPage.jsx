import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>🎉 Welcome to Kahoot-Clone!</h1>
      <p>Create and play live quizzes with ease.</p>
      <div className="landing-buttons">
        <Link to="/admin/register" className="btn">Get Started</Link>
        <Link to="/player/join" className="btn btn-secondary">Join as Player</Link>
      </div>
    </div>
  );
};


export default LandingPage;


