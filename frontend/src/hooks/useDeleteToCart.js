import { useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../../../url";
import { useAuthContext } from "@contexts/AuthContext";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useDeleteToCart(setcartData) {
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useAuthContext();

  const getQuantity = async () => {
    const user_id =
      user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;
    if (!user_id) {
      console.warn("Không có user ID, không thể lấy số lượng giỏ hàng.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/carts/quantity/${user_id}`);
      const data = await response.json();
      if (response.ok) {
        // Cập nhật số lượng giỏ hàng vào context
        dispatch({ type: "UPDATE_CART_QUANTITY", payload: data.totalQuantity });
      } else {
        console.error("Lỗi khi lấy số lượng giỏ hàng:", data.message);
      }
    } catch (error) {
      console.error("Lỗi khi lấy số lượng giỏ hàng:", error);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const deleteItemFromCart = async (productId, variantId = null) => {
    const user_id =
      user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;
    try {
      setLoading(true);
      const bodyData = {
        user_id,
        product_id: productId,
      };

      if (variantId) {
        bodyData.variant_id = variantId;
      }

      const response = await fetch(`${API_URL}/carts/${user_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();
      if (response.ok) {
        await getQuantity();
        Toast.show({
          type: "success",
          position: "top",
          text1: "Thành công",
          text2: "Sản phẩm đã được xóa khỏi giỏ hàng",
        });
      } else {
        Alert.alert(result.message || "Error deleting item");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
      Alert.alert(`Lỗi mạng khi xóa sản phẩm: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  // Xóa nhiều sản phẩm khỏi giỏ hàng
  const deleteMultipleItemsFromCart = async (selectedItems) => {
    const user_id =
      user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;
    const itemsToDelete = [];

    // Thu thập các product_id và variant_id của các sản phẩm đã chọn
    Object.keys(selectedItems).forEach((key) => {
      if (selectedItems[key]) {
        const [productId, variantId] = key.split("_");
        itemsToDelete.push({
          product_id: productId,
          variant_id: variantId || null,
        });
      }
    });

    if (itemsToDelete.length === 0) {
      alert("Chưa có sản phẩm nào được chọn.");
      return;
    }

    try {
      setLoading(true);

      let hasError = false;
      // Xóa từng sản phẩm
      for (const item of itemsToDelete) {
        const response = await fetch(`${API_URL}/carts/${user_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id,
            product_id: item.product_id,
            variant_id: item.variant_id,
          }),
        });

        const result = await response.json();
        if (!response.ok) {
          hasError = true;
          alert(result.message || "Có lỗi xảy ra khi xóa sản phẩm.");
          break;
        }

        // Cập nhật giỏ hàng sau khi xóa sản phẩm
        setcartData((prevCart) => {
          const updatedCart = prevCart.filter(
            (cartItem) =>
              cartItem.product_id._id !== item.product_id ||
              cartItem.variant_id !== item.variant_id
          );
          return [...updatedCart]; // Tạo một bản sao mới để React nhận thấy sự thay đổi
        });
      }

      if (!hasError) {
        await getQuantity();
        Toast.show({
          type: "success",
          position: "top",
          text1: "Thành công",
          text2: "Sản phẩm đã được xóa khỏi giỏ hàng",
        });
      }
    } catch (err) {
      console.error("Error deleting items:", err);
      Alert.alert("Lỗi khi xóa sản phẩm:");
    } finally {
      setLoading(false);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng cho người dùng chưa đăng nhập
  const deleteItemNoLogin = async (productId, variantId = null) => {
    try {
      setLoading(true);

      // Lấy giỏ hàng hiện tại từ AsyncStorage
      let cartItems =
        JSON.parse(await AsyncStorage.getItem("cartNouser")) || [];

      // Loại bỏ sản phẩm khỏi giỏ hàng
      cartItems = cartItems.filter(
        (item) => item.product_id !== productId || item.variant_id !== variantId
      );

      // Lưu lại giỏ hàng đã cập nhật
      await AsyncStorage.setItem("cartNouser", JSON.stringify(cartItems));

      // Cập nhật giỏ hàng trong state
      setcartData(cartItems);

      Toast.show({
        type: "success",
        position: "top",
        text1: "Thành công",
        text2: "Sản phẩm đã được xóa khỏi giỏ hàng",
      });

      const newQuantity = cartItems.length;
      await AsyncStorage.setItem(
        "cartNouserQuantity",
        JSON.stringify(newQuantity)
      );
      dispatch({
        type: "UPDATE_CART_QUANTITY_NOLOGIN",
        payload: newQuantity,
      });
    } catch (err) {
      console.error("Error deleting item:", err);
      Alert.alert(`Lỗi khi xóa sản phẩm: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  // Xóa nhiều sản phẩm khỏi giỏ hàng cho người dùng chưa đăng nhập
  const deleteMultipleItemsNoLogin = async (selectedItems) => {
    try {
      setLoading(true);

      let cartItems =
        JSON.parse(await AsyncStorage.getItem("cartNouser")) || [];

      const itemsToDelete = Object.keys(selectedItems)
        .filter((key) => selectedItems[key])
        .map((key) => {
          const [productId, variantId] = key.split("_");
          return { product_id: productId, variant_id: variantId || null };
        });

      if (itemsToDelete.length === 0) {
        alert("Chưa có sản phẩm nào được chọn.");
        return;
      }

      cartItems = cartItems.filter(
        (item) =>
          !itemsToDelete.some(
            (delItem) =>
              delItem.product_id === item.product_id &&
              delItem.variant_id === item.variant_id
          )
      );

      // Lưu lại giỏ hàng đã cập nhật
      await AsyncStorage.setItem("cartNouser", JSON.stringify(cartItems));

      // Cập nhật giỏ hàng trong state
      setcartData(cartItems);

      Toast.show({
        type: "success",
        position: "top",
        text1: "Thành công",
        text2: "Các sản phẩm đã được xóa khỏi giỏ hàng",
      });

      // Tính tổng số lượng trong giỏ hàng
      const newQuantity = cartItems.length;
      await AsyncStorage.setItem(
        "cartNouserQuantity",
        JSON.stringify(newQuantity)
      );
      dispatch({
        type: "UPDATE_CART_QUANTITY_NOLOGIN",
        payload: newQuantity,
      });
    } catch (err) {
      console.error("Error deleting items:", err);
      Alert.alert("Lỗi khi xóa sản phẩm:");
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteItemFromCart,
    deleteMultipleItemsFromCart,
    loading,
    deleteItemNoLogin,
    deleteMultipleItemsNoLogin,
  };
}
