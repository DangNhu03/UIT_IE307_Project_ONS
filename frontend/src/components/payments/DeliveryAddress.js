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

export default function DeliveryAddress({ onAddressFetched }) {
  const { user } = useAuthContext();
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const user_id =
    user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;

  useEffect(() => {
    const fetchDeliveryAddress = async () => {
      try {
        if (!user_id) {
          setLoading(false);
          return;
        }
        const response = await fetch(
          `${API_URL}/accounts/locations/${user_id}`
        );
        // const response = await fetch(
        //   `${API_URL}/accounts/locations/67613fb9494ae56e693702bf`
        // );
        const data = await response.json();
        console.log("Fetched data cua delivery address: ", data);

        if (data.length > 0) {
          setDeliveryAddress(data[0]);
          if (onAddressFetched) {
            onAddressFetched(data[0]);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching delivery address:", error);
        setLoading(false);
      }
    };

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
          <Text style={styles.titleText}>Địa chỉ nhận hàng</Text>
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
            <TouchableOpacity>
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
  titleText: {
    fontSize: 16,
    color: "#241E92",
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
