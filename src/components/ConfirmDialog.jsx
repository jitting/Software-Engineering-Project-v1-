import React from "react";
import { AlertCircle, X } from "lucide-react";

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md animate-in zoom-in-95 duration-200">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-rose-500 rounded-3xl blur-2xl opacity-20" />

        <div className="relative bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-rose-500 dark:border-rose-400 p-6">
          {/* Close button */}
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-all hover:scale-110 hover:rotate-90 duration-200"
          >
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" strokeWidth={2.5} />
          </button>

          {/* Icon */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 dark:from-rose-400 dark:to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30">
              <AlertCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Cancel Booking?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 border-2 border-gray-200 dark:border-gray-800"
            >
              Keep Booking
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 dark:from-rose-400 dark:to-rose-500 rounded-xl transition-transform group-hover:scale-105 shadow-lg shadow-rose-500/30" />
              <div className="relative px-4 py-3 text-white font-semibold">
                Yes, Cancel
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
