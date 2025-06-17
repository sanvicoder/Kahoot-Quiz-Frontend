import React, { useState } from 'react';
import { addQuestionToQuiz } from '../api/quizApi';
import '../styles/quizForm.css';

export function AddQuestionPage() {
  const [quizId, setQuizId] = useState('');
  const [question, setQuestion] = useState({ text: '', timeLimit: 30, options: [] });
  const [option, setOption] = useState({ text: '', color: '', isCorrect: 0 });

  const addOption = () => {
    setQuestion(prev => ({
      ...prev,
      options: [...prev.options, option],
    }));
    setOption({ text: '', color: '', isCorrect: 0 });
  };

  const handleSubmit = async () => {
    const token = prompt('Enter JWT token');
    const res = await addQuestionToQuiz(quizId, question, token);
    console.log(res);
    alert('Question Added!');
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Add Question to Quiz</h2>
        <input placeholder="Quiz ID" value={quizId} onChange={e => setQuizId(e.target.value)} />
        <input placeholder="Question Text" value={question.text} onChange={e => setQuestion({ ...question, text: e.target.value })} />
        <input type="number" placeholder="Time Limit" value={question.timeLimit} onChange={e => setQuestion({ ...question, timeLimit: parseInt(e.target.value) })} />

        <h4>Add Option</h4>
        <input placeholder="Option Text" value={option.text} onChange={e => setOption({ ...option, text: e.target.value })} />
        <input placeholder="Color" value={option.color} onChange={e => setOption({ ...option, color: e.target.value })} />
        <select value={option.isCorrect} onChange={e => setOption({ ...option, isCorrect: parseInt(e.target.value) })}>
          <option value={0}>Incorrect</option>
          <option value={1}>Correct</option>
        </select>
        <button onClick={addOption}>Add Option</button>

        <ul>
          {question.options.map((o, idx) => <li key={idx}>{o.text} - {o.color} - {o.isCorrect ? 'Correct' : 'Wrong'}</li>)}
        </ul>

        <button onClick={handleSubmit}>Add Question</button>
      </div>
    </div>
  );
}
