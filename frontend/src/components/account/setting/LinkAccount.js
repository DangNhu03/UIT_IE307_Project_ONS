import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import ArrowBack from "@components/ArrowBack";
import { useAuthContext } from "@contexts/AuthContext";

export default function LinkAccount() {
    const { user } = useAuthContext();
  return (
    <View style={styles.container}>
      
    </View>
  )
}
const styles = StyleSheet.create({
  
});