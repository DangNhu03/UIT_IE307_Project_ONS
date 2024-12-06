import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import ArrowBack from "@components/ArrowBack";
import Noti from '@components/NotiItem';

export default function Notifications() {
  const API_URL = 'http://192.168.137.1:5000';
  // const notifications = [
  //   {
  //     noti_image: "https://product.hstatic.net/1000230347/product/artboard_5_021475f9522f457f8a6447d6b9401239.jpg",
  //     noti_title: "day la title notification",
  //     noti_content: "day la content cua notifincation ne",
  //     noti_time: "10:02 24/11/2021"
  //   },
  //   {
  //     noti_image: "https://product.hstatic.net/1000230347/product/artboard_5_021475f9522f457f8a6447d6b9401239.jpg",
  //     noti_title: "day la title 2 notification",
  //     noti_content: "day la content 2 cua notifincation ne hihi hihi hihihihihi hihihihihhh",
  //     noti_time: "10:05 24/11/2021"
  //   }
  // ]
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
        setNotifications(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra:', error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ArrowBack title="Thông báo" />
      <View style={styles.notificationsContainer}>
        {notifications.map((noti, index) => (
          <View key={index}>
            <Noti data={noti} />
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241e92",
    alignItems: "center",
    // justifyContent: "flex-start",
    paddingTop: 40,
  },
  notificationsContainer: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 5,
  }
})
