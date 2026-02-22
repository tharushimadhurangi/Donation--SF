import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

export default function ProfileScreen({ route, navigation }) {
  const { user: initialUser } = route.params;
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialUser.name);
  const [phone, setPhone] = useState(initialUser.phone);

  const handleSave = async () => {
    if (!name || !phone) {
      Alert.alert("Error", "Name and phone cannot be empty");
      return;
    }

    try {
      await axios.put(`http://192.168.43.199:5000/user/${user.uid}`, {
        name,
        phone,
      });
      setUser({ ...user, name, phone });
      setIsEditing(false);
      Alert.alert("Success", "Profile updated!");
    } catch (err) {
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  const menuItems = [
    { icon: "person-outline", title: "Account", onPress: () => {} },
    { icon: "notifications-outline", title: "Notifications", onPress: () => {} },
    { icon: "help-circle-outline", title: "Help & Support", onPress: () => {} },
    { icon: "chatbox-ellipses-outline", title: "Feedback", onPress: () => {} },
    { icon: "gift-outline", title: "Donation History", onPress: () => navigation.navigate("DonationHistory", { user }) },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#33bae3ff", "#41d7f1ff"]} style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <Ionicons name="person-circle" size={120} color="#fff" />
        {isEditing ? (
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.nameInput}
          />
        ) : (
          <Text style={styles.name}>{user.name}</Text>
        )}
        <Text style={styles.email}>{user.email}</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          <Ionicons
            name={isEditing ? "save-outline" : "create-outline"}
            size={20}
            color="#4e73df"
          />
          <Text style={styles.editButtonText}>
            {isEditing ? "Save" : "Edit Profile"}
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Contact Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Info</Text>

        <View style={styles.row}>
          <Ionicons name="call-outline" size={20} color="#4e73df" />
          {isEditing ? (
            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={styles.cardInput}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.cardText}>{user.phone}</Text>
          )}
        </View>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={20} color="#4e73df" />
          <Text style={styles.cardText}>
            Joined:{" "}
            {user.createdAt.seconds
              ? new Date(user.createdAt.seconds * 1000).toLocaleDateString()
              : new Date(user.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.card}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuRow}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon} size={22} color="#4e73df" />
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f2f7",
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    padding: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    width: 200,
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    color: "#e0e0e0",
    marginTop: 5,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 15,
  },
  editButtonText: {
    color: "#4e73df",
    fontWeight: "bold",
    marginLeft: 5,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#33bae3ff",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 10,
  },
  cardInput: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#4e73df",
    flex: 1,
    paddingVertical: 2,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 15,
    flex: 1,
  },
});
