import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
import { API_URL } from '../../../../url';
import Input from '@components/Input';
import ArrowBack from '@components/ArrowBack';
import Button from '@components/Button'

export default function AddAddress({ navigation, route }) {
    const { user_id } = route.params; // ID của người dùng được truyền qua route
    const phoneRegex = /^[0-9]{10,11}$/;

    const [newAddress, setNewAddress] = useState({
        loca_address: '',
        loca_address_province: '',
        loca_address_district: '',
        loca_address_commue: '',
        loca_address_detail: '',
        loca_phone: '',
        loca_per_name: '',
        is_default: false, // Đặt mặc định là false
    });
    const [errors, setErrors] = useState({});
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProvinces();
    }, []);

    const fetchProvinces = async () => {
        try {
            const response = await axios.get('https://provinces.open-api.vn/api/p/');
            setProvinces(response.data || []);
        } catch (error) {
            console.error('Lỗi khi tải tỉnh:', error);
        }
    };

    const fetchDistricts = async (provinceCode) => {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
            setDistricts(response.data.districts || []);
        } catch (error) {
            console.error('Lỗi khi tải quận/huyện:', error);
        }
    };

    const fetchCommunes = async (districtCode) => {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            setCommunes(response.data.wards || []);
        } catch (error) {
            console.error('Lỗi khi tải phường/xã:', error);
        }
    };
    const validateInputs = () => {
        const newErrors = {};
        // if (!newAddress.loca_per_name) {
        //     newErrors.loca_per_name = "Tên người nhận không được để trống.";
        // }

        // if (!newAddress.loca_phone) {
        //     newErrors.loca_phone = "Số điện thoại không được để trống.";
        // } else if 
        if (!phoneRegex.test(newAddress.loca_phone)) {
            newErrors.loca_phone = "Số điện thoại phải có từ 10 đến 11 số.";
        }

        // if (!newAddress.loca_address_province) {
        //     newErrors.loca_address_province = "Vui lòng chọn Tỉnh/Thành phố.";
        // }

        // if (!newAddress.loca_address_district) {
        //     newErrors.loca_address_district = "Vui lòng chọn Quận/Huyện.";
        // }

        // if (!newAddress.loca_address_commue) {
        //     newErrors.loca_address_commue = "Vui lòng chọn Phường/Xã.";
        // }

        // if (!newAddress.loca_address_detail) {
        //     newErrors.loca_address_detail = "Địa chỉ cụ thể không được để trống.";
        // }

        setErrors(newErrors);

        // Nếu không có lỗi, trả về true, ngược lại trả về false
        return Object.keys(newErrors).length === 0;
    };

    const handleAddAddress = async () => {
        if (!validateInputs()) return; // Kiểm tra tính hợp lệ của dữ liệu đầu vào

        if (
            !newAddress.loca_address_province ||
            !newAddress.loca_address_district ||
            !newAddress.loca_address_commue ||
            !newAddress.loca_phone ||
            !newAddress.loca_per_name
        ) {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin bắt buộc.');
            return;
        }
        // Cập nhật loca_address bằng cách kết hợp các giá trị địa chỉ
        const fullAddress = [
            newAddress?.loca_address_detail,
            newAddress?.loca_address_commue,
            newAddress?.loca_address_district,
            newAddress?.loca_address_province
        ].filter(Boolean).join(', ');

        // Cập nhật địa chỉ vào đối tượng newAddress
        const updatedAddress = {
            ...newAddress,
            loca_address: fullAddress, // Thêm địa chỉ đầy đủ vào đây
        };
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/accounts/locations/${user_id}`, updatedAddress);
            Alert.alert('Thành công', 'Địa chỉ đã được thêm.');
            navigation.goBack(); // Quay lại màn hình trước
            // Nếu có hàm refreshData, gọi lại để tải lại dữ liệu
            if (route.params?.refreshData) {
                route.params.refreshData(); // Tải lại dữ liệu từ màn hình trước
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm địa chỉ:', error);
            Alert.alert('Lỗi', 'Không thể thêm địa chỉ. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };
   
    return (
        <View style={styles.container}>
            <ArrowBack title='Thêm địa chỉ' />
            <View style={styles.formContainer}>
                <Input
                    placeholder="Tên người nhận"
                    value={newAddress.loca_per_name}
                    onChangeText={(text) => setNewAddress({ ...newAddress, loca_per_name: text })}
                    style={styles.input}
                    errorMessage={errors.loca_per_name}
                />

                <Input
                    placeholder="Số điện thoại"
                    value={newAddress.loca_phone}
                    onChangeText={(text) => setNewAddress({ ...newAddress, loca_phone: text })}
                    style={styles.input}
                    keyboardType="phone-pad"
                    errorMessage={errors.loca_phone}
                />

                {/* Dropdown Tỉnh/Thành phố */}
                <View style={styles.inputAddress}>
                    <Picker
                        selectedValue={newAddress.loca_address_province}
                        onValueChange={(value) => {
                            const selectedProvince = provinces.find((province) => province.name === value);
                            setNewAddress({
                                ...newAddress,
                                loca_address_province: selectedProvince.name,
                            });
                            setDistricts([]);
                            setCommunes([]);
                            fetchDistricts(selectedProvince.code);
                        }}
                        style={[
                            styles.picker,
                            { color: newAddress.loca_address_province ? '#000' : '#CFCED6' }, // Đổi màu dựa trên giá trị
                        ]}
                    >
                        <Picker.Item label="Tỉnh/Thành phố" value="" />
                        {provinces.map((province) => (
                            <Picker.Item key={province.code} label={province.name} value={province.name} />
                        ))}
                    </Picker>
                </View>

                {/* Dropdown Quận/Huyện */}
                <View style={styles.inputAddress}>
                    <Picker
                        selectedValue={newAddress.loca_address_district}
                        onValueChange={(value) => {
                            const selectedDistrict = districts.find((district) => district.name === value);
                            setNewAddress({
                                ...newAddress,
                                loca_address_district: selectedDistrict.name,
                            });
                            setCommunes([]);
                            fetchCommunes(selectedDistrict.code);
                        }}
                        style={[
                            styles.picker,
                            { color: newAddress.loca_address_district ? '#000' : '#CFCED6' }, // Đổi màu dựa trên giá trị
                        ]}
                    >
                        <Picker.Item label="Quận/Huyện" value="" style={styles.pickerItem} />
                        {districts.map((district) => (
                            <Picker.Item key={district.code} label={district.name} value={district.name} />
                        ))}
                    </Picker>
                </View>

                {/* Dropdown Phường/Xã */}
                <View style={styles.inputAddress}>
                    <Picker
                        selectedValue={newAddress.loca_address_commue}
                        onValueChange={(value) => setNewAddress({ ...newAddress, loca_address_commue: value })}
                        style={[
                            styles.picker,
                            { color: newAddress.loca_address_commue ? '#000' : '#CFCED6' }, // Đổi màu dựa trên giá trị
                        ]}
                    >
                        <Picker.Item label="Phường/Xã" value="" />
                        {communes.map((commune) => (
                            <Picker.Item key={commune.code} label={commune.name} value={commune.name} />
                        ))}
                    </Picker>
                </View>

                <Input
                    placeholder="Địa chỉ cụ thể"
                    value={newAddress.loca_address_detail}
                    onChangeText={(text) => setNewAddress({ ...newAddress, loca_address_detail: text })}
                    style={styles.input}
                    errorMessage={errors.loca_address_detail}
                />

                {/* <TouchableOpacity style={styles.button} onPress={handleAddAddress} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Thêm Địa Chỉ</Text>
                )}
            </TouchableOpacity> */}
                <Button title="Thêm địa chỉ" onPress={handleAddAddress} />
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
        paddingHorizontal: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        fontSize: 16
    },
    inputAddress: {
        borderRadius: 8,
        backgroundColor: '#FFF',
        height: 42,
        justifyContent: 'center',
        marginBottom: 10
    },
    picker: {
        fontSize: 16,
        // paddingVertical: 10, // Thêm khoảng cách bên trong
        // borderWidth: 1,
        // borderColor: '#ccc',
        // borderRadius: 8,
    },
    // label: {
    //     fontSize: 14,
    //     color: '#555',
    //     marginBottom: 5,
    // },
    button: {
        backgroundColor: '#241E92',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pickerItem: {
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        marginBottom: 15,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        marginBottom: 15,
    },
});
