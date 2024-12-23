import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import ArrowBack from "@components/ArrowBack";
import { useAuthContext } from "@contexts/AuthContext";
import OrderItem from "@components/OrderItem";
import { API_URL } from "../../../url";
import Button from "@components/Button";

export default function MyReview() {
  const { user } = useAuthContext();
  const route = useRoute();
  const order = route.params?.order || [];
  const [activeTab, setActiveTab] = useState("1");
  console.log("reviews screen", order);
  const reviewStatus = [
    { id: "1", title: "Chưa đánh giá" },
    { id: "2", title: "Đã đánh giá" },
  ];
  const [productNotReview, setproductNotReview] = useState([]);
  const user_id =
    user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;
  const fetchProductNotReview = async () => {
    try {
      const response = await fetch(`${API_URL}/orders/no-review/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
        }),
      });
      const result = await response.json();

      if (result.success) {
        console.log("Đơn hàng chứa sản phẩm chưa đánh giá:", result.data);
        setproductNotReview(result.data);
      } else {
        console.warn("Không có sản phẩm chưa đánh giá.");
        setproductNotReview([]);
      }
    } catch (error) {
      console.log("Lỗi khi fetch sản phẩm của đơn hàng thành công:", error);
    }
  };

  useEffect(() => {
    fetchProductNotReview();
  }, []);
  return (
    <View style={styles.container}>
      <ArrowBack title="Đánh giá của tôi" />
      <View
        style={[
          styles.inforUser,
          user &&
            Array.isArray(user) &&
            user.length > 0 && { justifyContent: "flex-start" },
        ]}
      >
        <Image
          source={{ uri: user[0]?.user_avatar }}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{user[0]?.user_name}</Text>
      </View>
      <View styles={styles.contentContainer}>
        <View style={styles.topContainer}>
          {reviewStatus.map((status, index) => (
            <React.Fragment key={status.id}>
              <TouchableOpacity
                style={styles.typeTitleContainer}
                onPress={() => setActiveTab(status.id)}
              >
                <Text
                  style={[
                    styles.title,
                    activeTab === status.id && { color: "#FF71CD" },
                  ]}
                >
                  {status.title}
                </Text>
              </TouchableOpacity>
              {index < reviewStatus.length - 1 && <View style={styles.line} />}
            </React.Fragment>
          ))}
        </View>
        <View style={styles.bottomContainer}>
          {productNotReview.map((product, index) => (
            <OrderItem key={index} product={product} borderBottomWidth={0} />
          ))}
          <View style={styles.buttonConatiner}>
            <Button
              title="Đánh giá"
              borderRadius={4}
              textColor="#241E92"
              backgroundColor="#fff"
              borderColor="#E5A5FF"
              borderWidth={1}
              // onPress={() => onReviewOrder(order)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241e92",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  inforUser: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
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
  },
  contentContainer: {
    gap: 20,
    width: "100%",
  },
  topContainer: {
    backgroundColor: "#fff",
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    width: "100%",
  },
  typeTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  title: {
    color: "#241E92",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 21,
  },
  line: {
    height: 24,
    width: 1,
    backgroundColor: "#CFCED6",
  },
  bottomContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 70,
  },
  listOrderContainer: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "column",
    gap: 10,
    paddingRight: 5,
    paddingBottom: 5,
  },
  buttonConatiner: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
});
