import React, { useState } from 'react';
import './DeleteRoom.css';

function DeleteRoom() {
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');

  const handleDeleteRoom = () => {
    fetch(`/rooms/${roomId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setMessage('Room deleted successfully');
        // Optionally, redirect to rooms list or perform any other action after room deletion
      } else {
        setMessage('Failed to delete room');
      }
    })
    .catch(error => console.error('Error deleting room:', error));
  };

  return (
    <div className="delete-room-container">
      <h1>Delete Room</h1>
      <p>{message}</p>
      <form className="delete-room-form">
        <label htmlFor="roomId">Room ID:</label>
        <input
          type="text"
          id="roomId"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
          placeholder="Enter room ID"
        />
        <button type="button" onClick={handleDeleteRoom}>Delete Room</button>
      </form>
    </div>
  );
}

export default DeleteRoom;
