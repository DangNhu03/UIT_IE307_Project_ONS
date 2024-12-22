import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Add address for No-User (not logged in)
export const addAddressNoUser = async (newAddress) => {
  try {
    if (
      !newAddress.loca_address_province ||
      !newAddress.loca_address_district ||
      !newAddress.loca_address_commue ||
      !newAddress.loca_phone ||
      !newAddress.loca_per_name
    ) {
      //   Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin bắt buộc.");
    }

    const fullAddress = [
      newAddress?.loca_address_detail,
      newAddress?.loca_address_commue,
      newAddress?.loca_address_district,
      newAddress?.loca_address_province,
    ]
      .filter(Boolean)
      .join(", ");

    const updatedAddress = {
      ...newAddress,
      loca_address: fullAddress,
    };

    await AsyncStorage.setItem("addressNoUser", JSON.stringify(updatedAddress));

    return true;
  } catch (error) {
    console.error("Có lỗi xảy ra khi thêm địa chỉ:", error);
    return false;
  }
};

export const getAddressNoUser = async () => {
  try {
    const addressList =
      JSON.parse(await AsyncStorage.getItem("addressNoUser")) || [];
    console.log("Địa chỉ từ AsyncStorage:", addressList);

    return addressList;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy địa chỉ:", error);
    return [];
  }
};
export const createOrderNoUser = async (orderData) => {
  try {
    if (
      !orderData ||
      !orderData.list_items ||
      orderData.list_items.length === 0
    ) {
      Alert.alert("Thông báo", "Không có sản phẩm trong giỏ hàng để đặt.");
      return false; // Return false if no products in the order
    }

    // Prepare the order data
    const order = {
      order_status: "Mới đặt",
      order_total_price: orderData.order_total_price,
      order_final_price: orderData.order_final_price,
      order_delivery_id: orderData.order_delivery_id,
      order_payment_id: orderData.order_payment_id,
      order_note: orderData.order_note,
      shipping_cost: orderData.shipping_cost,
      voucher_id: orderData.voucher_id,
      loca_id: orderData.loca_id,
      list_items: orderData.list_items,
    };

    let orders = JSON.parse(await AsyncStorage.getItem("ordersNoUser")) || [];

    orders.push(order);

    await AsyncStorage.setItem("ordersNoUser", JSON.stringify(orders));
    let cartItems = JSON.parse(await AsyncStorage.getItem("cartNouser")) || [];

    const updatedCartItems = cartItems.filter(
      (cartItem) =>
        !orderData.list_items.some(
          (orderItem) =>
            orderItem.product_id === cartItem.product_id &&
            orderItem.variant_id === cartItem.variant_id
        )
    );

    await AsyncStorage.setItem("cartNouser", JSON.stringify(updatedCartItems));

    await AsyncStorage.setItem(
      "cartNouserQuantity",
      JSON.stringify(updatedCartItems.length)
    );
    return true;
  } catch (error) {
    console.error("Có lỗi xảy ra khi tạo đơn hàng:", error);
    Alert.alert("Lỗi", "Không thể tạo đơn hàng. Vui lòng thử lại.");

    return false;
  }
};

export const getOrdersByStatusNoUser = async (status) => {
  try {
    let orders = JSON.parse(await AsyncStorage.getItem("ordersNoUser")) || [];
    // console.log("Đơn hàng từ AsyncStorage:", orders);
    // console.log("Trạng thái đơn hàng:", status);
    const filteredOrders = orders.filter(
      (order) => order.order_status === status
    );
    // console.log("Đơn hàng đã lọc:", filteredOrders);
    return filteredOrders;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy đơn hàng theo trạng thái:", error);
    return []; 
  }
};

export const UpdateOrderWithStatusNoUser = async (order_id, order_status) => {
  try {
    let orders = JSON.parse(await AsyncStorage.getItem("ordersNoUser")) || [];

    const updatedOrders = orders.map((order) => {
      if (order._id === order_id) {
        return {
          ...order,
          order_status: order_status,
        };
      }
      return order;
    });

    if (updatedOrders.find((order) => order._id === order_id) === undefined) {
      throw new Error("Order not found.");
    }

    await AsyncStorage.setItem("ordersNoUser", JSON.stringify(updatedOrders));

    return { success: true, message: "Order status updated successfully." };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, message: error.message };
  }
};
