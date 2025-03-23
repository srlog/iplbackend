// src/pages/AdminMatches/AdminMatches.jsx
import React, { useEffect, useState } from "react";
import AdminMatchCard from "../../../components/AdminMatchCard/AdminMatchCard";
import {
  getAllMatches,
  updateMatch,
  deleteMatch,
  createMatch,
} from "../../../service/match.api.service";
import { ToastContainer, toast } from "react-toastify";
import DeleteConfirmation from "../../../components/ConfirmationModel/ConfirmationModal";
import "./Matches.css";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMatch, setNewMatch] = useState({
    hometeamid: "",
    awayteamid: "",
    matchdate: "",
    venue: "",
    price: "",
    seatcount: "",
    availableseats: "",
    status: "upcoming",
  });

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

  const fetchMatches = async () => {
    try {
      const data = await getAllMatches();
      setMatches(data);
    } catch (error) {
      console.error("Error fetching matches:", error);
      toast.error("Failed to fetch matches.");
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleUpdateMatch = async (matchId, updatedData) => {
    try {
      await updateMatch(matchId, updatedData);
      setMatches(
        matches.map((match) =>
          match.id === matchId ? { ...match, ...updatedData } : match
        )
      );
      toast.success("Match updated successfully!");
    } catch (error) {
      console.error("Error updating match:", error);
      toast.error("Failed to update match.");
    }
  };

  const handleDeleteMatch = async (matchId) => {
    try {
      if (window.confirm("Are you sure you want to delete this match?")) {
        await deleteMatch(matchId);
        setMatches(matches.filter((match) => match.id !== matchId));
        toast.success("Match deleted successfully!");
      }
      else{
        toast.error("Match deletion cancelled.");
      }

    } catch (error) {
      console.error("Error deleting match:", error);
      toast.error("Failed to delete match.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMatch((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMatch = async (e) => {
    e.preventDefault();
    try {
      const created = await createMatch(newMatch);
      toast.success("Match added successfully!");
      setNewMatch({
        hometeamid: "",
        awayteamid: "",
        matchdate: "",
        venue: "",
        price: "",
        seatcount: "",
        availableseats: "",
        status: "upcoming",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error creating match:", error);
      toast.error("Failed to add match.");
    }
  };

  return (
    <div className="admin-matches-container">
      <ToastContainer />
      <header className="admin-matches-header">
        <h2>Manage Matches</h2>
        <button
          className="add-match-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Add Match
        </button>
      </header>
      {showAddForm && (
        <form className="add-match-form" onSubmit={handleAddMatch}>
          <div className="form-row">
            <label>Home Team:</label>
            <select
              name="hometeamid"
              value={newMatch.hometeamid}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Home Team</option>
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
              value={newMatch.awayteamid}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Away Team</option>
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
              value={newMatch.matchdate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Venue:</label>
            <input
              type="text"
              name="venue"
              value={newMatch.venue}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={newMatch.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Seat Count:</label>
            <input
              type="number"
              name="seatcount"
              value={newMatch.seatcount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Available Seats:</label>
            <input
              type="number"
              name="availableseats"
              value={newMatch.availableseats}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Status:</label>
            <select
              name="status"
              value={newMatch.status}
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
          <div className="form-actions">
            <button type="submit" className="save-match-button">
              Save Match
            </button>
            <button
              type="button"
              className="cancel-match-button"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <section className="admin-matches-list">
        {matches.length > 0 ? (
          matches.map((match) => (
            <AdminMatchCard
              key={match.id}
              match={match}
              onUpdateMatch={handleUpdateMatch}
              onDeleteMatch={handleDeleteMatch}
            />
          ))
        ) : (
          <div className="no-matches">No matches found.</div>
        )}
      </section>
    </div>
  );
};

export default Matches;
