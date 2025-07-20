import React, { useState } from 'react';
import { addQuestionToQuiz } from '../api/quizApi';
import '../styles/quizForm.css';

const COLORS = ['red', 'blue', 'yellow', 'green'];

export function AddQuestionPage() {
  const [quizId, setQuizId] = useState('');
  const [question, setQuestion] = useState({
    text: '',
    timeLimit: 30,
    options: [],
    image: '',
  });
  const [option, setOption] = useState({ text: '', isCorrect: false });

  const getRandomColor = (usedColors) => {
    const remaining = COLORS.filter(c => !usedColors.includes(c));
    const pool = remaining.length > 0 ? remaining : COLORS;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const addOption = () => {
    const usedColors = question.options.map(o => o.color);
    const assignedColor = getRandomColor(usedColors);

    const newOption = {
      ...option,
      color: assignedColor,
    };

    setQuestion(prev => ({
      ...prev,
      options: [...prev.options, newOption],
    }));

    setOption({ text: '', isCorrect: false });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in as admin.');
      return;
    }

    const res = await addQuestionToQuiz(quizId, question, token);
    console.log(res);
    alert('✅ Question Added!');
    setQuestion({ text: '', timeLimit: 30, options: [], image: '' });
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Add Question to Quiz</h2>
        <input
          placeholder="Quiz ID"
          value={quizId}
          onChange={e => setQuizId(e.target.value)}
        />
        <input
          placeholder="Question Text"
          value={question.text}
          onChange={e => setQuestion({ ...question, text: e.target.value })}
        />
        <input
          type="number"
          placeholder="Time Limit (sec)"
          value={question.timeLimit}
          onChange={e =>
            setQuestion({ ...question, timeLimit: parseInt(e.target.value) })
          }
        />

        <h4>Upload Image (optional)</h4>
        <UploadImage onUpload={url => setQuestion(prev => ({ ...prev, image: url }))} />
        {question.image && (
          <div style={{ marginTop: '10px' }}>
            <img src={question.image} alt="Uploaded" width="200" />
          </div>
        )}

        <h4>Add Option</h4>
        <input
          placeholder="Option Text"
          value={option.text}
          onChange={e => setOption({ ...option, text: e.target.value })}
        />
        <select
          value={option.isCorrect}
          onChange={e =>
            setOption({ ...option, isCorrect: e.target.value === 'true' })
          }
        >
          <option value="false">Incorrect</option>
          <option value="true">Correct</option>
        </select>
        <button onClick={addOption}>Add Option</button>

        <ul>
          {question.options.map((o, idx) => (
            <li key={idx}>
              {o.text} - {o.color} - {o.isCorrect ? '✅' : '❌'}
            </li>
          ))}
        </ul>

        <button onClick={handleSubmit}>🚀 Add Question</button>
      </div>
    </div>
  );
}

// --- UPDATED UploadImage COMPONENT ---
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
      onUpload(data.url);
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


