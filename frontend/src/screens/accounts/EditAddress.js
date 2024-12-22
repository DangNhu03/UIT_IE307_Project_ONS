import React, { useState, useEffect } from "react";
import {
    View,
    Alert,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import Input from "@components/Input";
import ArrowBack from "@components/ArrowBack";
import Button from "@components/Button";
import { API_URL } from "../../../../url";

export default function EditAddress({ navigation, route }) {
    const address = route.params.addressData;
    const user_id = route.params.user_id;
    console.log('dia chi edit ne:', route.params);

    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;

    const [errors, setErrors] = useState({});
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editedAddress, setEditedAddress] = useState({
        loca_address_province: address?.loca_address_province,
        loca_address_district: address?.loca_address_district,
        loca_address_commue: address?.loca_address_commue,
        loca_address_detail: address?.loca_address_detail,
        loca_phone: address?.loca_phone,
        loca_per_name: address?.loca_per_name,
        is_default: address?.is_default,
    });

    // Load data on first render
    useEffect(() => {
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (address?.loca_address_province) {
            fetchDistrictsByName(address.loca_address_province);
        }
    }, [provinces]);

    useEffect(() => {
        if (address?.loca_address_district) {
            fetchCommunesByName(address.loca_address_district);
        }
    }, [districts]);

    // Fetch Provinces
    const fetchProvinces = async () => {
        try {
            const response = await axios.get("https://provinces.open-api.vn/api/p/");
            setProvinces(response.data || []);
        } catch (error) {
            console.error("Lỗi khi tải tỉnh:", error);
        }
    };

    // Fetch Districts based on Province
    const fetchDistricts = async (provinceCode) => {
        try {
            const response = await axios.get(
                `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
            );
            setDistricts(response.data.districts || []);
        } catch (error) {
            console.error("Lỗi khi tải quận/huyện:", error);
        }
    };

    // Fetch Districts by Province Name
    const fetchDistrictsByName = async (provinceName) => {
        const selectedProvince = provinces.find(
            (province) => province.name === provinceName
        );
        if (selectedProvince) await fetchDistricts(selectedProvince.code);
    };

    // Fetch Communes based on District
    const fetchCommunes = async (districtCode) => {
        try {
            const response = await axios.get(
                `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
            );
            setCommunes(response.data.wards || []);
        } catch (error) {
            console.error("Lỗi khi tải phường/xã:", error);
        }
    };

    // Fetch Communes by District Name
    const fetchCommunesByName = async (districtName) => {
        const selectedDistrict = districts.find(
            (district) => district.name === districtName
        );
        if (selectedDistrict) await fetchCommunes(selectedDistrict.code);
    };

    // Validate phone number
    const validateInputs = () => {
        const newErrors = {};
        if (!phoneRegex.test(editedAddress.loca_phone)) {
            newErrors.loca_phone = "Số điện thoại không hợp lệ.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle update of the address
    const handleUpdateAddress = async () => {
        if (!validateInputs()) return;

        // Kiểm tra xem có sự thay đổi gì không
        const isChanged =
            editedAddress.loca_address_detail !== address.loca_address_detail ||
            editedAddress.loca_address_commue !== address.loca_address_commue ||
            editedAddress.loca_address_district !== address.loca_address_district ||
            editedAddress.loca_address_province !== address.loca_address_province ||
            editedAddress.loca_phone !== address.loca_phone ||
            editedAddress.loca_per_name !== address.loca_per_name;

        if (!isChanged) {
            Alert.alert("Không có thay đổi", "Địa chỉ không có sự thay đổi nào.");
            navigation.goBack();
            return
        }

        const fullAddress = [
            editedAddress.loca_address_detail,
            editedAddress.loca_address_commue,
            editedAddress.loca_address_district,
            editedAddress.loca_address_province,
        ]
            .filter(Boolean)
            .join(", ");

        const updatedAddress = {
            ...editedAddress,
            loca_address: fullAddress,
        };

        setLoading(true);
        try {
            await axios.put(
                `${API_URL}/accounts/locations/edit-address/${user_id}/${address._id}`,
                updatedAddress
            );
            Alert.alert("Thành công", "Địa chỉ đã được cập nhật.");
            navigation.goBack();
            if (route.params?.refreshData) {
                route.params.refreshData();
            }
        } catch (error) {
            console.error("Có lỗi xảy ra khi cập nhật địa chỉ:", error);
            Alert.alert("Lỗi", "Không thể cập nhật địa chỉ. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ArrowBack title="Chỉnh sửa địa chỉ" />
            <View style={styles.formContainer}>
                <Input
                    placeholder="Tên người nhận"
                    value={editedAddress.loca_per_name}
                    onChangeText={(text) =>
                        setEditedAddress({ ...editedAddress, loca_per_name: text })
                    }
                    style={styles.input}
                    errorMessage={errors.loca_per_name}
                />

                <Input
                    placeholder="Số điện thoại"
                    value={editedAddress.loca_phone}
                    onChangeText={(text) =>
                        setEditedAddress({ ...editedAddress, loca_phone: text })
                    }
                    style={styles.input}
                    keyboardType="phone-pad"
                    errorMessage={errors.loca_phone}
                />

                <View style={styles.inputAddress}>
                    {provinces.length === 0 ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                        <Picker
                            selectedValue={editedAddress.loca_address_province}
                            onValueChange={(value) => {
                                const selectedProvince = provinces.find(
                                    (province) => province.name === value
                                );
                                setEditedAddress({
                                    ...editedAddress,
                                    loca_address_province: selectedProvince.name,
                                });
                                setDistricts([]);
                                setCommunes([]);
                                fetchDistricts(selectedProvince.code);
                            }}
                            style={styles.picker}
                        >
                            <Picker.Item label="Tỉnh/Thành phố" value="" />
                            {provinces.map((province) => (
                                <Picker.Item
                                    key={province.code}
                                    label={province.name}
                                    value={province.name}
                                />
                            ))}
                        </Picker>
                    )}
                </View>

                <View style={styles.inputAddress}>
                    {districts.length === 0 ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                        <Picker
                            selectedValue={editedAddress.loca_address_district}
                            onValueChange={(value) => {
                                const selectedDistrict = districts.find(
                                    (district) => district.name === value
                                );
                                setEditedAddress({
                                    ...editedAddress,
                                    loca_address_district: selectedDistrict.name,
                                });
                                setCommunes([]);
                                fetchCommunes(selectedDistrict.code);
                            }}
                            style={styles.picker}
                        >
                            <Picker.Item label="Quận/Huyện" value="" />
                            {districts.map((district) => (
                                <Picker.Item
                                    key={district.code}
                                    label={district.name}
                                    value={district.name}
                                />
                            ))}
                        </Picker>
                    )}
                </View>

                <View style={styles.inputAddress}>
                    {communes.length === 0 ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                        <Picker
                            selectedValue={editedAddress.loca_address_commue}
                            onValueChange={(value) =>
                                setEditedAddress({ ...editedAddress, loca_address_commue: value })
                            }
                            style={styles.picker}
                        >
                            <Picker.Item label="Phường/Xã" value="" />
                            {communes.map((commune) => (
                                <Picker.Item
                                    key={commune.code}
                                    label={commune.name}
                                    value={commune.name}
                                />
                            ))}
                        </Picker>
                    )}
                </View>

                <Input
                    placeholder="Địa chỉ cụ thể"
                    value={editedAddress.loca_address_detail}
                    onChangeText={(text) =>
                        setEditedAddress({ ...editedAddress, loca_address_detail: text })
                    }
                    style={styles.input}
                    errorMessage={errors.loca_address_detail}
                />

                <Button title="Cập nhật địa chỉ" onPress={handleUpdateAddress} />
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
        paddingHorizontal: 40,
    },
    input: {
        fontSize: 16,
    },
    inputAddress: {
        borderRadius: 8,
        backgroundColor: "#FFF",
        height: 42,
        justifyContent: "center",
        marginBottom: 10,
    },
    picker: {
        fontSize: 16,
    },
});
