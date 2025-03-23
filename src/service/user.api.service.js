import axiosInstance from "../config/axiosConfig";

export const loginUser = async (email, password) => {
    try {
      const response = await axiosInstance.post('auth/login', { email, password })
      return response.data
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }
  

  export const registerUser = async (username, email, password) => {
    try {
      const response = await axiosInstance.post('auth/register', {
        username,
        email,
        password,
      })
      return response.data
    } catch (error) {
      console.error('Error during registration:', error)
      throw error
    }
  }
  