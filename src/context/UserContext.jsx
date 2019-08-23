import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const userState = useState({});
  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};
