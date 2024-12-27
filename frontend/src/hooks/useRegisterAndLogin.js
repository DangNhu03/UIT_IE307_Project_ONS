import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../../url";
import { useAuthContext } from "@contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
export function useRegisterAndLogin() {
  const { dispatch } = useAuthContext();
  const navigation = useNavigation();
  
  const registerUser = useCallback(
    async (name, email, avatar) => {
      try {
        const response = await fetch(`${API_URL}/api/auth/register-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, avatar }),
        });

        if (response.status === 400) {
          console.log("User already exists, attempting to log in...");
          return loginUser(email); // Return early if user already exists
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Registration failed: ${errorData.message || "Unknown error"}`
          );
        }

        if (response.status === 201) {
          const data = await response.json();
          dispatch({ type: "REGISTER", payload: data });
          console.log("Đăng ký thành công");
          return loginUser(email);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const loginUser = useCallback(
    async (email) => {
      try {
        const response = await fetch(`${API_URL}/api/auth/login-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Login failed: ${errorData.message || "Unknown error"}`
          );
        }

        const data = await response.json();

        if (!data) {
          throw new Error("No user data returned during login");
        }

        console.log("Response data:", data);
        await AsyncStorage.setItem("user", JSON.stringify(data)); // Only store if data is valid
        dispatch({ type: "LOGIN", payload: data });
        console.log("Đăng nhập thành công");
        navigation.navigate("Main");
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const registerAndLogin = useCallback(
    async (name, email, avatar) => {
      try {
        const result = await registerUser(name, email, avatar);
        console.log("Registration and login successful:", result);
        return result;
      } catch (error) {
        console.error("Error during register and login:", error);
        throw error;
      }
    },
    [registerUser]
  );

  return { registerAndLogin, loginUser, registerUser };
}
