import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ItemStatus from "./ItemStatus";

const OrderStatusList = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ItemStatus
            title={item.title}
            IconComponent={() => (
              <MaterialCommunityIcons name={item.iconName} size={30} color="#4B79F7" />
            )}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default OrderStatusList;
