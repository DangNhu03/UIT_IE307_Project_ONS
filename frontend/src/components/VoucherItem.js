import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { useAuthContext } from "@contexts/AuthContext";
import axios from "axios";
import { Alert } from "react-native";
import { format } from "date-fns";

const Voucher = ({ data, isSaved, onSave }) => {
    let API_URL = 'http://192.168.137.1:5000';
    const { user } = useAuthContext();
    const user_id = user && user[0]?._id;

    const onPress = async () => {
        if (!isSaved) {
            try {
                await axios.post(
                    `${API_URL}/api/users/vouchers`,
                    {
                        user_id: user_id,
                        voucher_id: data._id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                onSave(true); // Gọi hàm cập nhật trạng thái lưu
            } catch (error) {
                console.error("Error adding voucher:", error.response ? error.response.data : error.message);
            }
        }
    };
    const onPressRemind=()=>{
        Alert.alert(
            "Thành công",
            "Chúng tôi sẽ gửi thông báo cho bạn khi mã bắt đầu có hiệu lực!",
            [{ text: "OK" }],
            { cancelable: false }
          );          
  
    }

    const formatNumber = (number) => {
        if (number >= 1000 && number % 1000 === 0) {
            if (number % 1000000 === 0) {
                return `${number / 1000000}tr`;
            } else {
                return `${number / 1000}k`;
            }
        }
        return number.toString();
    };

    return (
        <View style={styles.voucherContainer}>
            <Image source={require("../assets/imgs/voucher.png")} style={styles.img} />
            <View style={styles.contentContainer}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {data.vouc_discount_type} {formatNumber(data.vouc_discount_value)}
                    </Text>
                    <Text style={styles.condition}>Đơn tối thiểu {formatNumber(data.vouc_min_order_value)}</Text>
                    <Text style={styles.expire}>
                        {data.vouc_is_active
                            ? `HSD: ${format(new Date(data.vouc_end_date), "dd.MM.yyyy")}`
                            : `Có hiệu lực từ: ${format(new Date(data.vouc_start_date), "dd.MM.yyyy")}`}
                    </Text>
                </View>
                {data.vouc_is_active ? (
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                        <Text style={styles.textButton}>{isSaved ? "Dùng ngay" : "Lưu mã"}</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={onPressRemind} style={styles.button}>
                        <Text style={styles.textButton}>Nhắc tôi</Text>
                    </TouchableOpacity>
                )
                }

            </View>
        </View>
    );
};

const VoucherList = ({ vouchers, myVoucher = [], onUpdateSavedVouchers }) => {
    const handleSave = (voucher, isSaved) => {
        if (isSaved) {
            onUpdateSavedVouchers([...myVoucher, voucher]); // Thêm voucher vào danh sách đã lưu
        } else {
            onUpdateSavedVouchers(myVoucher.filter((v) => v._id !== voucher._id)); // Loại bỏ voucher
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={vouchers}
                keyExtractor={(item) => item._id}
                contentContainerStyle={
                    vouchers.length > 0
                        ? styles.flatListContent
                        : styles.emptyListContent // Khi danh sách rỗng
                }
                renderItem={({ item }) => (
                    <Voucher
                        data={item}
                        isSaved={myVoucher.some((voucher) => voucher._id === item._id)} // Kiểm tra nếu đã lưu
                        onSave={(isSaved) => handleSave(item, isSaved)} // Truyền toàn bộ đối tượng voucher
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Không có voucher nào</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", // Căn giữa theo chiều dọc
        alignItems: "center",     // Căn giữa theo chiều ngang
        backgroundColor: "#241E92",
    },
    flatListContent: {
        justifyContent: "center", // Căn giữa nội dung nếu không cuộn
        alignItems: "center",     // Căn giữa các mục
    },
    emptyListContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#B0B0B0",
    },
    voucherContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "white",
        paddingRight: 10,
        width: 390,
        marginBottom: 10,
    },
    img: {
        width: 100,
        height: "100%",
        resizeMode: "contain",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
    },
    content: {
        flexDirection: "column",
        paddingVertical: 10,
        paddingLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 21,
    },
    condition: {
        fontSize: 12,
        fontWeight: "normal",
        lineHeight: 21,
    },
    expire: {
        fontSize: 10,
        fontWeight: "normal",
        lineHeight: 21,
        color: "#CFCED6",
    },
    button: {
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#E5A5FF",
    },
    textButton: {
        color: "#241E92",
        fontSize: 10,
        fontWeight: "normal",
        lineHeight: 21,
    },
});

export default VoucherList;
