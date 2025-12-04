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
          bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
          borderColor: "border-yellow-200 dark:border-yellow-800",
          textColor: "text-yellow-700 dark:text-yellow-400",
          iconColor: "text-yellow-500 dark:text-yellow-400",
        };
      case "in-progress":
        return {
          icon: Loader2,
          text: "In Progress",
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          textColor: "text-blue-700 dark:text-blue-400",
          iconColor: "text-blue-500 dark:text-blue-400",
          animate: true,
        };
      case "completed":
        return {
          icon: CheckCircle2,
          text: "Completed",
          bgColor: "bg-green-50 dark:bg-green-900/20",
          borderColor: "border-green-200 dark:border-green-800",
          textColor: "text-green-700 dark:text-green-400",
          iconColor: "text-green-500 dark:text-green-400",
        };
      default:
        return {
          icon: XCircle,
          text: "Unknown",
          bgColor: "bg-slate-50 dark:bg-slate-800",
          borderColor: "border-slate-200 dark:border-slate-700",
          textColor: "text-slate-700 dark:text-slate-400",
          iconColor: "text-slate-500 dark:text-slate-400",
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className={`${statusConfig.bgColor} border-2 ${statusConfig.borderColor} rounded-xl p-5 transition-all hover:shadow-md`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 bg-white rounded-lg ${statusConfig.borderColor} border`}
          >
            <Building2 className={`w-5 h-5 ${statusConfig.iconColor}`} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{booking.building}</h3>
            <p className="text-xs text-slate-500">
              Booking #{booking.id.slice(-6)}
            </p>
          </div>
        </div>

        <button
          onClick={() => onDelete(booking.id)}
          className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
          title="Delete booking"
        >
          <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Calendar className="w-4 h-4" />
          <span>{booking.day}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Clock className="w-4 h-4" />
          <span>{booking.time}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <StatusIcon
            className={`w-5 h-5 ${statusConfig.iconColor} ${
              statusConfig.animate ? "animate-spin" : ""
            }`}
          />
          <span className={`text-sm font-medium ${statusConfig.textColor}`}>
            {statusConfig.text}
          </span>
        </div>

        <button
          onClick={() => onToggleStatus(booking.id)}
          className="text-xs px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 font-medium transition-colors"
        >
          Change Status
        </button>
      </div>
    </div>
  );
}
