import ArrowBack from "@components/ArrowBack";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

import CartItem from "@components/CartItem";
import Button from "@components/Button";

export default function Cart() {
  const badgeCount = 3;
  const products = [
    { id: 1, name: "Sản phẩm A", price: 100000, category: "Danh mục 1" },
    { id: 2, name: "Sản phẩm B", price: 200000, category: "Danh mục 2" },
    { id: 3, name: "Sản phẩm C", price: 300000, category: "Danh mục 3" },
    { id: 4, name: "Sản phẩm A", price: 100000, category: "Danh mục 1" },
    { id: 5, name: "Sản phẩm B", price: 200000, category: "Danh mục 2" },
    { id: 6, name: "Sản phẩm C", price: 300000, category: "Danh mục 3" },
    { id: 7, name: "Sản phẩm A", price: 100000, category: "Danh mục 1" },
    { id: 8, name: "Sản phẩm B", price: 200000, category: "Danh mục 2" },
    { id: 9, name: "Sản phẩm C", price: 300000, category: "Danh mục 3" },
    { id: 10, name: "Sản phẩm A", price: 100000, category: "Danh mục 1" },
    { id: 11, name: "Sản phẩm B", price: 200000, category: "Danh mục 2" },
    { id: 12, name: "Sản phẩm C", price: 300000, category: "Danh mục 3" },
  ];

  const [isSelected, setIsSelected] = useState(false); // Trạng thái đã chọn

  const toggleSelection = () => setIsSelected(!isSelected);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => setIsEditing(!isEditing);

  return (
    <View style={styles.container}>
      <ArrowBack
        title="Giỏ hàng"
        rightContent={
          <View style={styles.rightHeaderContainer}>
            <TouchableOpacity onPress={toggleEditMode}>
              <Text style={styles.subtitle}>{isEditing ? "Xong" : "Sửa"}</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color="white"
              />
              {badgeCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badgeCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        }
      />
      <View style={styles.listProducts}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CartItem product={item} />}
        />
      </View>

      <View style={styles.summaryContainer}>
        {isEditing ? (
          <View style={styles.totalContainer}>
            <View style={styles.totalLeft}>
              <TouchableOpacity onPress={toggleSelection}>
                <MaterialIcons
                  name={isSelected ? "check-box" : "check-box-outline-blank"}
                  size={24}
                  color="#241E92"
                />
              </TouchableOpacity>
              <Text style={styles.title}>Chọn tất cả</Text>
            </View>
            <View style={styles.totalRight}>
              <Button
                title="Xóa"
                borderRadius={4}
                width={60}
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          </View>
        ) : (
          <>
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
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="#241E92"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
            <View style={styles.totalContainer}>
              <View style={styles.totalLeft}>
                <TouchableOpacity onPress={toggleSelection}>
                  <MaterialIcons
                    name={isSelected ? "check-box" : "check-box-outline-blank"}
                    size={24}
                    color="#241E92"
                  />
                </TouchableOpacity>
                <Text style={styles.title}>Chọn tất cả</Text>
              </View>
              <View style={styles.totalRight}>
                <View style={styles.totalPrice}>
                  <Text style={styles.smallText}>Tổng</Text>
                  <Text style={styles.totalText}>300000000đ</Text>
                </View>
                <Button
                  title="Mua ngay"
                  borderRadius={4}
                  onPress={() => navigation.navigate("Login")}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241E92",
    paddingTop: 40,
  },
  rightHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 21,
    color: "white",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 16,
    height: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  listProducts: {
    flex: 1,
    paddingHorizontal: 10,
  },
  summaryContainer: {
    backgroundColor: "#fff",
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: 10,
  },
  voucherContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  voucherTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  line: {
    height: 1,
    backgroundColor: "#CFCED6",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
