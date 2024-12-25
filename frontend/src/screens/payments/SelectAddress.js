import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAuthContext } from "@contexts/AuthContext";
import AddressItem from '@components/AddressItem';
import axios from 'axios';
import { API_URL } from "../../../../url";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function SelectAddress({ route }) {
  const { user } = useAuthContext();
  const user_id = user && user[0]?._id;
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchAddresses = () => {
    axios
      .get(`${API_URL}/accounts/locations/${user_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Addresses fetched from API: ', response.data);
        setAddresses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching addresses:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleConfirmSelection = () => {
    if (selectedAddress) {
      // Pass the selected address back to the parent screen
      route.params?.onSelect(selectedAddress);
      navigation.goBack();
    } else {
      alert('Please select an address');
    }
  };

  const toggleSelection = (address) => {
    if (selectedAddress?._id === address._id) {
      setSelectedAddress(null);  // Deselect if already selected
    } else {
      setSelectedAddress(address);  // Select the new address
    }
  };

  const handleEditAddress = (address) => {
    navigation.navigate('EditAddress', {
      addressData: address,
      user_id: user_id,
      refreshData: fetchAddresses,  // Refresh addresses after editing
    });
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
              {addresses.length === 0 ? (
                <View style={styles.noAddressContainer}>
                  <Text style={styles.noAddress}>No addresses available!</Text>
                </View>
              ) : (
                addresses.map((address, index) => (
                  <View key={index} style={styles.addressItemContainer}>
                    {/* Checkbox to select/deselect address */}
                    <TouchableOpacity
                      style={styles.circle}
                      onPress={() => toggleSelection(address)}
                    >
                      <MaterialIcons
                        name={selectedAddress?._id === address._id ? "check-box" : "check-box-outline-blank"}
                        size={24}
                        color="#241E92"
                      />
                    </TouchableOpacity>

                    {/* Address item */}
                    <AddressItem
                      data={address}
                      onSelect={() => handleSelectAddress(address)}
                      isSelected={selectedAddress?._id === address._id}
                    />

                    {/* Edit and Set Default buttons */}
                    <TouchableOpacity onPress={() => handleEditAddress(address)}>
                      <Text style={styles.linkText}>Edit</Text>
                    </TouchableOpacity>

                    {!address.is_default && (
                      <TouchableOpacity onPress={() => handleSetDefault(address._id)}>
                        <Text style={styles.linkText}>Set as Default</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))
              )}
            </ScrollView>
          )
        }
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        activeOpacity={0.7}
        onPress={handleConfirmSelection}
      >
        <Text style={styles.confirmText}>Confirm Selection</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  addressesContainer: {
    flexGrow: 1,
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
  },
  noAddressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  noAddress: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#241E92',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 18,
    color: 'white',
  },
  addressItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  circle: {
    marginRight: 10, // Space between checkbox and the address item
  },
  linkText: {
    fontSize: 16,
    color: '#241E92',
    marginTop: 10,
  },
});
