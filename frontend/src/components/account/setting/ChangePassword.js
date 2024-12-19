import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "@components/Button";
import Input from "@components/Input";
import { useAuthContext } from "@contexts/AuthContext";
import { API_URL } from "../../../../../url";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ArrowBack from "@components/ArrowBack";

export default function ChangePassword() {
  const { user } = useAuthContext();
  // const [name, setName] = useState(user ? user[0]?.user_name || "" : "");
  // const [phone, setPhone] = useState(user ? user[0]?.user_phone || "" : "");
  // const [email, setEmail] = useState(user ? user[0]?.user_email || "" : "");
  const [currentPassword, setCurrentPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormChanged, setIsFormChanged] = useState(false); // Track if form is changed
  const [inputColors, setInputColors] = useState({
    currentPassword: '#CFCED6',
    password: '#CFCED6',
    confirmPassword: '#CFCED6'
  });

  const validateInputs = () => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!currentPassword) {
      setErrors({ currentPassword: "Mật khẩu hiện tại không được để trống." });
      return false;
    }

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

  const handleInputChange = (field, value) => {
    if (field === "currentPassword") setCurrentPassword(value)
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));

    setIsFormChanged(true);
  };

  useEffect(() => {
    if (password || currentPassword || confirmPassword) {
      setIsFormChanged(true);
    } else {
      setIsFormChanged(false);
    }
  }, [currentPassword, password, confirmPassword]);

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
    if (!validateInputs()) return;

    try {
      // Xác minh mật khẩu hiện tại
      const verifyResponse = await axios.post(`${API_URL}/api/verify_password`, {
        userId: user[0]?._id,
        currentPassword,
      });

      if (verifyResponse.status !== 200) {
        Alert.alert(
          "Thất bại",
          verifyResponse.data.message || "Mật khẩu hiện tại không đúng!",
          [{ text: "OK" }],
          { cancelable: true }
        );
        return;
      }

      // Cập nhật mật khẩu
      try {
        const userValue = { password };
        const updateResponse = await axios.put(
          `${API_URL}/api/update_password/${user[0]?._id}`,
          userValue
        );

        if (updateResponse.status === 200) {
          alert("Cập nhật mật khẩu thành công!");
          setIsFormChanged(false);
          setCurrentPassword("");
          setConfirmPassword("");
          setPassword("");
        }
      } catch (updateError) {
        console.error("Lỗi khi cập nhật mật khẩu:", updateError);

        if (updateError.response && updateError.response.status === 400) {
          alert(updateError.response.data.message || "Không thể cập nhật mật khẩu!");
        } else {
          alert("Có lỗi xảy ra khi cập nhật mật khẩu, vui lòng thử lại!");
        }
      }
    } catch (error) {
      console.log("Lỗi xác minh mật khẩu:", error);

      if (error.response && error.response.status === 400) {
        alert(error.response.data.message || "Mật khẩu hiện tại không đúng!");
      } else {
        alert("Có lỗi xảy ra khi xác minh mật khẩu, vui lòng thử lại!");
      }
    }
  };



  return (
    <View style={styles.formContainer}>
      <View style={styles.formItem}>
        <Text style={styles.formItemText}>Mật khẩu hiện tại:</Text>
        <View style={styles.formInput}>
          <Input
            placeholder="Nhập mật khẩu cũ"
            value={currentPassword}
            onChangeText={(value) => handleInputChange("currentPassword", value)}
            secureTextEntry={!showCurrentPassword}
            errorMessage={errors.currentPassword}
            showToggle
            onFocus={() => handleFocus("currentPassword")}
            onBlur={() => handleBlur("currentPassword")}
            borderWidth={1}
            borderColor={inputColors.currentPassword}
            fontSize={14}
            iconComponent={
              <MaterialCommunityIcons
                name={showCurrentPassword ? "eye" : "eye-off"}
                size={24}
                color="#3B394A"
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              />
            }
          />
        </View>
      </View>

      <View style={styles.formItem}>
        <Text style={styles.formItemText}>Mật khẩu mới:</Text>
        <View style={styles.formInput}>
          <Input
            placeholder="Nhập mật khẩu mới"
            value={password}
            onChangeText={(value) => handleInputChange("password", value)}
            secureTextEntry={!showPassword}
            errorMessage={errors.password}
            showToggle
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
            borderWidth={1}
            borderColor={inputColors.password}
            fontSize={14}
            iconComponent={
              <MaterialCommunityIcons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color="#3B394A"
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
        </View>
      </View>

      <View style={styles.formItem}>
        <Text style={styles.formItemText}>Xác nhận mật khẩu mới:</Text>
        <View style={styles.formInput}>
          <Input
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChangeText={(value) => handleInputChange("confirmPassword", value)}
            secureTextEntry={!showConfirmPassword}
            errorMessage={errors.confirmPassword}
            showToggle
            onFocus={() => handleFocus("confirmPassword")}
            onBlur={() => handleBlur("confirmPassword")}
            borderWidth={1}
            borderColor={inputColors.confirmPassword}
            fontSize={14}
            iconComponent={
              <MaterialCommunityIcons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={24}
                color="#3B394A"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />
        </View>
      </View>

      <View style={styles.buttonUpdateChange}>
        <Button
          title="Xác nhận"
          fontSize={14}
          onPress={handleUpdate}
          backgroundColor={isFormChanged ? undefined : "#EBEBEE"}
          textColor={isFormChanged ? undefined : "#3B394A"}
        // disabled={!isFormChanged}
        // activeOpacity={!isFormChanged ? 1 : undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    // flex:1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  formItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  formItemText: {
    lineHeight: 21,
    color: '#3B394A',
    // fontSize:16
  },
  formInput: {
    width: 220,
  },
  buttonUpdateChange: {
    paddingTop: 10,
    alignSelf: 'flex-end',
  },
});
