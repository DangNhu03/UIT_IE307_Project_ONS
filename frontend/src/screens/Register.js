import ArrowBack from "@components/ArrowBack";
import Button from "@components/Button";
import Input from "@components/Input";
import Logo from "@components/Logo";
import { useRegister } from "@hooks/useRegister";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { register, loading, errorExist } = useRegister();
  const navigation = useNavigation();
  const validateInputs = () => {
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!name && !phone && !email && !password && !confirmPassword) {
      Alert.alert(
        "Cảnh báo",
        "Vui lòng nhập đầy đủ thông tin",
        [{ text: "OK" }],
        { cancelable: true }
      );
      return false;
    }

    if (!name) {
      setErrors({ name: "Họ và tên không được để trống." });
      return false;
    }

    if (!phone) {
      setErrors({ phone: "Số điện thoại không được để trống." });
      return false;
    } else if (!phoneRegex.test(phone)) {
      setErrors({ phone: "Số điện thoại không hợp lệ." });
      return false;
    }

    if (!email) {
      setErrors({ email: "Email không được để trống." });
      return false;
    } else if (!emailRegex.test(email)) {
      setErrors({ email: "Định dạng email không hợp lệ." });
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
    if (field === "name") setName(value);
    if (field === "phone") setPhone(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleLoginRedirect = () => {
    navigation.navigate("Login");
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    const user = { name, phone, email, password };
    console.log("user: ", user);

    await register(user);
  };

  return (
    <View style={styles.container}>
      <ArrowBack title="Đăng ký" />
      <Logo size="medium" />
      <View style={styles.formContainer}>
        <Text style={styles.title}>ĐĂNG KÝ</Text>

        <Input
          placeholder="Họ và tên"
          value={name}
          onChangeText={(value) => handleInputChange("name", value)}
          errorMessage={errors.name}
        />

        <Input
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={(value) => handleInputChange("phone", value)}
          keyboardType="phone-pad"
          errorMessage={errors.phone}
        />

        <Input
          placeholder="Email"
          value={email}
          onChangeText={(value) => handleInputChange("email", value)}
          keyboardType="email-address"
          errorMessage={errors.email}
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

        <Input
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={(value) => handleInputChange("confirmPassword", value)}
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

        <View style={styles.buttonRegister}>
          <Button
            title="ĐĂNG KÝ"
            onPress={handleRegister}
            backgroundColor="#FFFFFF"
            textColor="#2a1cbb"
          />
        </View>

        <View style={styles.inforLogin}>
          <Text style={styles.loginText}>Bạn đã có tài khoản? Đăng nhập</Text>
          <TouchableOpacity onPress={handleLoginRedirect}>
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
  buttonRegister: {
    width: "100%",
    marginTop: 25,
  },
  inforLogin: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  loginText: {
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

// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet } from "react-native";
// import Logo from "../components/Logo";
// import Button from "../components/Button";
// import ArrowBack from "../components/ArrowBack";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { Alert } from "react-native";
// import { useRegister } from "../hook/useRegister";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const { register, loading, errorExist } = useRegister();

//   const validateInputs = () => {
//     const phoneRegex = /^[0-9]{10,11}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex =
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!name && !phone && !email && !password && !confirmPassword) {
//       Alert.alert(
//         "Cảnh báo",
//         "Vui lòng nhập đầy đủ thông tin",
//         [{ text: "OK" }],
//         { cancelable: true }
//       );
//       return false;
//     }

//     if (!name) {
//       setErrors({ name: "Họ và tên không được để trống." });
//       return false;
//     }

//     if (!phone) {
//       setErrors({ phone: "Số điện thoại không được để trống." });
//       return false;
//     } else if (!phoneRegex.test(phone)) {
//       setErrors({ phone: "Số điện thoại phải có từ 10 đến 11 số." });
//       return false;
//     }

//     if (!email) {
//       setErrors({ email: "Email không được để trống." });
//       return false;
//     } else if (!emailRegex.test(email)) {
//       setErrors({ email: "Định dạng email không hợp lệ." });
//       return false;
//     }

//     if (!password) {
//       setErrors({ password: "Mật khẩu không được để trống." });
//       return false;
//     } else if (!passwordRegex.test(password)) {
//       setErrors({
//         password:
//           "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ, số và ký tự đặc biệt.",
//       });
//       return false;
//     }

//     if (!confirmPassword) {
//       setErrors({ confirmPassword: "Xác nhận mật khẩu không được để trống." });
//       return false;
//     } else if (password !== confirmPassword) {
//       setErrors({ confirmPassword: "Mật khẩu xác nhận không khớp." });
//       return false;
//     }

//     setErrors({});
//     return true;
//   };

//   const handleInputChange = (field, value) => {
//     if (field === "name") setName(value);
//     if (field === "phone") setPhone(value);
//     if (field === "email") setEmail(value);
//     if (field === "password") setPassword(value);
//     if (field === "confirmPassword") setConfirmPassword(value);

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [field]: "",
//     }));
//   };

//   const handleRegister = async () => {
//     if (!validateInputs()) return;

//     const user = { name, phone, email, password };
//     console.log("user: ", user);

//     await register(user);

//   };

//   return (
//     <View style={styles.container}>
//       <ArrowBack title="Đăng ký" />
//       <Logo size="medium" />
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>ĐĂNG KÝ</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Họ và tên"
//           placeholderTextColor="#aaa"
//           onChangeText={(value) => handleInputChange("name", value)}
//           value={name}
//         />
//         {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

//         <TextInput
//           style={styles.input}
//           placeholder="Số điện thoại"
//           placeholderTextColor="#aaa"
//           keyboardType="phone-pad"
//           onChangeText={(value) => handleInputChange("phone", value)}
//           value={phone}
//         />
//         {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           placeholderTextColor="#aaa"
//           keyboardType="email-address"
//           onChangeText={(value) => handleInputChange("email", value)}
//           value={email}
//         />
//         {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.inputPassword}
//             placeholder="Mật khẩu"
//             placeholderTextColor="#aaa"
//             secureTextEntry={!showPassword}
//             onChangeText={(value) => handleInputChange("password", value)}
//             value={password}
//           />
//           <MaterialCommunityIcons
//             name={showPassword ? "eye" : "eye-off"}
//             size={24}
//             color="#aaa"
//             onPress={() => setShowPassword(!showPassword)}
//           />
//         </View>
//         {errors.password && (
//           <Text style={styles.errorText}>{errors.password}</Text>
//         )}

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.inputPassword}
//             placeholder="Xác nhận mật khẩu"
//             placeholderTextColor="#aaa"
//             secureTextEntry={!showConfirmPassword}
//             onChangeText={(value) => handleInputChange("confirmPassword", value)}
//             value={confirmPassword}
//           />
//           <MaterialCommunityIcons
//             name={showConfirmPassword ? "eye" : "eye-off"}
//             size={24}
//             color="#aaa"
//             onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//           />
//         </View>
//         {errors.confirmPassword && (
//           <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//         )}

//         <View style={styles.buttonRegister}>
//           <Button
//             title="ĐĂNG KÝ"
//             onPress={handleRegister}
//             backgroundColor="#FFFFFF"
//             textColor="#2a1cbb"
//           />
//         </View>

//         <Text style={styles.loginText}>
//           Bạn đã có tài khoản? Đăng nhập{" "}
//           <Text style={styles.link}>tại đây</Text>
//         </Text>
//         <View style={styles.divider}>
//           <View style={styles.line} />
//           <Text style={styles.orText}>Hoặc đăng nhập với</Text>
//           <View style={styles.line} />
//         </View>

//         <View style={styles.socialButtons}>
//           <Button
//             title="Facebook"
//             onPress={() => console.log("Login with Facebook")}
//             backgroundColor="#FFFFFF"
//             textColor="#000000"
//             width={140}
//             icon={require("../assets/facebook.png")}
//           />
//           <Button
//             title="Google"
//             onPress={() => console.log("Login with Google")}
//             backgroundColor="#FFFFFF"
//             textColor="#000000"
//             width={140}
//             icon={require("../assets/google.png")}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#241e92",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   formContainer: {
//     width: "100%",
//     padding: 40,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 20,
//     color: "#fff",
//     fontWeight: "bold",
//     marginBottom: 40,
//   },
//   input: {
//     width: "100%",
//     height: 42,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   inputContainer: {
//     width: "100%",
//     height: 42,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     marginBottom: 10,
//     justifyContent: "space-between",
//   },
//   inputPassword: {
//     flex: 1,
//     fontSize: 16,
//   },
//   buttonRegister: {
//     width: "100%",
//     marginTop: 25,
//   },
//   errorText: {
//     color: "#FF71CD",
//     fontSize: 14,
//     alignSelf: "flex-start",
//     marginBottom: 10,
//   },
//   loginText: {
//     color: "#fff",
//     marginTop: 15,
//   },
//   link: {
//     color: "#f0f",
//     fontWeight: "bold",
//   },
//   divider: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
//     width: "100%",
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#CFCED6",
//   },
//   orText: {
//     color: "#fff",
//     marginHorizontal: 10,
//   },
//   socialButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
// });
