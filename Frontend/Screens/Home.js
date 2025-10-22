import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getNotifications } from "../api";

import News from "./News";
import Category from "./Category";
import Volunteerhome from "./Volunteerhome";
import heroImage from "../assets/give-me-hope-3.jpg";

export default function Home({ navigation, route }) {
  const { user } = route.params;
  const [notifications, setNotifications] = useState([]);

  // Example news data
  const news = [
    { id: 1, title: "News 1" },
    
  ];

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications(user.uid);
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error fetching notifications:", error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => !n.read).length
    : 0;

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            }),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* ================= HEADER ================= */}
      <View style={styles.donateHeader}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.navigate("Menu", { user })}>
            <Ionicons name="menu-outline" size={28} color="#000" />
          </TouchableOpacity>

          <Text style={styles.greetingText}>Hello, {user?.name ?? ""} 👋</Text>

          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("NotificationsScreen", { user })
              }
            >
              <Ionicons name="notifications-outline" size={30} color="#fff" />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Profile", { user })}
              style={{ marginHorizontal: 10 }}
            >
              <Ionicons name="person-circle-outline" size={38} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Image source={heroImage} style={styles.heroImage} resizeMode="contain" />
        <Text style={styles.donateTitle}>Give me a Hope</Text>
        <Text style={styles.donateSubtitle}>Good deeds every day</Text>
      </View>

      {/* ================= SECTIONS ================= */}
      <View style={styles.sections}>
        {/* Disable scrolling for nested lists */}
        <Category navigation={navigation} scrollEnabled={false} />
        <Volunteerhome navigation={navigation} scrollEnabled={false} />

        {/* News as FlatList with scrolling disabled */}
        <FlatList
          data={news}
          scrollEnabled={false} // disables internal scrolling
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <News news={item} navigation={navigation} />}
        />

        <View style={styles.donationInfo}>
          <Ionicons name="heart-outline" size={30} color="#e63946" />
          <Text style={styles.donationInfoText}>
            Donations are money or goods given to help a person or organization
            — such as food, clothes, or financial support.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f7" },
  donateHeader: {
    backgroundColor: "#52cbf0ff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 200,
    height: 330,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    position: "relative",
  },
  headerRow: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greetingText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  donateTitle: { color: "#fff", fontSize: 34, fontWeight: "bold" },
  donateSubtitle: { color: "#ddd", fontSize: 16, marginTop: 5 },
  sections: { paddingHorizontal: 10, paddingBottom: 30 },
  donationInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  donationInfoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
});
