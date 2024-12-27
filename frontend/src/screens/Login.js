import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Logo from "@components/Logo";
import Button from "@components/Button";
import ArrowBack from "@components/ArrowBack";
import Input from "@components/Input";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "@hooks/useLogin";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { useCallback } from "react";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useRegisterAndLogin } from "@hooks/useRegisterAndLogin";
import Loading from "@screens/Loading";
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default function Login() {
  useWarmUpBrowser();
  const { registerAndLogin } = useRegisterAndLogin();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { logIn, loading } = useLogin();
  const navigation = useNavigation();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const validateInputs = () => {
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;

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
      setErrors({ phone: "Số điện thoại không hợp lệ." });
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

    setLoadingLogin(true);

    try {
      await logIn(user);
      console.log("Đăng nhập thành công");
    } catch (error) {
      console.log("Đăng nhập thất bại:", error);
    } finally {
      setLoadingLogin(false);
    }
  };

  const forgotPassWord = () => {
    navigation.navigate("ForgotPassword");
  };
  const handleInputChange = (field, value) => {
    if (field === "phone") setPhone(value);
    if (field === "password") setPassword(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const { startOAuthFlow: startGoogleOAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startFacebookOAuth } = useOAuth({
    strategy: "oauth_facebook",
  });
  const { user } = useUser();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Hàm xác thực Google Login
  const handleGoogleAuthLogin = useCallback(async () => {
    try {
      const redirectUrl = Linking.createURL("/dashboard", { scheme: "myapp" });
      console.log("Starting Google OAuth Flow...");
      const { createdSessionId, setActive } = await startGoogleOAuth({
        redirectUrl: redirectUrl,
      });

      if (createdSessionId) {
        console.log("Session created", createdSessionId);
        setActive({ session: createdSessionId });
        setIsAuthenticated(true);
      } else {
        console.log("Additional steps required for Google login.");
      }
    } catch (err) {
      console.error("Google Login error:", err);
    }
  }, [startGoogleOAuth]);

  // Hàm xác thực Facebook Login
  const handleFacebookLogin = useCallback(async () => {
    try {
      const redirectUrl = Linking.createURL("/dashboard", { scheme: "myapp" });
      console.log("Starting Facebook OAuth Flow...");
      const { createdSessionId, setActive } = await startFacebookOAuth({
        redirectUrl: redirectUrl,
      });

      if (createdSessionId) {
        console.log("Session created", createdSessionId);
        setActive({ session: createdSessionId });
        setIsAuthenticated(true);
        console.log("Additional steps required for Facebook login.");
      }
    } catch (err) {
      console.error("Facebook Login error:", err);
    }
  }, [startFacebookOAuth]);

  const handleRegisterAndLogin = useCallback(async () => {
    if (user) {
      try {
        setLoadingScreen(true); 
        await user.reload();
        const name = user?.fullName;
        const email = user?.emailAddresses[0]?.emailAddress;
        const avatar = user?.imageUrl;

        console.log("User info after reload:", { name, email, avatar });

        await registerAndLogin(name, email, avatar);
      } catch (error) {
        console.log("Error in handleRegisterAndLogin:", error);
      } finally {
        setLoadingScreen(false); 
      }
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      handleRegisterAndLogin();
    }
  }, [isAuthenticated, user, handleRegisterAndLogin]);

  if (loadingScreen) {
    return <Loading />; 
  }
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
        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={forgotPassWord}
        >
          <Text style={styles.forgotPasswordText}>Bạn quên mật khẩu?</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <Button
            title={loadingLogin ? "Đang đăng nhập" : "ĐĂNG NHẬP"}
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
            onPress={handleFacebookLogin}
            backgroundColor="#FFFFFF"
            textColor="#000000"
            width={140}
            icon={require("../assets/facebook.png")}
          />
          <Button
            title="Google"
            onPress={handleGoogleAuthLogin}
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
