import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@components/Button";

const AddressItem = ({
  data,
  onSetDefault,
  onEdit,
  onDelete,
  showCheckbox=false,
  isSelected,
  onSelect,
}) => {
  if (showCheckbox === false) {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.nameDefaultDelete}>
            <View style={styles.nameDefault}>
              <Text style={styles.nameText}>{data.loca_per_name}</Text>
              {data.is_default === true && (
                <Text style={styles.tagText}>Mặc định</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => onDelete(data._id)}
            >
              <Text style={styles.deleteText}>Xóa</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>{data.loca_address}</Text>
          <Text style={styles.phoneText}>SĐT: {data.loca_phone}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Thiết lập mặc định"
            textColor={data.is_default === true ? "#3B394A" : "#241E92"}
            borderWidth={data.is_default === true ? undefined : 1}
            backgroundColor={data.is_default === true ? "#EBEBEE" : "white"}
            borderColor={data.is_default === true ? undefined : "#E5A5FF"}
            activeOpacity={data.is_default === true ? 1 : undefined}
            onPress={() => onSetDefault(data._id)} // Handle default setup
          />
          <Button title="Sửa" onPress={() => onEdit(data)} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.containerHasCheckBox}>
      <TouchableOpacity
        style={[
          styles.checkboxContainer,
          isSelected ? styles.selectedCheckbox : styles.unselectedCheckbox,
        ]}
        onPress={() => onSelect(data)}
      >
        <MaterialIcons
          name={isSelected ? "radio-button-checked" : "radio-button-off"}
          size={24}
          color="#241E92"
        />
      </TouchableOpacity>
      <View style={styles.itemContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.nameDefaultDelete}>
            <View style={styles.nameDefault}>
              <Text style={styles.nameText}>{data.loca_per_name}</Text>
              {data.is_default === true && (
                <Text style={styles.tagText}>Mặc định</Text>
              )}
            </View>
          </View>
          <Text style={styles.addressText}>{data.loca_address}</Text>
          <Text style={styles.phoneText}>SĐT: {data.loca_phone}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Sửa" width={70} onPress={() => onEdit(data)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 390,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "column",
    gap: 20,
  },
  contentContainer: {
    gap: 5,
  },
  nameDefaultDelete: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameDefault: {
    flexDirection: "row",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 21,
    marginRight: 5,
  },
  tagText: {
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "#E5A5FF",
    borderRadius: 4,
  },
  delete: {},
  deleteText: {
    color: "#241E92",
    lineHeight: 21,
  },
  addressText: {},
  phoneText: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  containerHasCheckBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  itemContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "column",
  },

  checkboxContainer: {
    marginLeft: 5,
    padding: 5,
    borderRadius: 5,
  },
});

export default AddressItem;
