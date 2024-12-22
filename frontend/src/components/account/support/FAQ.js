import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import IconAndTitle from "@components/IconAndTitle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function FAQ() {
  // State để theo dõi câu hỏi đang mở
  const [openQuestion, setOpenQuestion] = useState(null);

  // Hàm để toggle câu trả lời
  const toggleAnswer = (question) => {
    setOpenQuestion(openQuestion === question ? null : question); // Nếu câu hỏi đang mở, đóng nó, nếu không thì mở câu hỏi mới
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <IconAndTitle
          icon={
            <MaterialCommunityIcons
              name="chat-question-outline"
              size={24}
              color="#FF71CD"
            />
          }
          title="Câu hỏi thường gặp"
        />

        {/* Câu hỏi Đơn hàng */}
        <View>
          <TouchableOpacity onPress={() => toggleAnswer("order")}>
            <Text style={styles.normalText}>
              {"["}
              <Text style={styles.normalBoldText}>Đơn hàng</Text>
              {"] "} Tôi phải làm gì khi muốn thay đổi địa chỉ giao hàng?
            </Text>
          </TouchableOpacity>
          {openQuestion === "order" && (
            <Text style={styles.normalTextAns}>
              Bạn có thể hủy đơn và đặt lại đơn hàng mới, hoặc liên hệ với chúng
              tôi thông qua hotline: 1811 0702 để được hỗ trợ sớm nhất.
            </Text>
          )}
        </View>
        <View style={styles.line}></View>

        {/* Câu hỏi Bảo mật tài khoản */}
        <View>
          <TouchableOpacity onPress={() => toggleAnswer("security")}>
            <Text style={styles.normalText}>
              {"["}
              <Text style={styles.normalBoldText}>Bảo mật tài khoản</Text>
              {"] "} Làm gì khi muốn thay đổi mật khẩu của tôi?
            </Text>
          </TouchableOpacity>
          {openQuestion === "security" && (
            <Text style={styles.normalTextAns}>
              Để thay đổi mật khẩu, bạn có thể vào phần đổi mật khẩu tại mục cài
              đặt của trang tài khoản và làm theo hướng dẫn.
            </Text>
          )}
        </View>
        <View style={styles.line}></View>

        {/* Câu hỏi Thông tin vận chuyển */}
        <View>
          <TouchableOpacity onPress={() => toggleAnswer("shipping")}>
            <Text style={styles.normalText}>
              {"["}
              <Text style={styles.normalBoldText}>Thông tin vận chuyển</Text>
              {"] "} Có mấy phương thức vận chuyển vận chuyển?
            </Text>
          </TouchableOpacity>
          {openQuestion === "shipping" && (
            <Text style={styles.normalTextAns}>
              Chúng tôi cung cấp hai phương thức vận chuyển là giao hàng Giao
              hàng nhanh trong 24h với phí vận chuyển là 30.000đ và giao hàng
              trong 72h với phí vận chuyển là 10.000đ.
            </Text>
          )}
        </View>
        <View style={styles.line}></View>

        {/* Câu hỏi Tài khoản */}
        <View>
          <TouchableOpacity onPress={() => toggleAnswer("account")}>
            <Text style={styles.normalText}>
              {"["}
              <Text style={styles.normalBoldText}>Tài khoản</Text>
              {"] "} Tôi không thể đăng ký/đăng nhập tài khoản do số điện thoại
              đã tồn tại?
            </Text>
          </TouchableOpacity>
          {openQuestion === "account" && (
            <Text style={styles.normalTextAns}>
              Việc bạn không thể đăng ký/đăng nhập tài khoản do số điện thoại đã
              tồn tại có thể do bạn đã đăng ký tài khoản trước đó. Bạn có thể
              thử đăng nhập lại và dùng phuong thức quên mật khẩu hoặc liên hệ
              với chúng tôi thông qua hotline: 1811 0702 để được hỗ trợ.
            </Text>
          )}
        </View>
        <View style={styles.line}></View>

        {/* Câu hỏi Khuyến mãi */}
        <View>
          <TouchableOpacity onPress={() => toggleAnswer("member")}>
            <Text style={styles.normalText}>
              {"["}
              <Text style={styles.normalBoldText}>Khuyến mãi</Text>
              {"] "} Tại sao tôi không áp dụng được các voucher khuyến mãi?
            </Text>
          </TouchableOpacity>
          {openQuestion === "member" && (
            <Text style={styles.normalTextAns}>
              Vouchers khuyến mãi chỉ dành cho khách hàng có tài khoản, bạn cần
              đăng ký/đăng nhập tài khoản để sử dụng các voucher khuyến mãi. Nếu
              bạn đã có tài khoản thì do có thể do đơn hàng của bạn không đủ
              điều kiện áp dụng voucher.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  itemContainer: {
    width: "100%",
    gap: 20,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  normalText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 21,
    color: "#3B394A",
  },
  normalBoldText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 21,
    color: "#241E92",
    textDecorationLine: "none",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#CFCED6",
  },
  normalTextAns: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 21,
    color: "#3B394A",
    paddingHorizontal: 10,
  },
});
