import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import RoomsList from './RoomsList';
import RoomDetails from './RoomDetails';
import CreateRoom from './CreateRoom';
import UpdateRoom from './UpdateRoom';
import DeleteRoom from './DeleteRoom';

const App = () => {
  return (
    <div className="app-container">
      <div className="nav-container">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Rooms List</Link>
            </li>
            <li>
              <Link to="/create">Create Room</Link>
            </li>
            <li>
              <Link to="/update/:id">Update Room</Link>
            </li>
            <li>
              <Link to="/delete/:id">Delete Room</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="component-container">
        <Routes>
          <Route path="/" element={<RoomsList />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/create" element={<CreateRoom />} />
          <Route path="/update/:id" element={<UpdateRoom />} />
          <Route path="/delete/:id" element={<DeleteRoom />} />
        </Routes>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
