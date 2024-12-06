import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ItemStatus from "./ItemStatus";

const OrderStatusList = ({ data }) => {
  const handlePress = (title) => {
    alert(`Icon clicked: ${title}`);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ItemStatus title={item.title} iconName={item.iconName} onPress={() => handlePress(item.title)}/>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default OrderStatusList;
