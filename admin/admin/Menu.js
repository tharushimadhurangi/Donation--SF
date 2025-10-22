import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function Menu({ navigation, route }) {
  const user = route.params?.user;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // "addAccount" or "changeLanguage"

  const menuItems = [
    { title: "Account", icon: "person-add-outline", screen: null },
     { title: "Donation History", icon: "heart-outline", screen: "DonationHistory" },
     { title: "Settings", icon: "settings-outline", screen: "Profile" },
    { title: "Notifications", icon: "notifications-outline", screen: "NotificationsScreen" },
    { title: "Help & Support", icon: "help-circle-outline", screen: "HelpSupportScreen" },
    { title: "Feedback", icon: "chatbubble-ellipses-outline", screen: "Feedback" },
    { title: "Change Language", icon: "language-outline", screen: null },
  ];

  const handleItemPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen, { user });
    } else {
      if (item.title === "Add Account") setModalType("addAccount");
      if (item.title === "Change Language") setModalType("changeLanguage");
      setModalVisible(true);
    }
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuList}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => handleItemPress(item)}
          >
            <Ionicons name={item.icon} size={24} color="#1E90FF" />
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for Add Account / Change Language */}
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {modalType === "addAccount" ? "Add Account" : "Change Language"}
            </Text>
            <Text style={styles.modalText}>
              {modalType === "addAccount"
                ? "Here you can add a new account."
                : "Select your preferred language."}
            </Text>
            <Pressable
              style={[styles.modalButton, { backgroundColor: "#1E90FF" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8fa",
    height: height / 1.1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#1E90FF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: { color: "#fff", fontSize: 24, fontWeight: "700" },
  menuList: {
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  itemText: {
    fontSize: 18,
    color: "#333",
    marginLeft: 15,
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f11c0dff",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 12,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
