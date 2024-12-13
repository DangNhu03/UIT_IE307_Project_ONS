import ArrowBack from "@components/ArrowBack";
import Button from "@components/Button";
import VoucherSelect from "@components/VoucherSelect";
import PaymentMethod from "@components/payments/PaymentMethod";
import DeliveryMethod from "@components/payments/DeliveryMethod";
import DetailPayment from "@components/payments/DetailPayment";
import { useAuthContext } from "@context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import DeliveryAddress from "@components/payments/DeliveryAddress";
import ItemProduct from "@components/payments/ItemProduct";
import NoteSection from "@components/payments/NoteSection";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";

export default function Payment() {
  const products = [
    {
      id: 1,
      name: "Sản phẩm A",
      price: 100000,
      category: "Danh mục 1",
      quantity: 3,
    },
    {
      id: 2,
      name: "Sản phẩm B",
      price: 200000,
      category: "Danh mục 2",
      quantity: 2,
    },
    {
      id: 3,
      name: "Sản phẩm C",
      price: 300000,
      category: "Danh mục 3",
      quantity: 1,
    },
  ];
  return (
    <View style={styles.container}>
      <ArrowBack title="Thanh toán" />
      <ScrollView>
        <View style={styles.contentContainer}>
          {/* dia chi nhan hang */}
          <DeliveryAddress />
          <View style={styles.productContainer}>
            <View style={styles.productList}>
              {products.map((product) => (
                <ItemProduct key={product.id} product={product} />
              ))}
            </View>
            <NoteSection />
          </View>
          {/* Phương thức vận chuyển và thanh toán */}
          <View style={styles.methodContainer}>
            <VoucherSelect />
            <View style={styles.lineContainer}>
              <View style={styles.line}></View>
            </View>
            <PaymentMethod />
            <View style={styles.lineContainer}>
              <View style={styles.line}></View>
            </View>
            <DeliveryMethod />
          </View>
          {/*Chi tiết thanh toán  */}
          <DetailPayment />
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <View style={styles.totalRight}>
            <View style={styles.totalPrice}>
              <Text style={styles.smallText}>Tổng</Text>
              <Text style={styles.totalText}>300000000đ</Text>
            </View>
            <Button
              title="Mua ngay"
              borderRadius={4}
              // onPress={() => navigation.navigate("Payment")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241e92",
    paddingTop: 40,
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: "#EBEBEE",
    padding: 10,
    gap: 10,
  },
  productContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
    gap: 10,
    borderRadius: 4,
  },
  productList: {
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  methodContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
    borderRadius: 4,
    padding: 5,
  },
  lineContainer: {
    padding: 5,
  },
  line: {
    backgroundColor: "#CFCED6",
    height: 1,
  },
  footerContainer: {
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  totalRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  totalPrice: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
