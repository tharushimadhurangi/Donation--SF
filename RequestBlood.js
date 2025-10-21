import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { submitBloodRequest } from "../api";
import { Ionicons } from "@expo/vector-icons";

export default function DonationRequestScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [reason, setReason] = useState("");
  const [nic, setNic] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    if (!fullName || !bloodGroup || !reason || !nic || !contactNumber || !location) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    try {
      const data = { userId: "demo-user", fullName, bloodGroup, reason, nic, contactNumber, description, location };
      await submitBloodRequest(data);
      Alert.alert("✅ Success", "Blood request submitted successfully!");

      setFullName(""); setBloodGroup(""); setReason(""); setNic("");
      setContactNumber(""); setDescription(""); setLocation("");
    } catch (err) {
      console.error(err);
      Alert.alert("❌ Error", "Could not submit request.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🩸 Request Blood</Text>
<View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>
       
      </View>
      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="NIC Number" value={nic} onChangeText={setNic} />
      <TextInput style={styles.input} placeholder="Contact Number" value={contactNumber} onChangeText={setContactNumber} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Reason for Request" value={reason} onChangeText={setReason} />
      <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
      <TextInput style={[styles.input, styles.textArea]} placeholder="Additional Description" value={description} onChangeText={setDescription} multiline />

      <View style={styles.pickerContainer}>
        <Ionicons name="water" size={20} color="#d32f2f" style={{ marginRight: 5 }} />
        <Picker selectedValue={bloodGroup} onValueChange={setBloodGroup} style={styles.picker}>
          <Picker.Item label="Select Blood Group" value="" />
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="AB+" value="AB+" />
          <Picker.Item label="AB-" value="AB-" />
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="O-" value="O-" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 15,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 2,
  },
  picker: {
    flex: 1,
    color: "#333",
  },
  button: {
    backgroundColor: "#d32f2f",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
