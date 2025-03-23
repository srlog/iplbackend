import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMatches, getMatchesByTeam, getMatchesByDate, getUpcomingMatches, getPastMatches, getMatchesByStatus } from '../../service/match.api.service';
import MatchCard from '../../components/MatchCard/MatchCard';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select'; // Import the Select component
import CustomInput from '../../components/CustomInput/CustomInput'; // Import the CustomInput component
import './Home.css';
import { ToastContainer, toast } from 'react-toastify'

const teams = [
    {"id": 1, "teamname": "Chennai Super Kings"},
    {"id": 2, "teamname": "Mumbai Indians"},
    {"id": 3, "teamname": "Royal Challengers Bangalore"},
    {"id": 4, "teamname": "Kolkata Knight Riders"},
    {"id": 5, "teamname": "Sunrisers Hyderabad"},
    {"id": 6, "teamname": "Rajasthan Royals"},
    {"id": 7, "teamname": "Delhi Capitals"},
    {"id": 8, "teamname": "Punjab Kings"},
    {"id": 9, "teamname": "Lucknow Super Giants"},
    {"id": 10, "teamname": "Gujarat Titans"}
];

const statuses = ['upcoming', 'completed', 'cancelled'];

const Home = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [filters, setFilters] = useState({
    team: '',
    date: '',
    status: '',
    upcoming: false,
    past: false,
  });

  useEffect(() => {
    fetchMatches();
  }, [filters]);

  const fetchMatches = async () => {
    try {
      let apiCall;
      if (filters.upcoming) apiCall = getUpcomingMatches;
      else if (filters.past) apiCall = getPastMatches;
      else if (filters.team) apiCall = () => getMatchesByTeam(filters.team);
      else if (filters.date) apiCall = () => getMatchesByDate(filters.date);
      else if (filters.status) apiCall = () => getMatchesByStatus(filters.status);
      else apiCall = getAllMatches;

      const data = await apiCall();
      setMatches(data);
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRefresh = () => {
    setFilters({ team: '', date: '', status: '', upcoming: false, past: false });
  };

  return (
    <div className="home-container">
      <ToastContainer />
      <header className="home-header">
        <h2 className="home-title">Available IPL Matches</h2>
        <div className="home-filters">
          <Select 
            label="Filter by Team" 
            name="team" 
            value={filters.team} 
            onChange={handleFilterChange} 
            options={teams.map(team => ({ value: team.id, label: team.teamname }))} 
          />
          <CustomInput type="date" name="date" label="Filter by Date" value={filters.date} onChange={handleFilterChange} />
          <Select 
            label="Filter by Status" 
            name="status" 
            value={filters.status} 
            onChange={handleFilterChange} 
            options={statuses.map(status => ({ value: status, label: status }))} 
          />
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="upcoming" checked={filters.upcoming} onChange={handleFilterChange} />
              Upcoming Matches
            </label>
            <label>
              <input type="checkbox" name="past" checked={filters.past} onChange={handleFilterChange} />
              Past Matches
            </label>
          </div>
        </div>
        <div className="home-buttons">
          <Button label="Refresh Matches" onClick={handleRefresh} />
        </div>
      </header>

      <section className="matches-list">
        {matches.length > 0 ? (
          matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))
        ) : (
          <div className="no-matches">No matches available.</div>
        )}
      </section>
    </div>
  );
};

export default Home;
