import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Button from "@components/Button";

const NoteSection = ({ onNoteChange }) => {
  const [note, setNote] = useState("Để lại lời nhắn cho shop");
  const [isModalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  useEffect(() => {
    if (note === "Để lại lời nhắn cho shop") {
      setNewNote("");
    }
  }, [note]);

  const handlePressNote = () => {
    setModalVisible(true);
    if (note === "Để lại lời nhắn cho shop") {
      setNewNote("");
    }
  };

  const handleSaveNote = () => {
    if (newNote && newNote.trim()) {
      setNote(newNote);
      if (onNoteChange) {
        onNoteChange(newNote);
      }
    } else {
      setNote("Để lại lời nhắn cho shop");
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.noteContainer}>
      <Text style={styles.noteLabel}>Ghi chú</Text>
      <TouchableOpacity
        onPress={handlePressNote}
        style={styles.noteContentContainer}
      >
        {/* Show current note */}
        <Text style={styles.noteContent} numberOfLines={1} ellipsizeMode="tail">
          {note}
        </Text>
      </TouchableOpacity>

      {/* Modal for editing the note */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalLabel}>Nhập ghi chú</Text>
            <TextInput
              style={styles.input}
              value={newNote}
              onChangeText={setNewNote}
              placeholder="Vui lòng để lại lời nhắn"
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Hủy"
                onPress={handleCancel}
                backgroundColor="#DDDDDD"
                textColor="#000000"
                width={120}
                borderRadius={5}
              />
              <Button
                title="Xác nhận"
                onPress={handleSaveNote}
                backgroundColor="#FF71CD"
                textColor="#FFFFFF"
                width={120}
                borderRadius={5}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 5,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  noteLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
  },
  noteContentContainer: {
    alignItems: "flex-end",
  },
  noteContent: {
    fontSize: 12,
    color: "#CFCED6",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default NoteSection;
