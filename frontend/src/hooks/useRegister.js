import { useState } from "react";
import { useAuthContext } from "@contexts/AuthContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; 
import { Alert } from "react-native";
// import { API_URL } from "@env";

export function useRegister() {
  let API_URL = 'http://192.168.137.1:5000'

  const { dispatch } = useAuthContext();
  const [errorExist, setErrorExist] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigation = useNavigation();
  // console.log("API_URL:", API_URL);

  const register = async (user) => {
    setLoading(true);
    setErrorExist(null);
    try {
    //   const response = await axios.post(
    //     "http://172.17.16.94:5000/api/auth/register",
    //     user
    //   );
    const response = await axios.post(`${API_URL}/api/auth/register`, user);
      console.log("Response:", response.status);

      if (response.status === 201) {
        dispatch({ type: "REGISTER", payload: response.data });
        Alert.alert(
          "Thành công",
          "Đăng ký thành công. Bạn có thể đăng nhập ngay bây giờ!",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Login"); 
              },
            },
          ],
          { cancelable: false }
        );

        return response.data;
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 400) {
        setErrorExist("Số điện thoại đã được đăng ký");
        Alert.alert("Lỗi", "Số điện thoại đã được đăng ký", [{ text: "OK" }], {
          cancelable: true,
        });
      } else {
        console.log("Error:", error);
        setErrorExist("Có lỗi xảy ra. Vui lòng thử lại.");
        Alert.alert(
          "Lỗi",
          "Có lỗi xảy ra. Vui lòng thử lại!",
          [{ text: "OK" }],
          { cancelable: true }
        );
      }
    }
  };

  return { register, loading, errorExist, setErrorExist };
}
