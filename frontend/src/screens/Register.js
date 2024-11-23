import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Logo from "../components/Logo";
import Button from "../components/Button";
import ArrowBack from "../components/ArrowBack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    console.log(
      "Register with:",
      name,
      phone,
      email,
      password,
      confirmPassword
    );
  };

  return (
    <View style={styles.container}>
      <ArrowBack title="Đăng ký" />
      <Logo size="medium" />
      <View style={styles.formContainer}>
        <Text style={styles.title}>ĐĂNG KÝ</Text>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          placeholderTextColor="#aaa"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          onChangeText={setPhone}
          value={phone}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Mật khẩu"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            value={password}
          />
          <MaterialCommunityIcons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="#aaa"
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Xác nhận mật khẩu"
            placeholderTextColor="#aaa"
            secureTextEntry={!showConfirmPassword}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          <MaterialCommunityIcons
            name={showConfirmPassword ? "eye" : "eye-off"}
            size={24}
            color="#aaa"
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>
        <View style={styles.buttonRegister}>
          <Button
            title="ĐĂNG KÝ"
            onPress={handleRegister}
            backgroundColor="#FFFFFF"
            textColor="#2a1cbb"
            // width="100%"
          />
        </View>

        <Text style={styles.loginText}>
          Bạn đã có tài khoản? Đăng nhập{" "}
          <Text style={styles.link}>tại đây</Text>
        </Text>
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
    justifyContent: "center",
  },
  fullLine: {
    height: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  formContainer: {
    width: "100%",
    padding: 40,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  inputContainer: {
    width: "100%",
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
  },
  buttonRegister: {
    width: "100%",
    marginTop: 25,
  },
  loginText: {
    color: "#fff",
    marginTop: 15,
  },
  link: {
    color: "#f0f",
    fontWeight: "bold",
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
