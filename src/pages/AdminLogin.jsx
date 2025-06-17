import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

 const handleLogin = async () => {
  if (!email || !password) {
    alert('Please fill in both fields.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (password.length < 6) {
    alert('Password should be at least 6 characters.');
    return;
  }

        try {
            const res = await fetch('http://localhost:3000/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.access_token);
                navigate('/profile');  // ✅ Go to admin profile
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            alert(err.message);
        }
    };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
