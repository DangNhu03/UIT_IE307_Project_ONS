import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "@components/Button";
import { useAuthContext } from "@context/AuthContext"; // Import AuthContext

export default function Account() {
  const { user, dispatch } = useAuthContext(); // Lấy user từ AuthContext
  const navigation = useNavigation();

  const handleLogout = () => {
    // Gọi dispatch để cập nhật trạng thái đăng nhập khi đăng xuất
    dispatch({ type: "LOGOUT" });

    // Chuyển hướng đến màn hình login sau khi đăng xuất
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>

      {/* Hiển thị nút đăng nhập và đăng ký nếu chưa đăng nhập */}
      {!user ? (
        <>
          <Button
            title="Đăng nhập"
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            title="Đăng ký"
            onPress={() => navigation.navigate("Register")}
          />
        </>
      ) : (
        // Hiển thị nút đăng xuất nếu người dùng đã đăng nhập
        <Button title="Đăng xuất" onPress={handleLogout} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
