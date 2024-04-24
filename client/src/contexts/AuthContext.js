import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// AuthProvider component to wrap your application and manage authentication state
const ReturnURL = (Data, URL) => {
    URL += "?";
  
    Object.keys(Data).forEach(Key => {
      URL += Key.toString() + "=" + Data[Key].toString() + "&";
    })
  
    URL = URL.substring(0, URL.length - 1);
    
    return URL;
  }

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    if(storedUser && storedIsAuthenticated){
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }
  }, []);

  const login = async (Data) => {
    try {
      const URL = ReturnURL(Data, "http://localhost:3001/compare-password");

      const Response = await fetch(URL);
      const PasswordMatches = await Response.text();

      if (PasswordMatches === "true") {
        const URL2 = ReturnURL({username: Data.username}, "http://localhost:3001/finduser")
        const userResponse = await fetch(URL2);
        const newData = await userResponse.text();
        const ParsedData = JSON.parse(newData);

        console.log(ParsedData);

        let userData = {
          username: "Hello World",
          userID: 123
        }

        setUser(userData);
        setIsAuthenticated(true);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));

        return true;
      } else {
        setIsAuthenticated(false);
      }
      return false;
    } catch (Error) {
      throw new Error(Error);
    }
  };

  const logout = () => {
    setUser({});
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
