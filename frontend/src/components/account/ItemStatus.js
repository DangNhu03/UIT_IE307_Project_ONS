import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ItemStatus = ({ title, IconComponent }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {IconComponent && <IconComponent size={40} color="#4B79F7" />}
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    backgroundColor: '#F8E71C',
    borderRadius: 50,
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B79F7',
  },
});

export default ItemStatus;
