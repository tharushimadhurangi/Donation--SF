import axios from "axios";
import { Platform } from "react-native";

// ==========================
// 🔹 API BASE
// ==========================
const LOCAL_DEVICE_IP = "192.168.43.199"; // Change to your PC IP
export const API_BASE =
  Platform.OS === "android"
    ? `http://${LOCAL_DEVICE_IP}:5000`
    : "http://localhost:5000";

   // 🩸 Blood Requests
export const submitBloodRequest = async (requestData) => {
  try {
    const res = await axios.post(`${API_BASE}/api/blood/requests`, requestData);
    return res.data;
  } catch (err) {
    console.error("Submit Blood Request Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to submit blood request" };
  }
};



export const createPayPalOrder = async (amount, donationId) => {
  try {
    const res = await axios.post(`${API_BASE}/api/donations/create-order`, { amount, donationId });
    return res.data;
  } catch (err) {
    console.error("Create PayPal Order Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to create PayPal order" };
  }
};

export const capturePayPalPayment = async (orderID, donationId) => {
  try {
    const res = await axios.post(`${API_BASE}/api/donations/capture-order`, { orderID, donationId });
    return res.data;
  } catch (err) {
    console.error("Capture PayPal Payment Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to capture PayPal payment" };
  }
};

// ==========================================================
// 🧑‍💻 AUTHENTICATION
// ==========================================================
export const registerUser = async (name, email, password, phone) => {
  try {
    const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email, password, phone });
    return res.data;
  } catch (err) {
    console.error("Registration Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Registration failed" };
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
    return res.data;
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Login failed" };
  }
};

export const getUserById = async (uid) => {
  try {
    const res = await axios.get(`${API_BASE}/api/auth/user/${uid}`);
    return res.data;
  } catch (err) {
    console.error("Get User Error:", err.message);
    throw err.response?.data || { error: "Failed to fetch user" };
  }
};

export const updateUserApi = async (uid, updates) => {
  try {
    const res = await axios.put(`${API_BASE}/api/auth/user/${uid}`, updates);
    return res.data;
  } catch (err) {
    console.error("Update User Error:", err.message);
    throw err.response?.data || { error: "Failed to update user" };
  }
};

// ==========================================================
// 💌 NOTIFICATIONS (Admin → User)
// ==========================================================
export const getNotifications = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE}/api/admin/notifications/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Get Notifications Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to fetch notifications" };
  }
};

export const markNotificationRead = async (id) => {
  try {
    const res = await axios.put(`${API_BASE}/api/admin/notifications/${id}/read`);
    return res.data;
  } catch (err) {
    console.error("Mark Notification Read Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to mark notification as read" };
  }
};

// ==========================================================
// 🛠 ADMIN DONATION REQUESTS
// ==========================================================
export const getAllDonationRequestsAdmin = async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/admin/donations/requests`);
    return res.data;
  } catch (err) {
    console.error("Get All Donation Requests Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to fetch donation requests" };
  }
};

export const getDonationRequestByIdAdmin = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/api/admin/donations/requests/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get Donation Request By ID Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to fetch donation request" };
  }
};

export const updateDonationStatusAdmin = async (id, status) => {
  try {
    const res = await axios.put(`${API_BASE}/api/admin/requests/${id}/status?type=donation`, { status });
    return res.data;
  } catch (err) {
    console.error("Update Donation Status Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to update donation status" };
  }
};

// ==========================================================
// 🛠 ADMIN BLOOD REQUESTS
// ==========================================================
export const getAllBloodRequestsAdmin = async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/admin/blood/requests`);
    return res.data;
  } catch (err) {
    console.error("Get All Blood Requests Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to fetch blood requests" };
  }
};

export const getBloodRequestByIdAdmin = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/api/admin/blood/requests/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get Blood Request By ID Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to fetch blood request" };
  }
};

export const updateBloodStatusAdmin = async (id, status) => {
  try {
    const res = await axios.put(`${API_BASE}/api/admin/requests/${id}/status?type=blood`, { status });
    return res.data;
  } catch (err) {
    console.error("Update Blood Status Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to update blood request status" };
  }
};

// ==========================================================
// 🛠 ADMIN MONEY DONATIONS
// ==========================================================
export const getAllMoneyDonationsAdmin = async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/admin/money/requests`);
    return res.data;
  } catch (err) {
    console.error("Get All Money Donations Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to fetch money donations" };
  }
};

export const getMoneyDonationByIdAdmin = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/api/admin/money/requests/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get Money Donation By ID Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to fetch money donation" };
  }
};

export const updateMoneyDonationStatusAdmin = async (id, status) => {
  try {
    const res = await axios.put(`${API_BASE}/api/admin/requests/${id}/status?type=money`, { status });
    return res.data;
  } catch (err) {
    console.error("Update Money Donation Status Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to update money donation status" };
  }
};
// ==========================================================
// 💖 SAVE MONEY DONATION
// ==========================================================
export const saveDonation = async (donationData) => {
  try {
    const res = await axios.post(`${API_BASE}/api/donations/save-donation`, donationData);
    return res.data;
  } catch (err) {
    console.error("Save Donation Error:", err.response?.data || err.message);
    throw err.response?.data || { error: "Failed to save donation" };
  }
};
