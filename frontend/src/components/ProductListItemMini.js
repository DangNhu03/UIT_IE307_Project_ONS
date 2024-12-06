import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Polygon } from 'react-native-svg';

export default function ProductListItemMini({ text }) {
    return (
        <View style={styles.container}>
            <View style={styles.hexagon}>
                <Svg height="45" width="45" viewBox="0 0 100 100">
                    <Defs>
                        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <Stop offset="0%" stopColor="#FFF8DB" stopOpacity="1" />
                            <Stop offset="100%" stopColor="#FFEB9A" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>

                    <Polygon
                        points="50,0 93,25 93,75 50,100 7,75 7,25"
                        fill="url(#grad)"
                    />
                </Svg>
            </View>
            <View style={styles.textItem}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 80,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#C5C0F2',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    hexagon: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    textItem: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        backgroundColor: '#FFF7FC',
        alignSelf: 'stretch'
    },
    text: {
        fontSize: 9,
        lineHeight: 21,
        fontWeight: 500
    }
});
