import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path, Mask, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';

const ArrowBack = ({ title, titleColor, rightContent }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconContainer}
          >
            {titleColor ? (
              <Icon
                name="arrow-left-circle"
                size={24}
                style={{ color: titleColor }}
              />
            ) : (
              <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                <Mask id="mask0_237_1725" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                  <Rect width="30" height="30" fill="#D9D9D9" />
                </Mask>
                <G mask="url(#mask0_237_1725)">
                  <Path
                    d="M12 15.6443L13.0443 14.6L11.1943 12.75H15.75V11.25H11.1943L13.0443 9.4L12 8.35575L8.35575 12L12 15.6443ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
                    fill="url(#paint0_linear_237_1725)"
                  />
                </G>
                <Defs>
                  <LinearGradient id="paint0_linear_237_1725" x1="12" y1="2.5" x2="12" y2="21.5" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#FFE1FF" />
                    <Stop offset="0.716667" stopColor="#FFEFFF" />
                    <Stop offset="1" stopColor="white" />
                  </LinearGradient>
                </Defs>
              </Svg>
            )
            }
          </TouchableOpacity>
          <Text
            style={[
              titleColor ? { color: titleColor } : { color: "white" },
              styles.title,
            ]}
          >
            {title}
          </Text>
        </View>
        {rightContent && <View>{rightContent}</View>}
      </View>
      {/* Đường line bên dưới */}
      <View
        style={[
          titleColor
            ? { backgroundColor: titleColor }
            : { backgroundColor: "white" },
          styles.line,
        ]}
      />
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
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: 'center'
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
