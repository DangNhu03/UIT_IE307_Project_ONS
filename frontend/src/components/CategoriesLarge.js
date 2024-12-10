import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Polygon } from 'react-native-svg';

export default function CategoriesLarge({ text, color }) {
    return (
        <View style={[styles.container, {backgroundColor:color||'#C5C0F2'}]}>
            <View style={styles.hexagon}>
                <Svg height="70" width="70" viewBox="0 0 100 100">
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
        width: 115,
        height: 130,
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: '#C5C0F2',
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
        alignSelf: 'stretch',
        height: 40
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold'
    }
});
