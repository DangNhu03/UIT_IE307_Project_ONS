// CountdownTimer.js
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CountdownTimer = ({ targetTime }) => {
    const [timeLeft, setTimeLeft] = useState(targetTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secondsLeft = seconds % 60;
        return { hours, minutes, seconds: secondsLeft };
    };

    const { hours, minutes, seconds } = formatTime(timeLeft);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.timeBlock}>
                    <Text style={styles.timeText}>{hours}</Text>
                </View>
                <Text style={styles.separator}>:</Text>
                <View style={styles.timeBlock}>
                    <Text style={styles.timeText}>{minutes}</Text>
                </View>
                <Text style={styles.separator}>:</Text>
                <View style={styles.timeBlock}>
                    <Text style={styles.timeText}>{seconds < 10 ? '0' + seconds : seconds}</Text>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    timeBlock: {
        backgroundColor: '#FFF', // Màu nền trắng cho giờ, phút và giây
        borderRadius: 6,
        paddingHorizontal: 5,
    },
    timeText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 500,
        textAlign: 'center'
    },
    separator: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 500
    },
});

export default CountdownTimer;
