import React from "react";
import { StyleSheet, Text, View , TouchableOpacity} from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const resolveIconComponent = (iconName) => {
  const iconMapping = {
    "clipboard-check-outline": MaterialCommunityIcons,
    "loader": Feather,
    "package": Feather,
    "autorenew": MaterialCommunityIcons,
    "star-circle-outline": MaterialCommunityIcons,
  };

  const IconComponent = iconMapping[iconName];
  return IconComponent || MaterialCommunityIcons; // Default fallback
};

const ItemStatus = ({ title, iconName , onPress}) => {
  const IconComponent = resolveIconComponent(iconName);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Svg height="80" width="80" viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="44%" stopColor="#FFF8DB" stopOpacity="1" />
            <Stop offset="100%" stopColor="#FFEB9A" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Circle cx="50" cy="50" r="30" fill="url(#grad1)" />
      </Svg>
      <View style={styles.iconContainer}>
        <IconComponent name={iconName} size={30} color="#241E92" />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center", // Đảm bảo căn giữa theo trục ngang
    justifyContent: "center", // Đảm bảo căn giữa theo trục dọc
    width: 80,
    marginLeft: -2,
  },
  iconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -25 }], 
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "400",
    color: "#241E92",
    textAlign: "center",
  },
});


export default ItemStatus;
