import React, { useState } from "react";
import { X, Calendar, Clock, Building2, Loader2 } from "lucide-react";

export default function BookingModal({ isOpen, onClose, onSubmit }) {
  const [building, setBuilding] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buildings = ["Building 36", "Building 39"];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const times = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  const handleSubmit = async () => {
    if (!building || !day || !time) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    const booking = {
      id: Date.now().toString(),
      building,
      day,
      time,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await onSubmit(booking);
    setIsSubmitting(false);

    // Reset form
    setBuilding("");
    setDay("");
    setTime("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/60 dark:bg-black/80 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="relative group max-w-md w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-cyan-500 dark:bg-cyan-400 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />

        <div className="relative backdrop-blur-2xl bg-white/95 dark:bg-gray-950/95 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-800 overflow-y-auto max-h-[90vh]">
          <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 dark:border-gray-800">
            <div>
              <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">
                New Booking
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mt-1">Create a laundry booking</p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-all hover:scale-110 hover:rotate-90 duration-200"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" strokeWidth={2.5} />
            </button>
          </div>

          <div className="p-6 space-y-5">
            <div className="group/field">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <div className="p-1 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-lg shadow-sm">
                  <Building2 className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                Building
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 dark:bg-cyan-400 rounded-xl opacity-0 group-focus-within/field:opacity-5 blur transition-opacity duration-300" />
                <select
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  className="relative w-full px-4 py-3.5 bg-gray-50/80 dark:bg-gray-900/80 border-2 border-gray-200 dark:border-gray-800 rounded-xl text-gray-800 dark:text-white font-semibold focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-all cursor-pointer"
                >
                  <option value="">Select a building</option>
                  {buildings.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="group/field">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <div className="p-1 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-lg shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                Day
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 dark:bg-cyan-400 rounded-xl opacity-0 group-focus-within/field:opacity-5 blur transition-opacity duration-300" />
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="relative w-full px-4 py-3.5 bg-gray-50/80 dark:bg-gray-900/80 border-2 border-gray-200 dark:border-gray-800 rounded-xl text-gray-800 dark:text-white font-semibold focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-all cursor-pointer"
                >
                  <option value="">Select a day</option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="group/field">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <div className="p-1 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-lg shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                Time
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 dark:bg-cyan-400 rounded-xl opacity-0 group-focus-within/field:opacity-5 blur transition-opacity duration-300" />
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="relative w-full px-4 py-3.5 bg-gray-50/80 dark:bg-gray-900/80 border-2 border-gray-200 dark:border-gray-800 rounded-xl text-gray-800 dark:text-white font-semibold focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-all cursor-pointer"
                >
                  <option value="">Select a time</option>
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 p-6 border-t-2 border-gray-200 dark:border-gray-800">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 border-2 border-gray-200 dark:border-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !building || !day || !time}
              className="flex-1 group/submit relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-xl transition-transform group-hover/submit:scale-105 group-disabled/submit:scale-100 shadow-lg shadow-cyan-500/30" />
              <div className="relative px-4 py-3 text-white font-black group-hover/submit:shadow-2xl transition-all duration-200 flex items-center justify-center">
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" strokeWidth={3} />
                ) : (
                  "Create Booking"
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
