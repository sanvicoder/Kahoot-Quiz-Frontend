import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  return (
    <Router>
      <Navbar /> {/* ✅ Use your dynamic Navbar here */}
      
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
