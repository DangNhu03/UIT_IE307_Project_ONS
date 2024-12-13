// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@screens/Home";
import Vouchers from "@screens/Vouchers";
import Categories from "@screens/Categories";
import Notifications from "@screens/Notifications.js";
import Account from "@screens/Account";
import Cart from "@screens/Cart";
import Payment from "@screens/Payment";
import Login from "@screens/Login";
import Register from "@screens/Register";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loading from "@screens/Loading";
import { useState, useEffect } from "react";

import PersonalInfo from "@screens/accounts/PersonalInfo";
import Address from "@screens/accounts/Address";
import LinkAccount from "@screens/accounts/LinkAccount";
import ChangePassword from "@screens/accounts/ChangePassword";
import FAQ from "@screens/accounts/FAQ";
import ShoppingGuide from "@screens/accounts/ShoppingGuide";
import TermsAndPolicies from "@screens/accounts/TermsAndPolicies";
import AboutUs from "@screens/accounts/AboutUs";
import ContactUs from "@screens/accounts/ContactUs";
import DeleteAccount from "@screens/accounts/DeleteAccount";

import ChatWithBotScreen from "@screens/Chat.js";

import HeaderBar from "../components/HeaderBar.js";
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [isLoading, setIsLoading] = useState(true);
  // Giả lập quá trình tải dữ liệu trong `useEffect`
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Sau 2 giây, tắt màn hình loading
    }, 2000);
  }, []);

  const badgeCount = 3;

  function BottomTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FF71CD", // Active label color (focused)
          tabBarInactiveTintColor: "#241E92", // Inactive label color (not focused)
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Trang chủ",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="yard" size={24} color="#FF71CD" />
              ) : (
                <MaterialIcons name="yard" size={24} color="#241E92" />
              ),
            // headerTitle: () => <HeaderBar />,
            // headerStyle: {
            //   backgroundColor: '#FFF', // Màu nền của header
            // },
          }}
        />

        <Tab.Screen
          name="Vouchers"
          component={Vouchers}
          options={{
            tabBarLabel: "Ưu đãi",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons
                  name="local-fire-department"
                  size={24}
                  color="#FF71CD"
                />
              ) : (
                <MaterialIcons
                  name="local-fire-department"
                  size={24}
                  color="#241E92"
                />
              ),
          }}
        />

        <Tab.Screen
          name="Categories"
          component={Categories}
          options={{
            tabBarLabel: "Danh mục",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={24}
                  color="#FF71CD"
                />
              ) : (
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={24}
                  color="#241E92"
                />
              ),
          }}
        />

        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarLabel: "Thông báo",
            tabBarIcon: ({ focused }) => (
              <View style={{ position: "relative" }}>
                <MaterialIcons
                  name="notifications-none"
                  size={24}
                  color={focused ? "#FF71CD" : "#241E92"}
                />
                {badgeCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badgeCount}</Text>
                  </View>
                )}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: "Tài khoản",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons
                  name="person-outline"
                  size={24}
                  color="#FF71CD"
                />
              ) : (
                <MaterialIcons
                  name="person-outline"
                  size={24}
                  color="#241E92"
                />
              ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PersonalInfo"
          component={PersonalInfo}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LinkAccount"
          component={LinkAccount}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FAQ"
          component={FAQ}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShoppingGuide"
          component={ShoppingGuide}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsAndPolicies"
          component={TermsAndPolicies}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DeleteAccount"
          component={DeleteAccount}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatWithBotScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 16,
    height: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
