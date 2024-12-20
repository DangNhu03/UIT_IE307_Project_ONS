import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import hook navigation

const Noti = ({ data }) => {
    const navigation = useNavigation(); // Khởi tạo navigation
    const onPress = () => {
        if (data.noti_type === "voucher") {
            navigation.navigate("Vouchers"); // Điều hướng đến màn hình Voucher
        } else if (data.noti_type === "product") {
            navigation.navigate("Categories"); // Điều hướng đến màn hình danh mục sản phẩm
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: data.noti_image }} style={styles.img} />
            <View style={styles.contentContainer}>
                <View style={styles.content1}>
                    <Text style={styles.title}>
                        {data.noti_title}
                    </Text>
                    <Text
                        style={styles.content}
                        numberOfLines={1}  
                        ellipsizeMode='tail'  
                    >
                        {data.noti_content}
                    </Text>
                </View>
                <View style={styles.content2}>
                    <Text style={styles.time}>
                        {data.noti_time}
                    </Text>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                        <Text style={styles.textButton}>Truy cập ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 390,
        // minHeight:101,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'white',
        // marginHorizontal: 10,
    },
    img: {
        width: 100,
        height: '100%',
        resizeMode: 'cover',  
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    contentContainer: {
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'space-between',
        // flexShrink: 1,  // Ensure content shrinks to avoid overflow
        flex: 1,  // This allows contentContainer to take available space
    },
    content1: {
        flexDirection: 'column',
        justifyContent: 'center',
        // alignSelf: 'stretch',
        height: 52
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 21,
        textTransform: 'uppercase',
    },
    content: {
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: 21,
        // maxWidth: 240,  // Ensures content doesn't overflow
        // overflow: 'hidden',  // Ensure the content doesn't spill outside
    },
    content2: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 52,
    },
    time: {
        color: '#CFCED6',
        fontSize: 10,
        fontWeight: 'normal',
        lineHeight: 21,
    },
    button: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#241E92',
    },
    textButton: {
        color: '#241E92',
        fontSize: 10,
        fontWeight: 'normal',
        lineHeight: 21,
    }
});

export default Noti;
