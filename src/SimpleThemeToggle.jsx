import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function SimpleThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    console.log("Theme toggle mounted");
    const savedTheme = localStorage.getItem("wash-e-theme");
    console.log("Saved theme:", savedTheme);

    if (savedTheme) {
      const isDarkMode = savedTheme === "dark";
      setIsDark(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        console.log("Applied dark class from saved theme");
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      console.log("System prefers dark:", prefersDark);
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        console.log("Applied dark class from system preference");
      }
    }
  }, []);

  const toggleTheme = () => {
    console.log("Toggle clicked, current isDark:", isDark);
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("wash-e-theme", "dark");
      console.log("Switched to DARK mode");
      console.log("HTML classes:", document.documentElement.className);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("wash-e-theme", "light");
      console.log("Switched to LIGHT mode");
      console.log("HTML classes:", document.documentElement.className);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 border-2 border-transparent hover:border-blue-500"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600" />
      )}
    </button>
  );
}
