import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Logo from "../components/Logo";
export default function Loading() {
  return (
    <View style={styles.container}>
      <Logo/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#241e92",
  },

});
