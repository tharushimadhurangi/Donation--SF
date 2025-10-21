import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Optional for gradient background

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 80) / 2; // 2 cards per row

export default function Home({ navigation }) {
  const categories = [
    { image: require("../assets/ia-huh-ghYr_aSRM2s-unsplash.jpg"), label: "Children", screen: "Childern", desc: "Help children in need" },
    { image: require("../assets/akram-huseyn-brbF5FSnSgI-unsplash.jpg"), label: "Medical", screen: "Medical", desc: "Medical assistance" },
    { image: require("../assets/jonatan-bustos-P1Ku27zZJDs-unsplash.jpg"), label: "Animal", screen: "Animal", desc: "Care for animals" },
    { image: require("../assets/ray-sangga-kusuma-7uSrOyY1U0I-unsplash.jpg"), label: "Volunteer", screen: "Volunteer", desc: "Join volunteers" },
    { image: require("../assets/akram-huseyn-brbF5FSnSgI-unsplash.jpg"), label: "Donation Request", screen: "DonationRequest", desc: "Request donation" },
    { image: require("../assets/give-me-hope-3.jpg"), label: "Blood", screen: "Blood", desc: "Donate or request blood" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.label}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardWrapper}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#57dcf1ff', '#16817eff']}
              style={styles.card}
            >
              <Image source={item.image} style={styles.categoryImage} />
              <Text style={styles.categoryLabel}>{item.label}</Text>
              <Text style={styles.categoryDesc}>{item.desc}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingTop: 30 },
  sectionTitle: { fontSize: 24, fontWeight: "700", marginLeft: 20, marginBottom: 20, color: "#0f1717ff" },
  listContainer: { paddingHorizontal: 20 },
  row: { justifyContent: "space-between", marginBottom: 20 },
  cardWrapper: { width: CARD_WIDTH },
  card: {
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  categoryImage: { width: 100, height: 70, marginBottom: 5 },
  categoryLabel: { fontSize: 10, fontWeight: "700", color: "#fff", textAlign: "center", },
  categoryDesc: { fontSize: 10, color: "#fff", textAlign: "center", marginTop: 4 },
});
