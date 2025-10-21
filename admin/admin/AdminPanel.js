import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import axios from "axios";

// ==========================
// 🔹 API BASE
// ==========================
const LOCAL_DEVICE_IP = "192.168.43.199"; // replace with your PC IP
const API_BASE =
  Platform.OS === "android"
    ? `http://${LOCAL_DEVICE_IP}:5000/api/admin`
    : "http://localhost:5000/api/admin";

export default function AdminPanel({ navigation }) {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);
  const [moneyDonations, setMoneyDonations] = useState([]);

  // ==========================
  // 🔹 Fetch all requests from backend
  // ==========================
  const fetchRequests = async () => {
    try {
      const [bloodRes, donationRes, moneyRes] = await Promise.all([
        axios.get(`${API_BASE}/blood/requests`),
        axios.get(`${API_BASE}/donations/requests`),
        axios.get(`${API_BASE}/money/requests`),
      ]);

      setBloodRequests(bloodRes.data.requests || []);
      setDonationRequests(donationRes.data.requests || []);
      setMoneyDonations(moneyRes.data.requests || []);
    } catch (err) {
      console.error("Fetch Requests Error:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to fetch requests");
    }
  };

  // ==========================
  // 🔹 Approve/Reject handler
  // ==========================
  const handleAction = async (id, type, action) => {
    try {
      const status = action === "Approve" ? "Approved" : "Rejected";

      // Optimistic UI update
      const updateState = (list, setList) =>
        setList(list.map(item => (item.id === id ? { ...item, status } : item)));

      if (type === "blood") updateState(bloodRequests, setBloodRequests);
      else if (type === "donation") updateState(donationRequests, setDonationRequests);
      else if (type === "money") updateState(moneyDonations, setMoneyDonations);

      // Call backend API to update status in Firebase
      let url = `${API_BASE}/requests/${id}/status?type=${type}`;
      await axios.put(url, { status });

      Alert.alert("Success", `${type} request ${status}`);
    } catch (err) {
      console.error("Action Error:", err.response?.data || err.message);
      Alert.alert("Error", `Failed to ${action} request`);
    }
  };

  // ==========================
  // 🔹 Logout
  // ==========================
  const handleLogout = () => {
    navigation.replace("Login");
  };

  // ==========================
  // 🔹 Load requests on mount
  // ==========================
  useEffect(() => {
    fetchRequests();
  }, []);

  // ==========================
  // 🔹 Render request card
  // ==========================
  const renderRequestItem = (item, type) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.fullName || item.userName || "Anonymous"}</Text>
      <Text>
        {type === "blood"
          ? `🩸 Blood Group: ${item.bloodGroup || "N/A"}`
          : type === "money"
          ? `💰 Amount: ${item.amount || 0}`
          : `🎁 Item: ${item.itemType || "N/A"} (${item.quantity || 0})`}
      </Text>
      <Text>Status: {item.status || "pending"}</Text>

      {item.status?.toLowerCase() === "pending" && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.approveBtn}
            onPress={() => handleAction(item.id, type, "Approve")}
          >
            <Text style={styles.btnText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rejectBtn}
            onPress={() => handleAction(item.id, type, "Reject")}
          >
            <Text style={styles.btnText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Admin Panel 🛠️</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>🩸 Blood Requests</Text>
      <FlatList
        data={bloodRequests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => renderRequestItem(item, "blood")}
        ListEmptyComponent={<Text>No blood requests found.</Text>}
      />

      <Text style={styles.sectionTitle}>🎁 Donation Requests</Text>
      <FlatList
        data={donationRequests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => renderRequestItem(item, "donation")}
        ListEmptyComponent={<Text>No donation requests found.</Text>}
      />

      <Text style={styles.sectionTitle}>💰 Money Donations</Text>
      <FlatList
        data={moneyDonations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => renderRequestItem(item, "money")}
        ListEmptyComponent={<Text>No money donations yet.</Text>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f3f6f9" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#003087" },
  logoutBtn: { backgroundColor: "#e74c3c", padding: 8, borderRadius: 6 },
  logoutText: { color: "#fff", fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10, color: "#003087" },
  card: { backgroundColor: "#fff", padding: 15, marginVertical: 6, borderRadius: 8, elevation: 3 },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 6, color: "#222" },
  buttonGroup: { flexDirection: "row", marginTop: 10 },
  approveBtn: { backgroundColor: "#27ae60", padding: 8, borderRadius: 6, marginRight: 10 },
  rejectBtn: { backgroundColor: "#c0392b", padding: 8, borderRadius: 6 },
  btnText: { color: "#fff", fontWeight: "bold" },
});
