import axiosInstance from "../config/axiosConfig";

// Create a new booking
export const createBooking = async (bookingData) => {
    try {
        const response = await axiosInstance.post("/bookings", bookingData);
        return response.data;
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};

// Create multiple bookings in bulk (Admin only)
export const createBulkBookings = async (bookings) => {
    try {
        const response = await axiosInstance.post("/bookings/bulk", bookings);
        return response.data;
    } catch (error) {
        console.error("Error creating bulk bookings:", error);
        throw error;
    }
};

// Fetch all bookings (Admin only)
export const getAllBookings = async () => {
    try {
        const response = await axiosInstance.get("/bookings");
        return response.data;
    } catch (error) {
        console.error("Error fetching all bookings:", error);
        throw error;
    }
};

// Fetch bookings by match ID
export const getBookingByMatchId = async (matchId) => {
    try {
        const response = await axiosInstance.get(`/bookings/match/${matchId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching booking by match ID:", error);
        throw error;
    }
};

// Fetch bookings by user ID (Self or Admin)
export const getBookingByUserId = async (userId) => {
    try {
        const response = await axiosInstance.get(`/bookings/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching booking by user ID:", error);
        throw error;
    }
};

// Fetch booking by ID (Admin or Owner)
export const getBookingById = async (id) => {
    try {
        const response = await axiosInstance.get(`/bookings/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching booking by ID:", error);
        throw error;
    }
};

// Update booking by ID (Admin or Owner)
export const updateBooking = async (id, bookingData) => {
    try {
        const response = await axiosInstance.put(`/bookings/${id}`, bookingData);
        return response.data;
    } catch (error) {
        console.error("Error updating booking:", error);
        throw error;
    }
};

// Delete booking by ID (Admin or Owner)
export const deleteBooking = async (id) => {
    try {
        const response = await axiosInstance.delete(`/bookings/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting booking:", error);
        throw error;
    }
};
