import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Login from "./Pages/Login";
import Home from "./Home";
import AdminPanel from "./Admin/AdminPanel";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInAnonymously,
} from "firebase/auth";
// cfg
let app, auth;
let isDemoMode = false;

try {
  if (typeof __firebase_config !== "undefined") {
    const firebaseConfig = JSON.parse(__firebase_config);
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    const localConfig = {
      apiKey: "YOUR_API_KEY_HERE",
      authDomain: "your-app.firebaseapp.com",
      projectId: "your-app-id",
    };
    if (localConfig.apiKey === "YOUR_API_KEY_HERE") {
      throw new Error("No config found");
    }
    app = initializeApp(localConfig);
    auth = getAuth(app);
  }
} catch (e) {
  isDemoMode = true;
  console.log("Running in demo mode - Firebase not configured");
}

const ADMIN_EMAIL = "a.admin@aui.ma";
const ADMIN_PASSWORD = "administrator";

export default function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isDemoMode) {
      const storedUser = sessionStorage.getItem("demoUser");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          if (userData.email === ADMIN_EMAIL) {
            setIsAdmin(true);
          }
        } catch (e) {
          console.error("Failed to parse stored user:", e);
        }
      }
      setIsInitialized(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setIsInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = async (email, password) => {
    const isAdminLogin = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;

    if (isDemoMode) {
      if (email && password) {
        const userData = {
          uid: isAdminLogin ? "admin-user" : "demo-user-123",
          email: email,
        };
        setUser(userData);
        setIsAdmin(isAdminLogin);
        sessionStorage.setItem("demoUser", JSON.stringify(userData));
      } else {
        throw new Error("Please enter an email and password");
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/invalid-credential" ||
          err.code === "auth/wrong-password"
        ) {
          throw new Error("Invalid email or password");
        } else {
          throw new Error(err.message.replace("Firebase: ", ""));
        }
      }
    }
  };

  const handleGuestLogin = async () => {
    if (isDemoMode) {
      const userData = { uid: "guest-demo-user", email: "guest@wash-e.com" };
      setUser(userData);
      setIsAdmin(false);
      sessionStorage.setItem("demoUser", JSON.stringify(userData));
    } else {
      try {
        await signInAnonymously(auth);
      } catch (err) {
        throw new Error("Guest login failed: " + err.message);
      }
    }
  };

  const handleLogout = async () => {
    if (isDemoMode) {
      setUser(null);
      setIsAdmin(false);
      sessionStorage.removeItem("demoUser");
      return;
    }
    await signOut(auth);
    setIsAdmin(false);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Initializing...</p>
        </div>
      </div>
    );
  }

  if (user) {
    if (isAdmin) {
      return <AdminPanel onLogout={handleLogout} />;
    }
    return <Home user={user} onLogout={handleLogout} />;
  }

  return (
    <Login
      onLoginSuccess={handleLoginSuccess}
      onGuestLogin={handleGuestLogin}
    />
  );
}
