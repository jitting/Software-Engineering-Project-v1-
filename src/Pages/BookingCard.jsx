import React from "react";
import {
  Building2,
  Calendar,
  Clock,
  Loader2,
  CheckCircle2,
  XCircle,
  Trash2,
} from "lucide-react";

export default function BookingCard({ booking, onDelete, onToggleStatus }) {
  const getStatusConfig = () => {
    switch (booking.status) {
      case "pending":
        return {
          icon: Clock,
          text: "Pending",
          bgColor: "bg-gray-100 dark:bg-gray-900/30",
          borderColor: "border-gray-300 dark:border-gray-700",
          textColor: "text-gray-700 dark:text-gray-400",
          iconColor: "text-gray-600 dark:text-gray-400",
        };
      case "in-progress":
        return {
          icon: Loader2,
          text: "In Progress",
          bgColor: "bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500",
          borderColor: "border-cyan-500 dark:border-cyan-400",
          textColor: "text-white",
          iconColor: "text-white",
          animate: true,
        };
      case "completed":
        return {
          icon: CheckCircle2,
          text: "Completed",
          bgColor: "bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500",
          borderColor: "border-cyan-500 dark:border-cyan-400",
          textColor: "text-white",
          iconColor: "text-white",
        };
      default:
        return {
          icon: XCircle,
          text: "Unknown",
          bgColor: "bg-gray-50 dark:bg-gray-900",
          borderColor: "border-gray-200 dark:border-gray-800",
          textColor: "text-gray-700 dark:text-gray-400",
          iconColor: "text-gray-500 dark:text-gray-400",
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group relative">
      <div className={`absolute inset-0 bg-cyan-500 dark:bg-cyan-400 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity`} />
      <div className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-950/90 rounded-2xl border-2 border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* Status indicator bar */}
        <div className={`h-1.5 ${statusConfig.bgColor}`} />

        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`absolute inset-0 bg-cyan-500 dark:bg-cyan-400 blur-md opacity-20`} />
                <div className={`relative p-2.5 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-xl shadow-lg`}>
                  <Building2 className={`w-5 h-5 text-white`} strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h3 className="font-black text-gray-800 dark:text-white text-base">{booking.building}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                  #{booking.id.slice(-6).toUpperCase()}
                </p>
              </div>
            </div>

            <button
              onClick={() => onDelete(booking.id)}
              className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-all group/delete hover:scale-110"
              title="Delete booking"
            >
              <Trash2 className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover/delete:text-rose-500 dark:group-hover/delete:text-rose-400 transition-colors" strokeWidth={2.5} />
            </button>
          </div>

          <div className="space-y-3 mb-4 bg-gray-50/80 dark:bg-gray-900/30 rounded-xl p-3.5 border border-gray-200/50 dark:border-gray-800/50">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-lg shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{booking.day}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-lg shadow-sm">
                <Clock className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{booking.time}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200/50 dark:border-gray-800/50">
            <div className={`flex items-center gap-2 px-3 py-1.5 ${statusConfig.bgColor} rounded-lg border ${statusConfig.borderColor}`}>
              <StatusIcon
                className={`w-4 h-4 ${statusConfig.iconColor} ${
                  statusConfig.animate ? "animate-spin" : ""
                }`}
                strokeWidth={2.5}
              />
              <span className={`text-xs font-black ${statusConfig.textColor} uppercase tracking-wide`}>
                {statusConfig.text}
              </span>
            </div>

            <button
              onClick={() => onToggleStatus(booking.id)}
              className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-900/80 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold transition-all hover:scale-105 active:scale-95"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
