import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SortBar = ({ options }) => {
  const [activeSort, setActiveSort] = useState(options[0]?.text);

  const handleSortChange = (text) => {
    setActiveSort(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sortOptions}>
        {options.map((item, index) => (
          <View key={item.text} style={styles.sortItem}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                { width: item.width || "auto" },
              ]}
              onPress={() => handleSortChange(item.text)}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  activeSort === item.text && styles.activeButtonText,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            {/* Đường gạch dọc, ẩn sau mục cuối cùng */}
            {index < options.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
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
    borderBottomWidth: 2,
    borderBottomColor: "#241E92",
  },
  sortOptions: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "nowrap", // Không cho phép xuống dòng
  },
  sortItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row", // Icon và text nằm ngang
  },
  sortButtonText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: "#241E92",
  },
  activeButtonText: {
    color: "#FF71CD",
    fontWeight: 'normal',
  },
  divider: {
    height: 25,
    width: 1,
    backgroundColor: "#CFCED6",
    marginHorizontal: 8,
  },
});

export default SortBar;
