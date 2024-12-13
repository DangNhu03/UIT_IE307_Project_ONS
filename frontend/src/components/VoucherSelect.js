import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const VoucherSelect = () => {
  return (
    <View style={styles.voucherContainer}>
      <View style={styles.voucherTitle}>
        <MaterialCommunityIcons
          name="ticket-confirmation-outline"
          size={24}
          color="#241E92"
        />
        <Text style={styles.title}>Shop Voucher</Text>
      </View>
      <TouchableOpacity style={styles.voucherSelection}>
        <Text style={styles.smallText}>Chọn hoặc nhập mã</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#241E92" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  voucherContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding:5,
  },
  voucherTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight:"400"
  },
  voucherSelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallText: {
    fontSize: 12,
    lineHeight: 21,
    color: "#241E92",
  },
});

export default VoucherSelect;
