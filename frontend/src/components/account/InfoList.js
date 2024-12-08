import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";

export default function InfoList({ data, onPress }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => onPress(item)}
        >
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      )}
      scrollEnabled={false}

    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
  },
  itemText: {
    fontSize: 16,
    color: "#241E92",
    lineHeight:24
  },
});
