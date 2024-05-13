import React, { useState } from 'react';
import './RoomDetails.css';

function RoomDetails() {
  const [roomId, setRoomId] = useState('');
  const [room, setRoom] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/rooms/${roomId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch room details');
      }
      const data = await response.json();
      setRoom(data);
      setError('');
    } catch (error) {
      setError('Failed to fetch room details');
      console.error('Error fetching room details:', error);
    }
  };

  return (
    <div className="room-details-container"> 
      <h1>Room Details</h1>
      <form className="room-details-form" onSubmit={handleSubmit}> 
        <label htmlFor="roomId">Enter Room ID:</label>
        <input
          type="text"
          id="roomId"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
          placeholder="Room ID"
          required
        />
        <button type="submit">Get Room Details</button>
      </form>
      {error && <p>{error}</p>}
      {room && (
        <div className="room-details-details"> 
          <div>
            <h2>{room.roomName}</h2>
          </div>
          <div>
            <p>Room ID: {room.roomID}</p>
          </div>
          <div>
            <p>Type: {room.type}</p>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default RoomDetails;
