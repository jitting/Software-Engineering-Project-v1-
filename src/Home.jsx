import React, { useState, useEffect } from "react";
import { Droplets, Plus, CalendarDays } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import BookingModal from "./Pages/BookingModal";
import BookingCard from "./Pages/BookingCard";

export default function Home({ user, onLogout }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    // Use email as key instead of uid for better user isolation
    const bookingKey = `bookings_${user.email}`;
    const storedBookings = localStorage.getItem(bookingKey);
    if (storedBookings) {
      try {
        setBookings(JSON.parse(storedBookings));
      } catch (e) {
        console.error("Failed to parse bookings:", e);
      }
    }
  }, [user.email]);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    const bookingKey = `bookings_${user.email}`;
    localStorage.setItem(bookingKey, JSON.stringify(bookings));
  }, [bookings, user.email]);

  const handleCreateBooking = async (booking) => {
    // Check if this time slot is already booked
    const isDuplicate = bookings.some(
      (b) => b.building === booking.building && b.day === booking.day && b.time === booking.time
    );

    if (isDuplicate) {
      alert(`This time slot is already booked!\n${booking.building} - ${booking.day} at ${booking.time} is unavailable.`);
      return;
    }

    // Add user email to the booking
    const bookingWithUser = {
      ...booking,
      userEmail: user.email || "Guest User",
    };
    setBookings((prev) => [...prev, bookingWithUser]);
    setIsModalOpen(false);
  };

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    }
  };

  const handleToggleStatus = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          const statusFlow = {
            pending: "in-progress",
            "in-progress": "completed",
            completed: "pending",
          };
          return { ...b, status: statusFlow[b.status] };
        }
        return b;
      })
    );
  };

  const getStatusCount = (status) => {
    return bookings.filter((b) => b.status === status).length;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-200 dark:bg-gray-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gray-300 dark:bg-gray-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gray-100 dark:bg-gray-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-white/70 dark:bg-black/70 border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/30">
                  <Droplets className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
                  Wash-E
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-500 font-semibold">Your Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-black text-sm">{user.email?.[0].toUpperCase()}</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm font-bold">
                  {user.email?.split('@')[0] || "Guest"}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:scale-105"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Welcome Message */}
        <div className="mb-12">
          <h2 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight mb-2">
            Welcome back, <span className="bg-gradient-to-r from-cyan-600 to-cyan-500 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">{user.email?.split('@')[0] || "Guest"}</span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Manage your laundry bookings and track your schedule
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 dark:from-cyan-400/10 dark:to-cyan-500/10 rounded-3xl" />
            <div className="relative bg-white dark:bg-gray-950 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Total Bookings
                  </p>
                  <p className="text-4xl font-black text-gray-800 dark:text-white">
                    {bookings.length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <CalendarDays className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="h-1 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full w-full" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 dark:from-cyan-400/10 dark:to-cyan-500/10 rounded-3xl" />
            <div className="relative bg-white dark:bg-gray-950 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    In Progress
                  </p>
                  <p className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-cyan-500 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
                    {getStatusCount("in-progress")}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Droplets className="w-7 h-7 text-white animate-pulse" strokeWidth={2.5} />
                </div>
              </div>
              <div className="h-1 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full" style={{ width: `${(getStatusCount("in-progress") / (bookings.length || 1)) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 dark:from-cyan-400/10 dark:to-cyan-500/10 rounded-3xl" />
            <div className="relative bg-white dark:bg-gray-950 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Completed
                  </p>
                  <p className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-cyan-500 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
                    {getStatusCount("completed")}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Droplets className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="h-1 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full" style={{ width: `${(getStatusCount("completed") / (bookings.length || 1)) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Header with Add Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">
              My Bookings
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1.5 font-medium">
              View and manage your schedule
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-2xl transition-transform group-hover:scale-105 shadow-xl shadow-cyan-500/30" />
            <div className="relative flex items-center gap-2 px-6 py-3 text-white font-bold text-base group-hover:shadow-2xl transition-all duration-200">
              <Plus className="w-5 h-5" strokeWidth={2.5} />
              <span className="hidden sm:inline">New Booking</span>
            </div>
          </button>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="relative group">
            <div className="absolute inset-0 bg-cyan-500 dark:bg-cyan-400 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-950/90 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl p-16 text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-cyan-500 dark:bg-cyan-400 blur-2xl opacity-30" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-cyan-500/40">
                  <CalendarDays className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-3">
                No bookings yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-base">
                Create your first laundry booking to get started
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="group/btn relative inline-block overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-2xl transition-transform group-hover/btn:scale-105 shadow-xl shadow-cyan-500/40" />
                <div className="relative inline-flex items-center gap-2 px-8 py-3.5 text-white font-bold text-base group-hover/btn:shadow-2xl transition-all duration-200">
                  <Plus className="w-5 h-5" strokeWidth={2.5} />
                  <span>Create Booking</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onDelete={handleDeleteBooking}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBooking}
      />
    </div>
  );
}
