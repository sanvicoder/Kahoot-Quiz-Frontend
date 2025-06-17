import React, { useState } from 'react';
import './FormPage.css';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleRegister = async () => {
  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (password.length < 6) {
    alert('Password should be at least 6 characters long.');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/admin/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    alert(data.message || 'Registered successfully');
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <div className="container">
      <h2>Admin Registration</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default AdminRegister;

