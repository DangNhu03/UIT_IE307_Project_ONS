import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons"; // Sử dụng icon từ MaterialCommunityIcons
import { useNavigation } from "@react-navigation/native";

const ArrowBack = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <Icon name="arrow-left-circle" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      {/* Đường line bên dưới */}
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom:20
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
  },
  iconContainer: {
    marginRight:10,
    paddingRight: 12,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  line: {
    height: 1,
    backgroundColor: "white",
    opacity: 0.8,
  },
});

export default ArrowBack;
