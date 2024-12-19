import { View, Text, StyleSheet } from "react-native";
import React from "react";
import IconAndTitle from "@components/IconAndTitle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TermsAndPolicies() {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <IconAndTitle
          icon={
            <MaterialCommunityIcons
              name="book-open-outline"
              size={24}
              color="#FF71CD"
            />
          }
          title="Điều khoản ONS"
        />
        <Text style={styles.normalText}>
          <Text style={styles.boldTextColor}>ONS</Text> được phát triển để cung
          cấp các sản phẩm và dịch vụ văn phòng phẩm chất lượng cao. Khi sử dụng
          Ứng dụng, bạn đồng ý tuân thủ các điều khoản và chính sách được nêu
          dưới đây. Vui lòng đọc kỹ trước khi sử dụng.
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.titleText}>Điều khoản sử dụng</Text>
        <View style={styles.line}></View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalBoldText}>1. Đăng ký tài khoản</Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Người dùng phải cung cấp thông tin chính xác, đầy đủ khi đăng ký
                tài khoản.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Người dùng chịu trách nhiệm bảo mật thông tin tài khoản và không
                chia sẻ cho bên thứ ba.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Ứng dụng có quyền khóa tài khoản nếu phát hiện hành vi gian lận
                hoặc vi phạm điều khoản.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalBoldText}>2. Sử dụng Ứng dụng</Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Ứng dụng chỉ phục vụ mục đích cá nhân, không được sử dụng với
                mục đích thương mại hoặc phi pháp.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Người dùng không được thực hiện các hành vi phá hoại, làm gián
                đoạn hoạt động của Ứng dụng.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalBoldText}>3. Quyền sở hữu trí tuệ</Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Mọi nội dung, hình ảnh, logo và thiết kế trên Ứng dụng thuộc
                quyền sở hữu của chúng tôi.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Người dùng không được sao chép, chỉnh sửa hoặc sử dụng nội dung
                này mà không có sự cho phép.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.titleText}>Chính sách mua hàng</Text>
        <View style={styles.line}></View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalBoldText}>1. Chính sách đặt hàng</Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Người dùng cần kiểm tra kỹ thông tin sản phẩm và địa chỉ nhận
                hàng trước khi xác nhận đơn hàng.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Ứng dụng có quyền hủy đơn hàng nếu phát hiện thông tin sai lệch
                hoặc gian lận.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalBoldText}>2. Chính sách thanh toán</Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Hỗ trợ các phương thức thanh toán: tiền mặt khi nhận hàng (COD),
                thanh toán online qua thẻ ngân hàng hoặc ví điện tử.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Tất cả thông tin thanh toán được bảo mật và không được chia sẻ
                với bên thứ ba.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalBoldText}>3. Chính sách giao hàng</Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Thời gian giao hàng tùy thuộc vào khu vực và phương thức vận
                chuyển.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Trường hợp giao hàng trễ do nguyên nhân khách quan, chúng tôi sẽ
                thông báo kịp thời và hỗ trợ giải quyết.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalBoldText}>4. Chính sách đổi trả</Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Sản phẩm bị lỗi hoặc không đúng mô tả có thể được đổi trả trong
                vòng 7 ngày kể từ ngày nhận hàng.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Sản phẩm đổi trả phải còn nguyên vẹn, không qua sử dụng và đầy
                đủ hóa đơn.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Hoàn tiền sẽ được xử lý trong 3-5 ngày làm việc sau khi xác nhận
                yêu cầu đổi trả hợp lệ.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
    gap: 20,
    marginBottom: 70,
  },
  itemContainer: {
    width: "100%",
    gap: 10,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 21,
    color: "#241E92",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#CFCED6",
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
    color: "#3B394A",
  },
  boldTextColor: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 21,
    color: "#FF71CD",
  },
  listContainer: {
    marginLeft: 10,
    marginTop: -5,
  },
  listItem: {
    flexDirection: "row",
    gap: 5,
    paddingRight: 10,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 21,
    color: "#3B394A",
  },
});
