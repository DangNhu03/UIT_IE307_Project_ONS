import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import ArrowBack from "@components/ArrowBack";
import { useAuthContext } from "@contexts/AuthContext";

export default function LinkAccount() {
    const { user } = useAuthContext();
  return (
    <View style={styles.container}>
      <ArrowBack title='Tài khoản liên kết'/>
      <View
        style={[
          styles.inforUser,
          user &&
            Array.isArray(user) &&
            user.length > 0 && { justifyContent: "flex-start" },
        ]}
      >
        <Image
  source={{ uri: user[0]?.user_avatar }}
          style={styles.userImage}
        />
          <Text style={styles.userName}>{user[0]?.user_name}</Text>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241e92",
    alignItems: "center",
    paddingTop: 40,
  },
  inforUser: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  authButtons: {
    flexDirection: "row",
    gap: 10,
  },
  
});