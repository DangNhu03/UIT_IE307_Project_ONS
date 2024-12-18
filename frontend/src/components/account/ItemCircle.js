import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ItemCircle = ({ name, iconName, onPress, isActive }) => {
  const resolveIconComponent = (iconName) => {
    const iconMapping = {
      "chat-question-outline": MaterialCommunityIcons,
      "production-quantity-limits": MaterialIcons,
      "book-open-outline": MaterialCommunityIcons,
      "apartment": MaterialIcons,
      "email-outline": MaterialCommunityIcons,
      "no-accounts": MaterialIcons,
      "card-account-details-outline": MaterialCommunityIcons,
      "home-outline": MaterialCommunityIcons,
      "credit-card-plus-outline": MaterialCommunityIcons,
      "sync-lock": MaterialIcons,
    };

    const IconComponent = iconMapping[iconName];
    return IconComponent || MaterialCommunityIcons;
  };
  const mapName = (name) => {
    const nameMapping = {
      "Các câu hỏi thường gặp": "Câu hỏi thường gặp",
      "Hướng dẫn mua hàng": "Hướng dẫn mua hàng",
      "Điều khoản/ Chính sách": "Điều khoản ONS",
      "Giới thiệu": "Giới thiệu",
      "Liên hệ": "Liên hệ",
      "Xóa tài khoản": "Xóa tài khoản",
    };

    return nameMapping[name] || name;
  };

  const IconComponent = resolveIconComponent(iconName);
  const iconTextcolor = isActive ? "#FF71CD" : "#241E92";
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Svg height="80" width="80" viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFE1FF" stopOpacity="1" />
            <Stop offset="71.67%" stopColor="#FFEFFF" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FFF" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Circle cx="50" cy="50" r="30" fill="url(#grad1)" />
      </Svg>
      <View style={styles.iconContainer}>
        <IconComponent name={iconName} size={30} color={iconTextcolor} />
      </View>
      <Text style={[styles.name, { color: iconTextcolor }]}>
        {mapName(name)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 108,
    marginLeft: -2,
  },
  iconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -23 }],
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 10,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default ItemCircle;
