import React, { useState, useEffect, createContext } from "react";
import checkTokenNotValid from "../auth/checkTokenNotValid";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userValid, setUserValid] = useState(false);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && !checkTokenNotValid(storedUser.token)) {
      setUser(storedUser);
      setUserValid(true);
    }
  }, []);

  useEffect(() => {
    if (user && !checkTokenNotValid(user.token)) {
      localStorage.setItem("user", JSON.stringify(user));
      setUserValid(true);
    } else {
      localStorage.removeItem("user");
      setUserValid(false);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, login, logout, userValid }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
