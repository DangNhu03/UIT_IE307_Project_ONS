import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";

const ArrowBack = ({ title, rightContent }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconContainer}
          >
            <Icon name="arrow-left-circle" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
        {rightContent && (
          <View style={styles.rightContainer}>{rightContent}</View>
        )}
      </View>
      {/* Đường line bên dưới */}
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    justifyContent:"space-between"
  },
  titleContainer:{
    flexDirection:"row"
  },
  iconContainer: {
    marginRight: 10,
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
