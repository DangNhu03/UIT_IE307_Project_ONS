import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { API_URL } from "../../../../url"; 

const PaymentMethod = ({ onPaymentMethodChange }) => {
  const [selectedMethod, setSelectedMethod] = useState(null); 
  const [paymentMethods, setPaymentMethods] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/paymentmethods`);
        const data = await response.json();
        // console.log("Fetched payment methods:", data);

        if (data.paymentMethods && Array.isArray(data.paymentMethods)) {
          setPaymentMethods(data.paymentMethods);
        } else {
          console.error(
            "Invalid data format: Expected 'paymentMethods' to be an array"
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleSelection = (method) => {
    setSelectedMethod(method); 
    onPaymentMethodChange(method); 
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <View>
      {/* Header Section */}
      <TouchableOpacity onPress={toggleExpand} style={styles.paymentContainer}>
        <View style={styles.paymentTitle}>
          <MaterialCommunityIcons
            name="piggy-bank-outline"
            size={24}
            color="#241E92"
          />
          <Text style={styles.title}>Phương thức thanh toán</Text>
        </View>
        <View style={styles.paymentSelection}>
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
            paymentMethods.map((method) => (
              <View key={method._id} style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => handleSelection(method)} 
                >
                  <MaterialIcons
                    name={
                      selectedMethod && selectedMethod._id === method._id
                        ? "radio-button-checked"
                        : "radio-button-unchecked"
                    }
                    size={24}
                    color="#241E92"
                  />
                </TouchableOpacity>
                <Text style={styles.title}>{method.pay_name}</Text>
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  paymentTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
  },
  paymentSelection: {
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

export default PaymentMethod;
