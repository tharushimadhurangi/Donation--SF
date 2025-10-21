import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { httpsCallable } from "firebase/functions";

export default function SuccessPage({ navigation, route }) {
  const { userName, amountRequested, requestId } = route.params; // from donation form
  const [email, setEmail] = useState("");

  const handleSendReceipt = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    try {
      const sendReceipt = httpsCallable(functions, "sendDonationReceipt");
      const result = await sendReceipt({ email, userName, amount: amountRequested, requestId });

      if (result.data.success) {
        Alert.alert("Success", `Receipt sent to ${email}!`);
        setEmail(""); 
      } else {
        Alert.alert("Error", result.data.error);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Transaction Successful 🎉</Text>
      <Text style={styles.infoText}>Enter your email to receive a receipt:</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleSendReceipt}>
        <Text style={styles.buttonText}>Send Receipt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  successText: { fontWeight: "bold", fontSize: 20, marginBottom: 10, textAlign: "center" },
  infoText: { textAlign: "center", marginBottom: 10, color: "green" },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f5fdf5",
  },
  button: {
    backgroundColor: "#b2f5b2",
    padding: 12,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { fontWeight: "bold", color: "#000" },
});
