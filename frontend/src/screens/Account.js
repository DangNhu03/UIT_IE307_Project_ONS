import ArrowBack from "@components/ArrowBack";
import Button from "@components/Button";
import { useAuthContext } from "@context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import InfoList from "@components/account/InfoList";
import OrderStatusList from "@components/account/OrderStatusList";

export default function Account() {
  const { user, dispatch } = useAuthContext();
  const navigation = useNavigation();
  const user_name =
    user && Array.isArray(user) && user.length > 0 ? user[0].user_name : null;

  const settings = [
    { id: "1", name: "Thông tin cá nhân", screen: "PersonalInfo" },
    { id: "2", name: "Địa chỉ giao hàng", screen: "Address" },
    { id: "3", name: "Tài khoản liên kết", screen: "LinkAccount" },
    { id: "4", name: "Đổi mật khẩu", screen: "ChangePassword" },
  ];
  const suppports = [
    { id: "1", name: "Các câu hỏi thường gặp", screen: "FAQ" },
    { id: "2", name: "Hướng dẫn mua hàng", screen: "ShoppingGuide" },
    { id: "3", name: "Điều khoản/ Chính sách", screen: "TermsAndPolicies" },
    { id: "4", name: "Giới thiệu", screen: "AboutUs" },
    { id: "5", name: "Liên hệ", screen: "ContactUs" },
    { id: "6", name: "Xóa tài khoản", screen: "DeleteAccount" },
  ];

  const orderStatuses = [
    { id: "1", title: "Chờ thanh toán", iconName: "credit-card-check" },
    { id: "2", title: "Đang xử lý", iconName: "progress-clock" },
    { id: "3", title: "Đang giao", iconName: "truck-delivery" },
    { id: "4", title: "Hoàn thành", iconName: "check-circle-outline" },
  ];
  

  const handlePress = (item) => {
    const screen = item.screen;
    if (user) {
      navigation.navigate(screen);
    } else {
      Alert.alert("Thông báo", "Bạn cần đăng nhập để sử dụng tính năng này.", [
        { text: "Đăng nhập", onPress: () => navigation.navigate("Login") },
        { text: "Hủy", style: "cancel" },
      ]);
    }
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.container}>
      <ArrowBack title="Tài khoản" />
      <View style={styles.inforUser}>
        <Image
          source={require("../assets/avatar.jpg")}
          style={styles.userImage}
        />
        {user && Array.isArray(user) && user.length > 0 ? (
          <Text style={styles.userName}>{user_name}</Text>
        ) : (
          <View style={styles.authButtons}>
            <Button
              title="Đăng nhập"
              onPress={() => navigation.navigate("Login")}
            />
            <Button
              title="Đăng ký"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.orderContainer}>
          <Text style={styles.title}>Đơn mua</Text>
          <OrderStatusList data={orderStatuses} />
        </View>
        <View style={styles.line}></View>
        <View style={styles.settingContainer}>
          <Text style={styles.title}>Cài đặt</Text>
          <InfoList data={settings} onPress={handlePress} />
        </View>
        <View style={styles.line}></View>
        <View style={styles.supportContainer}>
          <Text style={styles.title}>Hỗ trợ</Text>
          <InfoList data={suppports} onPress={handlePress} />
        </View>
        <View style={styles.line}></View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.title}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241e92",
    paddingTop: 40,
  },
  inforUser: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  contentContainer: {
    backgroundColor: "#fff",
    gap: 10,
    padding: 10,
  },

  orderContainer: {},
  line: {
    height: 1,
    backgroundColor: "#CFCED6",
  },
  settingContainer: {
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#241E92",
  },
});
