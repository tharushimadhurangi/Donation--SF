
import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Emergency({ emergency }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Emergency Alerts</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {emergency.map((n) => (
          <View key={n} style={[styles.card, styles.emergencyCard]}>
            <Image
              source={{ uri: `https://picsum.photos/300/200?random=${n + 10}` }}
              style={styles.image}
            />
            <Text style={styles.text}>Emergency Alert {n}</Text>
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
  container: {
    paddingLeft: 20,
    paddingBottom: 30,
  },
  card: {
    width: width * 0.7,
    marginRight: 15,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 4,
  },
  emergencyCard: {
    backgroundColor: "#FF5252", 
  },
  image: {
    width: "100%",
    height: 150,
  },
  text: {
    padding: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
