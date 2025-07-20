import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById, updateQuestion, deleteQuestion } from '../api/quizApi';
import '../styles/quizForm.css';

const COLORS = ['red', 'blue', 'yellow', 'green'];

function assignShuffledColors(options) {
  const shuffled = [...COLORS].sort(() => 0.5 - Math.random());
  return options.map((opt, idx) => ({
    ...opt,
    color: shuffled[idx % shuffled.length],
  }));
}

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


export function ManageQuestionPage() {
  const { quizId, questionId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [question, setQuestion] = useState(null);
  const [updatedQuestion, setUpdatedQuestion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await getQuizById(quizId);
      setQuiz(res);
      const q = res.questions.find(q => q.id === questionId);
      if (q) {
        setQuestion(q);
        setUpdatedQuestion({ ...q, options: assignShuffledColors(q.options) });
      }
    };
    fetchQuiz();
  }, [quizId, questionId]);

  const handleOptionChange = (index, key, value) => {
    const updatedOptions = [...updatedQuestion.options];
    updatedOptions[index][key] = key === 'isCorrect' ? value === 'true' : value;
    setUpdatedQuestion({ ...updatedQuestion, options: updatedOptions });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized');
      return;
    }

    const sanitizedQuestion = {
      text: updatedQuestion.text,
      timeLimit: updatedQuestion.timeLimit,
      image: updatedQuestion.image || null,
      options: updatedQuestion.options.map(({ text, isCorrect, color }) => ({
        text,
        isCorrect,
        color,
      })),
    };

    try {
      await updateQuestion(quizId, questionId, sanitizedQuestion, token);
      alert('✅ Question updated!');
      navigate('/quiz/view');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update question.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this question?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized');
      return;
    }

    await deleteQuestion(quizId, questionId, token);
    alert('Question deleted!');
    navigate('/quiz/view');
  };

  if (!question || !updatedQuestion) return <p>Loading...</p>;

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Edit Question</h2>
        <input
          value={updatedQuestion.text || ''}
          onChange={e => setUpdatedQuestion({ ...updatedQuestion, text: e.target.value })}
        />
        <input
          type="number"
          value={updatedQuestion.timeLimit}
          onChange={e =>
            setUpdatedQuestion({ ...updatedQuestion, timeLimit: parseInt(e.target.value) })
          }
        />

        <h4>Upload / Replace Image</h4>
        <UploadImage onUpload={url => setUpdatedQuestion(prev => ({ ...prev, image: url }))} />
        {updatedQuestion.image && (
          <div style={{ marginTop: '10px' }}>
            <img src={updatedQuestion.image} alt="Preview" width="200" />
          </div>
        )}

        <h3>Edit Options</h3>
        {updatedQuestion.options.map((opt, idx) => (
          <div key={idx}>
            <input
              value={opt.text || ''}
              onChange={e => handleOptionChange(idx, 'text', e.target.value)}
            />
            <span style={{ margin: '0 10px', fontWeight: 'bold' }}>
              Color: <span style={{ color: opt.color }}>{opt.color}</span>
            </span>
            <select
              value={opt.isCorrect.toString()}
              onChange={e => handleOptionChange(idx, 'isCorrect', e.target.value)}
            >
              <option value="false">Incorrect</option>
              <option value="true">Correct</option>
            </select>
          </div>
        ))}

        <button onClick={handleUpdate}>Save Changes</button>
        <button
          onClick={handleDelete}
          style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
        >
          Delete Question
        </button>
        <button
          onClick={() => navigate('/quiz/view')}
          style={{ marginLeft: '10px', backgroundColor: '#ccc' }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

