import ArrowBack from "@components/ArrowBack";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Image,
} from "react-native";

import CartItem from "@components/CartItem";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import VoucherSelect from "@components/VoucherSelect";
import { useAuthContext } from "@contexts/AuthContext";
import { API_URL } from "../../../url";

export default function Cart() {
  const navigation = useNavigation();
  const badgeCount = 3;
  const { user } = useAuthContext();
  const [isSelected, setIsSelected] = useState(false); // Trạng thái đã chọn
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [cartData, setcartData] = useState([]); // State lưu sản phẩm giỏ hàng
  const toggleEditMode = () => setIsEditing(!isEditing);

  const handleClickChat = () => {
    navigation.navigate("Chat");
  };
  const handleNavigateHome = () => {
    navigation.navigate('Main');
  };
  const user_id = user[0]._id;
  console.log("used_id in cart", user_id);

  const fetchCartProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/carts/${user_id}`);
      const data = await response.json();

      if (response.ok) {
        setcartData(data.cart || []); // Set the fetched data as cart items
      } else {
        setError(data.message || "Unable to fetch cart items");
      }
    } catch (err) {
      setError("Network error while fetching cart items");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCartProducts();
  }, [user_id]);

  const debounceTimeout = useRef(null);

  // Cập nhật giỏ hàng với debounce
  const updateCartChanges = async (productId, variantId, newQuantity) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const payload = {
          user_id,
          product_id: productId,
          variant_id: variantId,
          quantity: newQuantity,
        };

        const response = await fetch(`${API_URL}/carts/${user_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log("result", result);
        if (response.ok) {
          setcartData((prevCart) =>
            prevCart.map((item) =>
              item.product_id._id === productId && item.variant_id === variantId
                ? { ...item, quantity: newQuantity }
                : item
            )
          );
        } else {
          console.error("Error updating cart:", result.message);
        }
      } catch (err) {
        console.error("Network error while updating cart:", err);
      }
    }, 3000);
  };

  const toggleSelection = () => {
    const newSelectedItems = {};
    cartData.forEach((item) => {
      const key = item.variant_id
        ? `${item.product_id}_${item.variant_id}`
        : item.product_id;

      newSelectedItems[key] = !isSelected;
    });
    setSelectedItems(newSelectedItems); // Cập nhật lại selectedItems
    setIsSelected(!isSelected);
  };

  const toggleItemSelection = (productId, variantId) => {
    const key = variantId ? `${productId}_${variantId}` : productId;

    setSelectedItems((prevState) => {
      const newState = { ...prevState, [key]: !prevState[key] };

      // Kiểm tra xem tất cả sản phẩm có được chọn không
      const allSelected = cartData.every((item) => {
        const itemKey = item.variant_id
          ? `${item.product_id}_${item.variant_id}`
          : item.product_id;
        return newState[itemKey];
      });

      setIsSelected(allSelected); // Cập nhật lại trạng thái của "Chọn tất cả"
      return newState;
    });
  };

  const handleDelete = async () => {
    const itemsToDelete = [];

    // Collect product_id and variant_id of selected items
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
        if (response.ok) {
          Alert.alert(
            "Thành công",
            "Sản phẩm đã được xóa khỏi giỏ hàng.",
            [
              {
                text: "OK",
              },
            ],
            { cancelable: true }
          );
          setcartData((prevCart) =>
            prevCart.filter(
              (cartItem) =>
                cartItem.product_id._id !== item.product_id ||
                cartItem.variant_id !== item.variant_id
            )
          );
        } else {
          alert(result.message || "Có lỗi xảy ra khi xóa sản phẩm.");
        }
      }

      fetchCartProducts();
      // Clear selection after deletion
      setSelectedItems({});
    } catch (err) {
      console.error("Error deleting items:", err);
      alert("Lỗi mạng khi xóa sản phẩm.");
    }
  };

  const handleItemDelete = async (productId, variantId = null) => {
    try {
      const bodyData = {
        user_id,
        product_id: productId,
      };

      // Add variant_id if it exists
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
        Alert.alert(
          "Thành công",
          "Sản phẩm đã được xóa khỏi giỏ hàng.",
          [
            {
              text: "OK",
            },
          ],
          { cancelable: true }
        );
      } else {
        alert(result.message || "Error deleting item");
      }
      fetchCartProducts();
    } catch (err) {
      console.error("Error details:", err);
      alert(`Network error while deleting item: ${err.message || err}`);
    }
  };

  return (
    <View style={styles.container}>
      <ArrowBack
        title="Giỏ hàng"
        rightContent={
          <View style={styles.rightHeaderContainer}>
            <TouchableOpacity onPress={toggleEditMode}>
              <Text style={styles.subtitle}>{isEditing ? "Xong" : "Sửa"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleClickChat}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color="white"
              />
              {badgeCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badgeCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        }
      />
      {cartData.length === 0 ? (
        <>
          <View style={styles.noProductsContainer}>
            <Image
              source={require("../assets/imgs/cart.png")}
              style={styles.noProductsImage}
            />
            <Text style={styles.noProductsText}>
              Bạn chưa có sản phẩm trong giỏ hàng!!!
            </Text>
            <Button
              title="Mua sắm ngay"
              borderRadius={4}
              onPress={handleNavigateHome}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.listProducts}>
            <FlatList
              data={cartData}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item }) => (
                <CartItem
                  product={item}
                  updateCartChanges={updateCartChanges}
                  isSelected={
                    selectedItems[
                      item.variant_id
                        ? `${item.product_id}_${item.variant_id}`
                        : item.product_id
                    ] || false
                  } // Kiểm tra nếu có variant_id thì sử dụng khóa kết hợp
                  toggleItemSelection={toggleItemSelection}
                  handleItemDelete={handleItemDelete}
                />
              )}
            />
          </View>

          <View style={styles.summaryContainer}>
            {isEditing ? (
              <View style={styles.totalContainer}>
                <View style={styles.totalLeft}>
                  <TouchableOpacity onPress={toggleSelection}>
                    <MaterialIcons
                      name={
                        isSelected ? "check-box" : "check-box-outline-blank"
                      }
                      size={24}
                      color="#241E92"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={toggleSelection}>
                    <Text style={styles.title}>
                      {isSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.totalRight}>
                  <Button
                    title="Xóa"
                    borderRadius={4}
                    width={60}
                    onPress={handleDelete}
                  />
                </View>
              </View>
            ) : (
              <>
                <View style={styles.voucherContainer}>
                  <VoucherSelect />
                </View>
                <View style={styles.line}></View>
                <View style={styles.totalContainer}>
                  <View style={styles.totalLeft}>
                    <TouchableOpacity onPress={toggleSelection}>
                      <MaterialIcons
                        name={
                          isSelected ? "check-box" : "check-box-outline-blank"
                        }
                        size={24}
                        color="#241E92"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleSelection}>
                      <Text style={styles.title}>
                        {isSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.totalRight}>
                    <View style={styles.totalPrice}>
                      <Text style={styles.smallText}>Tổng</Text>
                      <Text style={styles.totalText}>300000000đ</Text>
                    </View>
                    <Button
                      title="Mua ngay"
                      borderRadius={4}
                      onPress={() => navigation.navigate("Payment")}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241E92",
    paddingTop: 40,
  },
  rightHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 21,
    color: "white",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 16,
    height: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  listProducts: {
    flex: 1,
    paddingHorizontal: 10,
  },
  summaryContainer: {
    backgroundColor: "#fff",
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: 10,
  },
  line: {
    height: 1,
    backgroundColor: "#CFCED6",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
  },
  totalRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  totalPrice: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noProductsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noProductsImage: {
    width: 500,
    height: 500,
  },
  noProductsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom:20,
  },
});
