import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState, useRef } from "react";
import ArrowBack from "@components/ArrowBack";
import Input from "@components/Input";
import InputNumber from "@components/InputNumber";
import Button from "@components/Button";
import { API_URL } from "../../../url";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
export default function ForgotPassword() {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isOTP, setOTP] = useState(false);
  const [isNewPassword, setNewPassword] = useState(false);
  const handleInputChange = (field, value) => {
    if (field === "phone") setPhone(value);
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };
  const maskPhoneNumber = (phone) => {
    if (!phone || phone.length < 4) return phone;
    const visiblePart = phone.slice(-4);
    const maskedPart = "*".repeat(phone.length - 4);
    return maskedPart + visiblePart;
  };

  const validateInputs = () => {
    const phoneRegex = /^[0-9]{10,11}$/;

    if (!phone) {
      setErrors({ phone: "Số điện thoại không được để trống." });
      return false;
    } else if (!phoneRegex.test(phone)) {
      setErrors({ phone: "Số điện thoại phải có từ 10 đến 11 số." });
      return false;
    }

    setErrors({});
    return true;
  };
  const handleGetCode = async () => {
    console.log(phone);
    if (!validateInputs()) return;

    try {
      const response = await fetch(`${API_URL}/api/user/phone/${phone}`);
      if (response.status === 200) {
        setOTP(true);
      } else if (response.status === 404) {
        Alert.alert(
          "Thông báo",
          "Số điện thoại không tồn tại.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: true }
        );
      } else {
        Alert.alert(
          "Thông báo",
          "Có lỗi xảy ra, vui lòng thử lại.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: true }
        );
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      Alert.alert(
        "Thông báo",
        "Có lỗi xảy ra, vui lòng thử lại.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
    }
  };

  const handleResendCode = () => {
    Alert.alert(
      "Thông báo",
      "Mã đã được gửi lại!!!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: true }
    );
  };

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpBlur = () => {
    const newOtp = otp.map((item) => (item === "" || isNaN(item) ? "" : item));
    setOtp(newOtp);
  };

  const handleResetPassword = () => {
    setNewPassword(true);
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) {
      setErrors({ password: "Mật khẩu không được để trống." });
      return false;
    } else if (!passwordRegex.test(password)) {
      setErrors({
        password:
          "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ, số và ký tự đặc biệt.",
      });
      return false;
    }

    if (!confirmPassword) {
      setErrors({ confirmPassword: "Xác nhận mật khẩu không được để trống." });
      return false;
    } else if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Mật khẩu xác nhận không khớp." });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmitNewPassword = async () => {
    if (!validatePassword()) return;
    const newPassword = password;
    console.log(newPassword);
    try {
      const response = await fetch(`${API_URL}/api/user/password/${phone}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.status === 200) {
        Alert.alert(
          "Thông báo",
          data.message,
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
                navigation.navigate("Login"); // Chuyển hướng tới màn hình Login
              },
            },
          ],
          { cancelable: false }
        ); // Thông báo thành công
      } else {
        Alert.alert(
          "Lỗi",
          data.message,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: true }
        ); // Thông báo lỗi
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      Alert.alert("Thông báo", "Có lỗi xảy ra, vui lòng thử lại.");
    }
  };
  return (
    <View style={styles.container}>
      <ArrowBack title="Quên mật khẩu" />
      <View style={styles.contentContainer}>
        {isNewPassword ? (
          <>
            <Text style={styles.title}>Tạo mật khẩu mới</Text>
            <Input
              placeholder="Mật khẩu"
              value={password}
              onChangeText={(value) => handleInputChange("password", value)}
              secureTextEntry={!showPassword}
              errorMessage={errors.password}
              showToggle
              iconComponent={
                <MaterialCommunityIcons
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="#aaa"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <Input
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChangeText={(value) =>
                handleInputChange("confirmPassword", value)
              }
              secureTextEntry={!showConfirmPassword}
              errorMessage={errors.confirmPassword}
              showToggle
              iconComponent={
                <MaterialCommunityIcons
                  name={showConfirmPassword ? "eye" : "eye-off"}
                  size={24}
                  color="#aaa"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
            <Button title="Xác nhận" onPress={handleSubmitNewPassword} />
          </>
        ) : isOTP ? (
          <>
            <Text style={styles.title}>Nhập mã OTP</Text>
            <Text style={styles.subTitle}>
              Vui lòng nhập mã OTP được gửi đến số điện thoại
              {maskPhoneNumber(phone)}
            </Text>
            <View style={styles.otpContainer}>
              <View style={styles.listInput}>
                {otp.map((value, index) => (
                  <InputNumber
                    key={index}
                    value={value}
                    width={50}
                    height={50}
                    textAlign="center"
                    onChangeText={(newValue) =>
                      handleOtpChange(index, newValue)
                    } // Xử lý khi thay đổi giá trị
                    onBlur={handleOtpBlur} // Xử lý khi ô mất focus
                    maxLength={1} // Chỉ cho phép nhập 1 ký tự
                    keyboardType="numeric" // Chỉ nhận số
                    ref={(el) => (otpRefs.current[index] = el)} // Gắn ref vào từng ô OTP
                  />
                ))}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.subTitle}>Bạn nhận được mã chưa?</Text>
                <TouchableOpacity onPress={handleResendCode}>
                  <Text style={styles.subTitleUnderline}>Gửi lại</Text>
                </TouchableOpacity>
              </View>
              <Button title="Xác nhận" onPress={handleResetPassword} />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>Quên mật khẩu</Text>
            <Input
              placeholder="Số điện thoại"
              value={phone}
              onChangeText={(value) => handleInputChange("phone", value)}
              keyboardType="phone-pad"
              errorMessage={errors.phone}
            />
            <Button title="Lấy mã" onPress={handleGetCode} />
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
  contentContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    height: "50%",
    gap: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  subTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "400",
    lineHeight: 21,
  },
  subTitleUnderline: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "400",
    lineHeight: 21,
    textDecorationLine: "underline",
  },
  otpContainer: {
    alignItems: "center",
    gap: 10,
    marginTop: 30,
  },
  listInput: {
    flexDirection: "row",
    gap: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
