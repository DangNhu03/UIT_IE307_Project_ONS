import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from './frontend/src/contexts/ThemeContext'; // Đảm bảo đường dẫn chính xác
import StackNavigator from './frontend/src/navigation/Navigator'; // Đảm bảo đường dẫn chính xác

export default function App() {
  return (
    <ThemeProvider>
      <StackNavigator /> 
    </ThemeProvider>
  );
}
