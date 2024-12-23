import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SortBar = ({onSortChange}) => {
  // Danh sách các mục sắp xếp
  const sortOptions = [
    { label: "Nổi bật", icon: null },
    { label: "Mới nhất", icon: null },
    { label: "Bán chạy", icon: null },
    // { label: "Giá ↑↓", icon: null },
    { label: "Giá ↑", icon: null },
    { label: "Danh sách", icon: <MaterialIcons name="checklist" size={24} /> },
  ];

  const [activeSort, setActiveSort] = useState(sortOptions[0].label);

  const handleSortChange = (label) => {
    setActiveSort(label);
    onSortChange(label); // Gọi hàm callback từ parent
  };

  return (
    <View style={styles.container}>
      {sortOptions.map((item, index) => (
        <View key={item.label} style={styles.sortItem}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              activeSort === item.label && styles.activeSortButton,
            ]}
            onPress={() => handleSortChange(item.label)}
          >
            {item.icon ? (
              <MaterialIcons
                name="checklist"
                size={24}
                color={activeSort === item.label ? "#FF71CD" : "#241E92"}
              />
            ) : (
              <Text
                style={[
                  styles.sortButtonText,
                  activeSort === item.label && styles.activeButtonText,
                ]}
              >
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
          {/* Đường phân chia */}
          {index < sortOptions.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
  },
  sortItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortButton: {
    paddingHorizontal: 12,
  },
  sortButtonText: {
    fontSize: 16,
    color: "#241E92",
    fontWeight: "500",
    textAlign: "center",
  },
  activeButtonText: {
    color: "#FF71CD", // Màu chữ cho mục được chọn
    fontWeight: "bold",
  },
  divider: {
    width: 1,
    height: 25,
    backgroundColor: "#CFCED6", // Màu đường gạch dọc
    marginVertical: 10,
  },
});

export default SortBar;
