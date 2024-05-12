import React, { useState } from 'react';
import './CreateRoom.css';

function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateRoom = () => {
    fetch('/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomName, roomID: roomId, type }),
    })
    .then(response => {
      if (response.ok) {
        setMessage('Room created successfully');
        
      } else {
        setMessage('Failed to create room');
      }
    })
    .catch(error => console.error('Error creating room:', error));
  };

  return (
    <div className="create-room-container">
      <h1>Create Room</h1>
      <p>{message}</p>
      <form className="create-room-form">
        <label htmlFor="roomName">Room Name:</label>
        <input
          type="text"
          id="roomName"
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
          placeholder="Enter room name"
        />
        <label htmlFor="roomId">Room ID:</label>
        <input
          type="text"
          id="roomId"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
          placeholder="Enter room ID"
        />
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          value={type}
          onChange={e => setType(e.target.value)}
          placeholder="Enter type"
        />
        <button type="button" onClick={handleCreateRoom}>Create Room</button>
      </form>
    </div>
  );
}

export default CreateRoom;
