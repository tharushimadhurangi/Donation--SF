import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Modal } from "react-native";
import { loginUser, getUserById, resetPassword } from "../api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const data = await loginUser(email, password);
      const user = await getUserById(data.uid);

      if (!user) {
        Alert.alert("Error", "User not found");
        return;
      }

      if (user.role === "admin") {
        Alert.alert("Welcome Admin", "Redirecting to Admin Panel...");
        navigation.reset({
          index: 0,
          routes: [{ name: "AdminPanel", params: { user } }],
        });
      } else {
        Alert.alert("Login Successful", `Welcome, ${user.name || "User"}!`);
        navigation.reset({
          index: 0,
          routes: [{ name: "Home", params: { user } }],
        });
      }
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || err.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail || !newPassword) {
      Alert.alert("Error", "Please enter email and new password");
      return;
    }

    try {
      await resetPassword(resetEmail, newPassword);
      Alert.alert("Success", "Password has been updated!");
      setModalVisible(false);
      setResetEmail("");
      setNewPassword("");
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.link}>Don’t have an account? Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={[styles.link, { color: "#e63946", marginTop: 5 }]}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* 🔹 Password Reset Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>

            <TextInput
              placeholder="Enter your email"
              value={resetEmail}
              onChangeText={setResetEmail}
              style={styles.input}
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#0c8286ff", textAlign: "center", marginBottom: 25 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 15, borderRadius: 15, marginBottom: 15 },
  button: { backgroundColor: "#33bae3ff", paddingVertical: 15, borderRadius: 30, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  link: { color: "#0c8286ff", textAlign: "center", marginTop: 10 },
  modalContainer: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#fff", margin: 30, borderRadius: 15, padding: 20 },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: "#0c8286ff", textAlign: "center", marginBottom: 20 },
  cancel: { color: "red", textAlign: "center", marginTop: 10 },
});
