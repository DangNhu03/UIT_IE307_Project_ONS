import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelection = (method) => setSelectedMethod(method);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <View>
      <TouchableOpacity onPress={toggleExpand} style={styles.paymentContainer}>
        <View style={styles.paymentTitle}>
          <MaterialCommunityIcons
            name="piggy-bank-outline"
            size={24}
            color="#241E92"
          />
          <Text style={styles.title}>Phương thức thanh toán</Text>
        </View>
        <TouchableOpacity style={styles.paymentSelection}>
          <MaterialIcons
            name={isExpanded ? "keyboard-arrow-down" : "keyboard-arrow-right"}
            size={24}
            color="#241E92"
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.insideContainer}>
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => handleSelection("COD")}
            >
              <MaterialIcons
                name={
                  selectedMethod === "COD"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color="#241E92"
              />
            </TouchableOpacity>
            <Text style={styles.title}>
              Thanh toán tiền khi nhận hàng (COD)
            </Text>
          </View>
          <View style={styles.onlineContainer}>
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => handleSelection("Online")}
              >
                <MaterialIcons
                  name={
                    selectedMethod === "Online"
                      ? "radio-button-checked"
                      : "radio-button-unchecked"
                  }
                  size={24}
                  color="#241E92"
                />
              </TouchableOpacity>
              <Text style={styles.title}>Thanh toán trực tuyến</Text>
            </View>
            <TouchableOpacity style={styles.onlineSelection}>
              <MaterialIcons
                name={
                  selectedMethod === "Online"
                    ? "keyboard-arrow-down"
                    : "keyboard-arrow-right"
                }
                size={24}
                color="#241E92"
              />
            </TouchableOpacity>
          </View>
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
  onlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 5,
  },
});

export default PaymentMethod;
