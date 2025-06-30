import React from 'react';
import { Link } from "react-router-dom";
const LobbyPage = () => {
  const playerInfo = JSON.parse(localStorage.getItem('playerInfo'));

  return (
    <div className="container">
      <h2>Welcome to the Lobby!</h2>
      {playerInfo && (
        <>
          <p><strong>Nickname:</strong> {playerInfo.nickname}</p>
          {/* <p><strong>Player ID:</strong> {playerInfo.id}</p> */}
        </>
      )}
       <Link to="/play" className="btn">Play Quiz</Link>
    </div>
  );
};

export default LobbyPage;

