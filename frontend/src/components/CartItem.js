import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { TextInput } from "react-native";
const CartItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1); // Quản lý số lượng sản phẩm
  const [isSelected, setIsSelected] = useState(false); // Trạng thái đã chọn

  const toggleSelection = () => setIsSelected(!isSelected);

  const increaseQuantity = () =>
    setQuantity(quantity < 100 ? quantity + 1 : 100);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const handleQuantityChange = (text) => {
    if (text === "" || isNaN(text)) {
      setQuantity("");
      return;
    }

    let newQuantity = parseInt(text, 10);
    if (!isNaN(newQuantity)) {
      if (newQuantity > 100) newQuantity = 100;
      setQuantity(newQuantity > 0 ? newQuantity : 1);
    }
  };
  const handleBlur = () => {
    // Nếu giá trị hiện tại không hợp lệ, đặt lại về 1
    if (!quantity || isNaN(quantity)) {
      setQuantity(1);
    }
  };
  return (
    <View style={styles.container}>
      {/* Vòng tròn hoặc ô checkbox */}
      <TouchableOpacity style={styles.circle} onPress={toggleSelection}>
        <MaterialIcons
          name={isSelected ? "check-box" : "check-box-outline-blank"}
          size={24}
          color="#241E92"
        />
      </TouchableOpacity>

      <Image
        source={{
          uri: "https://product.hstatic.net/1000230347/product/artboard_1_copy_f85a03a6f7494317af18d21f556c1a00.jpg",
        }}
        style={styles.productImage}
      />

      <View style={styles.productContainer}>
        {/* Thông tin sản phẩm */}
        <View style={styles.productInfo}>
          <View style={styles.detailProductContainer}>
            <View>
              <Text
                style={styles.productName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {product.name}
              </Text>
              <View style={styles.productCategory}>
                <Text style={styles.categoryText}>{product.category}</Text>
              </View>
            </View>
            <View>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={24}
                color="#241E92"
              />
            </View>
          </View>
          <View style={styles.priceQuantityContainer}>
            <View style={styles.productPriceContainer}>
              <Text style={styles.price}>{product.price} đ</Text>
              <Text style={styles.priceNotDiscount}>{product.price} đ</Text>
            </View>
            {/* Số lượng và các nút điều chỉnh */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQuantity}>
                <AntDesign name="minus" size={14} color="#241E92" />
              </TouchableOpacity>
              <View style={styles.line}></View>
              <TextInput
                style={styles.quantityInput}
                value={String(quantity)}
                keyboardType="numeric"
                onChangeText={handleQuantityChange}
                onBlur={handleBlur}
              />
              <View style={styles.line}></View>
              <TouchableOpacity onPress={increaseQuantity}>
                <AntDesign name="plus" size={14} color="#241E92" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  productImage: {
    height: 101,
    width: 101,
    borderRadius: 5,
  },
  productContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  detailProductContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    lineHeight: 21,
    paddingBottom: 5,
  },
  productCategory: {
    borderColor: "#E5A5FF",
    borderWidth: 1,
    alignSelf: "flex-start",
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    lineHeight: 21,
  },
  priceQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productPriceContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    color: "#241E92",
    fontWeight: "bold",
  },
  priceNotDiscount: {
    fontSize: 12,
    color: "#CFCED6",
    textDecorationLine: "line-through",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EBEBEE",
    borderRadius: 4,
    paddingHorizontal: 5,
    gap: 5,
  },
  line: {
    height: 20,
    width: 1,
    backgroundColor: "#EBEBEE",
  },
  quantityInput: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#241E92",
    padding: 0,
    textAlign: "center",
  },

  circle: {
    marginRight: 10,
  },
});

export default CartItem;
