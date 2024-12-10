import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import ArrowBack from "@components/ArrowBack";
import Noti from '@components/NotiItem';
import axios from 'axios';

export default function Notifications() {
  const API_URL = 'http://192.168.137.1:5000';
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${API_URL}/notifications`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Ket qua notifications tra ve tu API: ', response.data)
        setNotifications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra:', error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ArrowBack title='Thông báo' />
      {
        loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView
            contentContainerStyle={styles.notificationsContainer}
            showsVerticalScrollIndicator={false}
          >
            {notifications.map((noti, index) => (
              <View key={index}>
                <Noti data={noti} />
              </View>
            ))}
          </ScrollView>
        )
      }

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241e92",
    alignItems: "center",
    paddingTop: 40,
  },
  notificationsContainer: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingBottom: 10
  }
})
