import React, { useState, useEffect } from "react";
import { Animated } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native"; // Dùng để nhận params
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Svg, {
  Path,
  Mask,
  Rect,
  G,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import ProductItem from "@components/ProductItem";
import ReviewItem from "@components/ReviewItem";
import Button from "@components/Button";
import { API_URL } from "../../../url";
import { useAddToCart } from "@hooks/useAddToCart";
import { useAuthContext } from "@contexts/AuthContext";
const ProductDetail = () => {
  const { user, dispatch, totalQuantity, totalQuantityNoLogin } =
    useAuthContext();
  const navigation = useNavigation();
  const route = useRoute();
  const product = route.params?.product;
  console.log("hhhhhhhhhhh", product);
  const categoryId = product?.cate_id._id || "671126407f5b10df47a60424";
  const productId = product?._id || "6753439b85f73b016a7205b3";
  //   console.log("product ne: ", product)
  console.log("cateId ne: ", categoryId);
  console.log("productId ne: ", productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1); // Quản lý số lượng sản phẩm
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, addToCartNoLogin } = useAddToCart();
  // const user_id =
  //   user && Array.isArray(user) && user.length > 0 ? user[0].user_id : null;
  const badgeCount = 3;

  useEffect(() => {
    axios
      .get(`${API_URL}/products/categories/${categoryId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(
          "ket qua san pham lien quan tra ve tu api ne: ",
          response.data
        );
        setRelatedProducts(
          response.data.products.filter((v) => v._id !== product?._id)
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy sản phẩm liên quan:", error);
        setLoading(false);
      });
  }, [product]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/review/${productId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("ket qua review tra ve tu api ne: ", response.data);
        setReviews(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Có lỗi xảy ra khi lấy đánh giá:", error);
        setLoading(false);
      });
  }, [product]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  };

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

  const handleAdd = () => {
    if (user && Array.isArray(user) && user.length > 0) {
      const product_id = productId;
      const variant_id = product.prod_variations[selectedVariant]?._id;
      addToCart(product_id, variant_id, quantity);
    } else {
      console.log("no user",product);
      addToCartNoLogin(product, selectedVariant, quantity);
    }
  };

  const handleClickChat = () => {
    navigation.navigate("Chat");
  };

  const handleCartPress = () => {
    navigation.navigate("Cart");
  };

  const handleClickBuyNow = () => {
    const product_id = productId;
    const variant_id = product.prod_variations[selectedVariant]?._id;
    const listProduct = [
      {
        product_id,
        variant_id,
        prod_name: product.prod_name,
        prod_discount: String(product.prod_discount),
        image: variant_id
          ? product.prod_variations[selectedVariant].variant_image
          : product.prod_image[0],
        stock: variant_id
          ? String(
              product.prod_variations[selectedVariant].variant_stock_quantity
            )
          : String(product.prod_stock),
        variant_name: variant_id
          ? product.prod_variations[selectedVariant].variant_name
          : null,
        price: selectedVariant
          ? product.prod_variations[selectedVariant].variant_price
          : product.prod_price,
        quantity,
      },
    ];
    const totalPrice =
      quantity *
      Number(listProduct[0].price) *
      (1 - Number(listProduct[0].prod_discount) / 100);
    // console.log(listProduct);
    // console.log(totalPrice);
    navigation.navigate("Payment", {
      listProduct: listProduct,
      totalPrice: totalPrice,
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconContainer}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
        >
          <Mask
            id="mask0_237_1725"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="30"
            height="30"
          >
            <Rect width="30" height="30" fill="#D9D9D9" />
          </Mask>
          <G mask="url(#mask0_237_1725)">
            <Path
              d="M12 15.6443L13.0443 14.6L11.1943 12.75H15.75V11.25H11.1943L13.0443 9.4L12 8.35575L8.35575 12L12 15.6443ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
              fill="url(#paint0_linear_237_1725)"
            />
          </G>
          <Defs>
            <LinearGradient
              id="paint0_linear_237_1725"
              x1="12"
              y1="2.5"
              x2="12"
              y2="21.5"
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#FFE1FF" />
              <Stop offset="0.716667" stopColor="#FFEFFF" />
              <Stop offset="1" stopColor="white" />
            </LinearGradient>
          </Defs>
        </Svg>
        <View style={styles.iconRightContainer}>
          <TouchableOpacity onPress={handleCartPress}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={24}
              color="#241E92"
            />

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
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClickChat}>
            <Ionicons
              name="chatbox-ellipses-outline"
              size={24}
              color="#241E92"
            />
            {badgeCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badgeCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.containerContent}>
        {/* Hình ảnh sản phẩm */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.prod_image[selectedImage] }}
            style={styles.productImage}
          />
          <View style={styles.thumbnailContainer}>
            {product.prod_image.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(index)}
                style={[
                  styles.thumbnail,
                  selectedImage === index && styles.activeThumbnail,
                ]}
              >
                <Image source={{ uri: img }} style={styles.thumbnailImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Thông tin sản phẩm */}
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName}>{product.prod_name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.discountPrice}>
              {formatCurrency(
                product.prod_price -
                  product.prod_price * (product.prod_discount / 100)
              )}
            </Text>
            {product.prod_discount > 0 && (
              <>
                <Text style={styles.originalPrice}>
                  {formatCurrency(product.prod_price)}
                </Text>
                <Text style={styles.discount}>-{product.prod_discount}%</Text>
              </>
            )}
          </View>
          <Text style={styles.descriptionText}>{product.prod_description}</Text>
        </View>

        {/* Phân loại, số lượnglượng*/}
        <View style={styles.sectionContent}>
          <View style={styles.sectionVariant}>
            <Text style={styles.sectionTitle}>Phân loại</Text>
            <View style={styles.variantContainer}>
              {Array.isArray(product.prod_variations) &&
                product.prod_variations.map((variant, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedVariant(index)}
                    style={[
                      styles.variantItem,
                      selectedVariant === index && styles.activeVariantItem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.variantText,
                        selectedVariant === index
                          ? { color: "#FFF" }
                          : { color: "#241E92" },
                      ]}
                    >
                      {variant.variant_name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#CFCED6",
              marginVertical: 10,
            }}
          />
          <View style={styles.sectionQuantity}>
            <Text style={styles.sectionTitle}>Số lượng</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={decreaseQuantity}
                style={styles.quantityItem}
              >
                {/* <AntDesign name="minus" size={14} color="#241E92" /> */}
                <Text style={styles.quantityInput}>-</Text>
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
              <TouchableOpacity
                onPress={increaseQuantity}
                style={styles.quantityItem}
              >
                {/* <AntDesign name="plus" size={14} color="#241E92" /> */}
                <Text style={styles.quantityInput}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Mô tả sản phẩm */}
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
          <View
            style={{
              height: 1,
              backgroundColor: "#CFCED6",
              marginVertical: 10,
            }}
          />
          {Array.isArray(product.prod_characteristics)
            ? product.prod_characteristics.map((line, index) => (
                <View key={index} style={styles.descriptionLine}>
                  <Text style={styles.bulletPoint}>{"\u2022"}</Text>
                  <Text style={styles.descriptionText}>{line}</Text>
                </View>
              ))
            : product.prod_description.split("\n").map((line, index) => (
                <View key={index} style={styles.descriptionLine}>
                  <Text style={styles.bulletPoint}>{"\u2022"}</Text>
                  <Text style={styles.descriptionText}>{line}</Text>
                </View>
              ))}
        </View>

        {/* Hiển thị danh sách đánh giá */}
        <View style={styles.sectionContent}>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{product.prod_avg_rating} ★</Text>
            <Text style={styles.ratingCount}>
              ({product.prod_review_count} đánh giá)
            </Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#CFCED6",
              marginVertical: 10,
            }}
          />
          {reviews.length === 0 ? (
            <Text style={styles.noReviewsText}>
              Sản phẩm này chưa có đánh giá
            </Text>
          ) : (
            <View style={styles.reviewsListContainer}>
              {reviews.map((item, index) => (
                <View key={item._id} style={styles.reviewsItem}>
                  <ReviewItem data={item} />
                  {/* Chỉ thêm separator giữa các item, không thêm separator ở cuối */}
                  {index < reviews.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Sản phẩm liên quan */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          // <View style={styles.sectionContent}>
          <View style={styles.sectionContent}>
            <View style={styles.flashDealsSvgContainer}>
              <Svg width="100%" height="100%" style={styles.flashDealsSvg}>
                <Defs>
                  <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor="#FFE1FF" stopOpacity="1" />
                    <Stop offset="50%" stopColor="#FFEFFF" stopOpacity="1" />
                    <Stop offset="100%" stopColor="#FFF" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grad)" />
              </Svg>
            </View>
            <Text style={styles.sectionTitle}>Sản phẩm liên quan</Text>
            <View
              style={{
                height: 1,
                backgroundColor: "#CFCED6",
                marginVertical: 10,
              }}
            />
            <FlatList
              horizontal
              data={relatedProducts}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.flashDealsItem}>
                  <ProductItem data={item} />
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          // </View>
        )}
      </ScrollView>
      {/* Nút hành động */}
      <View style={styles.actionContainer}>
        <Button
          title="Thêm vào giỏ hàng"
          backgroundColor="transparent"
          textColor="#241E92"
          borderColor="#E5A5FF"
          borderWidth={1}
          onPress={handleAdd}
        />
        <Button title="Mua ngay" onPress={handleClickBuyNow} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    // backgroundColor: '#241E92',
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    backgroundColor: "rgba(36, 30, 146, 0.2)",
    height: 54,
    // justifyContent: "center",
  },
  containerContent: {
    // backgroundColor: '#241E92',
    gap: 10,
  },
  imageContainer: {
    position: "relative", // Đặt position: 'relative' cho hình ảnh lớn
    width: "auto",
  },
  productImage: {
    height: 330,
    resizeMode: "cover",
  },
  thumbnailContainer: {
    position: "absolute", // Đặt thumbnailContainer ở vị trí tuyệt đối
    bottom: 10, // Đặt ở góc dưới
    right: 10, // Đặt ở góc phải
    gap: 10,
  },
  thumbnail: {
    width: 93,
    height: 63,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  activeThumbnail: {
    borderColor: "#FF71CD",
  },
  thumbnailImage: {
    borderRadius: 8,
    width: 90,
    height: 60,
  },
  productInfoContainer: {
    padding: 10,
    gap: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#241E92",
  },
  // ratingContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     marginVertical: 5,
  // },
  // ratingText: {
  //     marginLeft: 5,
  //     fontSize: 14,
  // },
  sectionContent: {
    elevation: 5,
    backgroundColor: "#FFF",
    padding: 10,
    // flex:1,
  },
  ratingContainer: {
    alignItems: "center",
    gap: 2,
    flexDirection: "row",
    // paddingLeft: 10,
  },
  rating: {
    fontSize: 14,
    fontWeight: 400,
    color: "#FFF",
    borderRadius: 2,
    backgroundColor: "#241E92",
    paddingHorizontal: 3,
  },
  ratingCount: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 21,
    color: "#241E92",
  },
  reviewsItem: {},
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 21,
    color: "#241E92",
  },
  originalPrice: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 21,
    color: "#CFCED6",
    textDecorationLine: "line-through",
  },
  discount: {
    backgroundColor: "#241E92",
    color: "#FFF",
    fontSize: 12,
    fontWeight: 500,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 21,
    color: "#241E92",
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 21,
  },
  descriptionLine: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 14,
    marginRight: 5,
    color: "#444",
  },
  relatedContainer: {
    padding: 10,
  },
  relatedProduct: {
    marginRight: 10,
    alignItems: "center",
  },
  relatedImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 5,
  },
  relatedName: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  relatedPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF71CD",
  },
  actionContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
    padding: 15,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#FF71CD",
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#FF0000",
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  buyNowText: {
    color: "#fff",
    fontWeight: "bold",
  },
  // flashDealsContainer: {
  //     flex: 1,
  //     position: 'relative',
  //     paddingRight: 5,
  //     paddingLeft: 10,
  //     paddingTop: 5,
  //     paddingBottom: 20,
  //     marginTop: 10,
  //     flexDirection: 'column',
  //     gap: 5,
  //     minHeight: 300,
  //     elevation:5
  // },
  flashDealsSvgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flashDealsSvg: {},
  flashDealsItem: { marginRight: 10 },
  flashDealsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 30,
  },
  separator: {
    height: 1,
    backgroundColor: "#CFCED6",
    marginVertical: 10, // Khoảng cách giữa các mục
  },
  variantContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: 10,
    width: "100%",
  },
  variantItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#E5A5FF",
    borderRadius: 4,
  },

  activeVariantItem: {
    backgroundColor: "#E5A5FF",
  },
  variantText: {
    fontSize: 14,
    lineHeight: 21,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EBEBEE",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
    // width: 80,
  },
  line: {
    height: 14,
    width: 1,
    backgroundColor: "#EBEBEE",
  },
  quantityInput: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    color: "#241E92",
    padding: 0,
    textAlign: "center",
  },
  quantityItem: {
    justifyContent: "center",
  },
  sectionQuantity: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  sectionVariant: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "314",
  },

  iconRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingRight: 16,
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

export default ProductDetail;
