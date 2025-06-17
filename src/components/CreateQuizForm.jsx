import React, { useState } from 'react';

export default function CreateQuizForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, {
      text: '',
      timeLimit: 30,
      options: [
        { text: '', color: 'red', isCorrect: false },
        { text: '', color: 'blue', isCorrect: false }
      ]
    }]);
  };

  const handleQuestionChange = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setQuestions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, questions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Quiz</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Quiz Title" required />
      <button type="button" onClick={addQuestion}>+ Add Question</button>
      {questions.map((q, idx) => (
        <div key={idx}>
          <input placeholder="Question text" value={q.text} onChange={e => handleQuestionChange(idx, 'text', e.target.value)} required />
          <input type="number" value={q.timeLimit} onChange={e => handleQuestionChange(idx, 'timeLimit', Number(e.target.value))} />
          {/* You can expand this to handle options input */}
        </div>
      ))}
      <button type="submit">Create Quiz</button>
    </form>
  );
}
