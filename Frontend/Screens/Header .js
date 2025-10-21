
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header = ({ title, icon, headerImage }) => {
  return (
    <View style={styles.header}>
    
      <Image source={icon} style={styles.icon} />

      
      <Text style={styles.title}>{title}</Text>

      
      <Image source={headerImage} style={styles.headerImage} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#c8e6c9",
    borderRadius: 12,
    marginBottom: 15,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b5e20",
  },
  headerImage: {
    width: 70,
    height: 50,
    borderRadius: 8,
  },
});
