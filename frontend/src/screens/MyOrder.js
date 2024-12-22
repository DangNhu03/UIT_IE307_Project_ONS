import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import ArrowBack from "@components/ArrowBack";
import { useRoute } from "@react-navigation/native";
import { useAuthContext } from "@contexts/AuthContext";
import { API_URL } from "../../../url";
import ListOrders from "@components/ListOrders";
import { useNavigation } from "@react-navigation/native";
import {
  getOrdersByStatusNoUser,
  UpdateOrderWithStatusNoUser,
} from "@hooks/useOrderNoUser";
import { useAddToCart } from "@hooks/useAddToCart";

export default function MyOrder() {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState("1"); // Tab đầu tiên mặc định được chọn
  const typeTitle = route.params?.typeTitle || "";
  console.log("Tab đơn hàng của tôi", typeTitle);
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const user_id =
    user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;
  const { updateCartWithOrderList } = useAddToCart();

  const orderStatuses = [
    { id: "1", title: "Mới đặt" },
    { id: "2", title: "Đang xử lý" },
    { id: "3", title: "Thành công" },
    { id: "4", title: "Đã hủy" },
  ];

  // const fetchOrders = async (status) => {
  //   if (user_id) {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(
  //         `${API_URL}/orders/status/${user_id}?status=${status}`
  //       );
  //       const result = await response.json();

  //       if (result.success) {
  //         console.log("data nè", result.data);
  //         setOrders(result.data);
  //       } else {
  //         setOrders([]);
  //       }
  //     } catch (error) {
  //       console.error("Lỗi khi fetch đơn hàng:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     const orders = await getOrdersByStatusNoUser(status);
  //     if (orders.length > 0) {
  //       setOrders(orders);
  //     } else {
  //       setOrders([]);
  //     }
  //   }
  // };

  const fetchOrders = async (status) => {
    if (user_id) {
      try {
        setLoadingOrder(true); // Bắt đầu tải dữ liệu
        setOrders([]); // Xóa danh sách đơn hàng cũ
        const response = await fetch(
          `${API_URL}/orders/status/${user_id}?status=${status}`
        );
        const result = await response.json();

        if (result.success) {
          console.log("data nè", result.data);
          setOrders(result.data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Lỗi khi fetch đơn hàng:", error);
      } finally {
        setLoadingOrder(false); // Hoàn thành tải dữ liệu
      }
    } else {
      setLoadingOrder(true);
      setOrders([]); // Xóa danh sách đơn hàng cũ
      const orders = await getOrdersByStatusNoUser(status);
      if (orders.length > 0) {
        setLoadingOrder(orders);
      } else {
        setLoadingOrder([]);
      }
      setLoadingOrder(false);
    }
  };

  useEffect(() => {
    if (typeTitle) {
      const matchedTab = orderStatuses.find(
        (status) => status.title === typeTitle
      );
      if (matchedTab) {
        setActiveTab(matchedTab.id);
      }
    }
  }, [typeTitle]);

  useEffect(() => {
    const currentStatus = orderStatuses.find((tab) => tab.id === activeTab);
    if (currentStatus) {
      fetchOrders(currentStatus.title);
    }
  }, [activeTab]);

  const cancelOrder = async (order_id) => {
    // Show confirmation alert
    Alert.alert(
      "Xác nhận hủy đơn",
      "Bạn có chắc chắn muốn hủy đơn hàng này?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Không hủy đơn hàng"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            if (user_id) {
              try {
                setLoading(true);
                const response = await fetch(`${API_URL}/orders/${order_id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ order_status: "Đã hủy" }),
                });
                const result = await response.json();

                if (response.status === 200) {
                  fetchOrders(
                    orderStatuses.find((tab) => tab.id === activeTab)?.title
                  );
                } else {
                  console.error(
                    "Failed to cancel order:",
                    result.message || "Unknown error"
                  );
                }
              } catch (error) {
                console.error("Error canceling order:", error);
              } finally {
                setLoading(false);
              }
            } else {
              const order_status = "Đã hủy";
              const result = await UpdateOrderWithStatusNoUser(
                order_id,
                order_status
              );

              if (result.success) {
                console.log(result.message);
                fetchOrders(
                  orderStatuses.find((tab) => tab.id === activeTab)?.title
                );
              } else {
                console.log("Error:", result.message);
              }
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const onReBuyOrder = async (order) => {
    try {
      if (user_id) {
        for (const item of order.list_items) {
          const { product_id, variant_id, quantity } = item;

          const response = await fetch(`${API_URL}/carts/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              product_id: product_id,
              user_id: user_id,
              variant_id: variant_id || null,
              quantity: quantity,
            }),
          });

          const result = await response.json();

          if (response.status === 200) {
            console.log("Added to cart successfully:", result);
          } else {
            console.log("Failed to add to cart:", result.message);
          }
        }
      } else {
        console.log(order.list_items);
        updateCartWithOrderList(order.list_items);
      }

      navigation.navigate("Cart");
    } catch (error) {
      console.log("Error while rebuying order:", error);
    }
  };
  const onReviewOrder = (order) => {
    if (!order) {
      console.error("Order is not defined.");
      return;
    }
    navigation.navigate("MyReview", { order });
  };

  return (
    <View style={styles.container}>
      <ArrowBack title="Đơn hàng của tôi" />
      <View styles={styles.contentContainer}>
        <View style={styles.topContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {orderStatuses.map((status, index) => (
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
                {index < orderStatuses.length - 1 && (
                  <View style={styles.line} />
                )}
              </React.Fragment>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {loading ? (
              <Text style={styles.loadingText}>Đang tải...</Text>
            ) : (
              <ListOrders
                orders={orders}
                activeTab={
                  orderStatuses.find((status) => status.id === activeTab)?.title
                }
                onCancelOrder={cancelOrder}
                onReBuyOrder={onReBuyOrder}
                onReviewOrder={onReviewOrder}
              />
            )}
          </ScrollView>
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
  contentContainer: {
    flex: 1,
    gap: 20,
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  typeTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
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
  listOrders: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "column",
    gap: 10,
    borderRadius: 4,
  },
});
