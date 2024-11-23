import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";

export default function Button({
  title,
  onPress,
  backgroundColor = "#FF71CD",
  textColor = "#FFFFFF",
  width,
  icon, // Prop icon có thể là một React element hoặc nguồn ảnh
}) {
  const hasIcon = !!icon; 

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          width: width || "auto",
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Icon bên trái nếu có */}
        {hasIcon &&
          (React.isValidElement(icon) ? (
            // Nếu icon là React element
            <View style={styles.iconContainer}>{icon}</View>
          ) : (
            // Nếu icon là hình ảnh
            <Image source={icon} style={styles.icon} />
          ))}

        {/* Text */}
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 42,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8, 
    resizeMode: "contain",
  },
  iconContainer: {
    marginRight: 8, 
  },
});
