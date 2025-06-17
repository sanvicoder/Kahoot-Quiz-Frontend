import React from 'react';

export default function ViewQuiz({ quiz }) {
  return (
    <div>
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q, idx) => (
        <div key={idx}>
          <h3>{q.text} ({q.timeLimit}s)</h3>
          {q.options.map((o, i) => (
            <div key={i} style={{ background: o.color }}>
              {o.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
