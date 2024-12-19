import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import IconAndTitle from "@components/IconAndTitle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ContactUs() {
  return (
    <>
      <View style={styles.container}>
        <IconAndTitle
          icon={
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="#FF71CD"
            />
          }
          title="Liên hệ"
        />
        <View style={styles.itemContainer}>
          <View style={styles.topTextContainer}>
            <Text style={styles.boldMediumTitleText}>
              Tại sao nên lựa chọn ONS?
            </Text>
          </View>
          <Text style={styles.normalText}>
            <Text style={styles.normalBoldText}>Địa chỉ: </Text>
            {""}
            Đường Hàn Thuyên, khu phố 6, Thành phố Thủ Đức, TP HCM.
          </Text>
          <Text style={styles.normalText}>
            <Text style={styles.normalBoldText}>Hotline: </Text>
            {""}
            1811 0702
          </Text>
          <Text style={styles.normalText}>
            <Text style={styles.normalBoldText}>Email: </Text>
            {""}
            contact@ons.com
          </Text>
          <Text style={styles.linkText}>
            <Text style={styles.normalBoldText}>Địa chỉ: </Text>
            {""}
            www.ons.com
          </Text>
          <View style={styles.itemContainer}>
            <Text style={styles.normalBoldText}>Thời gian hoạt động: </Text>
            <View style={styles.listContainer}>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.normalText}>
                  Thứ Hai - Thứ Bảy: 8:00 - 21:00
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.normalText}>Chủ Nhật: 9:00 - 17:00</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.heightBetweenImage}></View>
      <Image
        source={require("../../../assets/imgs/about-us/banner.png")}
        style={styles.image}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    gap: 20,
  },
  itemContainer: {
    width: "100%",
    gap: 10,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  topTextContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  boldMediumTitleText: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 27,
    color: "#241E92",
    textAlign: "center",
  },
  normalBoldText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 21,
    color: "#241E92",
    textDecorationLine: "none",
  },
  normalText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 21,
    color: "#3B394A",
  },
  linkText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 21,
    color: "#E5A5FF",
    textDecorationLine: "underline",
  },
  listContainer: {
    marginLeft: 10,
    marginTop: -5,
  },
  listItem: {
    flexDirection: "row",
    gap: 5,
    paddingRight: 10,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 21,
    color: "#3B394A",
  },
  heightBetweenImage: {
    height: 20,
  },
  image: {
    width: "100%",
  },
});
