import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { MaterialIcons } from '@expo/vector-icons';
import Button from "@components/Button"

export default function ReviewedItem({ data, onEdit }) {
    const maxImagesToShow = 3;
    const extraImages = data?.review_image?.length - maxImagesToShow;
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Image source={{ uri: data?.image }} style={styles.productImage} />
                <View style={styles.reviewContent}>
                    <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">{data?.product_name || 'aaa'}</Text>
                    {/* Đánh giá sao */}
                    <View style={styles.ratingContainer}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <MaterialIcons
                                key={index}
                                name={index < data?.review_rating ? "star" : "star-border"}
                                size={18}
                                color="#FFB800"
                            />
                        ))}
                    </View>
                    {/* Nội dung đánh giá */}
                    <Text style={styles.reviewDate}>
                        {format(new Date(data?.review_date), "dd-MM-yyyy HH:mm")}
                        {data?.variant_name && ` | Phân loại: ${data?.variant_name}`}
                    </Text>
                    <Text style={styles.reviewText}>{data?.review_content}</Text>
                    {/* Hình ảnh đánh giá */}
                    {
                        data?.review_image?.length > 0 && (
                            <View style={styles.reviewImageContainer}>
                                {data?.review_image?.slice(0, maxImagesToShow).map((img, index) => (
                                    <TouchableOpacity key={index}>
                                        <Image
                                            source={{ uri: img }}
                                            style={styles.reviewImage} // Thêm kiểu cho ảnh
                                        />
                                    </TouchableOpacity>
                                ))}
                                {extraImages > 0 && (
                                    <TouchableOpacity style={styles.reviewImageX}>
                                        <Text style={styles.moreImagesText}>+{extraImages}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )
                    }
                </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.buttonContainer}>
                <Button
                    title="Chỉnh sửa"
                    borderRadius={4}
                    textColor="#241E92"
                    backgroundColor="#fff"
                    borderColor="#E5A5FF"
                    borderWidth={1}
                    onPress={() => onEdit(data)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
        backgroundColor: "#FFF",
        borderRadius: 5,
    },
    contentContainer: {
        gap: 10,
        flexDirection: 'row'
    },
    productImage: {
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 5,
        width: 80,
        // height: '100%',
        // maxHeight:100,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFE1FF',
    },
    reviewContent: {
        flex: 1,
        gap: 5
    },
    productName: {
        fontSize: 16,
        color: '#3B394A',
        lineHeight: 21,
        flexShrink: 1, // Allow text to shrink if necessary
        overflow: 'hidden', // Hide overflowed text
    },
    ratingContainer: {
        flexDirection: 'row',
        // marginBottom: 3,
    },
    reviewText: {
        fontSize: 12,
        color: '#241E92',
        // marginBottom: 3,
    },
    reviewDate: {
        fontSize: 10,
        color: '#3B394A',
    },
    reviewImageContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    reviewImage: {
        width: 60,
        height: 45,
        resizeMode: 'cover',
        borderRadius: 8,
        borderWidth: 0.7,
        borderColor: '#FFE1FF',
    },
    reviewImageX: {
        width: 60,
        height: 45,
        borderRadius: 8,
        backgroundColor: 'rgba(36, 30, 146, 0.20)',
        justifyContent: 'center'
    },
    moreImagesText: {
        textAlign: 'center',
        color: '#3B394A'
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E5E5",
        marginVertical: 10,
    },
    buttonContainer: {
        alignItems: "flex-end",
    },
});
