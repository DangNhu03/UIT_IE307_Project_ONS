import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function DeliveryAddress() {
  const inforAddress = {
    name: "Bùi Yến Giàu",
    phone: "0348918222",
    detail_address: "KTX khu B ĐHQG",
    address: "Phường Linh Trung, thành phố Thủ Đức, TP.HCM",
  };

  return (
    <View style={styles.container}>
      <View>
        <MaterialCommunityIcons
          name="map-marker-radius-outline"
          size={24}
          color="#241E92"
        />
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.titleText}>Địa chỉ nhận hàng</Text>
        <View style={styles.address}>
          <View style={styles.inforUser}>
            <Text style={styles.addressText}>{inforAddress.name}</Text>
            <View style={styles.line}></View>
            <Text style={styles.addressText}>{inforAddress.phone}</Text>
          </View>
          <Text style={styles.addressText}>{inforAddress.detail_address}</Text>
          <Text style={styles.addressText}>{inforAddress.address}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#241E92" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius:4
  },
  centerContainer: {
    flex: 1,
    marginHorizontal: 10,
    gap: 10,
  },
  titleText: {
    fontSize: 16,
    color: "#241E92",
  },
  address: {
    flexDirection: "column",
  },
  inforUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  addressText: {
    fontSize: 14,
  },
  line: {
    height: 14,
    width: 1,
    backgroundColor: "#241E92",
  },
  rightContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
});
