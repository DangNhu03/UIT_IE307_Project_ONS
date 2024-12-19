import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import IconAndTitle from "@components/IconAndTitle";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function AboutUs() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={styles.itemContainer}>
            <IconAndTitle
              icon={
                <MaterialIcons name="apartment" size={24} color="#FF71CD" />
              }
              title="Giới thiệu"
            />
            <View style={styles.topTextContainer}>
              <Text style={styles.boldLargeTitleText}>
                ONS - ONLINE STATIONARY
              </Text>
              <Text style={styles.titleText}>
                Điểm đến lý tưởng cho mọi nhu cầu văn phòng phẩm, học tập và
                sáng tạo!
              </Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.titleText}>
              ONS tự hào là thương hiệu hàng đầu trong lĩnh vực cung cấp văn
              phòng phẩm và dụng cụ học tập, mang đến sự tiện lợi và chất lượng
              vượt trội. “ ONS - Chất lượng tạo nên niềm tin! “
            </Text>
          </View>
          <View style={styles.betweenImage}></View>
        </View>
      </View>
      <Image
        source={require("../../../assets/imgs/about-us/vision.png")}
        style={styles.image}
      />
      <View style={styles.containerAfterImage}>
        <View style={styles.itemContainerGap10}>
          <View style={styles.topTextContainer}>
            <Text style={styles.boldMediumTitleText}>
              Tại sao nên lựa chọn ONS?
            </Text>
          </View>
          <View style={styles.itemContainerGap10}>
            <Text style={styles.normalBoldText}>
              Trải nghiệm mua sắm tiện lợi
            </Text>
            <View style={styles.listContainer}>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.normalText}>
                  Hệ thống cửa hàng hiện đại và thân thiện.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.normalText}>
                  Dịch vụ mua sắm trực tuyến nhanh chóng, với giao diện dễ sử
                  dụng và giao hàng nhanh trong 24-48 giờ.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.itemContainerGap10}>
            <Text style={styles.normalBoldText}>Uy tín và cam kết</Text>
            <View style={styles.listContainer}>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.normalText}>
                  Với kinh nghiệm và sự tận tâm, ONS đã trở thành sự lựa chọn
                  đáng tin cậy của hàng ngàn khách hàng trên cả nước.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.normalText}>
                  Luôn đặt lợi ích khách hàng lên hàng đầu và không ngừng đổi
                  mới để mang đến trải nghiệm tốt nhất.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.itemContainerGap10}>
            <Text style={styles.normalBoldText}>Uy tín và cam kết</Text>
            <View style={styles.listContainer}>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.normalText}>
                  Với kinh nghiệm và sự tận tâm, ONS đã trở thành sự lựa chọn
                  đáng tin cậy của hàng ngàn khách hàng trên cả nước.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.normalText}>
                  Luôn đặt lợi ích khách hàng lên hàng đầu và không ngừng đổi
                  mới để mang đến trải nghiệm tốt nhất.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.itemContainerGap10}>
            <Text style={styles.normalBoldText}>Uy tín và cam kết</Text>
            <View style={styles.listContainer}>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.normalText}>
                  Với kinh nghiệm và sự tận tâm, ONS đã trở thành sự lựa chọn
                  đáng tin cậy của hàng ngàn khách hàng trên cả nước.
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.normalText}>
                  Luôn đặt lợi ích khách hàng lên hàng đầu và không ngừng đổi
                  mới để mang đến trải nghiệm tốt nhất.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.itemContainerGap10}>
          <Text style={styles.normalText}>
            <Text style={styles.normalBoldText}>Sản phẩm và dịch vụ</Text>
            {"\n"}
            Chúng tôi cung cấp:
          </Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Dụng cụ học tập: Bút, thước, giấy, vở, dụng cụ mỹ thuật.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Thiết bị văn phòng: Giấy in, máy tính cầm tay, bìa hồ sơ.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Đồ dùng sáng tạo: Sổ tay thiết kế, màu vẽ, bút lông.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContainerGap10}>
          <Text style={styles.normalBoldText}>Cam kết chất lượng</Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Chính hãng 100%: Hợp tác trực tiếp với các thương hiệu nổi tiếng
                như Thiên Long, Pentel, Deli, Double A.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Kiểm định chặt chẽ: Mỗi sản phẩm được kiểm tra kỹ lưỡng trước
                khi đến tay khách hàng.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.normalText}>
                Chính sách đổi trả linh hoạt: Hỗ trợ đổi trả nếu sản phẩm lỗi
                hoặc không đúng yêu cầu.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.beforeImage}></View>
      </View>
      <Image
        source={require("../../../assets/imgs/about-us/member.png")}
        style={styles.image}
      />
      <View style={styles.heightBetweenImage}></View>
      <Image
        source={require("../../../assets/imgs/about-us/banner.png")}
        style={styles.image}
      />
      <View style={styles.marginBottom}></View>
    </>
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
  topTextContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  boldLargeTitleText: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 27,
    color: "#241E92",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 21,
    color: "#241E92",
    textAlign: "center",
  },
  betweenImage: {
    marginBottom: -10,
  },
  image: {
    width: "100%",
  },
  containerAfterImage: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  boldMediumTitleText: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 27,
    color: "#241E92",
    textAlign: "center",
  },
  itemContainerGap10: {
    width: "100%",
    gap: 10,
    flexDirection: "column",
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
  beforeImage: {
    marginBottom: 10,
  },
  heightBetweenImage: {
    backgroundColor: "#fff",
    height: 20,
  },
  marginBottom: {
    marginBottom: 75,
  },
});
