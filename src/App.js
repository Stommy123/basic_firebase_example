import React from 'react';
import { Authentication, Chat } from './components';
import { UserContextProvider } from './context/UserContext';

const App = _ => (
  <UserContextProvider>
    <Authentication />
    <Chat />
  </UserContextProvider>
);

export default App;
