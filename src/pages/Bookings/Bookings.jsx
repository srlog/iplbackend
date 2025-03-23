// src/components/Bookings/Bookings.jsx
import React, { useEffect, useState } from 'react';
import { getBookingByUserId, deleteBooking, updateBooking } from '../../service/bookings.api.service';
import ConfirmationModal from '../../components/ConfirmationModel/ConfirmationModal';
import { toast, ToastContainer } from 'react-toastify';
import './Bookings.css';

const BookingCard = ({
  booking,
  updatingBooking,
  updatedSeats,
  onDeleteConfirmation,
  onSeatChange,
  onUpdate,
  onStartUpdate
}) => {
  return (
    <div className="booking-card">
      <div className="booking-card-header">
        <h3>Booking #{booking.id}</h3>
        <p>{new Date(booking.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="booking-card-content">
        <div className="match-info">
          <div className="team-info">
            <img
              src={booking.match.hometeam.teamlogo}
              alt={booking.match.hometeam.teamname}
              className="team-logo"
            />
            <span>{booking.match.hometeam.teamname}</span>
          </div>
          <span className="vs">VS</span>
          <div className="team-info">
            <img
              src={booking.match.awayteam.teamlogo}
              alt={booking.match.awayteam.teamname}
              className="team-logo"
            />
            <span>{booking.match.awayteam.teamname}</span>
          </div>
        </div>
        <div className="booking-details">
          <p>
            <strong>Match Date:</strong> {new Date(booking.match.matchdate).toLocaleString()}
          </p>
          <p>
            <strong>Seats Booked:</strong>{' '}
            {updatingBooking?.id === booking.id ? (
              <span className="seat-controls">
                <button onClick={() => onSeatChange(booking.id, (updatedSeats[booking.id] || booking.seatsbooked) - 1)}>
                  -
                </button>
                <span>{updatedSeats[booking.id] || booking.seatsbooked}</span>
                <button onClick={() => onSeatChange(booking.id, (updatedSeats[booking.id] || booking.seatsbooked) + 1)}>
                  +
                </button>
              </span>
            ) : (
              booking.seatsbooked
            )}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{booking.totalprice}
          </p>
        </div>
      </div>
      <div className="booking-card-actions">
        <button onClick={() => onDeleteConfirmation(booking)}>Delete</button>
        {updatingBooking?.id === booking.id ? (
          <button onClick={() => onUpdate(booking)}>Update</button>
        ) : (
          <button onClick={() => onStartUpdate(booking)}>Update</button>
        )}
      </div>
    </div>
  );
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [updatingBooking, setUpdatingBooking] = useState(null);
  const [updatedSeats, setUpdatedSeats] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
          const data = await getBookingByUserId(user.id);
          setBookings(data);
        } else {
          setError('User not logged in.');
        }
      } catch (error) {
        setError('Failed to fetch bookings.');
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      toast.success('Booking deleted successfully!');
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking.');
    }
  };

  const handleDeleteConfirmation = (booking) => {
    setBookingToDelete(booking);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setBookingToDelete(null);
  };

  const handleModalConfirm = () => {
    if (bookingToDelete) {
      handleDelete(bookingToDelete.id);
      handleModalClose();
    }
  };

  const handleSeatChange = (bookingId, newSeats) => {
    setUpdatedSeats((prev) => ({ ...prev, [bookingId]: newSeats }));
  };

  const handleUpdate = async (booking) => {
    try {
      const newSeats = updatedSeats[booking.id];
      const updatedBooking = { ...booking, seatsbooked: newSeats };
      await updateBooking(booking.id, updatedBooking);
      setBookings(bookings.map((b) => (b.id === booking.id ? updatedBooking : b)));
      setUpdatingBooking(null);
      toast.success('Booking updated successfully!');
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking.');
    }
  };

  const handleStartUpdate = (booking) => {
    setUpdatingBooking(booking);
    // Initialize updatedSeats for this booking if not already set
    setUpdatedSeats((prev) => ({ ...prev, [booking.id]: booking.seatsbooked }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bookings-container">
      <h2>Your Bookings</h2>
      <ToastContainer />
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            updatingBooking={updatingBooking}
            updatedSeats={updatedSeats}
            onDeleteConfirmation={handleDeleteConfirmation}
            onSeatChange={handleSeatChange}
            onUpdate={handleUpdate}
            onStartUpdate={handleStartUpdate}
          />
        ))
      )}
      <ConfirmationModal
        open={modalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        title="Delete Booking"
        description={`Are you sure you want to delete booking with ID ${bookingToDelete?.id}?`}
      />
    </div>
  );
};

export default Bookings;
