import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import Bookings from './pages/Bookings/Bookings';
import ManageBookings from './pages/Manage/Bookings/ManageBookings';
import ManageMatches from './pages/Manage/Matches/Matches';
// import NotFound from './pages/NotFound';
import Home from './pages/Home/Home';




function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* User Routes */}
          <Route path="/bookings" element={<Bookings />} />
          
          {/* Admin Routes */}
           <Route path="/admin/matches" element={<ManageMatches />} />
          <Route path="/admin/Bookings" element={<ManageBookings />} /> 
          
          {/* Fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </main> 
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
