import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from "react-native";
import { format } from "date-fns";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import ArrowBack from "@components/ArrowBack"
import Button from "@components/Button"
import { Rating } from 'react-native-ratings'; // Thêm import
import * as ImagePicker from 'expo-image-picker'; // Expo image picker
import { API_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, UPLOAD_PRESET_NAME } from "../../../url";
import axios from "axios";

export default function Review({ navigation, route }) {
    const [rating, setRating] = useState(0); // Trạng thái cho rating
    const [textReview, setTextReview] = useState("")
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const handleRating = (newRating) => {
        setRating(newRating);
        console.log("Đánh giá sao:", newRating);
    };

    //   // Get the functions passed via navigation options
    //   const refreshData = navigation.getParam('refreshData', {});

    //   // Use the functions here
    //   const handleRefresh = () => {
    //     refreshData.fetchNotReviewed();
    //     refreshData.fetchReviewed();
    //   };

    const chooseImage = async () => {
        // Kiểm tra nếu đã có 5 hình ảnh, không cho phép chọn thêm
        if (image.length >= 5) {
            Alert.alert("Thông báo", "Bạn chỉ có thể chọn tối đa 5 hình ảnh/video.");
            return;
        }

        // Yêu cầu chọn hình ảnh
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images','videos'],
            allowsEditing: true,
            quality: 1,
            selectionLimit: 5 - image.length,
        });

        console.log(result);

        if (!result.canceled) {
            // Cập nhật mảng hình ảnh đã chọn vào trạng thái
            setImage(prevImages => [...prevImages, ...result.assets]);
        }
    };
    const removeImage = (index) => {
        setImage(prevImages => prevImages.filter((_, i) => i !== index));
        setSelectedImageIndex(null); // Reset tapped image index after removal
    };

    const uploadImage = async (file) => {
        const data = new FormData();
        data.append("file", {
            uri: file.uri,
            type: file.type === "video" ? "video/mp4" : "image/jpeg",
            name: `upload.${file.type === "video" ? "mp4" : "jpg"}`,
        });
        data.append("upload_preset", UPLOAD_PRESET_NAME);
    
        const url = file.type === "video"
            ? `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`
            : `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    
        try {
            const response = await fetch(url, {
                method: "POST",
                body: data,
            });
    
            if (!response.ok) {
                throw new Error("Upload failed");
            }
    
            const result = await response.json();
            console.log("Upload thành công:", result.secure_url);
            return result.secure_url;
        } catch (error) {
            console.error("Lỗi khi upload:", error);
            throw error;
        }
    };
    
    const openCamera = async () => {
        if (image.length >= 5) {
            Alert.alert("Thông báo", "Bạn chỉ có thể chọn tối đa 5 hình ảnh/video.");
            return;
        }

        // Yêu cầu quyền truy cập camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Thông báo", "Bạn cần cấp quyền truy cập camera để sử dụng tính năng này.");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            result.assets.forEach((asset) => {
                if (asset.type === 'video') {
                    console.log('Video path:', asset.uri);
                } else if (asset.type === 'image') {
                    console.log('Image path:', asset.uri);
                }
            });
        
            // Thêm vào state
            setImage(prevImages => [...prevImages, ...result.assets]);
        }
    };

    const handleSubmit = async () => {
        if (!rating) {
            Alert.alert("Thông báo", "Vui lòng đánh giá số sao cho sản phẩm.");
            return;
        }
        try {
            setLoading(true);
            // Upload từng hình ảnh và lấy các link HTTPS
            const uploadedImages = await Promise.all(image.map((img) => uploadImage(img.uri)));

            // Tạo dữ liệu review
            const reviewData = {
                order_id: route.params.data?.order_id,
                user_id: route.params.data?.user_id,
                prod_id: route.params.data?.product_id,
                prod_variant_name: route.params.data?.variant_name || null,
                revi_rating: rating,
                revi_content: textReview,
                revi_img: uploadedImages, // Mảng các link HTTPS của hình ảnh
            };
            console.log('reviewData ne: ', reviewData)
            // Gửi dữ liệu review lên server
            const response = await axios.post(`${API_URL}/api/review`, reviewData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                Alert.alert("Thành công", "Đánh giá của bạn đã được gửi!");
                navigation.goBack();
                if (route.params?.refreshData) {
                    route.params.refreshData.fetchNotReviewed();
                    route.params.refreshData.fetchReviewed();
                }
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
            Alert.alert("Lỗi", "Không thể gửi đánh giá. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <ArrowBack title="Đánh giá sản phẩm" />
            <View style={styles.formContainer}>
                <View style={styles.formContent}>
                    <View style={styles.productInfo}>
                        <Image source={{ uri: route.params.data?.image }} style={styles.productImage} />
                        <View style={styles.productContent}>
                            <Text style={styles.productName} numberOfLines={2}>{route.params.data?.prod_name || 'aaa'} </Text>
                            {route.params.data?.variant_name && (
                                <View style={styles.productVariantWrapper}>
                                    <Text style={styles.productVariant}>{route.params.data?.variant_name || 'aaa'}</Text>
                                </View>)}
                        </View>
                    </View>
                    <View style={styles.reviewRating}>
                        <Text style={styles.textRating}>Đánh giá sản phẩm</Text>
                        {/* Hiển thị sao đánh giá */}
                        <Rating
                            // showRating
                            startingValue={rating}
                            onFinishRating={handleRating}
                            imageSize={20}
                            style={styles.rating}
                        />
                    </View>
                    <View style={styles.reviewContent}>
                        <Text style={styles.textReview}>Viết đánh giá:</Text>
                        <TextInput
                            placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé!"
                            style={styles.input}
                            value={textReview}
                            onChangeText={(text) => setTextReview(text)}
                            // onSubmitEditing={handleSearch}
                            multiline={true} // Cho phép nhập nhiều dòng
                            numberOfLines={6} // Số dòng hiển thị mặc định
                            textAlignVertical="top" // Căn chỉnh văn bản ở đầu
                        />
                    </View>
                    <View style={styles.reviewImg}>
                        <Text style={styles.textReview}>Thêm tối đa 5 hình ảnh/video:</Text>
                        <View style={styles.imgContatiner}>
                            {image.length > 0 && image.map((img, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.imageWrapper}
                                    onPress={() => setSelectedImageIndex(index)} // Set tapped image index
                                >
                                    <Image source={{ uri: img.uri }} style={styles.selectedImage} />

                                    {/* Show delete icon only if this image is tapped */}
                                    {selectedImageIndex === index && (
                                        <TouchableOpacity
                                            onPress={() => removeImage(index)}
                                            style={styles.deleteIcon}
                                        >
                                            <MaterialIcons name="delete" size={20} color="red" />
                                        </TouchableOpacity>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.buttonGroup}>
                            <Button
                                title="Chụp ảnh"
                                onPress={openCamera}
                                icon={<Ionicons name="camera" size={24} color="#E5A5FF" />}
                                backgroundColor="#FFF"
                                textColor="#E5A5FF"
                                borderColor="#E5A5FF"
                                borderWidth={1}
                            />
                            <Button
                                title="Thêm ảnh/video"
                                onPress={chooseImage}
                                icon={<Ionicons name="images" size={24} color="#E5A5FF" />}
                                backgroundColor="#FFF"
                                textColor="#E5A5FF"
                                borderColor="#E5A5FF"
                                borderWidth={1}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.formButton}>
                    <Button title="Gửi đánh giá" onPress={handleSubmit} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#241e92",
        paddingTop: 40,
    },
    formContainer: {
        marginHorizontal: 10,
        backgroundColor: '#FFF',
        paddingBottom: 10,
        gap: 5,
        borderRadius: 10,
        alignItems: 'stretch', // Căn chỉnh phần tử theo chiều ngang của cha
        width: 'fit-content', // Chỉnh sửa chiều rộng theo nội dung
    },
    formContent: {
        gap: 10,
        padding: 10
    },
    productInfo: {
        gap: 10,
        flexDirection: 'row',
    },
    productImage: {
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 5,
        width: 70,
        // height: '100%',
        minHeight: 80,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFE1FF',
    },
    productContent: {
        flex: 1, // Giúp phần nội dung chiếm toàn bộ không gian còn lại
        // alignItems:'center',
        justifyContent: 'center'
    },
    productName: {
        fontSize: 16,
        lineHeight: 21,
        color: '#3B394A',
        flexWrap: 'nowrap', // Không cho phép xuống dòng
        overflow: 'hidden', // Ẩn phần nội dung tràn
        textOverflow: 'ellipsis', // Hiển thị dấu "..."
        whiteSpace: 'nowrap', // Duy trì nội dung trên một dòng
    },
    productVariantWrapper: {
        borderWidth: 1,
        borderColor: '#E5A5FF',
        borderRadius: 4,
        paddingHorizontal: 5,
        alignSelf: 'flex-start',
    },
    productVariant: {
        fontSize: 12,
        color: '#3B394A',
        lineHeight: 21,
        textAlign: 'center', // Căn giữa nội dung trong viền
    },
    reviewRating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textRating: {
        flex: 1,
        lineHeight: 21
    },
    rating: {},
    reviewContent: {

    },
    textReview: {
        lineHeight: 21,
        marginBottom: 5
    },
    input: {
        height: 150,
        borderWidth: 1,
        borderColor: '#E5A5FF',
        borderRadius: 8,
        lineHeight: 21,
        textAlignVertical: 'top', // Đảm bảo rằng placeholder và văn bản nhập sẽ bắt đầu từ đầu
        paddingHorizontal: 10
    },
    reviewImg: {
        marginTop: 10,
    },
    selectedImage: {
        width: 70,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 8,
        borderWidth: 0.7,
        borderColor: '#FFE1FF',
    },
    imgContatiner: {
        flexDirection: 'row',
        marginBottom: 10,
        gap: 5,
    },
    formButton: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        paddingTop: 5,
        alignSelf: 'flex-end'
    },
    imageWrapper: {
        position: 'relative',
    },
    deleteIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slight transparent background
        borderRadius: 20,
        padding: 5,
    },
    selectedImage: {
        width: 70,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 8,
        borderWidth: 0.7,
        borderColor: '#FFE1FF',
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 10, // Khoảng cách giữa các nút,
    },
});
