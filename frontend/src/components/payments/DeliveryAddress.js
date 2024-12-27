import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useAuthContext } from "@contexts/AuthContext";
import { API_URL } from "../../../../url";
import { useNavigation } from "@react-navigation/native";
import { getAddressNoUser } from "@hooks/useOrderNoUser";
import { updateCartWithOrderList } from "@hooks/useOrderNoUser";
import { useFocusEffect } from "@react-navigation/native";
export default function DeliveryAddress({ onAddressFetched }) {
  const { user } = useAuthContext();
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const user_id =
    user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;
  const navigation = useNavigation();
  const fetchDeliveryAddressNoUser = async () => {
    const addressList = await getAddressNoUser();
    console.log("no login", addressList);
    setDeliveryAddress(addressList);
    if (onAddressFetched) {
      onAddressFetched(addressList);
    }
  };
  const fetchDeliveryAddress = async () => {
    try {
      if (!user_id) {
        fetchDeliveryAddressNoUser();
      }
      const response = await fetch(
        `${API_URL}/accounts/locations/default/${user_id}`
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log("Fetched data cua delivery address: ", data);
        setDeliveryAddress(data);
        if (onAddressFetched) {
          onAddressFetched(data);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching delivery address:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDeliveryAddress();
  }, [user_id]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#241E92" />
      </View>
    );
  }
  const handleNavigateToAddAddress = () => {
    if (!user_id) {
      navigation.navigate("AddAddress", {
        user_id: "no_user",
        refreshData: fetchDeliveryAddress,
      });
    } else {
      navigation.navigate("AddAddress", {
        user_id: user_id,
        refreshData: fetchDeliveryAddress,
      });
    }
  };
  console.log("deliveryAddress", deliveryAddress);

  const handleNavigateToSelectAddress = () => {
    if (!user_id) {
      console.log("hohi");
      navigation.navigate("EditAddress", {
        addressData: deliveryAddress,
        refreshData: fetchDeliveryAddress,
      });
    } else {
      navigation.navigate("SelectAddress", {
        onAddressSelected: (address) => {
          console.log("Address selected and returned:", address);
          setDeliveryAddress(address);
          if (onAddressFetched) {
            onAddressFetched(address);
          }
        },
      });
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <MaterialCommunityIcons
          name="map-marker-radius-outline"
          size={24}
          color="#241E92"
        />
      </View>
      {deliveryAddress ? (
        <View style={styles.centerContainer}>
          <View style={styles.inforAddressContainer}>
            <Text style={styles.titleText}>Địa chỉ nhận hàng</Text>
            <TouchableOpacity onPress={handleNavigateToSelectAddress}>
              <Text style={styles.linkText}>Sửa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.address}>
            <View style={styles.inforUser}>
              <Text style={styles.addressText}>
                {deliveryAddress.loca_per_name}
              </Text>
              <View style={styles.line}></View>
              <Text style={styles.addressText}>
                {deliveryAddress.loca_phone}
              </Text>
            </View>
            <Text style={styles.addressText}>
              {deliveryAddress.loca_address}
            </Text>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.centerContainer}>
            <Text style={styles.titleText}>Địa chỉ nhận hàng</Text>
            <TouchableOpacity onPress={handleNavigateToAddAddress}>
              <Text style={styles.titleTextCenter}>
                + Thêm địa chỉ nhận hàng
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* <View style={styles.rightContainer}>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#241E92" />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
  },
  centerContainer: {
    flex: 1,
    marginHorizontal: 10,
    gap: 10,
  },
  inforAddressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkText: {
    fontSize: 16,
    color: "#FF71CD",
  },
  titleText: {
    fontSize: 16,
    color: "#241E92",
    flex: 1,
  },
  address: {
    flexDirection: "column",
  },
  inforUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  addressText: {
    fontSize: 14,
  },
  line: {
    height: 14,
    width: 1,
    backgroundColor: "#241E92",
  },
  rightContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  titleTextCenter: {
    fontSize: 16,
    color: "#241E92",
    textAlign: "center",
  },
});
