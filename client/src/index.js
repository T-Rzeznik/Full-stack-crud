import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import RoomsList from './RoomsList';
import RoomDetails from './RoomDetails';
import CreateRoom from './CreateRoom';
import UpdateRoom from './UpdateRoom';
import DeleteRoom from './DeleteRoom';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <RoomsList />
    <RoomDetails />
    <CreateRoom />
    <UpdateRoom />
    <DeleteRoom />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
