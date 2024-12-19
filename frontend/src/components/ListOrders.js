import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import OrderItem from "@components/OrderItem";
import Button from "@components/Button";
import { MaterialIcons } from "@expo/vector-icons";

const ListOrders = ({
  orders,
  activeTab,
  onCancelOrder,
  onReBuyOrder,
  onReviewOrder,
}) => {
  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleExpanded = (orderId) => {
    setExpandedOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  return (
    <View>
      {orders.length > 0 ? (
        orders.map((order, index) => {
          const isExpanded = expandedOrders[order._id];
          const showMoreItems = order.list_items.length > 2;
          const itemsToDisplay = isExpanded
            ? order.list_items
            : order.list_items.slice(0, 2);

          return (
            <View key={index} style={styles.listOrderContainer}>
              {itemsToDisplay.map((item, itemIndex) => (
                <OrderItem
                  key={itemIndex}
                  product={item}
                  typeTitle={activeTab}
                />
              ))}

              {showMoreItems && (
                <TouchableOpacity
                  onPress={() => toggleExpanded(order._id)}
                  style={styles.seeAllContainer}
                >
                  <Text style={styles.textSeeAll}>
                    {isExpanded ? "Thu gọn" : "Xem tất cả"}
                  </Text>
                  <MaterialIcons
                    name={
                      isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"
                    }
                    size={24}
                    color="#241E92"
                  />
                </TouchableOpacity>
              )}
              <View style={styles.productAndPriceContainer}>
                <View style={styles.infoOrderContainer}>
                  <Text style={styles.smallText}>
                    {order.list_items.length} sản phẩm
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.titleText}>Tổng cộng: </Text>
                    <Text style={styles.totalPriceText}>
                      {order.order_final_price.toLocaleString("vi-VN")}đ
                    </Text>
                  </View>
                </View>
                <View style={styles.line}></View>
              </View>
              {activeTab === "Mới đặt" && (
                <View style={styles.buttonConatiner}>
                  <Button
                    title="Hủy đơn hàng"
                    borderRadius={4}
                    onPress={() => onCancelOrder(order._id)}
                  />
                </View>
              )}

              {activeTab === "Đang xử lý" && (
                <View style={styles.buttonConatiner}>
                  <Text>Đơn hàng của bạn đang được xử lý🥰</Text>
                </View>
              )}

              {activeTab === "Thành công" && (
                <View style={styles.buttonConatiner}>
                  <Button
                    title="Đánh giá"
                    borderRadius={4}
                    textColor="#241E92"
                    backgroundColor="#fff"
                    borderColor="#E5A5FF"
                    borderWidth={1}
                    onPress={() => onReviewOrder(order)}
                  />
                  <Button
                    title="Mua lại sản phẩm"
                    borderRadius={4}
                    onPress={() => onReBuyOrder(order)}
                  />
                </View>
              )}

              {activeTab === "Đã hủy" && (
                <View style={styles.buttonConatiner}>
                  <Button
                    title="Mua lại sản phẩm"
                    borderRadius={4}
                    onPress={() => onReBuyOrder(order)}
                  />
                </View>
              )}
            </View>
          );
        })
      ) : (
        <View style={styles.noOrderContainer}>
          <Image
            source={require("../assets/imgs/order.png")}
            style={styles.noOrderImage}
          />
          <Text style={styles.noOrderText}>
            Bạn chưa có đơn hàng nào !!!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listOrderContainer: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "column",
    gap: 10,
    borderRadius: 4,
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 5,
  },
  orderHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#241e92",
  },
  seeAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textSeeAll: {
    color: "#241E92",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 21,
  },
  buttonConatiner: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  infoOrderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  productAndPriceContainer: {
    gap: 10,
  },
  smallText: {
    color: "#241E92",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 21,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
  },
  totalPriceText: {
    color: "#241E92",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 21,
  },
  line: {
    height: 1,
    backgroundColor: "#CFCED6",
  },
  noOrderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noOrderImage: {
    width: 500,
    height: 500,
  },
  noOrderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
});

export default ListOrders;
