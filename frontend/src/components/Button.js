import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";

export default function Button({
  title,
  onPress,
  backgroundColor = "#E5A5FF",
  textColor = "#FFFFFF",
  width,
  borderRadius,
  borderColor,
  borderWidth,
  fontSize,
  activeOpacity,
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
          borderRadius: borderRadius || 8,
          borderColor:borderColor || 'transp,arent',
          borderWidth: borderWidth || 0
        },
      ]}
      onPress={onPress}
      activeOpacity={activeOpacity||0.7}
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
        <Text style={[styles.buttonText, { color: textColor, fontSize: fontSize || 16 }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 42,
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
    fontWeight: "normal",
    lineHeight:21
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
