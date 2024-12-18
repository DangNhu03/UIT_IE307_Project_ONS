import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { API_URL } from "../../../../url";

const DeliveryMethod = ({ onDeliveryMethodChange }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryMethods = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/deliverymethods`); 
        const data = await response.json();
        // console.log("Fetched data cua delivery method: ", data); 

        if (data.deliveryMethods && Array.isArray(data.deliveryMethods)) {
          setDeliveryMethods(data.deliveryMethods);
        } else {
          console.error("Invalid data format: deliveryMethods is not an array");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching delivery methods:", error);
        setLoading(false);
      }
    };

    fetchDeliveryMethods();
  }, []);

  const handleSelection = (method) => {
    setSelectedMethod(method._id); 
    onDeliveryMethodChange(method); 
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <View>
      <TouchableOpacity onPress={toggleExpand} style={styles.deliveryContainer}>
        <View style={styles.deliveryTitle}>
          <MaterialCommunityIcons
            name="truck-delivery-outline"
            size={24}
            color="#241E92"
          />
          <Text style={styles.title}>Phương thức vận chuyển</Text>
        </View>
        <View style={styles.deliverySelection}>
          <MaterialIcons
            name={isExpanded ? "keyboard-arrow-down" : "keyboard-arrow-right"}
            size={24}
            color="#241E92"
          />
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.insideContainer}>
          {loading ? (
            <Text>Đang tải...</Text>
          ) : (
            deliveryMethods.map((method) => (
              <View key={method._id} style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => handleSelection(method)}
                >
                  <MaterialIcons
                    name={
                      selectedMethod === method._id
                        ? "radio-button-checked"
                        : "radio-button-unchecked"
                    }
                    size={24}
                    color="#241E92"
                  />
                </TouchableOpacity>
                <Text style={styles.title}>{method.deli_name}</Text>
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deliveryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  deliveryTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
  },
  deliverySelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  insideContainer: {},
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingBottom: 5,
  },
  circle: {
    marginRight: 10,
  },
});

export default DeliveryMethod;
