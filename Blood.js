import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BloodHome({ navigation }) {
  const buttons = [
    { label: "Request Blood", screen: "RequestBlood" },
    { label: "Register as Donor", screen: "DonorRegistration" },
    { label: "Search Donors", screen: "BloodSearchScreen" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* 🔹 Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>
       
      </View>

      {/* 🔹 Helpful Info Section */}
      <View style={styles.infoBox}>
        <Image
          source={require("../assets/blood.jpg")}
          style={styles.infoImage}
        />
        <Text style={styles.infoTitle}>Donate Blood, Save Lives ❤️</Text>
        <Text style={styles.infoText}>
          Your small act of kindness can make a big difference. Donating blood helps
          patients in emergencies, surgeries, and those with chronic illnesses.
        </Text>
      </View>

      {/* 🔹 Vertical Button Bar */}
      <View style={styles.buttonContainer}>
        {buttons.map((btn, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.button}
            onPress={() => navigation.navigate(btn.screen)}
          >
            <Text style={styles.buttonText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007BFF",
  },
  infoBox: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "95%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 30,
  },
  infoImage: {
    width: 170,
    height: 170,
    marginBottom: 15,
    borderRadius: 50,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1b9ed7fb",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
