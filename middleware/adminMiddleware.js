const Booking = require("../models/Booking");

const isAdmin = (req, res, next) => {
  // req.user is set by the auth middleware
  if (!req.user) {
    return res.status(401).json({ 
      message: "Authentication required.",
      currentRole: 'none'
    });
  }

  // If user is authenticated but not an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({ 
      message: "Access denied. Admin only.",
      currentRole: req.user ? req.user.role : 'none'
    });
  }
  next();
};

const isAdminOrOwner = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Access denied. Authentication required." });
  }

  try {
    const booking = await Booking.findOne({ where: { id: req.params.id } });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    console.log('booking.userId', booking.userid);
    console.log('req.user.id', req.user.id);
    console.log(req.user.id === booking.userid);


    if (req.user.role === "admin" || req.user.id === booking.userid) {
      return next();
    } else {
      return res.status(403).json({ 
        message: "Access denied. Admin or resource owner only.",
        currentRole: req.user.role,
        currentUserId: req.user.id
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      message: "Error checking booking ownership", 
      error: error.message 
    });
  }
};

module.exports = {
  isAdmin,
  isAdminOrOwner
};
