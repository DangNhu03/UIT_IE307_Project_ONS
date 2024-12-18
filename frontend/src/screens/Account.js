import ArrowBack from "@components/ArrowBack";
import Button from "@components/Button";
import { useAuthContext } from "@contexts/AuthContext";
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
  Alert,
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
    { id: "1", title: "Mới đặt", iconName: "clipboard-check-outline" },
    { id: "2", title: "Đang xử lý", iconName: "truck-fast-outline" },
    { id: "3", title: "Thành công", iconName: "package" },
    { id: "4", title: "Đã hủy", iconName: "autorenew" },
    { id: "5", title: "Đánh giá", iconName: "star-circle-outline" },
  ];

  const handlePress = (item) => {
    const screen = item.screen;
    navigation.navigate(screen);
  };

  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => {
            dispatch({ type: "LOGOUT" });
            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ArrowBack title="Tài khoản" />
      <View
        style={[
          styles.inforUser,
          user &&
            Array.isArray(user) &&
            user.length > 0 && { justifyContent: "flex-start" },
        ]}
      >
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
              textColor="#241E92"
              backgroundColor="#fff"
              width="95"
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
        {user && Array.isArray(user) && user.length > 0 && (
          <>
            <View style={styles.line}></View>
            <View style={styles.settingContainer}>
              <Text style={styles.title}>Cài đặt</Text>
              <InfoList data={settings} onPress={handlePress} />
            </View>
          </>
        )}
        <View style={styles.line}></View>
        <View style={styles.supportContainer}>
          <Text style={styles.title}>Hỗ trợ</Text>
          <InfoList
            data={
              user && Array.isArray(user) && user.length > 0
                ? suppports
                : suppports.filter((item) => item.name !== "Xóa tài khoản")
            }
            onPress={handlePress}
          />
        </View>
        {user && Array.isArray(user) && user.length > 0 && (
          <>
            <View style={styles.line}></View>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.title}>Đăng xuất</Text>
            </TouchableOpacity>
          </>
        )}
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
    justifyContent: "space-between",
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
  authButtons: {
    flexDirection: "row",
    gap: 10,
  },
  contentContainer: {
    backgroundColor: "#fff",
    gap: 10,
    padding: 10,
    minHeight: "100%",
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
  supportContainer: {
    gap: 5,
  },
});
