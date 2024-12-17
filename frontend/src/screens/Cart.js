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
import { useAuthContext } from "@contexts/AuthContext";
import { API_URL } from "../../../url";
import { useDeleteToCart } from "@hooks/useDeleteToCart";
import { useAddToCart } from "@hooks/useAddToCart";

export default function Cart() {
  const navigation = useNavigation();
  const badgeCount = 3;
  const { user } = useAuthContext();
  const [isSelected, setIsSelected] = useState(false); // Trạng thái đã chọn
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [cartData, setcartData] = useState([]); // State lưu sản phẩm giỏ hàng
  const toggleEditMode = () => setIsEditing(!isEditing);
  const {
    deleteItemFromCart,
    deleteMultipleItemsFromCart,
    loading,
    deleteMultipleItemsNoLogin,
    deleteItemNoLogin,
  } = useDeleteToCart(setcartData);
  const handleClickChat = () => {
    navigation.navigate("Chat");
  };
  const handleNavigateHome = () => {
    navigation.navigate("Main");
  };

  const { getCartNoLogin, updateCartQuantityNoLogin } = useAddToCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const fetchCartItems = async () => {
    try {
      const items = await getCartNoLogin();
      console.log("Giỏ hàng:", items); 
      if (Array.isArray(items)) {
        setcartData(items); 
      } else {
        setcartData([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error); 
      setcartData([]); 
    }
  };

  const fetchCartProducts = async (user_id) => {
    try {
      const response = await fetch(`${API_URL}/carts/${user_id}`);
      const data = await response.json();
      if (response.ok) {
        setcartData(data.cart || []); // Set the fetched data as cart items
      } else {
        console.error(data.message || "Unable to fetch cart items");
      }
    } catch (err) {
      console.error("Network error while fetching cart items");
      // } finally {
      //   setIsLoading(false);
    }
  };

  // Dùng useEffect để gọi hàm fetch giỏ hàng tùy theo điều kiện
  useEffect(() => {
    if (user && Array.isArray(user) && user.length > 0) {
      fetchCartProducts(user[0]._id);
    } else {
      fetchCartItems();
    }
  }, [user]);

  const debounceTimeout = useRef(null);

  // Cập nhật giỏ hàng với debounce
  const updateCartChanges = async (productId, variantId, newQuantity) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    const user_id =
      user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;

    if (!user_id) {
      updateCartQuantityNoLogin(productId, variantId, newQuantity);
      return;
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
          fetchCartProducts(user_id);
        } else {
          console.error("Error updating cart:", result.message);
        }
      } catch (err) {
        console.error("Network error while updating cart:", err);
      }
    }, 500);
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
  const handleDeleteMultiple = async () => {
    try {
      if (user && Array.isArray(user) && user.length > 0) {
        await deleteMultipleItemsFromCart(selectedItems);
        await fetchCartProducts(user[0]._id);
      } else {
        await deleteMultipleItemsNoLogin(selectedItems);
        await fetchCartItems();
      }
      setSelectedItems({});
    } catch (error) {
      console.error("Error in deleting multiple items:", error);
    }
  };

  const handleDeleteSingle = (productId, variantId = null) => {
    if (user && Array.isArray(user) && user.length > 0) {
      deleteItemFromCart(productId, variantId).then(() => {
        fetchCartProducts(user[0]._id);
      });
    } else {
      deleteItemNoLogin(productId, variantId).then(() => {
        fetchCartItems();
      });
    }
  };

  const calculateTotalPrice = () => {
    return cartData.reduce((total, item) => {
      const key = item.variant_id
        ? `${item.product_id}_${item.variant_id}`
        : item.product_id;

      if (selectedItems[key]) {
        console.log(item.price * (1 - item.prod_discount / 100), item.quantity);
        const price = item.price * (1 - item.prod_discount / 100) || 0;
        const quantity = item.quantity || 0;
        return total + price * quantity;
      }
      return total;
    }, 0);
  };
  useEffect(() => {
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  }, [selectedItems, cartData]);
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
                  handleDeleteSingle={handleDeleteSingle}
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
                    onPress={handleDeleteMultiple}
                  />
                </View>
              </View>
            ) : (
              <>
                {/* <View style={styles.voucherContainer}>
                  <VoucherSelect />
                </View> */}
                {/* <View style={styles.line}></View> */}
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
                      <Text style={styles.totalText}>
                        {totalPrice.toLocaleString("vi-VN")}đ
                      </Text>
                    </View>
                    <Button
                      title="Mua ngay"
                      borderRadius={4}
                      onPress={() => {
                        // Lọc các key của các sản phẩm đã chọn trong listProduct
                        const selectedKeys = Object.keys(selectedItems).filter(
                          (key) => selectedItems[key] // Lọc các sản phẩm đã chọn
                        );

                        // Lấy thông tin các sản phẩm đã chọn từ cartData
                        const selectedProducts = cartData.filter((item) => {
                          const key = item.variant_id
                            ? `${item.product_id}_${item.variant_id}`
                            : item.product_id;
                          return selectedKeys.includes(key);
                        });
                        console.log(selectedProducts);

                        if (selectedProducts.length === 0) {
                          Alert.alert(
                            "Thông báo",
                            "Vui lòng chọn ít nhất một sản phẩm để mua.",
                            [
                              {
                                text: "OK",
                                onPress: () => console.log("OK Pressed"),
                              },
                            ],
                            { cancelable: true }
                          );
                        } else {
                          navigation.navigate("Payment", {
                            listProduct: selectedProducts,
                            totalPrice:totalPrice
                          });
                        }
                      }}
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
    marginBottom: 20,
  },
});
