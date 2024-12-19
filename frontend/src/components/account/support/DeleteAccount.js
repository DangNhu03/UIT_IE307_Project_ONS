import { View, Text, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";
import IconAndTitle from "@components/IconAndTitle";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "@components/Button";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "@contexts/AuthContext";
import { API_URL } from "../../../../../url";

export default function DeleteAccount() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { user, dispatch } = useAuthContext();
  const navigation = useNavigation();
  const user_id =
    user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;

  const handleDeleteAccountPress = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPassword("");
    setErrors({});
  };

  const handleInputChange = (value) => {
    setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));
  };

  const handleDeleteAccount = async () => {
    if (password === "") {
      setErrors({ password: "Mật khẩu không được để trống" });
      return;
    }

    try {
      // 1. Verify password
      const verifyResponse = await fetch(`${API_URL}/api/verify_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user_id, currentPassword: password }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        setErrors({ password: verifyData.message });
        return;
      }

      console.log("Password verified, proceeding to delete account...");

      const deleteResponse = await fetch(`${API_URL}/api/user/${user_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deleteData = await deleteResponse.json();

      if (!deleteResponse.ok) {
        alert(deleteData.message);
        return;
      }

      // 3. Logout and navigate to Main
      console.log("Tài khoản đã được xóa thành công.");
      dispatch({ type: "LOGOUT" });
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error while deleting account:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <IconAndTitle
          icon={<MaterialIcons name="no-accounts" size={24} color="#FF71CD" />}
          title="Xoá tài khoản"
        />
        <Text style={styles.normalText}>
          Chúng tôi rất lấy làm tiếc khi không thể tiếp tục đồng hành cùng bạn.
          Xin bạn lưu ý khi các tài khoản đã bị xóa đi sẽ không thể khôi phục
          trở lại được.
        </Text>
        <View style={styles.topTextContainer}>
          <Button
            title="Xóa tài khoản vĩnh viễn"
            borderRadius={4}
            textColor="#241E92"
            backgroundColor="#fff"
            borderColor="#E5A5FF"
            borderWidth={1}
            onPress={handleDeleteAccountPress}
          />
        </View>
      </View>
      {/* Modal yêu cầu nhập mật khẩu */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalLabel}>
              Nhập mật khẩu để xóa tài khoản
            </Text>
            <View>
              <Input
                placeholder="Mật khẩu"
                value={password}
                secureTextEntry={!showPassword}
                showToggle
                iconComponent={
                  <MaterialCommunityIcons
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color="#aaa"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                borderColor="#241E92"
                borderWidth={1}
                onChangeText={(value) => handleInputChange(value)}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Hủy"
                onPress={handleCancel}
                backgroundColor="#EBEBEE"
                textColor="#000000"
                width={120}
                borderRadius={5}
              />
              <Button
                title="Xác nhận"
                onPress={handleDeleteAccount}
                backgroundColor="#FF71CD"
                textColor="#FFFFFF"
                width={120}
                borderRadius={5}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  itemContainer: {
    width: "100%",
    gap: 20,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  normalText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 21,
    color: "#3B394A",
  },
  topTextContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  topTextContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    gap: 20,
  },
  modalLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
});
