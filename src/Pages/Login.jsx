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
import "./LoginStyle.css";

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
  `}</style>
);

const ModernIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 animate-gradient" />

    <div
      className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full glass-effect animate-bubble"
      style={{ animationDelay: "0s" }}
    />
    <div
      className="absolute top-40 right-32 w-24 h-24 bg-white/15 rounded-full glass-effect animate-bubble"
      style={{ animationDelay: "2s" }}
    />
    <div
      className="absolute bottom-32 left-40 w-20 h-20 bg-white/25 rounded-full glass-effect animate-bubble"
      style={{ animationDelay: "4s" }}
    />
    <div
      className="absolute bottom-20 right-20 w-28 h-28 bg-white/10 rounded-full glass-effect animate-bubble"
      style={{ animationDelay: "6s" }}
    />

    <div className="relative z-10 animate-float">
      <div className="glass-effect rounded-3xl p-12 shadow-2xl">
        <div className="relative">
          <div className="absolute inset-0 bg-white/30 blur-3xl rounded-full" />

          <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl p-8 border border-white/30">
            <Droplets
              className="w-32 h-32 text-white drop-shadow-2xl"
              strokeWidth={1.5}
            />
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-white animate-pulse" />
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
            Wash-E
          </h3>
          <p className="text-xl text-white/90 font-medium mb-2">
            Fresh clothes, Zero stress
          </p>
          <p className="text-white/80 text-sm">
            Smart laundry management at your fingertips
          </p>
        </div>
      </div>
    </div>

    <div className="absolute inset-0 opacity-10">
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

    try {
      await onLoginSuccess(email, password);
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
      <div className="min-h-screen bg-slate-50 flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-blue-600">Wash-E</h1>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-3">
                Welcome back
              </h2>
              <p className="text-slate-600 text-lg">
                Sign in to manage your laundry
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                    placeholder="your.email@aui.ma"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="block w-full pl-12 pr-14 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      rememberMe
                        ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/30"
                        : "bg-white border-slate-300 hover:border-blue-400"
                    }`}
                  >
                    {rememberMe && (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <label
                    onClick={() => setRememberMe(!rememberMe)}
                    className="text-sm font-medium text-slate-700 cursor-pointer select-none"
                  >
                    Remember me
                  </label>
                </div>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={isLoading || !email || !password}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 transition-all duration-200"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              Al Akhawayn University
            </p>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 relative">
          <ModernIllustration />
        </div>
      </div>
    </>
  );
}
