import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import hook navigation
import Button from "@components/Button";

const AddressItem = ({ data, onSetDefault }) => {

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.nameDefaultDelete}>
                    <View style={styles.nameDefault}>
                        <Text style={styles.nameText}>{data.loca_per_name}</Text>
                        {data.is_default === true && <Text style={styles.tagText}>Mặc định</Text>}
                    </View>
                    <TouchableOpacity style={styles.delete}>
                        <Text style={styles.deleteText}>Xóa</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.addressText}>{data.loca_address}</Text>
                <Text style={styles.phoneText}>SĐT: {data.loca_phone}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Thiết lập mặc định"
                    textColor={data.is_default === true ? '#3B394A' : '#241E92'}
                    borderWidth={data.is_default === true ? undefined : 1}
                    backgroundColor={data.is_default === true ? '#EBEBEE' : 'white'}
                    borderColor={data.is_default === true ? undefined : '#E5A5FF'}
                    activeOpacity={data.is_default===true ? 1 : undefined}
                    onPress={() => onSetDefault(data._id)} // Gọi hàm handleSetDefault khi nhấn
                />
                <Button title="Sửa"/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 390,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        gap: 20
    },
    contentContainer: {
        gap: 5,
        // alignItems: 'flex-start'
    },
    nameDefaultDelete: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    nameDefault: {
        flexDirection: 'row',
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 21,
        marginRight: 5,
    },
    tagText: {
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#E5A5FF',
        borderRadius: 4,
    },
    delete: {},
    deleteText: {
        color: '#241E92',
        lineHeight:21
    },
    addressText: {

    },
    phoneText: {

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10
    },

});

export default AddressItem;
