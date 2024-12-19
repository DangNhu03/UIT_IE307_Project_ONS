// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import React from "react";
// import IconAndTitle from "@components/IconAndTitle";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// export default function FAQ() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.itemContainer}>
//         <IconAndTitle
//           icon={
//             <MaterialCommunityIcons
//               name="chat-question-outline"
//               size={24}
//               color="#FF71CD"
//             />
//           }
//           title="Câu hỏi thường gặp"
//         />
//         <View>
//           <TouchableOpacity>
//             <Text style={styles.normalText}>
//               {"["}
//               <Text style={styles.normalBoldText}>Đơn hàng</Text>
//               {"] "}
//               Tôi phải làm gì khi muốn thay đổi địa chỉ giao hàng?
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.line}></View>
//         <View>
//           <TouchableOpacity>
//             <Text style={styles.normalText}>
//               {"["}
//               <Text style={styles.normalBoldText}>Bảo mật tài khoản</Text>
//               {"] "}
//               Làm gì khi muốn thay đổi mật khẩu của tôi?
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.line}></View>
//         <View>
//           <TouchableOpacity>
//             <Text style={styles.normalText}>
//               {"["}
//               <Text style={styles.normalBoldText}>Thông tin vận chuyển</Text>
//               {"] "}
//               Làm sao để tra cứu thông tin vận chuyển?
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.line}></View>
//         <View>
//           <TouchableOpacity>
//             <Text style={styles.normalText}>
//               {"["}
//               <Text style={styles.normalBoldText}>Tài khoản</Text>
//               {"] "}
//               Tôi không thể đăng ký/đăng nhập tài khoản do số điện thoại đã tồn
//               tại?
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.line}></View>
//         <View>
//           <TouchableOpacity>
//             <Text style={styles.normalText}>
//               {"["}
//               <Text style={styles.normalBoldText}>Thành viên</Text>
//               {"] "}
//               Tại sao tôi không áp dụng được các voucher khuyến mãi?
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     width: "100%",
//     padding: 10,
//   },
//   itemContainer: {
//     width: "100%",
//     gap: 20,
//     flexDirection: "column",
//     alignItems: "flex-start",
//   },
//   normalText: {
//     fontSize: 16,
//     fontWeight: "400",
//     lineHeight: 21,
//     color: "#3B394A",
//   },
//   normalBoldText: {
//     fontSize: 16,
//     fontWeight: "500",
//     lineHeight: 21,
//     color: "#241E92",
//     textDecorationLine: "none",
//   },
//   line: {
//     width: "100%",
//     height: 1,
//     backgroundColor: "#CFCED6",
//   },
// });

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
              Bạn có thể thay đổi địa chỉ giao hàng thông qua trang quản lý đơn
              hàng hoặc liên hệ với chúng tôi để hỗ trợ.
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
              Để thay đổi mật khẩu, bạn có thể vào phần cài đặt tài khoản và làm
              theo hướng dẫn.
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
              {"] "} Làm sao để tra cứu thông tin vận chuyển?
            </Text>
          </TouchableOpacity>
          {openQuestion === "shipping" && (
            <Text style={styles.normalTextAns}>
              Bạn có thể tra cứu thông tin vận chuyển trong phần theo dõi đơn
              hàng.
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
              Vui lòng thử lại với một số điện thoại khác hoặc liên hệ với chúng
              tôi để được hỗ trợ.
            </Text>
          )}
        </View>
        <View style={styles.line}></View>

        {/* Câu hỏi Thành viên */}
        <View>
          <TouchableOpacity onPress={() => toggleAnswer("member")}>
            <Text style={styles.normalText}>
              {"["}
              <Text style={styles.normalBoldText}>Thành viên</Text>
              {"] "} Tại sao tôi không áp dụng được các voucher khuyến mãi?
            </Text>
          </TouchableOpacity>
          {openQuestion === "member" && (
            <Text style={styles.normalTextAns}>
              Bạn có thể kiểm tra lại điều kiện áp dụng voucher hoặc thử các mã
              khác.
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
