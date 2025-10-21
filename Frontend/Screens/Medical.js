import React from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // ✅ Added for back arrow

const campaigns = [
  {
    id: 1,
    title: "Cumberland County Organ Donation",
    subtitle: "Life-changing Impact",
    image: require("../assets/robina-weermeijer-NIuGLCC7q54-unsplash.jpg"),
  },
  {
    id: 2,
    title: "Deliver hope. Donate medicine",
    subtitle: "Medical Support Program",
    image: require("../assets/olga-guryanova-tMFeatBSS4s-unsplash.jpg"),
  },
];

export default function MedicalPage({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Back Arrow Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#0e8ab4ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Campaigns</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {campaigns.map((item) => (
          <View key={item.id} style={styles.card}>
            <ImageBackground
              source={item.image}
              style={styles.cardImage}
              imageStyle={{ borderRadius: 15 }}
              resizeMode="cover"
            >
              <View style={styles.overlay}>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
            </ImageBackground>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("DonationForm", { fundraiser: item })
              }
            >
              <Text style={styles.buttonText}>💚 Donate Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  backButton: { padding: 5, marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#0e8ab4ff" },

  scrollContent: { padding: 16 },
  card: {
    marginBottom: 25,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 4,
  },
  cardImage: { width: "100%", height: 180, justifyContent: "flex-end" },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  subtitle: { color: "#ddd", fontSize: 12, marginBottom: 5 },
  button: {
    backgroundColor: "#33bae3ff",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    margin: 15,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
