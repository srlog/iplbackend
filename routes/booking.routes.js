const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const auth = require("../middleware/authMiddleware");
const { isAdmin, isAdminOrOwner } = require("../middleware/adminMiddleware");



const isSelfOrAdmin = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required." });
    }
    if (req.user.role === "admin" || req.user.id == req.params.userid) {
      return next();
    }
    return res.status(403).json({ message: "Access denied. You can only view your own bookings." });
  };

router.post("/", auth, bookingController.createBooking);

router.post('/bulk', auth, isAdmin, bookingController.createbulkBookings); // The autodecreement with the seats is not working.. 

//Only admin can get all bookings
router.get("/", auth, isAdmin, bookingController.getAllBookings);

router.get("/match/:matchid", auth, bookingController.getBookingByMatchId);
router.get("/user/:userid", auth,isSelfOrAdmin, bookingController.getBookingByUserId); // Moved before `/:id`
router.get("/:id", auth, isAdminOrOwner, bookingController.getBookingById);

router.put("/:id", auth, isAdminOrOwner, bookingController.updateBooking);
router.delete("/:id", auth, isAdminOrOwner, bookingController.deleteBooking);

module.exports = router;
