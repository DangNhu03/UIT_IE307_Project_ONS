import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import ArrowBack from "@components/ArrowBack";
import { useRoute } from "@react-navigation/native";
import { useAuthContext } from "@contexts/AuthContext";
import { API_URL } from "../../../url";
import { useNavigation } from "@react-navigation/native";
import ItemCircle from "@components/account/ItemCircle";
import Address from "@components/account/setting/Address";
import ChangePassword from "@components/account/setting/ChangePassword";
import LinkAccount from "@components/account/setting/LinkAccount";
import PersonalInfo from "@components/account/setting/PersonalInfo";

export default function Setting() {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState("1");
  const nameScreen = route.params?.nameScreen || "";
  const settings = route.params?.settings || [];
  console.log("Tab đơn hàng của tôi", nameScreen);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const user_id =
    user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;
  useEffect(() => {
    if (nameScreen) {
      const matchedTab = settings.find((status) => status.name === nameScreen);
      if (matchedTab) {
        setActiveTab(matchedTab.id);
      }
    }
  }, [nameScreen]);
  const handlePress = (id) => {
    setActiveTab(id);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "1":
        return <Address />;
      case "2":
        return <ChangePassword />;
      case "3":
        return <LinkAccount />;
      case "4":
        return <PersonalInfo />;
    }
  };

  return (
    <View style={styles.container}>
      <ArrowBack title="Cài đặt" />
      <View styles={styles.contentContainer}>
        <View style={styles.topContainer}>
          {settings.map((item) => (
            <View key={item.id} style={styles.itemWrapper}>
              <ItemCircle
                name={item.name}
                iconName={item.iconName}
                isActive={item.id === activeTab}
                onPress={() => handlePress(item.id)}
              />
            </View>
          ))}
        </View>
        <View style={styles.bottomContainer}>{renderContent()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241e92",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  contentContainer: {
    flex: 1,
    gap: 20,
    width: "100%",
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    paddingBottom: 10,
    marginLeft: 10,
  },

  itemWrapper: {
    width: "25%",
    alignItems: "center",
    marginBottom: 5,
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
