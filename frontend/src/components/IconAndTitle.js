import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function IconAndTitle({ icon, title }) {
  return (
    <View style={styles.container}>
      {icon && <View>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 21,
    color: "#FF71CD",
  },
});
