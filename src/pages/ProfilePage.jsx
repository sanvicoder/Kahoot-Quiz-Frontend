import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    if (!token) {
      alert('Please log in first.');
      navigate('/login');
      return;
    }

    fetch('http://localhost:3000/admin/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();
        setProfile(data);
      })
      .catch((err) => {
        console.error(err);
        alert('Session expired or invalid. Please log in again.');
        navigate('/login');
      });
  }, [navigate]);

  if (!profile) return null;

  return (
   <div className="container">
  <div className="profile-card">
    <h2>👤 Admin Profile</h2>
    <p><strong>ID:</strong> {profile.userId}</p>
    <p><strong>Email:</strong> {profile.email}</p>
    <p><strong>Role:</strong> {profile.role}</p>
    <button onClick={() => {
      localStorage.clear();
      navigate('/');
    }}>Logout</button>
  </div>
</div>
  );
};

export default ProfilePage;
