import { createContext, useState, useMemo } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ status: "", message: "" });

  const contextValue = useMemo(() => ({ alert, setAlert }), [alert]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
