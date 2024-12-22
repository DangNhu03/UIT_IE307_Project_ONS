import ArrowBack from "@components/ArrowBack";
import Button from "@components/Button";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import * as GoogleGenerativeAI from "@google/generative-ai";
import * as Speech from "expo-speech";
import { API_KEY } from "../../../url";
import { storeAssistantPrompt } from "../assets/prompts";
import axios from 'axios';
import { API_URL } from "../../../url";
import { AuthContext } from "@contexts/AuthContext";

const ChatWithBotScreen = () => {
  const [message, setMessage] = useState(""); // Tin nhắn người dùng nhập
  const [messages, setMessages] = useState([]); // Danh sách tin nhắn trong cuộc trò chuyện
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);

  const { user } = useContext(AuthContext);
  const user_id = user && user[0]?._id;
  const flatListRef = useRef(null); // Tham chiếu FlatList để cuộn đến cuối
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
      console.log("Lỗi ở Chat", error);
    }
  }

  const startChat = async () => {
    try {
      if (!user_id) {
        throw new Error("user_id không tồn tại!");
      }

      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = "Chào mừng bạn đến với cửa hàng của chúng tôi!";
      const result = await model.generateContent(prompt);
      const botResponse = result.response.text();

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: botResponse, sender: "bot" },
      ]);

      await axios.post(`${API_URL}/api/chat/message`, {
        message: botResponse,
        userId: user_id,
        sender: "bot",
      });
    } catch (error) {
      console.error("Lỗi khởi tạo chat:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    // Lời chào ban đầu
    if (user)
      fetchMessages();
    startChat()
  }, []);

  useEffect(() => {
    // Cuộn đến tin nhắn cuối khi danh sách tin nhắn thay đổi (bao gồm lần đầu tiên)
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100); // Đảm bảo cuộn sau khi FlatList đã render lần đầu
    }
  }, [messages]); // Mỗi khi messages thay đổi, cuộn đến cuối

  const sendMessageToBot = async () => {
    try {
      if (!message.trim()) {
        Alert.alert("Lỗi", "Vui lòng nhập tin nhắn!");
        return;
      }

      setMessages([...messages, { content: message, sender: "user" }]); // Thêm tin nhắn người dùng
      setMessage(""); // Reset input
      setLoading(true);

      if (user) {
        // Gửi yêu cầu POST tới API, bao gồm sender và các thông tin khác
        await axios.post(`${API_URL}/api/chat/message`, {
          message: message,
          userId: user_id, // Gửi userId của người dùng
          sender: "user", // Xác định người gửi là user
        });
      }

      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(`${storeAssistantPrompt}\nNgười dùng hỏi: ${message}`); // Gửi prompt
      const botResponse = result.response.text(); // Lấy phản hồi từ bot

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: botResponse, sender: "bot" },
      ]);

      if (user) {
        // Gửi yêu cầu POST tới API, bao gồm sender và các thông tin khác
        await axios.post(`${API_URL}/api/chat/message`, {
          message: botResponse,
          userId: user_id, // Gửi userId của người dùng
          sender: "bot", // Xác định người gửi là bot
        });
      }

    } catch (error) {
      console.log("Lỗi gửi tin nhắn:", error);
      // Alert.alert("Lỗi", "Không thể gửi tin nhắn tới bot.");
      const text = "Xin lỗi, hãy đợi một xíu để tôi khôi phục năng lượng của mình nhé hihi"
      if (user) {
        await axios.post(`${API_URL}/api/chat/message`, {
          message: text,
          userId: user_id, // Gửi userId của người dùng
          sender: "bot", // Xác định người gửi là bot
        });
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: text, sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }

  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text
        style={
          item.sender === "user" ? styles.userMessageText : styles.botMessageText
        }
      >
        {item.content}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ArrowBack title="Trò chuyện" titleColor="#E5A5FF" />
      <FlatList
        ref={flatListRef} // Tham chiếu tới FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => {
          setTimeout(() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToEnd({ animated: true });
            }
          }, 100);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập tin nhắn..."
        value={message}
        onChangeText={setMessage}
      />
      <Button
        title="Gửi"
        backgroundColor="#E5A5FF"
        onPress={sendMessageToBot}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
    backgroundColor: "#FFF",
  },
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
