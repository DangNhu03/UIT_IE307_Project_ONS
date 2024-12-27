import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ItemStatus from "./ItemStatus";
import { useNavigation } from "@react-navigation/native";

const OrderStatusList = ({ data }) => {
  const navigation = useNavigation();

  const handlePress = (title) => {
    if (title === "Đánh giá") {
      navigation.navigate("MyReview");
    } else {
      navigation.navigate("MyOrder", { typeTitle: title });
    }
  };
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
            iconName={item.iconName}
            onPress={() => handlePress(item.title)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  listContent: {
    justifyContent: "space-evenly", 
    alignItems: "center",         
    flexGrow: 1,  
  },
});

export default OrderStatusList;
