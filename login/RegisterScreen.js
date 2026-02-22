import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from "react-native";
import { registerUser } from "../api";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !phone) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const data = await registerUser(name, email, password, phone);

      Alert.alert("Registration Successful", `Welcome, ${data.name || "User"}!`, [
        {
          text: "OK",
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: "Login", params: { user: data } }],
          }),
        },
      ]);

    } catch (err) {
      Alert.alert("Error", err.error || err.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1598379621432-d2b67f53f89b?auto=format&fit=crop&w=800&q=60" }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
        <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 30,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0c8286ff",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#33bae3ff",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#33bae3ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  link: { color: "#0c8286ff", fontSize: 14, textAlign: "center", marginTop: 10 },
});
