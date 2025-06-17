import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerPage = () => {
  const [nickname, setNickname] = useState('');
  const [playerInfo, setPlayerInfo] = useState(null);
  const navigate = useNavigate();

  const generateRandomNickname = () => {
    const adjectives = ['Speedy', 'Brave', 'Silly', 'Funky', 'Nimble'];
    const animals = ['Lion', 'Tiger', 'Zebra', 'Otter', 'Panda'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `${adj}${animal}`;
  };

  const handleJoin = async () => {
    const finalNickname = nickname.trim() || generateRandomNickname();

    try {
      const res = await fetch('http://localhost:3000/player/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: finalNickname }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to join');

      // Save in localStorage
      localStorage.setItem('playerInfo', JSON.stringify(data.player));

      setPlayerInfo(data.player);

      // Redirect to /lobby after 2s (optional)
      setTimeout(() => {
        navigate('/lobby');
      }, 2000);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Join the Quiz</h2>
      {!playerInfo ? (
        <>
          <input
            type="text"
            placeholder="Enter Nickname (or leave blank)"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <button onClick={handleJoin}>Join</button>
        </>
      ) : (
        <div className="player-info">
          <h3>🎉 Joined Successfully!</h3>
          <p><strong>Nickname:</strong> {playerInfo.nickname}</p>
          <p><strong>Player ID:</strong> {playerInfo.id}</p>
          <p><strong>Join Code:</strong> {playerInfo.joinCode}</p>
          <p>Redirecting to lobby...</p>
        </div>
      )}
    </div>
  );
};

export default PlayerPage;

