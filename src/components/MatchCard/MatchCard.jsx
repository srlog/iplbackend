import React, { useState } from 'react';
import './MatchCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarker, faRupeeSign, faTicket, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { createBooking } from '../../service/bookings.api.service';
import { ToastContainer, toast } from 'react-toastify';

const MatchCard = ({ match }) => {
  const { id, matchdate, venue, price, seatcount, availableseats, status, hometeam, awayteam } = match;
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [showTicketOptions, setShowTicketOptions] = useState(false);

  const handleSeatChange = (e) => {
    setSelectedSeats(parseInt(e.target.value, 10));
  };

  const handleBuyTickets = async () => {
    if (selectedSeats > availableseats) {
      alert('Not enough seats available!');
      return;
    }
    try {
      const bookingData = {
        matchid: id,
        userid: JSON.parse(localStorage.getItem('user')).id, // Assuming user ID is stored in localStorage
        seatsbooked: selectedSeats,
        totalprice: price * selectedSeats,
      };

      console.log('Booking data:', bookingData);
      await createBooking(bookingData);
      toast.success('Booking successful!');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Booking failed. Please try again later.');
    }
  };

  // Render a tag if seats are limited or none are available
  const seatTag = () => {
    if (availableseats === 0)
      return <span className="seat-tag no-seats">No Seats</span>;
    if (availableseats <= 2)
      return <span className="seat-tag limited-seats">Limited Seats</span>;
    return null;
  };

  return (
    <div
      className="match-card"
      onMouseEnter={() => setShowTicketOptions(true)}
      onMouseLeave={() => setShowTicketOptions(false)}
    >
      <header className="match-header">
        <h3>Match #{id}</h3>
      </header>

      <section className="match-teams">
        <div className="team">
          <img src={hometeam.teamlogo} alt={hometeam.teamname} className="team-logo" />
          <span className="team-name">{hometeam.teamname}</span>
        </div>
        <span className="vs">VS</span>
        <div className="team">
          <img src={awayteam.teamlogo} alt={awayteam.teamname} className="team-logo" />
          <span className="team-name">{awayteam.teamname}</span>
        </div>
      </section>

      <section className="match-details">
        <p>
          <FontAwesomeIcon icon={faCalendar} className="icon" />{' '}
          {new Date(matchdate).toLocaleString()}
        </p>
        <p>
          <FontAwesomeIcon icon={faMapMarker} className="icon" /> {venue}
        </p>
        <p>
          <FontAwesomeIcon icon={faRupeeSign} className="icon" /> {price}
        </p>
        <p>
          <FontAwesomeIcon icon={faTicket} className="icon" /> {availableseats} / {seatcount} seats available {seatTag()}
        </p>
        <p>
          <FontAwesomeIcon icon={faBullhorn} className="icon" /> {status}
        </p>
      </section>

      {showTicketOptions && availableseats > 0 && (
        <div className="ticket-container">
          <div className="seat-select">
            <label htmlFor="seats">Seats:</label>
            <input
              type="number"
              id="seats"
              min="1"
              max={availableseats}
              value={selectedSeats}
              onChange={handleSeatChange}
            />
          </div>
          <button className="buy-ticket" onClick={handleBuyTickets}>
            Buy Tickets
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MatchCard;
