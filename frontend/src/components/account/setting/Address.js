import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import ArrowBack from "@components/ArrowBack";
import { useAuthContext } from "@contexts/AuthContext";
import AddressItem from '@components/AddressItem';
import axios from 'axios';
import { API_URL } from "../../../../../url";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Address() {
  const { user } = useAuthContext();
  const user_id = user && user[0]?._id;
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState({ loca_address: '', loca_phone: '', loca_per_name: '' });

  const fetchAddresses = () => {
    axios
      .get(`${API_URL}/accounts/locations/${user_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Ket qua addresses tra ve tu API: ', response.data)
        setAddresses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`${API_URL}/locations/${user_id}`);
        console.error('Có lỗi xảy ra:', error);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchAddresses()
  }, []);

  const handleSetDefault = (addressId) => {
    axios
      .put(`${API_URL}/accounts/locations/set-default/${user_id}`, {
        address_id: addressId,
      })
      .then((response) => {
        console.log("Cập nhật địa chỉ mặc định thành công:", response.data);
        // Cập nhật lại danh sách địa chỉ sau khi thay đổi địa chỉ mặc định
        setAddresses((prevAddresses) =>
          prevAddresses.map((address) =>
            address._id === addressId
              ? { ...address, is_default: true }
              : { ...address, is_default: false }
          )
        );
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi cập nhật địa chỉ mặc định:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {
          loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <ScrollView
              contentContainerStyle={styles.addressesContainer}
              showsVerticalScrollIndicator={false}
            >
              {addresses.map((address, index) => (
                <View key={index}>
                  <AddressItem
                    data={address}
                    onSetDefault={handleSetDefault} />
                </View>
              ))}
            </ScrollView>
          )
        }
      </View>
      <TouchableOpacity
        style={styles.addContainer}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AddAddress', {
          user_id: user_id,
          refreshData: fetchAddresses // Gọi lại fetchAddresses khi quay lại
        })} // Truyền user_id
      >
        <AntDesign name='pluscircleo' size={24} color='#241E92' />
        <Text style={styles.addText}>Thêm địa chỉ</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent:'center'
  },
  addressesContainer: {
    flexGrow: 1, // Để các phần tử bên trong phát triển linh hoạt
    gap: 10, // Khoảng cách giữa các mục
    alignItems: 'center', // Canh giữa nội dung theo chiều ngang
    paddingHorizontal: 10, // Thêm khoảng cách hai bên
    paddingBottom:10
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'white',
    paddingVertical: 20,
    width: '100%',
    justifyContent:'center'
  },
  addText: {
    fontSize: 16,
    color: '#241E92'
  },
  content: {
    flex: 1,
  },
});