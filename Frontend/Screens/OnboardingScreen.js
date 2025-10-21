import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default function OnboardingScreen({ navigation }) {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      containerStyles={{ backgroundColor: "#f4f9f9" }}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      imageContainerStyles={styles.imageContainer}
      pages={[
        {
          backgroundColor: "#f4f9f9",
          image: (
            <Image
              source={require("../assets/nguy-n-hi-p-2rNHliX6XHk-unsplash.jpg")}
              style={styles.image}
            />
          ),
          title: "NGO Near Me",
          subtitle:
            "Find trusted NGOs around you and start making an impact in your community.",
        },
        {
          backgroundColor: "#f4f9f9",
          image: (
            <Image
              source={require("../assets/larm-rmah-AEaTUnvneik-unsplash.jpg")}
              style={styles.image}
            />
          ),
          title: "Children Help",
          subtitle:
            "Support children in need by donating essentials, sponsoring education, or volunteering your time.",
        },
        {
          backgroundColor: "#f4f9f9",
          image: (
            <Image
              source={require("../assets/katt-yukawa-K0E6E0a0R3A-unsplash.jpg")}
              style={styles.image}
            />
          ),
          title: "Make Donations",
          subtitle:
            "Give with confidence. Every donation counts toward changing lives.",
        },
      ]}
      showSkip={true}
      showNext={true}
      showDone={true}
      controlStatusBar={false}
      bottomBarHighlight={false}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 260,
    height: 260,
    borderRadius: 130,
    resizeMode: "cover",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1b4965",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4a4a4a",
    textAlign: "center",
    paddingHorizontal: 30,
    lineHeight: 22,
  },
});
