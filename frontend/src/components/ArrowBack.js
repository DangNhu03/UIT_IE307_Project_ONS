import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";

const ArrowBack = ({ title, titleColor }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <Icon
            name="arrow-left-circle"
            size={24}
            style={{ color: titleColor ? titleColor : 'white' }}
          />
        </TouchableOpacity>
        <Text style={[titleColor ? { color: titleColor } : { color: 'white' }, styles.title]}>{title}</Text>
      </View>
      {/* Đường line bên dưới */}
      <View style={[titleColor ? { backgroundColor: titleColor } : { backgroundColor: 'white' }, styles.line]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
  },
  iconContainer: {
    marginRight: 10,
    paddingRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  line: {
    height: 1,
    opacity: 0.8,
  },
});

export default ArrowBack;
