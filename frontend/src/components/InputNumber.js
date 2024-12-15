import React, { forwardRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputNumber = forwardRef(
  (
    {
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
      width = "100%", // Độ rộng mặc định là 100%
      height = 42, // Chiều cao mặc định là 42
      textAlign = "left", // Để căn chỉnh văn bản
      ...props
    },
    ref // Đảm bảo có ref ở đây để forward ref
  ) => {
    const handleChange = (newValue) => {
      // Chỉ cho phép nhập một ký tự số duy nhất hoặc chuỗi rỗng để xóa
      if (/^\d$/.test(newValue) || newValue === "") {
        onChangeText(newValue); // Gọi lại onChangeText nếu giá trị hợp lệ
      }
    };

    return (
      <View style={[styles.container, { width }]}>
        <View style={[styles.inputContainer, { height }, showToggle && styles.flexRow]}>
          <TextInput
            ref={ref} // Truyền ref vào đây
            style={[styles.input, { height, textAlign }]}
            placeholder={placeholder}
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={handleChange}  // Sử dụng hàm handleChange
            keyboardType="numeric"      // Giới hạn bàn phím chỉ cho phép số
            {...props}
          />
          {showToggle && iconComponent}
        </View>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  inputContainer: {
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

export default InputNumber;
