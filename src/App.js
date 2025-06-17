import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import PlayerPage from './pages/PlayerPage';
import LandingPage from './pages/LandingPage';
import LobbyPage from './pages/LobbyPage';
import ProfilePage from './pages/ProfilePage';
import PlayQuiz from './pages/PlayQuiz';
import QuizGame from './pages/QuizGame';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import { CreateQuizPage } from './pages/CreateQuizPage';
import { AddQuestionPage } from './pages/AddQuestionPage';
import { ViewQuizPage } from './pages/ViewQuizPage';
import './styles/global.css';

function App() {
  const isAdminLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="navbar">
        <Link to="/">Home</Link>
            <Link to="/admin/register">Register</Link>
            <Link to="/admin/login">Login</Link>
        <Link to="/player/join">Player</Link>
        {isAdminLoggedIn && (
          <>
            <Link to="/quiz/create">Create Quiz</Link>
            <Link to="/quiz/add-question">Add Question</Link>
            <Link to="/quiz/view">View Quiz</Link>
          </>
        )}
        <Link to="/play">Play Quiz</Link>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/player/join" element={<PlayerPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* ✅ Protected admin-only routes */}
        <Route
          path="/quiz/create"
          element={
            <ProtectedRoute>
              <CreateQuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/add-question"
          element={
            <ProtectedRoute>
              <AddQuestionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/view"
          element={
            <ProtectedRoute>
              <ViewQuizPage />
            </ProtectedRoute>
          }
        />

        <Route path="/play" element={<PlayQuiz />} />
        <Route path="/quiz/:quizId" element={<QuizGame />} />
      </Routes>
    </Router>
  );
}

export default App;
