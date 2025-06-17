import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById } from '../api/quizApi';
import './QuizGame.css'; // 👈 Create this file

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const QuizGame = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await getQuizById(quizId);
      setQuiz(res);
    };
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (quiz && quiz.questions.length > 0) {
      const options = shuffleArray(quiz.questions[currentIndex].options);
      setShuffledOptions(options);
    }
  }, [quiz, currentIndex]);

  if (!quiz) return <div className="quiz-game">Loading...</div>;

  const currentQuestion = quiz.questions[currentIndex];

  const handleOptionClick = (option) => {
    alert(option.isCorrect ? '✅ Correct!' : '❌ Wrong!');
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('🎉 Quiz Complete!');
    }
  };

  return (
    <div className="quiz-game">
      <h2 className="quiz-title">{quiz.title}</h2>
      <div className="question-box">
        <h3 className="question-text">{currentQuestion.text}</h3>
      </div>
      <div className="options-container">
        {shuffledOptions.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(opt)}
            className={`option-btn ${opt.color}`}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizGame;

