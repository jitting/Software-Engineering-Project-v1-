import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Check,
  Loader2,
  Droplets,
  Sparkles,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import "./LoginStyle.css";

// --- INTERNAL STYLES ---
const CustomStyles = () => (
  <style>{`
    @keyframes gradient-shift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    @keyframes bubble {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
      50% { transform: translateY(-30px) scale(1.1); opacity: 0.8; }
    }
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); }
      50% { box-shadow: 0 0 40px rgba(0, 0, 0, 0.4); }
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient-shift 8s ease infinite;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-bubble {
      animation: bubble 8s ease-in-out infinite;
    }
    .glass-effect {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .shimmer-effect {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      background-size: 1000px 100%;
      animation: shimmer 3s infinite;
    }
    .glow-box {
      animation: pulse-glow 3s ease-in-out infinite;
    }
  `}</style>
);

// --- VISUAL COMPONENT ---
const ModernIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-900 dark:to-cyan-950">
    {/* Animated gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 dark:from-cyan-800 dark:via-cyan-900 dark:to-black animate-gradient" />

    {/* Floating bubbles */}
    <div
      className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full glass-effect animate-bubble"
      style={{ animationDelay: "0s" }}
    />
    <div
      className="absolute top-40 right-32 w-24 h-24 bg-white/5 rounded-full glass-effect animate-bubble"
      style={{ animationDelay: "2s" }}
    />
    <div
      className="absolute bottom-32 left-40 w-20 h-20 bg-white/15 rounded-full glass-effect animate-bubble"
      style={{ animationDelay: "4s" }}
    />
    <div
      className="absolute bottom-20 right-20 w-28 h-28 bg-white/5 rounded-full glass-effect animate-bubble"
      style={{ animationDelay: "6s" }}
    />

    {/* Center glass card with icon */}
    <div className="relative z-10 animate-float">
      <div className="glass-effect rounded-3xl p-12 shadow-2xl border border-white/10">
        <div className="relative">
          {/* Glowing effect behind icon */}
          <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full" />

          {/* Main icon */}
          <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
            <Droplets
              className="w-32 h-32 text-white drop-shadow-2xl"
              strokeWidth={1.5}
            />
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-white animate-pulse" />
          </div>
        </div>

        {/* Text content */}
        <div className="mt-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
            Wash-E
          </h3>
          <p className="text-xl text-white/90 font-medium mb-2">
            Fresh clothes, Zero stress
          </p>
          <p className="text-white/70 text-sm">
            Smart laundry management at your fingertips
          </p>
        </div>
      </div>
    </div>

    {/* Decorative grid pattern overlay */}
    <div className="absolute inset-0 opacity-5">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  </div>
);

// --- LOGIN COMPONENT ---
export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      await onLoginSuccess(email.trim().toLowerCase(), password);
    } catch (err) {
      setError(err.message || "Login failed");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && email && password) {
      handleLogin();
    }
  };

  return (
    <>
      <CustomStyles />
      <div className="min-h-screen bg-white dark:bg-black flex relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gray-200 dark:bg-gray-900 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-gray-300 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gray-100 dark:bg-gray-900 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Theme Toggle - Top Right */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Left Panel - Login Form - Takes full height */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
          <div className="w-full max-w-md">
            {/* Logo with glow effect */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 dark:bg-cyan-400 blur-xl opacity-20 rounded-2xl" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/40">
                    <Droplets className="w-9 h-9 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-black text-gray-800 dark:text-white">
                    Wash-E
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold tracking-wider uppercase"></p>
                </div>
              </div>
              <h2 className="text-4xl font-black text-gray-800 dark:text-white mb-3 tracking-tight">
                Welcome back
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base">
                Sign in to continue to your dashboard
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl text-rose-600 dark:text-rose-400 text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full" />
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 dark:bg-cyan-400 rounded-xl opacity-0 group-focus-within:opacity-5 blur transition-opacity duration-300" />
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-900/80 border-2 border-gray-200 dark:border-gray-800 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:bg-white dark:focus:bg-gray-900 transition-all duration-200 font-medium"
                      placeholder="your.email@aui.ma"
                    />
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 dark:bg-cyan-400 rounded-xl opacity-0 group-focus-within:opacity-5 blur transition-opacity duration-300" />
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="block w-full pl-12 pr-14 py-3.5 bg-white dark:bg-gray-900/80 border-2 border-gray-200 dark:border-gray-800 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:bg-white dark:focus:bg-gray-900 transition-all duration-200 font-medium"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2.5">
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      rememberMe
                        ? "bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 shadow-md shadow-cyan-500/30 scale-105"
                        : "bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-400 hover:scale-105"
                    }`}
                  >
                    {rememberMe && (
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3.5} />
                    )}
                  </div>
                  <label
                    onClick={() => setRememberMe(!rememberMe)}
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                  >
                    Remember me
                  </label>
                </div>
                <button className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={isLoading || !email || !password}
                className="relative w-full group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-xl transition-transform group-hover:scale-105 group-disabled:scale-100 shadow-lg shadow-cyan-500/30" />
                <div className="absolute inset-0 shimmer-effect" />
                <div className="relative px-6 py-3.5 text-white font-black text-base tracking-wide group-hover:shadow-2xl group-disabled:opacity-50 group-disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <span className="text-xl">→</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-cyan-600 dark:bg-cyan-400 rounded-full animate-pulse" />
                Protected by Wash-E Security
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Modern Illustration - Takes full height */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <ModernIllustration />
        </div>
      </div>
    </>
  );
}
