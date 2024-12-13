import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const DeliveryMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelection = (method) => setSelectedMethod(method);
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
        <TouchableOpacity style={styles.deliverySelection}>
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
              onPress={() => handleSelection("2h")}
            >
              <MaterialIcons
                name={
                  selectedMethod === "2h"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color="#241E92"
              />
            </TouchableOpacity>
            <Text style={styles.title}>
              Giao hàng nhanh trong 2h (Trễ tặng 100k)
            </Text>
          </View>
          <View style={styles.onlineContainer}>
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => handleSelection("72h")}
              >
                <MaterialIcons
                  name={
                    selectedMethod === "72h"
                      ? "radio-button-checked"
                      : "radio-button-unchecked"
                  }
                  size={24}
                  color="#241E92"
                />
              </TouchableOpacity>
              <Text style={styles.title}>Giao hàng trong 72h</Text>
            </View>
          </View>
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
  onlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 5,
  },
});

export default DeliveryMethod;
