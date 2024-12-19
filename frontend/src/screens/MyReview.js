import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import ArrowBack from "@components/ArrowBack";

export default function MyReview() {
  const route = useRoute();
  const order = route.params?.order || [];
  console.log("reviews screen", order);
  return (
    <View style={styles.container}>
      <ArrowBack title="Đánh giá của tôi" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241e92",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
});
