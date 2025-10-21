// src/components/News.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function News() {
  const news = [
    {
      id: 1,
      title: "Beach Cleaning Event",
      image: require("../assets/Screenshot 2025-10-09 200602.png"), // ✅ Local image
    },
    {
      id: 2,
      title: "Blood Donation",
      image: require("../assets/Screenshot 2025-10-09 210414.png"),
    },
    {
      id: 3,
      title: "Food Donation Drive",
      image: require("../assets/Screenshot 2025-10-09 210434.png"),
    },
  ];

  return (
    <View>
      <Text style={styles.sectionTitle}>Latest News</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.newsContainer}
      >
        {news.map((item) => (
          <View key={item.id} style={styles.newsCard}>
            <Image source={item.image} style={styles.newsImage} />
            <Text style={styles.newsText}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  newsContainer: { paddingLeft: 20, paddingBottom: 30 },
  newsCard: {
    width: width * 0.7,
    marginRight: 15,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 4,
  },
  newsImage: { width: "100%", height: 600 },
  newsText: { padding: 10, fontSize: 16, fontWeight: "600" },
});
