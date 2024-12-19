import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "@components/Button";
import Input from "@components/Input";
import { useAuthContext } from "@contexts/AuthContext";
import { API_URL } from "../../../../../url";
import axios from "axios";
import ArrowBack from "@components/ArrowBack";

export default function PersonalInfo() {
  const { user } = useAuthContext();
  const [name, setName] = useState(user ? user[0]?.user_name || "" : "");
  const [phone, setPhone] = useState(user ? user[0]?.user_phone || "" : "");
  const [email, setEmail] = useState(user ? user[0]?.user_email || "" : "");
  const [errors, setErrors] = useState({});
  const [isFormChanged, setIsFormChanged] = useState(false); // Track if form is changed
  const [inputColors, setInputColors] = useState({
    name: '#CFCED6',
    phone: '#CFCED6',
    email: '#CFCED6',
  });

  // Update button state if form changes
  useEffect(() => {
    if (name !== user[0]?.user_name || phone !== user[0]?.user_phone || email !== user[0]?.user_email) {
      setIsFormChanged(true);
    } else {
      setIsFormChanged(false);
    }
  }, [name, phone, email]);

  const validateInputs = () => {
    const phoneRegex = /^[0-9]{10,11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
      setErrors({ name: "Họ và tên không được để trống." });
      return false;
    }

    if (!phone) {
      setErrors({ phone: "Số điện thoại không được để trống." });
      return false;
    } else if (!phoneRegex.test(phone)) {
      setErrors({ phone: "Số điện thoại phải có từ 10 đến 11 số." });
      return false;
    }

    if (!email) {
      setErrors({ email: "Email không được để trống." });
      return false;
    } else if (!emailRegex.test(email)) {
      setErrors({ email: "Định dạng email không hợp lệ." });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleInputChange = (field, value) => {
    if (field === "name") setName(value);
    if (field === "phone") setPhone(value);
    if (field === "email") setEmail(value);

    // Clear errors for the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));

    // Track the input changes for button color
    setIsFormChanged(true);
  };

  const handleFocus = (field) => {
    setInputColors((prevColors) => ({
      ...prevColors,
      [field]: '#3B394A', // Change to the value color when focused
    }));
  };

  const handleBlur = (field) => {
    // Reset color to placeholder color when not focused
    setInputColors((prevColors) => ({
      ...prevColors,
      [field]: '#CFCED6', // Placeholder color
    }));
  };

  const handleUpdate = async () => {
    if (!validateInputs()) return; // Kiểm tra tính hợp lệ của dữ liệu đầu vào

    // Tạo đối tượng dữ liệu người dùng cần cập nhật
    const userValue = { name, phone, email };

    if (userValue.name === user[0]?.user_name && userValue.phone === user[0]?.user_phone && userValue.email === user[0]?.user_email) {
      Alert.alert(
        "Cảnh báo",
        "Không có thay đổi nào để lưu!",
        [{ text: "OK" }],
        { cancelable: true }
      );
      return;
    }
    console.log(`${API_URL}/api/update_user/${user[0]?._id}`)

    try {
      const response = await axios.put(`${API_URL}/api/update_user/${user[0]?._id}`, userValue);

      if (response.status === 200) {
        Alert.alert(
          "Thành công",
          "Cập nhật thông tin thành công!",
          [{ text: "OK" }],
          { cancelable: true }
        );
        setIsFormChanged(false)
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật:", error);
      Alert.alert(
        "Thất bại",
        "Cập nhật thất bại, vui lòng thử lại!",
        [{ text: "OK" }],
        { cancelable: true }
      );
    }
  };


  return (
      <View style={styles.formContainer}>
        <View style={styles.formItem}>
          <Text style={styles.formItemText}>Họ và tên:</Text>
          <View style={styles.formInput}>
            <Input
              // placeholder={name}
              value={name}
              onChangeText={(value) => handleInputChange("name", value)}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              borderWidth={1}
              borderColor={inputColors.name}
              fontSize={14}
            />
          </View>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formItemText}>Số điện thoại:</Text>
          <View style={styles.formInput}>
            <Input
              // placeholder={phone}
              value={phone}
              onChangeText={(value) => handleInputChange("phone", value)}
              onFocus={() => handleFocus("phone")}
              onBlur={() => handleBlur("phone")}
              errorMessage={errors.phone}
              borderWidth={1}
              borderColor={inputColors.phone}
              fontSize={14}
            />
          </View>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formItemText}>Email:</Text>
          <View style={styles.formInput}>
            <Input
              // placeholder={email}
              value={email}
              onChangeText={(value) => handleInputChange("email", value)}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              errorMessage={errors.email}
              borderWidth={1}
              borderColor={inputColors.email}
              fontSize={14}
            />
          </View>
        </View>

        <View style={styles.buttonUpdateChange}>
          <Button
            title="Lưu thay đổi"
            fontSize={14}
            onPress={handleUpdate}
            backgroundColor={isFormChanged ? undefined : "#EBEBEE"}
            textColor={isFormChanged ? undefined : "#3B394A"}
            disabled={!isFormChanged}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    alignSelf: 'stretch',
    justifyContent:'center'
  },
  formItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  formItemText: {
    lineHeight: 21,
    color: '#3B394A',
    // fontSize: 16
  },
  formInput: {
    width: 270,
  },
  buttonUpdateChange: {
    paddingTop: 10,
    alignSelf: 'flex-end',
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
});