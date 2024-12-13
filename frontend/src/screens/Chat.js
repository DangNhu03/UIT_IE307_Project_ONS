import ArrowBack from "@components/ArrowBack";
import Button from "@components/Button";
import { AuthContext } from "@contexts/AuthContext"; // Giả sử bạn có AuthContext
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

const ChatWithBotScreen = () => {
  const [message, setMessage] = useState(""); // Tin nhắn người dùng nhập
  const [messages, setMessages] = useState([]); // Danh sách tin nhắn trong cuộc trò chuyện
  const [loading, setLoading] = useState(false); // Trạng thái loading

  // Lấy thông tin người dùng từ AuthContext (giả sử có AuthContext)
  const { user } = useContext(AuthContext);
  const user_id = user && user[0]?._id;
  const API_URL = 'http://192.168.137.1:5000';
  useEffect(() => {
    if (user_id) {
      // Lấy lịch sử tin nhắn khi người dùng đăng nhập
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/chat/messages/${user_id}`);

          // Trích xuất chỉ nội dung tin nhắn
          const messageData = response.data.map((msg) => ({
            content: msg.message, // Lấy nội dung tin nhắn
            sender: msg.sender,   // Lưu thông tin người gửi
          }));

          // Cập nhật danh sách tin nhắn vào state
          setMessages(messageData);
        } catch (error) {
          console.error(error);
          Alert.alert("Lỗi", "Không thể lấy lịch sử tin nhắn.");
        }
      };

      fetchMessages();
    }
  }, [user]);

  // Gửi tin nhắn đến bot
  const sendMessageToBot = async () => {
    try {
      if (!message.trim()) {
        Alert.alert("Lỗi", "Vui lòng nhập tin nhắn!");
        return;
      }

      setMessages([...messages, { content: message, sender: "user" }]); // Thêm tin nhắn của người dùng vào danh sách
      console.log('message: ', message)

      setMessage(""); // Reset input

      setLoading(true);

      // Gửi yêu cầu POST tới API, bao gồm sender và các thông tin khác
      const response = await axios.post(`${API_URL}/api/chat/message`, {
        message,
        userId: user_id, // Gửi userId của người dùng
        sender: "user", // Xác định người gửi là user
      });

      // Lấy phản hồi từ bot
      const botResponse = response.data.botMessage?.message;
      console.log('botResponse ne: ', botResponse)

      // Thêm phản hồi từ bot vào danh sách tin nhắn
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: botResponse, sender: "bot" },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể gửi tin nhắn tới bot.");
    } finally {
      setLoading(false);
    }
  };

  // Hiển thị tin nhắn
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={item.sender === "user" ? styles.userMessageText : styles.botMessageText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ArrowBack title="Trò chuyện" titleColor="#E5A5FF" />
      {/* <Text style={styles.title}>Trò chuyện với Bot</Text> */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesList}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập tin nhắn..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Gửi" backgroundColor="#E5A5FF" onPress={sendMessageToBot} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
    backgroundColor: "#FFE1FF",
    // gap:20
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   marginBottom: 20,
  //   textAlign: "center",
  // },
  messagesList: {
    flexGrow: 1,
    marginBottom: 20,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#E5A5FF",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#f1f1f1",
    alignSelf: "flex-start",
  },
  userMessageText: {
    fontSize: 16,
    color: "#FFF",
  },
  botMessageText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5A5FF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

export default ChatWithBotScreen;
