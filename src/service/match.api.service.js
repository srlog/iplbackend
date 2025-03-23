import axiosInstance from "../config/axiosConfig";

// Fetch all matches
export const getAllMatches = async () => {
    try {
        const response = await axiosInstance.get("/matches");
        return response.data;
    } catch (error) {
        console.error("Error fetching all matches:", error);
        throw error;q
    }
};

// Fetch matches by team ID
export const getMatchesByTeam = async (teamId) => {
    try {
        const response = await axiosInstance.get(`/matches/team/${teamId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching matches by team:", error);
        throw error;
    }
};

// Fetch matches by date
export const getMatchesByDate = async (matchDate) => {
    try {
        const response = await axiosInstance.get(`/matches/date/${matchDate}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching matches by date:", error);
        throw error;
    }
};

// Fetch upcoming matches
export const getUpcomingMatches = async () => {
    try {
        const response = await axiosInstance.get("/matches/upcoming");
        return response.data;
    } catch (error) {
        console.error("Error fetching upcoming matches:", error);
        throw error;
    }
};

// Fetch past matches
export const getPastMatches = async () => {
    try {
        const response = await axiosInstance.get("/matches/past");
        return response.data;
    } catch (error) {
        console.error("Error fetching past matches:", error);
        throw error;
    }
};

// Fetch matches by status
export const getMatchesByStatus = async (status) => {
    try {
        const response = await axiosInstance.get(`/matches/status/${status}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching matches by status:", error);
        throw error;
    }
};

// Fetch match by ID
export const getMatchById = async (id) => {
    try {
        const response = await axiosInstance.get(`/matches/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching match by ID:", error);
        throw error;
    }
};

// Create a new match (Admin only)
export const createMatch = async (matchData) => {
    try {
        const response = await axiosInstance.post("/matches", matchData);
        return response.data;
    } catch (error) {
        console.error("Error creating match:", error);
        throw error;
    }
};

// Create matches in bulk (Admin only)
export const createBulkMatches = async (matches) => {
    try {
        const response = await axiosInstance.post("/matches/bulk", matches);
        return response.data;
    } catch (error) {
        console.error("Error creating bulk matches:", error);
        throw error;
    }
};

// Update match by ID (Admin only)
export const updateMatch = async (id, matchData) => {
    try {
        const response = await axiosInstance.put(`/matches/${id}`, matchData);
        return response.data;
    } catch (error) {
        console.error("Error updating match:", error);
        throw error;
    }
};

// Delete match by ID (Admin only)
export const deleteMatch = async (id) => {
    try {
        const response = await axiosInstance.delete(`/matches/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting match:", error);
        throw error;
    }
};

// Cancel a match (Admin only)
export const cancelMatch = async (id) => {
    try {
        const response = await axiosInstance.put(`/matches/cancel/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error canceling match:", error);
        throw error;
    }
};

