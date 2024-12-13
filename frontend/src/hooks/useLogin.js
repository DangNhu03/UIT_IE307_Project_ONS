import { useState } from "react";
import { useAuthContext } from "@contexts/AuthContext";
import axios from "axios";
import { Alert } from "react-native";
// import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '../../../url';

export function useLogin() {

  const { dispatch } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const logIn = async (user) => {
    try {
      setLoading(true);
      setPhone("");
      setPassword("");
      console.log(`${API_URL}/api/auth/login`)

      const response = await axios.post(`${API_URL}/api/auth/login`, user);
    
      if (response.status === 200) {
        console.log("Response data:", response.data); 
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: response.data });
        setLoading(false);
        
        console.log("Đăng nhập thành công");
        navigation.navigate("Main");
      }
    } catch (error) {
      setLoading(false);

      if (
        error.response.status === 404 &&
        error.response.data.message === "User not found"
      ) {
        Alert.alert("Lỗi", "Người dùng không tồn tại", [{ text: "OK" }], {
          cancelable: true,
        });
      }

      if (
        error.response.status === 400 &&
        error.response.data.message === "Invalid password"
      ) {
        Alert.alert("Lỗi", "Mật khẩu không đúng", [{ text: "OK" }], {
          cancelable: true,
        });
      }

      console.log("Lỗi:", error);
    }
  };

  return { logIn, loading, phone, password, setPhone, setPassword };
}
