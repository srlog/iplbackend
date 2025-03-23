import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      if (user.role == "admin") {
        setIsAdmin(true);
        }
        else {
          setIsAdmin(false);        
         } // Assuming isAdmin property exists in user object
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="https://i0.wp.com/myvoice.opindia.com/wp-content/uploads/sites/3/2020/08/logo-Copy.jpg?fit=2000%2C1333&ssl=1" alt="IPL Logo" style={{ width: '30px', height: '30px' }} />
        <Link to="/home" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', marginLeft: '10px' }}>IPL Ticket Booking</Link>
      </div>
      <ul className="navbar-nav">
        {isLoggedIn ? (
          <>
            <li className="nav-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/bookings">Bookings</Link>
            </li>
            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link to="/admin/matches">Manage Matches</Link>   
                </li>
                <li className="nav-item">
                  <Link to="/admin/bookings">Manage Bookings</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

