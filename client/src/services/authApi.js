import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

// ==========================================
// LOGIN
// ==========================================

export const loginUser = async (credentials) => {
    const response = await axios.post(
        `${API_URL}/login`,
        credentials,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// ==========================================
// REGISTER
// ==========================================

export const registerUser = async (userData) => {
    const response = await axios.post(
        `${API_URL}/register`,
        userData,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// ==========================================
// GET CURRENT USER
// ==========================================

export const getCurrentUser = async (token) => {
    const response = await axios.get(
        `${API_URL}/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        }
    );

    return response.data;
};

// ==========================================
// UPDATE PROFILE
// ==========================================

export const updateProfile = async (token, profileData) => {
    const response = await axios.patch(
        `${API_URL}/profile`,
        profileData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        }
    );

    return response.data;
};

// ==========================================
// CHANGE PASSWORD
// ==========================================

export const changePassword = async (token, passwordData) => {
    const response = await axios.put(
        `${API_URL}/change-password`,
        passwordData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        }
    );

    return response.data;
};