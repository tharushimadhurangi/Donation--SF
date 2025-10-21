import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Alert } from "react-native";
import axios from "axios";

const API_BASE = "http://192.168.43.199:5000"; // ⚙️ your backend IP

export default function AdminBloodRequestList({ navigation }) {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/blood-requests`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to fetch blood requests");
    }
  };

  const handleAction = async (id, action) => {
    try {
      await axios.put(`${API_BASE}/api/blood-request/${id}/${action}`);
      Alert.alert("Success", `Request ${action}ed successfully`);
      fetchRequests();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", `Failed to ${action} request`);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const renderRequest = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.userName}>{item.fullName}</Text>
        <Text
          style={[
            styles.status,
            item.status === "pending"
              ? styles.pending
              : item.status === "approved"
              ? styles.approved
              : styles.rejected,
          ]}
        >
          {item.status.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.cardText}><Text style={styles.bold}>Blood Group:</Text> {item.bloodGroup}</Text>
      <Text style={styles.cardText}><Text style={styles.bold}>Reason:</Text> {item.reason}</Text>
      <Text style={styles.cardText}><Text style={styles.bold}>Contact:</Text> {item.contactNumber}</Text>
      <Text style={styles.cardText}><Text style={styles.bold}>Location:</Text> {item.location}</Text>

      {item.status === "pending" && (
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.approve}
            onPress={() => handleAction(item.id, "approve")}
          >
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reject}
            onPress={() => handleAction(item.id, "reject")}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Blood Requests</Text>
      </View>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequest}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7", paddingHorizontal: 15 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  header: { fontSize: 24, fontWeight: "bold", color: "#2c3e50" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  userName: { fontSize: 18, fontWeight: "bold", color: "#34495e" },
  status: { fontSize: 12, fontWeight: "bold", paddingVertical: 3, paddingHorizontal: 8, borderRadius: 12, color: "#fff" },
  pending: { backgroundColor: "#f39c12" },
  approved: { backgroundColor: "#27ae60" },
  rejected: { backgroundColor: "#c0392b" },
  cardText: { fontSize: 14, color: "#555", marginBottom: 3 },
  bold: { fontWeight: "bold" },
  buttons: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10, gap: 10 },
  approve: { backgroundColor: "#27ae60", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 25 },
  reject: { backgroundColor: "#c0392b", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 25 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});
