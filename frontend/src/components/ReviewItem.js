import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { format } from "date-fns";

const ReviewItem = ({ data }) => {
    const maxImagesToShow = 3;
    const extraImages = data.revi_img?.length - maxImagesToShow;
    return (
        <View style={styles.reviewContainer}>
            {/* Avatar và thông tin người dùng */}
            <Image source={{ uri: data.user_id.user_avatar }} style={styles.avatar} />
            <View style={styles.reviewContent}>
                <Text style={styles.reviewerName}>{data.user_id.user_name}</Text>
                {/* Đánh giá sao */}
                <View style={styles.ratingContainer}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <MaterialIcons
                            key={index}
                            name={index < data.revi_rating ? "star" : "star-border"}
                            size={18}
                            color="#FFB800"
                        />
                    ))}
                </View>
                {/* Nội dung đánh giá */}
                <Text style={styles.reviewDate}>
                    {format(new Date(data.created_at), "dd-MM-yyyy HH:mm")}
                    {data.prod_variant_name && ` | Phân loại: ${data.prod_variant_name}`}
                </Text>
                <Text style={styles.reviewText}>{data.revi_content}</Text>
                {/* Hình ảnh đánh giá */}
                {
                    data.revi_img?.length > 0 && (
                        <View style={styles.reviewImageContainer}>
                            {data.revi_img?.slice(0, maxImagesToShow).map((img, index) => (
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
    );
};

const styles = StyleSheet.create({
    reviewContainer: {
        flexDirection: 'row',
        // marginVertical: 10,
        // paddingHorizontal: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    reviewContent: {
        flex: 1,
        gap:5
    },
    reviewerName: {
        fontWeight: 'bold',
        fontSize: 14,
        // marginBottom: 3,
        color: '#241E92',
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
        borderColor: '#FF71CD',
    },
    reviewImageX: {
        width: 60,
        height: 45,
        borderRadius: 8,
        backgroundColor: 'rgba(36, 30, 146, 0.20)',
        justifyContent: 'center'
    },
    moreImagesText:{
        textAlign:'center'
    }

});

export default ReviewItem;
