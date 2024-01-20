import React, { createContext, ReactNode, useState } from 'react';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

interface UserContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  children: ReactNode;
}

export const UserContext = createContext<UserContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
  children: null,
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
  
    return (
      <UserContext.Provider value={{ currentUser, setCurrentUser, children }}>
        {children}
      </UserContext.Provider>
    );
  };