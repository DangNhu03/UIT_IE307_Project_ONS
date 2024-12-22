import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import ArrowBack from "@components/ArrowBack";
import { useRoute } from "@react-navigation/native";
import { useAuthContext } from "@contexts/AuthContext";
import { API_URL } from "../../../url";
import { useNavigation } from "@react-navigation/native";
import ItemCircle from "@components/account/ItemCircle";
import FAQ from "@components/account/support/FAQ";
import ShoppingGuide from "@components/account/support/ShoppingGuide";
import TermsAndPolicies from "@components/account/support/TermsAndPolicies";
import AboutUs from "@components/account/support/AboutUs";
import ContactUs from "@components/account/support/ContactUs";
import DeleteAccount from "@components/account/support/DeleteAccount";
export default function Support() {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState("1");
  const nameScreen = route.params?.nameScreen || "";
  const supports = route.params?.supports || [];
  console.log("Tab đơn hàng của tôi", nameScreen);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const user_id =
    user && Array.isArray(user) && user.length > 0 ? user[0]._id : null;
  const scrollViewRef = useRef(null);
  useEffect(() => {
    if (nameScreen) {
      const matchedTab = supports.find((status) => status.name === nameScreen);
      if (matchedTab) {
        setActiveTab(matchedTab.id);
      }
    }
  }, [nameScreen]);
  const handlePress = (id) => {
    setActiveTab(id);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "1":
        return <FAQ />;
      case "2":
        return <ShoppingGuide />;
      case "3":
        return <TermsAndPolicies />;
      case "4":
        return <AboutUs />;
      case "5":
        return <ContactUs />;
      case "6":
        return <DeleteAccount />;
    }
  };

  return (
    <View style={styles.container}>
      <ArrowBack title="Hỗ trợ" />
      <View styles={styles.contentContainer}>
        <View style={styles.topContainer}>
          {supports.map((item) => (
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
        <View style={styles.gapContainer}></View>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollContainer}
          contentContainerStyle={styles.bottomContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241e92",
    alignItems: "center",
    paddingTop: 40,
  },
  contentContainer: {
    gap: 20,
    width: "100%",
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    paddingBottom: 10,
    width: "100%",
  },
  itemWrapper: {
    width: "33.33333333%",
    alignItems: "center",
    marginBottom: 5,
  },
  gapContainer: {
    backgroundColor: "#241e92",
    paddingTop: 20,
    // width: "100%",
    height: 20,
  },
  bottomContainer: {},
});
