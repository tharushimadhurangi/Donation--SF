import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ToastAndroid, Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DonationRequestForm({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [medicalReport, setMedicalReport] = useState(null);
  const [policeReport, setPoliceReport] = useState(null);
  const [gramaSevakaReport, setGramaSevakaReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const API_BASE = "http://192.168.43.199:5000"; 

  const pickImage = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: true, 
    });
    if (!result.canceled) setImage(result.assets[0]);
  };

  const showToast = (message) => {
    if (Platform.OS === "android") ToastAndroid.show(message, ToastAndroid.SHORT);
    else {
      setToastMessage(message);
      setTimeout(() => setToastMessage(""), 2500);
    }
  };

  const handleSubmit = async () => {
    if (!fullName || !nic || !address || !contactNumber || !itemType || !quantity || !reason) {
      showToast("⚠️ Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fullName,
        nic,
        address,
        contactNumber,
        itemType,
        quantity,
        reason,
        description,
        medicalReportUrl: medicalReport ? `data:image/jpeg;base64,${medicalReport.base64}` : "",
        policeReportUrl: policeReport ? `data:image/jpeg;base64,${policeReport.base64}` : "",
        gramaOfficerCertificateUrl: gramaSevakaReport ? `data:image/jpeg;base64,${gramaSevakaReport.base64}` : "",
      };

      await axios.post(`${API_BASE}/api/donation-requests`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      showToast("✅ Request submitted successfully!");

      // Clear form
      setFullName(""); setNic(""); setAddress(""); setContactNumber("");
      setItemType(""); setQuantity(""); setReason(""); setDescription("");
      setMedicalReport(null); setPoliceReport(null); setGramaSevakaReport(null);
    } catch (error) {
      console.error(error);
      showToast("❌ Failed to submit. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Icon name="arrow-back-ios" size={24} color="#003087" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>📋 Donation Request Form</Text>
</View>
      

      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="NIC Number" value={nic} onChangeText={setNic} />
      <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
      <TextInput style={styles.input} placeholder="Contact Number" value={contactNumber} onChangeText={setContactNumber} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Item Type" value={itemType} onChangeText={setItemType} />
      <TextInput style={styles.input} placeholder="Quantity" value={quantity} onChangeText={setQuantity} />
      <TextInput style={[styles.input, styles.textArea]} placeholder="Reason" value={reason} onChangeText={setReason} multiline />
      <TextInput style={[styles.input, styles.textArea]} placeholder="Description" value={description} onChangeText={setDescription} multiline />

      <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setMedicalReport)}><Text>📄 Upload Medical Report</Text></TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setPoliceReport)}><Text>🚓 Upload Police Report</Text></TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setGramaSevakaReport)}><Text>🏠 Upload Grama Sevaka Report</Text></TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Submitting..." : "Submit Request"}</Text>
      </TouchableOpacity>

      {toastMessage ? <Text style={styles.toast}>{toastMessage}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, alignItems: "center", padding: 20, backgroundColor: "#f0f4f8" },
  title: { fontSize: 26, fontWeight: "700", color: "#003087", marginBottom: 20 },
  input: { width: "100%", backgroundColor: "#fff", borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: "#ccc" },
  textArea: { height: 80, textAlignVertical: "top" },
  uploadButton: { backgroundColor: "#CFE8FF", padding: 12, borderRadius: 10, marginBottom: 10, alignItems: "center" },
  button: { backgroundColor: "#33bae3", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  toast: { marginTop: 10, color: "green", fontWeight: "600" },
 
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#003087",
    marginLeft: 10,
  },
  
});

