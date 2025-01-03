import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useAuthContext } from "@contexts/AuthContext";
import { API_URL } from "../../../url";
import VoucherList from "@components/VoucherItem";
import ArrowBack from "@components/ArrowBack";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function Vouchers() {
  const [loading, setLoading] = useState(true);
  const [vouchers, setVouchers] = useState([]);
  const [voucherNotStarted, setVoucherNotStarted] = useState([]);
  const [myVoucher, setMyVoucher] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSave, setIsSave] = useState(false); // Trạng thái isSave
  const [activeTab, setActiveTab] = useState("all"); // Quản lý tab đang active
  const { user } = useAuthContext();
  const user_id = user && user[0]?._id;
  const route = useRoute();
  const totalPrice = route.params?.totalPrice || 0;
  const listProduct = route.params?.listProduct || null;

  // const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get(`${API_URL}/vouchers`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const allVouchers = response.data;
        setVoucherNotStarted(allVouchers.filter(v => new Date(v.vouc_start_date) > new Date()));

        if (user) {
          const usedVoucherIds = myVoucher.filter(v => v.is_used === true).map(v => v._id);
          const availableVouchers = allVouchers.filter(v => !usedVoucherIds.includes(v._id));
          setVouchers(availableVouchers.filter(v => new Date(v.vouc_end_date) > new Date()));
        } else {
          setVouchers(allVouchers.filter(v => new Date(v.vouc_end_date) > new Date()));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
        setLoading(false);
      });
  }, [isSave, myVoucher, user]);

  useEffect(() => {
    if (user_id) {
      axios
        .get(`${API_URL}/api/user/${user_id}/vouchers`)
        .then((response) => {
          console.log("Dữ liệu trả về từ API:", response.data);
          setMyVoucher(response.data.vouchers);
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra khi lấy mã của tôi:", error);
        });
    }
  }, [user_id, isSave]);

  const handleUpdateSavedVouchers = (updatedVouchers) => {
    setMyVoucher(updatedVouchers);
    setIsSave(!isSave);
  };

  const filterVouchers = (vouchersList) => {
    return vouchersList.filter((v) =>
      v.vouc_code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleUseVoucher = (voucher) => {
    console.log("Voucher được dùng:", voucher);
    // console.log(voucher.vouc_min_order_value, totalPrice);
    if (totalPrice && totalPrice > 0) {
      if (voucher.vouc_min_order_value > totalPrice) {
        Alert.alert(
          "Thông báo",
          "Đơn hàng của bạn chưa đủ giá trị tối thiểu để sử dụng voucher này, vui lòng chọn voucher khác!",
          [{ text: "OK" }],
          { cancelable: true }
        );
      } else {
        navigation.navigate("Payment", { voucher, listProduct , totalPrice});
      }
    }
  };
  return (
    <View style={styles.container}>
      <ArrowBack title="Ưu đãi" />

      {/* Tabs Header */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "all" && styles.activeTab]}
          onPress={() => setActiveTab("all")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "all" && styles.activeTabText,
            ]}
          >
            Tất cả ({vouchers.length})
          </Text>
        </TouchableOpacity>

        {/* Đường ngăn cách giữa các tab */}
        <View style={styles.separator}></View>

        <TouchableOpacity
          style={[styles.tab, activeTab === "notStarted" && styles.activeTab]}
          onPress={() => setActiveTab("notStarted")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "notStarted" && styles.activeTabText,
            ]}
          >
            Sắp diễn ra ({voucherNotStarted.length})
          </Text>
        </TouchableOpacity>

        {/* Tab "Mã của tôi" chỉ hiển thị nếu có user */}
        {user && (
          <>
            <View style={styles.separator}></View>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "myVoucher" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("myVoucher")}
            >
              <Text style={[styles.tabText, activeTab === 'myVoucher' && styles.activeTabText]}>Mã của tôi ({myVoucher.filter(v => v.is_used === false).length})</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Nhập mã voucher..."
            style={styles.searchBarInput}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity>
            <MaterialIcons
              name="search"
              size={24}
              color="white"
              style={styles.searchBarIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {activeTab === "all" && (
              <VoucherList
                vouchers={filterVouchers(vouchers)}
                myVoucher={myVoucher.filter(v => v.is_used === false)}
                onUpdateSavedVouchers={handleUpdateSavedVouchers}
                onUseVoucher={handleUseVoucher}
              />
            )}
            {activeTab === "notStarted" && (
              <VoucherList vouchers={filterVouchers(voucherNotStarted)} />
            )}
            {activeTab === 'myVoucher' && (
              <VoucherList vouchers={filterVouchers(myVoucher.filter(v => v.is_used === false))} myVoucher={myVoucher.filter(v => v.is_used === false)} onUseVoucher={handleUseVoucher} />
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241E92", // Background color for the whole container
    paddingTop: 40,
  },
  tabsContainer: {
    flexDirection: "row",
    height: 35,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
  },
  tab: {},
  activeTab: {
    borderBottomColor: "#FF71CD", // Màu cho tab đang active
  },
  tabText: {
    fontSize: 16,
    color: "#241E92",
    lineHeight: 21,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FF71CD",
    fontWeight: "bold",
  },
  searchBar: {
    width: 390,
    alignSelf: "center",
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CFCED6",
    paddingLeft: 6,
  },
  searchBarInput: {
    flex: 1,
    fontWeight: "normal",
    fontSize: 14,
    paddingVertical: 0,
    paddingLeft: 4,
  },
  searchBarIcon: {
    backgroundColor: "#241E92",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  tabContent: {
    flex: 1,
    backgroundColor: "#241E92", // Apply background color to the content area
  },
  separator: {
    width: 1, // Chiều rộng đường ngăn cách
    height: 25, // Chiều cao đường ngăn cách
    backgroundColor: "#D3D3D3", // Màu của đường ngăn cách
  },
});
