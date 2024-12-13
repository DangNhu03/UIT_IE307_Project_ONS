import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const DetailPayment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.detailPaymentTitle}>
        <MaterialCommunityIcons
          name="playlist-edit"
          size={24}
          color="#241E92"
        />
        <Text style={styles.title}>Chi tiết thanh toán</Text>
      </View>
      <View style={styles.detailPaymentContainer}>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.smallText}>Tổng tiền hàng</Text>
            <Text style={styles.smallText}>214.133đ</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.smallText}>Tổng tiền phí vận chuyển</Text>
            <Text style={styles.smallText}>214.133đ</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.smallText}>Tổng tiền phí vận chuyển</Text>
            <Text style={styles.smallText}>214.133đ</Text>
          </View>
        </View>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.paymentTitle}>Tổng thanh toán</Text>
            <Text style={styles.paymentTitle}>214.133đ</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "column",
    gap: 10,
    padding: 10,
    borderRadius: 4,
  },
  detailPaymentTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
  },
  detailPaymentContainer: {
    flexDirection: "column",
    gap: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  smallText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 21,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#241E92",
  },
});

export default DetailPayment;
