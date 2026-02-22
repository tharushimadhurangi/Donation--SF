import React, { useState } from "react";
import { 
  View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, KeyboardAvoidingView, Platform 
} from "react-native";
import { resetPassword } from "../api";

export default function ResetPasswordScreen({ route, navigation }) {
  const [email, setEmail] = useState(route.params?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await resetPassword(email, newPassword);
      Alert.alert("Success", res.message);
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.error || err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Reset Password</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleReset}
          style={[styles.button, loading && { opacity: 0.7 }]}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Updating..." : "Update Password"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#15bdc3ff",
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    backgroundColor: "#2dd3d8ff",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#0c8286ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
