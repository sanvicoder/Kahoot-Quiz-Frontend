import React, { useState } from 'react';
import { getQuizById } from '../api/quizApi';
import { useNavigate } from 'react-router-dom';
import '../styles/quizForm.css';

export function ViewQuizPage() {
  const [quizId, setQuizId] = useState('');
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();

  const fetchQuiz = async () => {
    const res = await getQuizById(quizId);
    setQuiz(res);
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>View Quiz</h2>
        <input
          placeholder="Quiz ID"
          value={quizId}
          onChange={e => setQuizId(e.target.value)}
        />
        <button onClick={fetchQuiz}>Fetch Quiz</button>

        {quiz && (
          <div>
            <h3>{quiz.title}</h3>
            {quiz.questions.map((q, idx) => (
              <div key={q.id || idx} className="question-block">
                {/* Display image if present */}
                {q.image && (
                  <div style={{ margin: '10px 0' }}>
                    <img
                      src={q.image}
                      alt="Quiz"
                      style={{
                        maxWidth: 200,
                        maxHeight: 150,
                        borderRadius: 8,
                        display: 'block',
                      }}
                    />
                  </div>
                )}
                <h4>
                  {q.text} ({q.timeLimit}s)
                </h4>
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i}>
                      {opt.text} - {opt.color} -{' '}
                      {opt.isCorrect ? 'Correct' : 'Wrong'}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}/question/${q.id}`)
                  }
                >
                  Manage Question
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
