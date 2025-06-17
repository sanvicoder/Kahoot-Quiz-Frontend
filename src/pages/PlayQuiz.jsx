// src/pages/PlayQuiz.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayQuiz = () => {
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!quizId) {
      alert('Enter a quiz ID');
      return;
    }
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Join Quiz</h2>
        <input
          type="text"
          placeholder="Enter Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
        />
        <button onClick={handleJoin}>Join Quiz</button>
      </div>
    </div>
  );
};

export default PlayQuiz;
