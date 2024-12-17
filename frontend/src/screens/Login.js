import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Logo from "@components/Logo";
import Button from "@components/Button";
import ArrowBack from "@components/ArrowBack";
import Input from "@components/Input";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "@hooks/useLogin";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { logIn, loading } = useLogin();
  const navigation = useNavigation();
  const validateInputs = () => {
    const phoneRegex = /^[0-9]{10,11}$/;

    if (!phone && !password) {
      setErrors({
        phone: "Số điện thoại không được để trống.",
        password: "Mật khẩu không được để trống.",
      });
      return false;
    }

    if (!phone) {
      setErrors({ phone: "Số điện thoại không được để trống." });
      return false;
    } else if (!phoneRegex.test(phone)) {
      setErrors({ phone: "Số điện thoại phải có từ 10 đến 11 số." });
      return false;
    }

    if (!password) {
      setErrors({ password: "Mật khẩu không được để trống." });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleRegisterRedirect = () => {
    navigation.navigate("Register");
  };
  const handleLogin = async () => {
    if (!validateInputs()) return;

    const user = { phone, password };
    console.log("Đăng nhập với thông tin:", user);

    try {
      await logIn(user);
    } catch (error) {
      console.log("Đăng nhập thất bại:", error);
    }
  };

  const forgotPassWord =()=>{
    navigation.navigate("ForgotPassword");
  }
  const handleInputChange = (field, value) => {
    if (field === "phone") setPhone(value);
    if (field === "password") setPassword(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  return (
    <View style={styles.container}>
      <ArrowBack title="Đăng nhập" />
      <Logo size="medium" />
      <View style={styles.formContainer}>
        <Text style={styles.title}>ĐĂNG NHẬP</Text>

        <Input
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={(value) => handleInputChange("phone", value)}
          keyboardType="phone-pad"
          errorMessage={errors.phone}
        />

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
        <TouchableOpacity style={styles.forgotPasswordContainer} onPress={forgotPassWord}>
          <Text style={styles.forgotPasswordText}>Bạn quên mật khẩu?</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <Button
            title="ĐĂNG NHẬP"
            onPress={handleLogin}
            backgroundColor="#FFFFFF"
            textColor="#2a1cbb"
          />
        </View>

        <View style={styles.inforRegister}>
          <Text style={styles.registerText}>Bạn đã có tài khoản? Đăng ký</Text>
          <TouchableOpacity onPress={handleRegisterRedirect}>
            <Text style={styles.link}>tại đây</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>Hoặc đăng nhập với</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialButtons}>
          <Button
            title="Facebook"
            onPress={() => console.log("Login with Facebook")}
            backgroundColor="#FFFFFF"
            textColor="#000000"
            width={140}
            icon={require("../assets/facebook.png")}
          />
          <Button
            title="Google"
            onPress={() => console.log("Login with Google")}
            backgroundColor="#FFFFFF"
            textColor="#000000"
            width={140}
            icon={require("../assets/google.png")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241e92",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  formContainer: {
    width: "100%",
    padding: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  forgotPasswordContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotPasswordText: {
    color: "#fff",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 25,
  },

  inforRegister: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  registerText: {
    color: "#fff",
  },
  link: {
    color: "#E5A5FF",
    fontWeight: "bold",
    marginLeft: 5,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CFCED6",
  },
  orText: {
    color: "#fff",
    marginHorizontal: 10,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
