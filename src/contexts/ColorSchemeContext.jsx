import { createContext, useState, useEffect } from "react";

const ColorSchemeContext = createContext();

export function ColorSchemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ColorSchemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export default ColorSchemeContext;
