const BASE_URL = 'http://localhost:3000';

export const createQuiz = async (data, token) => {
  const res = await fetch(`${BASE_URL}/quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const addQuestionToQuiz = async (quizId, data, token) => {
  const res = await fetch(`${BASE_URL}/quiz/${quizId}/add-question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getQuizById = async (id) => {
  const res = await fetch(`${BASE_URL}/quiz/${id}`);
  return res.json();
};