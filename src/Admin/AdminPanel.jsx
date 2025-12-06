import React, { useState, useEffect } from "react";
import {
  Droplets,
  Shield,
  User,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Trash2,
  Filter,
  MessageSquare,
  Scale,
  Repeat,
  Printer,
} from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import Notification from "../components/Notification";

export default function AdminPanel({ onLogout }) {
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [buildingFilter, setBuildingFilter] = useState("all");
  const [notification, setNotification] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  // Load all bookings from all users
  useEffect(() => {
    loadAllBookings();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = allBookings;

    if (statusFilter !== "all") {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    if (buildingFilter !== "all") {
      filtered = filtered.filter((b) => b.building === buildingFilter);
    }

    setFilteredBookings(filtered);
  }, [allBookings, statusFilter, buildingFilter]);

  const loadAllBookings = () => {
    const bookings = [];

    // Get all keys from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      // Only get booking keys (format: bookings_userEmail)
      if (key && key.startsWith("bookings_")) {
        try {
          const userBookings = JSON.parse(localStorage.getItem(key));
          const userEmail = key.replace("bookings_", "");

          // Add user info to each booking
          userBookings.forEach((booking) => {
            bookings.push({
              ...booking,
              userId: userEmail, // Use email as userId for consistency
              userEmail: userEmail,
            });
          });
        } catch (e) {
          console.error("Error parsing bookings:", e);
        }
      }
    }

    // Sort by creation date (newest first)
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setAllBookings(bookings);
  };

  const handleStatusChange = (bookingId, userId, newStatus) => {
    // userId is actually the email now
    const key = `bookings_${userId}`;

    try {
      const storedData = localStorage.getItem(key);
      if (!storedData) {
        console.error("No bookings found for user:", userId);
        return;
      }

      const userBookings = JSON.parse(storedData);

      // Find the booking and update it
      let bookingFound = false;
      const updatedBookings = userBookings.map((b) => {
        // Convert both IDs to strings for comparison
        if (String(b.id) === String(bookingId)) {
          bookingFound = true;
          return { ...b, status: newStatus };
        }
        return b;
      });

      if (!bookingFound) {
        console.error("Booking not found:", bookingId);
        return;
      }

      // Save back to localStorage
      localStorage.setItem(key, JSON.stringify(updatedBookings));

      // Reload all bookings
      loadAllBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const handleAdminCommentChange = (bookingId, userId, adminComment) => {
    const key = `bookings_${userId}`;

    try {
      const storedData = localStorage.getItem(key);
      if (!storedData) {
        console.error("No bookings found for user:", userId);
        return;
      }

      const userBookings = JSON.parse(storedData);

      // Find the booking and update admin comment
      const updatedBookings = userBookings.map((b) => {
        if (String(b.id) === String(bookingId)) {
          return { ...b, adminComment: adminComment };
        }
        return b;
      });

      // Save back to localStorage
      localStorage.setItem(key, JSON.stringify(updatedBookings));

      // Reload all bookings
      loadAllBookings();
    } catch (error) {
      console.error("Error updating admin comment:", error);
    }
  };

  const handleDeleteBooking = (bookingId, userId, userEmail) => {
    setPendingDelete({ bookingId, userId, userEmail });
    setNotification({
      type: "confirm",
      message: `Are you sure you want to delete ${userEmail}'s booking?`
    });
  };

  const confirmDeleteBooking = () => {
    if (pendingDelete) {
      const { bookingId, userId } = pendingDelete;
      // userId is actually the email now
      const key = `bookings_${userId}`;
      const userBookings = JSON.parse(localStorage.getItem(key) || "[]");
      const updatedBookings = userBookings.filter((b) => b.id !== bookingId);
      localStorage.setItem(key, JSON.stringify(updatedBookings));
      loadAllBookings();

      setPendingDelete(null);
      setNotification({
        type: "success",
        message: `Booking for ${pendingDelete.userEmail} has been deleted successfully!`
      });
    }
  };

  const cancelDeleteBooking = () => {
    setPendingDelete(null);
    setNotification(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-700";
      case "in-progress":
        return "bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 text-white border-cyan-500 dark:border-cyan-400";
      case "completed":
        return "bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 text-white border-cyan-500 dark:border-cyan-400";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "in-progress":
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStats = () => {
    return {
      total: allBookings.length,
      pending: allBookings.filter((b) => b.status === "pending").length,
      inProgress: allBookings.filter((b) => b.status === "in-progress").length,
      completed: allBookings.filter((b) => b.status === "completed").length,
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Wash-E Admin
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Administrator Panel
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Total Bookings
                </p>
                <p className="text-3xl font-semibold text-cyan-600 dark:text-cyan-400">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <Droplets className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Pending
                </p>
                <p className="text-3xl font-semibold text-gray-700 dark:text-gray-400">
                  {stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  In Progress
                </p>
                <p className="text-3xl font-semibold text-cyan-600 dark:text-cyan-400">
                  {stats.inProgress}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <Loader2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Completed
                </p>
                <p className="text-3xl font-semibold text-cyan-600 dark:text-cyan-400">
                  {stats.completed}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-800 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-medium text-black dark:text-white">
              Filters
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Building
              </label>
              <select
                value={buildingFilter}
                onChange={(e) => setBuildingFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white"
              >
                <option value="all">All Buildings</option>
                <option value="Building 36">Building 36</option>
                <option value="Building 39">Building 39</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-sm border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b-2 border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-black dark:text-white">
              All Bookings ({filteredBookings.length})
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage all user bookings and their statuses
            </p>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center">
              <Droplets className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-black dark:text-white mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {statusFilter !== "all" || buildingFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Users haven't created any bookings yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50 border-b-2 border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Building
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Admin Comment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-900/30 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-black dark:text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-black dark:text-white">
                              {booking.userEmail}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              ID: {booking.userId.slice(0, 8)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span className="text-sm text-black dark:text-white">
                            {booking.building}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-black dark:text-white">
                            <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            {booking.day}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            {booking.time}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-black dark:text-white">
                            <Repeat className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                            <span>{booking.machines || 1} {booking.machines === 1 ? "Machine" : "Machines"}</span>
                          </div>
                          {booking.weight && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Scale className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                              {booking.weight}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {booking.comment ? (
                          <div className="flex items-start gap-2 max-w-xs">
                            <MessageSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2" title={booking.comment}>
                              {booking.comment}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 dark:text-gray-500 italic">No notes</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <textarea
                          value={booking.adminComment || ""}
                          onChange={(e) =>
                            handleAdminCommentChange(
                              booking.id,
                              booking.userId,
                              e.target.value
                            )
                          }
                          placeholder="Add admin comment..."
                          rows="2"
                          className="w-full px-3 py-2 bg-white dark:bg-gray-900/80 border-2 border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 transition-all resize-none"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleStatusChange(
                              booking.id,
                              booking.userId,
                              e.target.value
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium border flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {}}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900/20 rounded-lg transition-colors group"
                            title="Print booking"
                          >
                            <Printer className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteBooking(
                                booking.id,
                                booking.userId,
                                booking.userEmail
                              )
                            }
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900/20 rounded-lg transition-colors group"
                            title="Delete booking"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={notification.type === "confirm" ? cancelDeleteBooking : () => setNotification(null)}
          onConfirm={notification.type === "confirm" ? confirmDeleteBooking : undefined}
        />
      )}
    </div>
  );
}
