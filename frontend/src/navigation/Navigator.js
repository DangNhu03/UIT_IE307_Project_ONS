// Navigate Between Screens using React Navigation in React Native //
// https://aboutreact.com/react-native-stack-navigation //
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../screens/Home';
import Vouchers from '../screens/Vouchers';
import Categories from '../screens/Categories';
import Account from '../screens/Account';
import Cart from '../screens/Cart';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarActiveTintColor: "#FF71CD",    // Active label color (focused)
            tabBarInactiveTintColor: "#241E92",  // Inactive label color (not focused)            //   headerShown: false,
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
            tabBarActiveTintColor: "#FF71CD",    // Active label color (focused)
            tabBarInactiveTintColor: "#241E92",  // Inactive label color (not focused)
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="local-fire-department" size={24} color="#FF71CD" />
              ) : (
                <MaterialIcons name="local-fire-department" size={24} color="#241E92" />
              ),
          }}
        />

        <Tab.Screen
          name="Categories"
          component={Categories}
          options={{
            tabBarLabel: "Categories",
            tabBarActiveTintColor: "#FF71CD",    // Active label color (focused)
            tabBarInactiveTintColor: "#241E92",  // Inactive label color (not focused)
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#FF71CD" />
              ) : (
                <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#241E92" />
              ),
          }}
        />

        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: "Account",
            tabBarActiveTintColor: "#FF71CD",    // Active label color (focused)
            tabBarInactiveTintColor: "#241E92",  // Inactive label color (not focused)
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
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
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
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          /> */}
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});