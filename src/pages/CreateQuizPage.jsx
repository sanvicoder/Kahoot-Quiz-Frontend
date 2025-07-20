import React, { useState } from 'react';
import { createQuiz } from '../api/quizApi';
import '../styles/quizForm.css';

const COLORS = ['red', 'blue', 'yellow', 'green'];

export function CreateQuizPage() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({ text: '', timeLimit: 30, options: [], image: '' });
  const [currentOption, setCurrentOption] = useState({ text: '', isCorrect: 0 });

  const getRandomColor = (usedColors) => {
    const remaining = COLORS.filter(c => !usedColors.includes(c));
    const pool = remaining.length > 0 ? remaining : COLORS;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const addOption = () => {
    const usedColors = currentQuestion.options.map(o => o.color);
    const color = getRandomColor(usedColors);

    const newOption = {
      ...currentOption,
      color,
      isCorrect: Boolean(currentOption.isCorrect),
    };

    setCurrentQuestion(prev => ({
      ...prev,
      options: [...prev.options, newOption],
    }));

    setCurrentOption({ text: '', isCorrect: 0 });
  };

  const addQuestion = () => {
    setQuestions(prev => [...prev, currentQuestion]);
    setCurrentQuestion({ text: '', timeLimit: 30, options: [], image: '' });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Login required');

    const payload = { title, questions };
    const res = await createQuiz(payload, token);
    alert(`Quiz Created! ID: ${res.id}`);
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Create Quiz</h2>
        <input
          placeholder="Quiz Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <h3>Add Question</h3>
        <input
          placeholder="Question Text"
          value={currentQuestion.text}
          onChange={e => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
        />
        <input
          type="number"
          placeholder="Time Limit (seconds)"
          value={currentQuestion.timeLimit}
          onChange={e => setCurrentQuestion({ ...currentQuestion, timeLimit: parseInt(e.target.value) })}
        />

        <h4>Upload Image (optional)</h4>
        <UploadImage onUpload={url => setCurrentQuestion(prev => ({ ...prev, image: url }))} />
        {currentQuestion.image && (
          <div style={{ marginTop: '10px' }}>
            <img src={currentQuestion.image} alt="Uploaded" width="200" />
          </div>
        )}

        <h4>Add Option</h4>
        <input
          placeholder="Option Text"
          value={currentOption.text}
          onChange={e => setCurrentOption({ ...currentOption, text: e.target.value })}
        />
        <select
          value={currentOption.isCorrect}
          onChange={e => setCurrentOption({ ...currentOption, isCorrect: parseInt(e.target.value) })}
        >
          <option value={0}>Incorrect</option>
          <option value={1}>Correct</option>
        </select>
        <button onClick={addOption}>Add Option</button>

        <ul>
          {currentQuestion.options.map((o, idx) => (
            <li key={idx}>
              {o.text} - {o.color} - {o.isCorrect ? '✅' : '❌'}
            </li>
          ))}
        </ul>

        <button onClick={addQuestion}>➕ Add Question</button>
        <h3>Questions Added: {questions.length}</h3>
        <button onClick={handleSubmit}>🚀 Create Quiz</button>
      </div>
    </div>
  );
}

// Reusable image uploader component
function UploadImage({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:3000/quiz/upload-image', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      onUpload(data.url); // Save image URL to the question
      alert('Upload success!');
    } else {
      alert('Upload failed!');
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={!file}>Upload Image</button>
    </>
  );
}

