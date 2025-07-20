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

export async function updateQuestion(quizId, questionId, question, token) {
  console.log(JSON.stringify(question));
  const res = await fetch(`http://localhost:3000/quiz/${quizId}/question/${questionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(question),
  });
  return await res.json();
}

export async function deleteQuestion(quizId, questionId, token) {
  const res = await fetch(`http://localhost:3000/quiz/${quizId}/question/${questionId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}
