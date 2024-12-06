// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@screens/Home";
import Vouchers from "@screens/Vouchers";
import Categories from "@screens/Categories";
import Account from "@screens/Account";
import Cart from "@screens/Cart";
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

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarActiveTintColor: "#FF71CD", // Active label color (focused)
            tabBarInactiveTintColor: "#241E92", // Inactive label color (not focused)            //   headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="yard" size={24} color="#FF71CD" />
              ) : (
                <MaterialIcons name="yard" size={24} color="#241E92" />
              ),
          }}
        />

        <Tab.Screen
          name="Vouchers"
          component={Vouchers}
          options={{
            tabBarLabel: "Vouchers",
            tabBarActiveTintColor: "#FF71CD", // Active label color (focused)
            tabBarInactiveTintColor: "#241E92", // Inactive label color (not focused)
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
            tabBarLabel: "Categories",
            tabBarActiveTintColor: "#FF71CD", // Active label color (focused)
            tabBarInactiveTintColor: "#241E92", // Inactive label color (not focused)
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
          name="Account"
          component={Account}
          options={{
            tabBarLabel: "Account",
            tabBarActiveTintColor: "#FF71CD", // Active label color (focused)
            tabBarInactiveTintColor: "#241E92", // Inactive label color (not focused)
            // headerShown: false,
            tabBarIcon: ({ focused }) =>
              // focused ? (
              //   <AntDesign name="shoppingcart" size={24} color="#008E97" />
              // ) : (
              //   <AntDesign name="shoppingcart" size={24} color="black" />
              // ),
              focused ? (
                <Ionicons name="person" size={24} color="#FF71CD" />
              ) : (
                <Ionicons name="person-outline" size={24} color="#241E92" />
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
        {/* <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          /> */}
        {/* <Stack.Screen
            name="Info"
            component={ProductInfoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Address"
            component={AddAddressScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Add"
            component={AddressScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Confirm"
            component={ConfirmationScreen}
            options={{ headerShown: false }}
          />
  
          <Stack.Screen
            name="Order"
            component={OrderScreen}
            options={{ headerShown: false }}
          /> */}

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
