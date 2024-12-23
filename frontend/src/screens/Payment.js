import ArrowBack from "@components/ArrowBack";
import Button from "@components/Button";
import VoucherSelect from "@components/VoucherSelect";
import PaymentMethod from "@components/payments/PaymentMethod";
import DeliveryMethod from "@components/payments/DeliveryMethod";
import DetailPayment from "@components/payments/DetailPayment";
import { useAuthContext } from "@contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import DeliveryAddress from "@components/payments/DeliveryAddress";
import ItemProduct from "@components/payments/ItemProduct";
import NoteSection from "@components/payments/NoteSection";
import { createOrderNoUser } from "@hooks/useOrderNoUser";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { API_URL } from "../../../url";
import * as Linking from "expo-linking";
export default function Payment() {
  const navigation = useNavigation();
  const route = useRoute();
  const { listProduct, totalPrice, voucher } = route.params || {};
  console.log("Selected Products in Payment:", listProduct);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [note, setNote] = useState("");
  const voucherDiscount = voucher?.vouc_discount_value || 0;
  const [totalPricePayment, setTotalPricePayment] = useState(0);
  const { user } = useAuthContext();

  const handleDeliveryAddress = (address) => {
    setSelectedAddress(address);
    console.log("Received delivery address:", address);
  };
  const handleDeliveryMethodChange = (method) => {
    setSelectedDeliveryMethod(method);
    console.log("Selected delivery method: ", method);
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    console.log("Selected payment method: ", method);
  };
  const handleNoteChange = (newNote) => {
    setNote(newNote);
    console.log("Updated note:", newNote);
  };
  console.log("voucher", voucher);
  const handleTotalPricePayment = (totalPricePayment) => {
    setTotalPricePayment(totalPricePayment);
  };

  const validateOrderDetails = () => {
    if (!selectedAddress) {
      Alert.alert(
        "Thông báo",
        "Vui lòng thêm địa chỉ giao hàng!",
        [{ text: "OK" }],
        { cancelable: true }
      );
      return false;
    }

    if (!selectedPaymentMethod) {
      Alert.alert(
        "Thông báo",
        "Vui lòng chọn phương thức thanh toán!",
        [{ text: "OK" }],
        { cancelable: true }
      );
      return false;
    }
    if (!selectedDeliveryMethod) {
      Alert.alert(
        "Thông báo",
        "Vui lòng chọn phương thức vận chuyển!",
        [{ text: "OK" }],
        { cancelable: true }
      );
      return false;
    }
    return true;
  };

  const createOrder = async () => {
    const user_id =
      user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;
    if (user_id) {
      const orderData = {
        user_id,
        order_status: "Mới đặt",
        order_total_price: totalPrice,
        order_final_price: totalPricePayment,
        order_delivery_id: selectedDeliveryMethod._id,
        order_payment_id: selectedPaymentMethod._id,
        order_note: note,
        shipping_cost: selectedDeliveryMethod.deli_cost,
        voucher_id: voucher ? voucher._id : null,
        loca_id: selectedAddress._id,
        list_items: listProduct.map((product) => ({
          product_id: product.product_id,
          variant_id: product.variant_id,
          prod_name: product.prod_name,
          prod_discount: product.prod_discount,
          image: product.image,
          variant_name: product.variant_name,
          price: product.price,
          quantity: product.quantity,
        })),
      };
      console.log(orderData);

      try {
        const response = await fetch(`${API_URL}/orders/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Order created successfully:", data);
          Alert.alert(
            "Thành công",
            "Đặt hàng thành công. Bạn có thể tiếp tục mua sắm!",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("Main");
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          console.error("Failed to create order:", data.message);
          Alert.alert("Lỗi", "Không thể đặt hàng. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Error creating order:", error);
        Alert.alert("Lỗi", "Không thể đặt hàng. Vui lòng thử lại.");
      }
    } else {
      const orderData = {
        order_status: "Mới đặt",
        order_total_price: totalPrice,
        order_final_price: totalPricePayment,
        order_delivery_id: selectedDeliveryMethod._id,
        order_payment_id: selectedPaymentMethod._id,
        order_note: note,
        shipping_cost: selectedDeliveryMethod.deli_cost,
        voucher_id: voucher ? voucher._id : null,
        loca_id: selectedAddress._id,
        list_items: listProduct.map((product) => ({
          product_id: product.product_id,
          variant_id: product.variant_id,
          prod_name: product.prod_name,
          prod_discount: product.prod_discount,
          image: product.image,
          variant_name: product.variant_name,
          price: product.price,
          quantity: product.quantity,
        })),
      };
      const isOrderCreated = await createOrderNoUser(orderData);

      if (isOrderCreated) {
        Alert.alert(
          "Thành công",
          "Đặt hàng thành công. Bạn có thể tiếp tục mua sắm!",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Main");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert("Lỗi", "Không thể đặt hàng. Vui lòng thử lại.");
      }
    }
  };
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      console.log("Redirected to:", url);

      if (url) {
        console.log("url:", url);
        // Add your navigation logic here
        const parsed = Linking.parse(url);
        const resultCode = String(parsed.queryParams?.resultCode);
        console.log('resultCode:', resultCode)
        // Check if resultCode=0
        if (resultCode === '0' || resultCode === 0) {
          createOrder();
          return;
        } else if (resultCode !== "1006") {
          Alert.alert("Lỗi", "Không thể đặt hàng. Vui lòng thử lại.");
        }
      }
    };
    // Listen for incoming links
    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      // Clean up listener
      subscription.remove();
    };
  }, []);
  const handlePlaceOrder = async () => {
    if (!validateOrderDetails()) return;
    // console.log("All information is selected, proceed to place the order.");
    // console.log("user_id", user_id);
    // console.log("Received delivery address:", selectedAddress);
    // console.log("Selected delivery method: ", selectedDeliveryMethod);
    // console.log("Selected payment method: ", selectedPaymentMethod);
    // console.log("voucher", voucher);
    // console.log("totalPrice", totalPrice);
    // console.log("totalPricePayment", totalPricePayment);
    // console.log("note:", note);
    // console.log("listProduct", listProduct);
    if (selectedPaymentMethod.pay_name === "Thanh toán trực tuyến") {
      const momoResponse = await fetch(`${API_URL}/orders/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPricePayment,
        }),
      });

      const momoData = await momoResponse.json();
      const orderId = momoData.orderId;
      console.log("Order ID:", orderId);

      if (momoData.resultCode === 0) {
        console.log("MoMo shortLink:", momoData.shortLink);
        Linking.openURL(momoData.shortLink).catch((err) =>
          console.error("Failed to open MoMo payment URL", err)
        );
      } else {
        console.log("Error creating MoMo payment.");
      }
    } else {
      createOrder();
    }
  };
  return (
    <View style={styles.container}>
      <ArrowBack title="Thanh toán" />
      <ScrollView>
        <View style={styles.contentContainer}>
          {/* dia chi nhan hang */}
          <DeliveryAddress onAddressFetched={handleDeliveryAddress} />
          <View style={styles.productContainer}>
            {Array.isArray(listProduct) && listProduct.length > 0 ? (
              listProduct.map((product, index) => (
                <ItemProduct key={index} product={product} />
              ))
            ) : (
              <Text>No products available</Text>
            )}
            <NoteSection onNoteChange={handleNoteChange} />
          </View>
          {/* Phương thức vận chuyển và thanh toán */}
          <View style={styles.methodContainer}>
            <VoucherSelect
              totalPrice={totalPrice}
              listProduct={listProduct}
              voucherDisplayPayment={voucher || null}
            />
            <View style={styles.lineContainer}>
              <View style={styles.line}></View>
            </View>
            <PaymentMethod onPaymentMethodChange={handlePaymentMethodChange} />
            <View style={styles.lineContainer}>
              <View style={styles.line}></View>
            </View>
            <DeliveryMethod
              onDeliveryMethodChange={handleDeliveryMethodChange}
            />
          </View>
          {/*Chi tiết thanh toán  */}
          <DetailPayment
            totalPrice={totalPrice}
            selectedDeliveryMethod={selectedDeliveryMethod}
            voucherDiscount={voucherDiscount}
            onTotalPricePayment={handleTotalPricePayment}
          />
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.totalContainer}>
          <View style={styles.totalRight}>
            <View style={styles.totalPrice}>
              <Text style={styles.smallText}>Tổng</Text>
              <Text style={styles.totalText}>
                {totalPricePayment.toLocaleString("vi-VN")}đ
              </Text>
            </View>
            <Button
              title="Đặt hàng"
              borderRadius={4}
              onPress={handlePlaceOrder}
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
    paddingTop: 40,
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: "#EBEBEE",
    padding: 10,
    gap: 10,
  },
  productContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
    gap: 10,
    borderRadius: 4,
  },
  productList: {
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  methodContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
    borderRadius: 4,
    padding: 5,
  },
  lineContainer: {
    padding: 5,
  },
  line: {
    backgroundColor: "#CFCED6",
    height: 1,
  },
  footerContainer: {
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 4,
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
});
