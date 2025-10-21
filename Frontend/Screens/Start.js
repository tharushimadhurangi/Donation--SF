import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function Start({ navigation }) {
  return (
    <LinearGradient
      colors={["#e0f7ff", "#b3e5fc", "#81d4fa"]}
      style={styles.container}
    >
      {/* App Title */}
      <Text style={styles.title}>GIVE ME A{"\n"}HOPE</Text>

      {/* Circular Logo Image */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/give-me-hope-3.jpg")}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Find fundraisers and nonprofits{"\n"}
        Search by name, location, title,{"\n"}
        or keyword to spread hope 💙
      </Text>

      {/* Button */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("OnboardingScreen")}
      >
        <LinearGradient
          colors={["#1e88e5", "#1976d2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Start</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0d47a1",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 2,
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    shadowColor: "#0d47a1",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    marginBottom: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  description: {
    fontSize: 16,
    color: "#0d47a1",
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 24,
    width: width * 0.8,
  },
  buttonWrapper: {
    width: "60%",
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#1565c0",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 10,
  },
  button: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
