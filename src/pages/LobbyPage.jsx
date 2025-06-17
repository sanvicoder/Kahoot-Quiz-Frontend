import React from 'react';

const LobbyPage = () => {
  const playerInfo = JSON.parse(localStorage.getItem('playerInfo'));

  return (
    <div className="container">
      <h2>Welcome to the Lobby!</h2>
      {playerInfo && (
        <>
          <p><strong>Nickname:</strong> {playerInfo.nickname}</p>
          <p><strong>Join Code:</strong> {playerInfo.joinCode}</p>
        </>
      )}
    </div>
  );
};

export default LobbyPage;
