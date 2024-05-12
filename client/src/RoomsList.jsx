import React, { useState, useEffect } from 'react';
import './RoomsList.css';

function RoomsList() {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = () => {
    fetch('/rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error));
  };

  useEffect(() => {
    fetchRooms();
  }, []); // Fetch rooms on initial component mount

  const handleRefresh = () => {
    fetchRooms();
  };

  return (
    <div className="rooms-list-container"> 
      <h1>Rooms List</h1>
      <button onClick={handleRefresh}>Refresh List</button>
      <ul className="rooms-list" style={{ listStyleType: 'none', padding: 0 }}>
        {rooms.map(room => (
          <li key={room._id} className="room-item"> 
            <div>
              <strong>Name:</strong> {room.roomName}
            </div>
            <div>
              <strong>Room ID:</strong> {room.roomID}
            </div>
            <div>
              <strong>Type:</strong> {room.type}
            </div>
            <div>
              <strong>ID:</strong> {room._id}
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomsList;
