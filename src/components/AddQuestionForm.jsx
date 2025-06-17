import React, { useState } from 'react';

export default function AddQuestionForm({ quizId, onSubmit }) {
  const [text, setText] = useState('');
  const [timeLimit, setTimeLimit] = useState(30);
  const [options, setOptions] = useState([
    { text: '', color: 'red', isCorrect: false },
    { text: '', color: 'blue', isCorrect: false }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(quizId, { text, timeLimit, options });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Question to Quiz</h2>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Question" required />
      <input type="number" value={timeLimit} onChange={e => setTimeLimit(Number(e.target.value))} required />
      {options.map((opt, idx) => (
        <div key={idx}>
          <input placeholder="Option text" value={opt.text} onChange={e => {
            const updated = [...options];
            updated[idx].text = e.target.value;
            setOptions(updated);
          }} />
          <select value={opt.color} onChange={e => {
            const updated = [...options];
            updated[idx].color = e.target.value;
            setOptions(updated);
          }}>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
          <label>
            Correct?
            <input type="checkbox" checked={opt.isCorrect} onChange={e => {
              const updated = [...options];
              updated[idx].isCorrect = e.target.checked;
              setOptions(updated);
            }} />
          </label>
        </div>
      ))}
      <button type="submit">Add Question</button>
    </form>
  );
}
