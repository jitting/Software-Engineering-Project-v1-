import React, { useEffect } from "react";
import { CheckCircle, XCircle, X, AlertCircle } from "lucide-react";

export default function Notification({ message, type = "success", onClose, onConfirm, duration = 5000 }) {
  const isConfirm = type === "confirm";

  useEffect(() => {
    if (duration && !isConfirm) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, isConfirm]);

  const isSuccess = type === "success";

  const getConfig = () => {
    if (isConfirm) {
      return {
        icon: AlertCircle,
        borderColor: "border-rose-500 dark:border-rose-400",
        glowColor: "bg-rose-500",
        iconBg: "bg-gradient-to-br from-rose-500 to-rose-600 dark:from-rose-400 dark:to-rose-500 shadow-rose-500/30",
        titleColor: "text-rose-700 dark:text-rose-400",
        title: "Confirm Deletion"
      };
    }
    if (isSuccess) {
      return {
        icon: CheckCircle,
        borderColor: "border-cyan-500 dark:border-cyan-400",
        glowColor: "bg-cyan-500",
        iconBg: "bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 shadow-cyan-500/30",
        progressBg: "bg-gradient-to-r from-cyan-500 to-cyan-600",
        titleColor: "text-cyan-700 dark:text-cyan-400",
        title: "Success!"
      };
    }
    return {
      icon: XCircle,
      borderColor: "border-rose-500 dark:border-rose-400",
      glowColor: "bg-rose-500",
      iconBg: "bg-gradient-to-br from-rose-500 to-rose-600 dark:from-rose-400 dark:to-rose-500 shadow-rose-500/30",
      progressBg: "bg-gradient-to-r from-rose-500 to-rose-600",
      titleColor: "text-rose-700 dark:text-rose-400",
      title: "Booking Conflict"
    };
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
      <div className="relative group max-w-md">
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity ${config.glowColor}`}
        />

        <div
          className={`relative backdrop-blur-xl bg-white/95 dark:bg-gray-950/95 rounded-2xl shadow-2xl border-2 p-5 ${isConfirm ? "pr-5" : "pr-12"} min-w-[320px] ${config.borderColor}`}
        >
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${config.iconBg}`}>
              <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>

            <div className="flex-1 pt-1">
              <h4 className={`font-semibold text-sm mb-1 ${config.titleColor}`}>
                {config.title}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {message}
              </p>
            </div>

            {!isConfirm && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-all hover:scale-110 hover:rotate-90 duration-200"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" strokeWidth={2.5} />
              </button>
            )}
          </div>

          {/* Confirmation buttons */}
          {isConfirm && (
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 dark:from-rose-400 dark:to-rose-500 text-white rounded-xl font-semibold text-sm hover:from-rose-600 hover:to-rose-700 dark:hover:from-rose-500 dark:hover:to-rose-600 transition-all duration-200 hover:scale-105 shadow-lg shadow-rose-500/30"
              >
                Yes, Cancel Booking
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:scale-105"
              >
                No, Keep It
              </button>
            </div>
          )}

          {/* Progress bar */}
          {duration && !isConfirm && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 rounded-b-2xl overflow-hidden">
              <div
                className={`h-full rounded-b-2xl ${config.progressBg}`}
                style={{
                  animation: `shrink ${duration}ms linear forwards`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
