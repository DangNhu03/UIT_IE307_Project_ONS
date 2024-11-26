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
  ...props
}) {
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, showToggle && styles.flexRow]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
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
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: {
    color: "#FF71CD",
    fontSize: 14,
    marginTop: 5,
  },
});
