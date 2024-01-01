import React, { useState, useEffect, createContext } from "react";
import checkTokenNotValid from "../auth/checkTokenNotValid";
import { displayResponse } from "../displayResponse";
import { logoutApi } from "../../api/logoutApi";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userValid, setUserValid] = useState(false);
  const [userRole, setUserRole] = useState("");

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    const response = await logoutApi();
    if (!(response.name === "AxiosError")) {
      setUser(null);
      window.location.reload();
    }
    displayResponse(response);
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
      if(user.userRoles.$values.includes("Standard")){
        setUserRole("Standard");
      }
      if(user.userRoles.$values.includes("Moderator")){
        setUserRole("Moderator");
      }
      if(user.userRoles.$values.includes("Admin")){
        setUserRole("Admin");
      }
    } else {
      localStorage.removeItem("user");
      setUserValid(false);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, login, logout, userValid, userRole }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
