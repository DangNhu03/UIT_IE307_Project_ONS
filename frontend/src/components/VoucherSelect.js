import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const VoucherSelect = ({ totalPrice, listProduct, voucherDisplayPayment }) => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("Vouchers", { totalPrice, listProduct });
  };
  const formatNumber = (number) => {
    if (number >= 1000 && number % 1000 === 0) {
      if (number % 1000000 === 0) {
        return `${number / 1000000}tr`;
      } else {
        return `${number / 1000}k`;
      }
    }
    return number.toString();
  };
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
      <TouchableOpacity
        style={styles.voucherSelection}
        onPress={handleNavigate}
      >
        {voucherDisplayPayment ? (
          <View style={styles.havedVoucher}>
            <Text style={styles.smallText}>
              - {formatNumber(voucherDisplayPayment.vouc_discount_value)}
            </Text>
          </View>
        ) : (
          <Text style={styles.smallText}>Chọn voucher ngay</Text>
        )}

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
    padding: 5,
  },
  voucherTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
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
  havedVoucher:{
    borderColor:"#E5A5FF",
    borderWidth:1,
    paddingHorizontal:5,
    borderRadius:4,
  }
});

export default VoucherSelect;
