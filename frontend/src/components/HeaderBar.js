import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons"; // Thư viện icon
import { useRoute } from "@react-navigation/native"; // Dùng để nhận params
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { useAuthContext } from "@contexts/AuthContext";
import { API_URL } from "../../../url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const badgeCount = 3;
const HeaderBar = ({ value, onSearch }) => {
  const { user, dispatch, totalQuantity, totalQuantityNoLogin } =
  useAuthContext();
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState(
    route.params?.searchQuery || ""
  );
  const navigation = useNavigation();
  const [isFetching, setIsFetching] = useState(false);
  const fetchCartQuantity = async () => {
    try {
      setIsFetching(true);

      if (user && Array.isArray(user) && user.length > 0 && user[0]?._id) {
        const user_id = user[0]._id;
        const res = await fetch(`${API_URL}/carts/quantity/${user_id}`);
        if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu giỏ hàng.");
        const data = await res.json();

        console.log("Số lượng giỏ hàng đã đăng nhập:", data.totalQuantity);
        dispatch({
          type: "UPDATE_CART_QUANTITY",
          payload: data.totalQuantity || 0,
        });
      } else {
        console.log("Người dùng chưa đăng nhập, kiểm tra AsyncStorage");

        const storedQuantity = await AsyncStorage.getItem("cartNouserQuantity");
        const quantityNoLogin = storedQuantity ? JSON.parse(storedQuantity) : 0;

        console.log("Số lượng giỏ hàng chưa đăng nhập:", quantityNoLogin);
        dispatch({
          type: "UPDATE_CART_QUANTITY_NOLOGIN",
          payload: quantityNoLogin,
        });
      }
    } catch (error) {
      // console.error("Lỗi khi lấy số lượng giỏ hàng:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCartQuantity();
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery.trim());
      setSearchQuery;
    }
  };
  const handleClickChat = () => {
    navigation.navigate("Chat");
  };

  const handleCartPress = () => {
    navigation.navigate("Cart");
  };
  const handleClickLogo = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleClickLogo}>
        <Image
          style={styles.logo}
          source={require("../assets/imgs/logo.png")}
        />
      </TouchableOpacity>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Tìm kiếm sản phẩm..."
          style={styles.searchBarInput}
          value={searchQuery||value}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch} // Tìm kiếm khi nhấn Enter
        />
        <TouchableOpacity onPress={handleSearch}>
          <MaterialIcons
            name="search"
            size={24}
            color="white"
            style={styles.searchBarIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleCartPress}>
          <MaterialCommunityIcons
            name="cart-outline"
            size={24}
            color="#241E92"
          />
          {isFetching ? (
            <></>
          ) : (
            <>
              {user &&
              Array.isArray(user) &&
              user.length > 0 &&
              totalQuantity > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalQuantity}</Text>
                </View>
              ) : totalQuantityNoLogin > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalQuantityNoLogin}</Text>
                </View>
              ) : null}
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClickChat}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color="#241E92" />
          {badgeCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badgeCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    height: 42,
  },
  logo: {
    width: 40,
    height: 30,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 230,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CFCED6",
    paddingLeft: 6,
  },

  searchBarInput: {
    flex: 1,
    fontWeight: "400",
    fontSize: 14,
    paddingVertical: 0,
    paddingLeft: 4,
  },
  searchBarIcon: {
    backgroundColor: "#241E92",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
});

export default HeaderBar;
