import { createContext, useState, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

// TODO: Place the token variable inside the user object instead for optimizing single responsibility functions
export const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(token ? jwtDecode(token) : {});

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      setUser(decoded);
    } else {
      localStorage.removeItem("token");
      setUser({});
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({ token, setToken, user }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
