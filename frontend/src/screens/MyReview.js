import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import ArrowBack from "@components/ArrowBack";
import { useAuthContext } from "@contexts/AuthContext";
import OrderItem from "@components/OrderItem"; // Dùng cho "Chưa đánh giá"
import ReviewedItem from "@components/ReviewedItem"; // Dùng cho "Đã đánh giá"
import Button from "@components/Button";
import axios from "axios";
import { API_URL } from "../../../url";
import { useNavigation } from "@react-navigation/native";

export default function MyReview() {
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState("1");
  const [productNotReview, setProductNotReview] = useState([]);
  const [productReviewed, setProductReviewed] = useState([]);
  const user_id = user?.[0]?._id;

  const fetchProductNotReview = async () => {
    console.log('dang o ham lay sp chua danh gia')
    try {
      const response = await axios.get(`${API_URL}/orders/no-review/${user_id}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        console.log('san pham chua danh gia tra ve tu api: ', response.data.data)
        setProductNotReview(response.data.data);
      } else {
        setProductNotReview([]);
      }
    } catch (error) {
      console.error("Lỗi khi fetch sản phẩm chưa đánh giá:", error);
      setProductNotReview([]);
    }
  };

  const fetchProductReviewed = async () => {
    console.log('dang o ham lay sp da danh gia')
    try {
      const response = await axios.get(`${API_URL}/orders/reviewed/${user_id}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        console.log('san pham da danh gia tra ve tu api: ', response.data.data)
        setProductReviewed(response.data.data);
      } else {
        setProductReviewed([]);
      }
    } catch (error) {
      console.error("Lỗi khi fetch sản phẩm đã đánh giá:", error);
      setProductReviewed([]);
    }
  };

  const onReviewProduct = (product) => {
    console.log("Đánh giá sản phẩm:", product);
    navigation.navigate('Review', {
      data:product,
      refreshData: { 
        fetchNotReviewed: fetchProductNotReview, 
        fetchReviewed: fetchProductReviewed 
      }
    });
  };

  useEffect(() => {
    fetchProductNotReview();
    fetchProductReviewed();
  }, []);

  const handleEditReview = (review) => {
    navigation.navigate('EditReview', {
      reviewData: review, // Dữ liệu địa chỉ để chỉnh sửa
      // user_id: user_id,
      refreshData: { 
        fetchNotReviewed: fetchProductNotReview, 
        fetchReviewed: fetchProductReviewed 
      }
    });
  };

  return (
    <View style={styles.container}>
      <ArrowBack title="Đánh giá của tôi" />
      <View style={styles.inforUser}>
        <Image
          source={{ uri: user?.[0]?.user_avatar }}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{user?.[0]?.user_name}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>
          {["Chưa đánh giá", "Đã đánh giá"].map((title, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={styles.typeTitleContainer}
                onPress={() => setActiveTab((index + 1).toString())}
              >
                <Text
                  style={[ 
                    styles.title,
                    activeTab === (index + 1).toString() && { color: "#FF71CD" },
                  ]}
                >
                  {title}
                </Text>
              </TouchableOpacity>
              {index < 1 && <View style={styles.line} />}
            </React.Fragment>
          ))}
        </View>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.bottomContainer}>
          {activeTab === "1" ? (
            productNotReview.length > 0 ? (
              productNotReview.map((product, index) => (
                <View key={index} style={styles.listOrderContainer}>
                  <OrderItem product={product} borderBottomWidth={0} />
                  <View style={styles.divider} />
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Đánh giá"
                      borderRadius={4}
                      textColor="#241E92"
                      backgroundColor="#fff"
                      borderColor="#E5A5FF"
                      borderWidth={1}
                      onPress={() => onReviewProduct(product)}
                    />
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noProductText}>
                Bạn đã hoàn thành đánh giá các sản phẩm!
              </Text>
            )
          ) : productReviewed.length > 0 ? (
            productReviewed.map((product, index) => (
              <View key={index} style={styles.listOrderContainer}>
                <ReviewedItem data={product} onEdit={handleEditReview}/>
              </View>
            ))
          ) : (
            <Text style={styles.noProductText}>
              Hiện chưa có sản phẩm nào được đánh giá!
            </Text>
          )}
        </ScrollView >
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241e92",
    alignItems: "center",
    paddingTop: 40,
  },
  inforUser: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  topContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 35,
    marginBottom: 20,
  },
  typeTitleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#241E92",
  },
  line: {
    width: 1,
    height: 24,
    backgroundColor: "#CFCED6",
  },
  bottomContainer: {
    flexGrow: 1,  // Ensures the ScrollView grows and fills available space
    paddingHorizontal: 10,
    // justifyContent:'center',
  },
  listOrderContainer: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 10,
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  noProductText: {
    textAlign: "center",
    textAlignVertical:"center",
    fontSize: 16,
    color:'#FFF',
  },
});
