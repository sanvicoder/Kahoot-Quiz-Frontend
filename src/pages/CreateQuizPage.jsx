import React, { useState } from 'react';
import { createQuiz } from '../api/quizApi';
import '../styles/quizForm.css';

export function CreateQuizPage() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({ text: '', timeLimit: 30, options: [] });
  const [currentOption, setCurrentOption] = useState({ text: '', color: '', isCorrect: 0 });

  const addOption = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: [...prev.options, currentOption],
    }));
    setCurrentOption({ text: '', color: '', isCorrect: 0 });
  };

  const addQuestion = () => {
    setQuestions(prev => [...prev, currentQuestion]);
    setCurrentQuestion({ text: '', timeLimit: 30, options: [] });
  };

  const handleSubmit = async () => {
    const token = prompt('Enter JWT token');
    const payload = { title, questions };
    const res = await createQuiz(payload, token);
    console.log(res);
    alert('Quiz Created! ID: ${res.id}');
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Create Quiz</h2>
        <input placeholder="Quiz Title" value={title} onChange={e => setTitle(e.target.value)} />

        <h3>Add Question</h3>
        <input placeholder="Question Text" value={currentQuestion.text} onChange={e => setCurrentQuestion({ ...currentQuestion, text: e.target.value })} />
        <input type="number" placeholder="Time Limit" value={currentQuestion.timeLimit} onChange={e => setCurrentQuestion({ ...currentQuestion, timeLimit: parseInt(e.target.value) })} />

        <h4>Add Option</h4>
        <input placeholder="Option Text" value={currentOption.text} onChange={e => setCurrentOption({ ...currentOption, text: e.target.value })} />
        <input placeholder="Color" value={currentOption.color} onChange={e => setCurrentOption({ ...currentOption, color: e.target.value })} />
        <select value={currentOption.isCorrect} onChange={e => setCurrentOption({ ...currentOption, isCorrect: parseInt(e.target.value) })}>
          <option value={0}>Incorrect</option>
          <option value={1}>Correct</option>
        </select>
        <button onClick={addOption}>Add Option</button>

        <ul>
          {currentQuestion.options.map((o, idx) => <li key={idx}>{o.text} - {o.color} - {o.isCorrect ? 'Correct' : 'Wrong'}</li>)}
        </ul>

        <button onClick={addQuestion}>Add Question</button>
        <h3>Questions Added: {questions.length}</h3>
        <button onClick={handleSubmit}>Create Quiz</button>
      </div>
    </div>
  );
}