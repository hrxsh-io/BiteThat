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
    const response = await axios.patch(
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

// ==========================================
// FORGOT PASSWORD
// ==========================================

export const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API_URL}/forgot-password`,
    { email }
  );

  return response.data;
};

// ==========================================
// VERIFY RESET CODE
// ==========================================

export const verifyResetCode = async (email, code) => {
  const response = await axios.post(
    `${API_URL}/verify-reset-code`,
    {
      email,
      code,
    }
  );

  return response.data;
};

// ==========================================
// RESET PASSWORD
// ==========================================

export const resetPassword = async (
  email,
  code,
  newPassword
) => {
  const response = await axios.post(
    `${API_URL}/reset-password`,
    {
      email,
      code,
      newPassword,
    }
  );

  return response.data;
};

// ==========================================
// GET SAVED ADDRESSES
// ==========================================

export const getAddresses = async (token) => {
  const response = await axios.get(
    `${API_URL}/addresses`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ==========================================
// ADD ADDRESS
// ==========================================

export const addAddress = async (token, addressData) => {
  const response = await axios.post(
    `${API_URL}/addresses`,
    addressData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ==========================================
// UPDATE ADDRESS
// ==========================================

export const updateAddress = async (
  token,
  addressId,
  addressData
) => {
  const response = await axios.patch(
    `${API_URL}/addresses/${addressId}`,
    addressData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ==========================================
// DELETE ADDRESS
// ==========================================

export const deleteAddress = async (token, addressId) => {
  const response = await axios.delete(
    `${API_URL}/addresses/${addressId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};