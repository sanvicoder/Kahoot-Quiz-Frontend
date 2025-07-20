import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById } from '../api/quizApi';
import './QuizGame.css';

const COLORS = ['red', 'blue', 'green', 'yellow'];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function assignShuffledColors(options) {
  const shuffledColors = shuffleArray(COLORS);
  return options.map((opt, i) => ({
    ...opt,
    color: shuffledColors[i % COLORS.length],
  }));
}

const QuizGame = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await getQuizById(quizId);
      setQuiz(res);
    };
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (quiz && quiz.questions.length > 0) {
      const options = assignShuffledColors(quiz.questions[currentIndex].options);
      setShuffledOptions(shuffleArray(options));
      setTimeLeft(quiz.questions[currentIndex].timeLimit || 30);
      setSelectedOption(null);
      setFeedback('');
    }
  }, [quiz, currentIndex]);

  useEffect(() => {
    if (!quiz || quizComplete || selectedOption || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, quizComplete, selectedOption, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !selectedOption) {
      setFeedback('⏰ Time’s up!');
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    }
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    if (selectedOption || quizComplete) return;

    setSelectedOption(option.text);
    setFeedback(option.isCorrect ? '✅ Correct!' : '❌ Wrong!');
    if (option.isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  if (!quiz) return <div className="quiz-game">Loading...</div>;

  if (quizComplete) {
    return (
      <div className="quiz-game">
        <h2 className="quiz-title">{quiz.title}</h2>
        <div className="quiz-complete">🎉 Quiz Complete!</div>
        <div className="score-display">Your Score: {score} / {quiz.questions.length}</div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIndex];

  return (
    <div className="quiz-game">
      <h2 className="quiz-title">{quiz.title}</h2>
      <div className="score-timer">
        <span>⏱ Time Left: {timeLeft}s</span>
        <span>⭐ Score: {score}</span>
      </div>
      <div className="question-box">
        {currentQuestion.image && (
  <div style={{ marginBottom: 20 }}>
    <img
      src={currentQuestion.image}
      alt="Question Visual"
      style={{ maxHeight: 200, borderRadius: 10 }}
    />
  </div>
)}
        <h3 className="question-text">{currentQuestion.text}</h3>
      </div>
      <div className="options-container">
        {shuffledOptions.map((opt, idx) => {
          const isSelected = selectedOption === opt.text;
          const isCorrect = opt.isCorrect;
          const classNames = [
            'option-btn',
            opt.color,
            selectedOption && isSelected && isCorrect && 'correct',
            selectedOption && isSelected && !isCorrect && 'wrong',
            selectedOption && !isSelected && 'disabled'
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={idx}
              className={classNames}
              onClick={() => handleOptionClick(opt)}
              disabled={!!selectedOption}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
};

export default QuizGame;
