import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Login from "./Pages/Login";
import Home from "./Home";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInAnonymously,
} from "firebase/auth";

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

// ????
export default function App() {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isDemoMode) {
      // storage
      const storedUser = sessionStorage.getItem("demoUser");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
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
      setIsInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = async (email, password) => {
    if (isDemoMode) {
      if (email && password) {
        const userData = { uid: "demo-user-123", email: email };
        setUser(userData);

        sessionStorage.setItem("demoUser", JSON.stringify(userData));
      } else {
        throw new Error("Please enter an email and password");
      }
    } else {
      // firebase
      try {
        await signInWithEmailAndPassword(auth, email, password);
        //listen
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
      const userData = { uid: "guest-demo-user", email: "test@aui.ma" };
      setUser(userData);
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
      sessionStorage.removeItem("demoUser");
      return;
    }
    await signOut(auth);
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
    return <Home user={user} onLogout={handleLogout} />;
  }

  return (
    <Login
      onLoginSuccess={handleLoginSuccess}
      onGuestLogin={handleGuestLogin}
    />
  );
}
