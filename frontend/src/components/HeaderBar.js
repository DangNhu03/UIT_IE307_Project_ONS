import React from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; // Thư viện icon
const badgeCount = 3;
const HeaderBar = () => (
    <View style={styles.headerContainer}>
        <Image style={styles.logo}
            source={require("../assets/imgs/logo.png")} />

        <View style={styles.searchBarContainer}>
            <TextInput
                placeholder="Tìm kiếm sản phẩm..."
                style={styles.searchBarInput}
            />
            <TouchableOpacity>
                <MaterialIcons name='search' size={24} color='white' style={styles.searchBarIcon} />
            </TouchableOpacity>
        </View>

        <View style={styles.iconContainer}>
            <TouchableOpacity>
                <MaterialCommunityIcons name='cart-outline' size={24} color='#241E92' />
            </TouchableOpacity>
            <TouchableOpacity><Ionicons name='chatbox-ellipses-outline' size={24} color='#241E92' />
                {badgeCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badgeCount}</Text>
                    </View>
                )}</TouchableOpacity>

        </View>
    </View>
);

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        height: 42,
    },
    logo: {
        width: 40,
        height: 30,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 230,
        height: 30,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CFCED6',
        paddingLeft: 6,
    },

    searchBarInput: {
        flex: 1,
        fontWeight: '400',
        fontSize: 14,
        paddingVertical: 0,
        paddingLeft: 4,
    },
    searchBarIcon: {
        backgroundColor: '#241E92',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    badge: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: "red",
        width: 16,
        height: 16,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
});

export default HeaderBar;