import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  errorMessage,
  keyboardType = "default",
  showToggle = false,
  toggleSecureEntry,
  showSecureEntryIcon = false,
  iconComponent,
  borderWidth,
  borderColor,
  fontSize,
  ...props
}) {
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, {
        borderWidth: borderWidth ? borderWidth : 0,
        borderColor: borderColor ? borderColor : 'transparent'
      }, showToggle && styles.flexRow]}>
        <TextInput
          style={[styles.input, { fontSize: fontSize ? fontSize : 16 }]}
          placeholder={placeholder}
          placeholderTextColor="#CFCED6"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          {...props}
        />
        {showToggle && iconComponent}
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  input: {
    fontSize:12,
    flex: 1,
    color: '#3B394A',
    lineHeight: 21
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: {
    color: "#FF71CD",
    fontSize: 12,
    marginTop: 5,
  },
});
