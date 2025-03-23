// src/components/AdminMatchCard/AdminMatchCard.jsx
import React, { useState } from "react";
import "./AdminMatchCard.css";

const AdminMatchCard = ({ match, onUpdateMatch, onDeleteMatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    hometeamid: match.hometeamid,
    awayteamid: match.awayteamid,
    matchdate: match.matchdate.substring(0, 10), // format as YYYY-MM-DD
    venue: match.venue,
    price: match.price,
    seatcount: match.seatcount,
    availableseats: match.availableseats,
    status: match.status,
  });

  // Inline teams and statuses options
  const teams = [
    { value: 1, label: "Chennai Super Kings" },
    { value: 2, label: "Mumbai Indians" },
    { value: 3, label: "Royal Challengers Bangalore" },
    { value: 4, label: "Kolkata Knight Riders" },
    { value: 5, label: "Sunrisers Hyderabad" },
    { value: 6, label: "Rajasthan Royals" },
    { value: 7, label: "Delhi Capitals" },
    { value: 8, label: "Punjab Kings" },
    { value: 9, label: "Lucknow Super Giants" },
    { value: 10, label: "Gujarat Titans" },
  ];

  const statusOptions = [
    { value: "upcoming", label: "Upcoming" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateMatch(match.id, formData);
    setIsEditing(false);
  };

  return (
    <div className="admin-match-card">
      {isEditing ? (
        <div className="match-edit-form">
          <div className="form-row">
            <label>Home Team:</label>
            <select
              name="hometeamid"
              value={formData.hometeamid}
              onChange={handleInputChange}
              required
            >
              {teams.map((team) => (
                <option key={team.value} value={team.value}>
                  {team.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>Away Team:</label>
            <select
              name="awayteamid"
              value={formData.awayteamid}
              onChange={handleInputChange}
              required
            >
              {teams.map((team) => (
                <option key={team.value} value={team.value}>
                  {team.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>Match Date:</label>
            <input
              type="date"
              name="matchdate"
              value={formData.matchdate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Venue:</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Seat Count:</label>
            <input
              type="number"
              name="seatcount"
              value={formData.seatcount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Available Seats:</label>
            <input
              type="number"
              name="availableseats"
              value={formData.availableseats}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div className="card-actions">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="match-view">
          <div className="match-info">
            <p>
              <strong>Match ID:</strong> {match.id}
            </p>

            <div className="team-row">
              <img
                src={match.hometeam.teamlogo}
                alt="Home Team Logo"
                className="team-logo"
              />
              <p>
                <strong>
                  {teams.find((t) => t.value === match.hometeamid)?.label}
                </strong>
              </p>

              <span className="vs-text">VS</span>

              <p>
                <strong>
                  {teams.find((t) => t.value === match.awayteamid)?.label}
                </strong>
              </p>
              <img
                src={match.awayteam.teamlogo}
                alt="Away Team Logo"
                className="team-logo"
              />
            </div>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(match.matchdate).toLocaleString()}
            </p>
            <p>
              <strong>Venue:</strong> {match.venue}
            </p>
            <p>
              <strong>Price:</strong> ₹{match.price}
            </p>
            <p>
              <strong>Seat Count:</strong> {match.seatcount}
            </p>
            <p>
              <strong>Available Seats:</strong> {match.availableseats}
            </p>
            <p>
              <strong>Status:</strong> {match.status}
            </p>
          </div>
          <div className="card-actions">
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => onDeleteMatch(match.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMatchCard;
