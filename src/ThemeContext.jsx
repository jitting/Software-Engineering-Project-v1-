import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false); // Default to light mode

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("wash-e-theme");
    if (savedTheme) {
      const isDarkMode = savedTheme === "dark";
      setIsDark(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Default to light mode if no saved preference
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Apply theme class to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("wash-e-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("wash-e-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
