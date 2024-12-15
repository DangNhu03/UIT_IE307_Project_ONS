import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const ProductItem = ({ data }) => {
    const navigation = useNavigation();
    const imageUrl = data.prod_image && data.prod_image.length > 0 ? data.prod_image[0] : require("../assets/favicon.png");
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
    };
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('ProductDetail', { product: data })}
        >
            <View style={styles.container1}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.img}
                        resizeMode="cover"
                    />
                    {data.prod_discount > 0 && (<Text style={styles.discountBadge}>-{data.prod_discount}%</Text>)}
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{formatCurrency(data.prod_price - (data.prod_price * (data.prod_discount / 100)))}</Text>
                    {data.prod_discount > 0 && (<Text style={styles.oldPrice}>{formatCurrency(data.prod_price)}</Text>
                    )}
                </View>
                <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
                    {data.prod_name}
                </Text>
            </View>
            <View style={styles.container2}>
                <View style={styles.ratingSold}>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>{data.prod_avg_rating} ★</Text>
                        <Text style={styles.ratingCount}>({data.prod_review_count})</Text>
                    </View>
                    <Text style={styles.sold}>🛒{data.prod_sold}</Text>
                </View>
                {/* Popularity Bar */}
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progress, { width: `${data.prod_sold / data.prod_stock * 100}%` }]} />
                        <View style={styles.content}>
                            <Text style={styles.icon}>🔥</Text>
                            <Text style={styles.percentage}>{Math.round(data.prod_sold / data.prod_stock * 100)}%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 180,
        height: 270,
        paddingVertical: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FFF',
        elevation: 5,
    },
    container1: {
        height: 183,
        paddingHorizontal: 8,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 135,
    },
    img: {
        width: '100%',
        height: '135',
        borderRadius: 8,
        backgroundColor: 'gray'
    },
    discountBadge: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "#241E92",
        color: "#FFF",
        fontSize: 10,
        fontWeight: 500,
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
    },
    priceContainer: {
        flexDirection: 'row',
        paddingTop: 6,
        alignItems: 'center',
        gap: 10,
        alignSelf: 'stretch'
    },
    price: {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 21,
        color: '#241E92',
    },
    oldPrice: {
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 21,
        color: '#CFCED6',
        textDecorationLine: 'line-through',
    },
    name: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 18,
        alignSelf: 'stretch'
    },
    container2: {
        flexDirection: 'column',
        gap: 5,
        alignSelf: 'stretch'
    },
    ratingSold: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    ratingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        flexDirection: 'row',
    },
    rating: {
        fontSize: 10,
        fontWeight: 400,
        color: '#FFF',
        borderRadius: 2,
        backgroundColor: '#241E92',
        paddingHorizontal: 2,
    },
    ratingCount: {
        fontSize: 10,
        fontWeight: 400,
        lineHeight: 21,
        color: '#241E92'
    },
    sold: {
        fontSize: 10,
        color: '#333',
    },
    progressBarContainer: {
        width: "100%",
        paddingHorizontal: 8,
    },
    progressBar: {
        height: 18,
        backgroundColor: "#FFE1FF",
        borderRadius: 6,
        overflow: "hidden",
        justifyContent: "center",
        position: "relative",
    },
    progress: {
        height: "100%",
        backgroundColor: "#E5A5FF",
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        position: "absolute",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 5,
        paddingLeft: 3,
    },
    icon: {
        fontSize: 12,
    },
    percentage: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#241E92",
    },
});

export default ProductItem;
