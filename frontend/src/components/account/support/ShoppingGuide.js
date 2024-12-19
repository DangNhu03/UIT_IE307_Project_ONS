import IconAndTitle from "@components/IconAndTitle";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function ShoppingGuide() {
  return (
    <View style={styles.container}>
      <IconAndTitle
        icon={
          <MaterialIcons
            name="production-quantity-limits"
            size={24}
            color="#FF71CD"
          />
        }
        title="Hướng dẫn mua hàng"
      />

      <View style={styles.itemContainer}>
        <Text style={styles.titleText}>Tìm kiếm sản phẩm</Text>
        <View style={styles.line}></View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalText}>
            Sử dụng <Text style={styles.boldText}>Thanh tìm kiếm</Text> ở đầu
            màn hình để nhập tên sản phẩm (ví dụ: bút bi, giấy A4).
          </Text>
          <Text style={styles.normalText}>
            Duyệt qua danh mục sản phẩm: Bấm vào để xem các danh mục như Bút
            viết, Giấy tờ, Dụng cụ văn phòng, v.v.
          </Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.titleText}>Chọn sản phẩm</Text>
        <View style={styles.line}></View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalText}>
            Nhấn vào sản phẩm để xem chi tiết: hình ảnh, giá, thông tin mô tả,
            và đánh giá từ người dùng khác.
          </Text>
          <Text style={styles.normalText}>
            Chọn loại sản phẩm và số lượng mong muốn.
          </Text>
          <Text style={styles.normalText}>
            Thêm sản phẩm vào giỏ hàng bằng cách nhấn nút{" "}
            <Text style={styles.boldText}>Thêm vào giỏ hàng.</Text>
          </Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.titleText}>Kiểm tra giỏ hàng</Text>
        <View style={styles.line}></View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalText}>
            Nhấn vào biểu tượng <Text style={styles.boldText}>Giỏ hàng</Text>{" "}
            trên thanh công cụ.
          </Text>
          <Text style={styles.normalText}>
            Xem lại danh sách sản phẩm đã chọn: kiểm tra số lượng, giá tiền,
            hoặc xóa bớt sản phẩm không cần thiết.
          </Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.titleText}>Kiểm tra giỏ hàng</Text>
        <View style={styles.line}></View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalText}>
            Nhấn vào biểu tượng <Text style={styles.boldText}>Giỏ hàng</Text>{" "}
            trên thanh công cụ.
          </Text>
          <Text style={styles.normalText}>
            Xem lại danh sách sản phẩm đã chọn: kiểm tra số lượng, giá tiền,
            hoặc xóa bớt sản phẩm không cần thiết.
          </Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.titleText}>Thanh toán</Text>
        <View style={styles.line}></View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalText}>
            Nhấn nút <Text style={styles.boldText}>Mua ngay</Text>.
          </Text>
          <Text style={styles.normalText}>Nhập thông tin giao hàng:</Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>Địa chỉ nhận hàng</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>Số điện thoại liên hệ</Text>
            </View>
          </View>
          <Text style={styles.normalText}>Chọn phương thức thanh toán:</Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Thanh toán khi nhận hàng (COD).
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Thanh toán online qua ví điện tử hoặc thẻ ngân hàng.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.titleText}>Xác nhận đơn hàng</Text>
        <View style={styles.line}></View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalText}>
            Kiểm tra lại thông tin đơn hàng: sản phẩm, giá tổng cộng, phí vận
            chuyển (nếu có).
          </Text>
          <Text style={styles.normalText}>
            Nhấn nút <Text style={styles.boldText}>Đặt hàng</Text>.
          </Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.titleText}>Theo dõi đơn hàng</Text>
        <View style={styles.line}></View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalText}>
            Vào mục <Text style={styles.boldText}>Đơn hàng của tôi</Text> để
            kiểm tra trạng thái đơn hàng:
          </Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Mới đặt: Đơn hàng đặt thành công.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Đang xử lý: Đơn hàng đang được chuẩn bị và sẽ được giao cho đơn
                vị vận chuyển.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Đã giao hàng: Đơn hàng đã đến tay bạn.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.titleText}>Nhận hàng và đánh giá</Text>
        <View style={styles.line}></View>
        <View style={styles.itemContainer}>
          <Text style={styles.normalText}>
            Khi nhận hàng, kiểm tra sản phẩm và xác nhận với nhân viên giao
            hàng.
          </Text>
          <Text style={styles.normalText}>
            Để lại đánh giá trên ứng dụng để giúp cải thiện chất lượng dịch vụ.
          </Text>
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
  boldText: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 21,
    color: "#3B394A",
  },
  listContainer: {
    marginLeft: 10,
    marginTop: -5,
  },
  listItem: {
    flexDirection: "row",
    gap: 5,
    paddingRight: 5,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 21,
    color: "#3B394A",
  },
});
