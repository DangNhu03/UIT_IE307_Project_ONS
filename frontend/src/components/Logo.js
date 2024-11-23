import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Logo({ size = "large" }) {
  const getSize = () => {
    switch (size) {
      case "medium":
        return {
          width: 80,
          height: 40,
          paddingHorizontal: 45,
          paddingVertical: 27,
        };
      case "small":
        return {
          width: 40,
          height: 20,
          paddingHorizontal: 10,
          paddingVertical: 5,
        };
      case "large":
      default:
        return {
          width: 135,
          height: 80,
          paddingHorizontal: 80,
          paddingVertical: 50,
        };
    }
  };

  const { width, height, paddingHorizontal, paddingVertical } = getSize();

  return (
    <View
      style={[
        styles.logoContainer,
        {
          width: width,
          height: height,
          paddingHorizontal,
          paddingVertical,
        },
      ]}
    >
      <Image
        source={require("../assets/logo.png")}
        style={[styles.logo, { width, height }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
  },
});
