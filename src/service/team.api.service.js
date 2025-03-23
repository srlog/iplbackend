import axiosInstance from "../config/axiosConfig";


export const getAllTeams = async () => {   
    try {
        const response = await axiosInstance.get("/teams");
        return response.data;
    } catch (error) {
        console.error("Error fetching all teams:", error);
        throw error;
    }
}

export const getTeamById = async (id) => {   
    try {
        const response = await axiosInstance.get(`/teams/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching team by ID: ${id}`, error);
        throw error;
    }
}

export const createTeam = async (team) => {   
    try {
        const response = await axiosInstance.post("/teams", team);
        return response.data;
    } catch (error) {
        console.error("Error creating team:", error);
        throw error;
    }
}

export const createBulkTeams = async (teams) => {   
    try {
        const response = await axiosInstance.post("/teams/bulk", teams);
        return response.data;
    } catch (error) {
        console.error("Error creating bulk teams:", error);
        throw error;
    }
}

export const updateTeam = async (id, team) => {   
    try {
        const response = await axiosInstance.put(`/teams/${id}`, team);
        return response.data;
    } catch (error) {
        console.error(`Error updating team by ID: ${id}`, error);
        throw error;
    }
}

export const deleteTeam = async (id) => {   
    try {
        await axiosInstance.delete(`/teams/${id}`);
    } catch (error) {
        console.error(`Error deleting team by ID: ${id}`, error);
        throw error;
    }
}

