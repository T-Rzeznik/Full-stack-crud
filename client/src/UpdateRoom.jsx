
import React, { useState } from 'react';
import './UpdateRoom.css';

function UpdateRoom() {
  const [roomId, setRoomId] = useState('');
  const [updatedData, setUpdatedData] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: updatedData, // Send updated data directly as JSON string
      });
      
      if (!response.ok) {
        throw new Error('Failed to update room');
      }
      
      const data = await response.json();
      setMessage(data.message);
      setError('');
    } catch (error) {
      setError('Failed to update room');
      console.error('Error updating room:', error);
    }
  };

  return (
    <div className="update-room-container">
      <h1>Update Room</h1>
      <form className="update-room-form" onSubmit={handleSubmit}>
        <label htmlFor="roomId">Room ID:</label>
        <input
          type="text"
          id="roomId"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
          placeholder="Room ID"
          required
        />
        <label htmlFor="updatedData">Updated Data (JSON):</label>
        <textarea
          id="updatedData"
          value={updatedData}
          onChange={e => setUpdatedData(e.target.value)}
          placeholder="Enter updated data in JSON format"
          rows="6"
          required
        />
        <button type="submit">Update Room</button>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateRoom;
