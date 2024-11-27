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
import Notifications from "../screens/Notifications.js";
import Cart from '../screens/Cart';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderBar from "../components/HeaderBar.js";
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const badgeCount = 3;

  function BottomTabs() {
    return (
      <Tab.Navigator initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FF71CD",    // Active label color (focused)
          tabBarInactiveTintColor: "#241E92",  // Inactive label color (not focused)
        }}>
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
            tabBarLabel: "Danh mục",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#FF71CD" />
              ) : (
                <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#241E92" />
              ),
          }}
        />

        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarLabel: "Thông báo",
            tabBarIcon: ({ focused }) => (
              <View style={{ position: 'relative' }}>
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
                <MaterialIcons name="person-outline" size={24} color="#FF71CD" />
              ) : (
                <MaterialIcons name="person-outline" size={24} color="#241E92" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false, }}
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