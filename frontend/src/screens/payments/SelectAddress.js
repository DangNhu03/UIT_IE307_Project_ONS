import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "@contexts/AuthContext";
import ArrowBack from "@components/ArrowBack";
import AddressItem from "@components/AddressItem";
import axios from "axios";
import { API_URL } from "../../../../url";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function SelectAddress({ route, onSelectAddress }) {
  const { user } = useAuthContext();
  const user_id = user && user[0]?._id;
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Fetch addresses from the API
  const fetchAddresses = () => {
    axios
      .get(`${API_URL}/accounts/locations/${user_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Addresses fetched from API: ", response.data);
        setAddresses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching addresses:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Toggle address selection
  const toggleSelection = (address) => {
    setSelectedAddress(address);
    console.log("Selected address:", address);

    navigation.goBack();
    route.params?.onAddressSelected?.(address);
  };

  const handleSetDefault = (addressId) => {
    axios
      .put(`${API_URL}/accounts/locations/set-default/${user_id}`, {
        address_id: addressId,
      })
      .then((response) => {
        console.log("Address set as default:", response.data);
        setAddresses((prevAddresses) =>
          prevAddresses.map((address) =>
            address._id === addressId
              ? { ...address, is_default: true }
              : { ...address, is_default: false }
          )
        );
      })
      .catch((error) => {
        console.error("Error setting address as default:", error);
      });
  };

  const handleEditAddress = (address) => {
    navigation.navigate("EditAddress", {
      addressData: address,
      user_id: user_id,
      refreshData: fetchAddresses,
    });
  };

  const handleDeleteAddress = (addressId) => {
    axios
      .delete(`${API_URL}/accounts/locations/${user_id}/${addressId}`)
      .then(() => {
        console.log("Address deleted successfully");
        fetchAddresses();
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  return (
    <View style={styles.container}>
      <ArrowBack title="Chọn địa chỉ nhận hàng" />
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <ScrollView style={styles.listAddressContainer}>
            {addresses.map((address) => (
              <View key={address._id} style={styles.addressItemWrapper}>
                <AddressItem
                  data={address}
                  onSetDefault={() => handleSetDefault(address._id)}
                  onEdit={() => handleEditAddress(address)}
                  onDelete={() => handleDeleteAddress(address._id)}
                  showCheckbox={true}
                  isSelected={selectedAddress?._id === address._id}
                  onSelect={() => toggleSelection(address)}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <TouchableOpacity
        style={styles.addContainer}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("AddAddress", {
            user_id: user_id,
            refreshData: fetchAddresses, // Gọi lại fetchAddresses khi quay lại
          })
        }
      >
        <AntDesign name="pluscircleo" size={24} color="#241E92" />
        <Text style={styles.addText}>Thêm địa chỉ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241e92",
    paddingTop: 40,
  },
  contentContainer: {
    padding: 10,
    flex: 1,
  },
  listAddressContainer: {
    flex: 1,
    paddingBottom: 20,
  },

  addressItemWrapper: {
    marginBottom: 10,
  },
  addContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "white",
    paddingVertical: 20,
    width: "100%",
    justifyContent: "center",
  },
  addText: {
    fontSize: 16,
    color: "#241E92",
  },
});
