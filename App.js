// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import { ModalPortal } from "react-native-modals";
// import { Provider } from "react-redux";
import StackNavigator from "@navigation/Navigator";
// import store from "./store";
// import { UserContext } from "./UserContext"
import { AuthContextProvider } from "@contexts/AuthContext";
import Toast from "react-native-toast-message";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";

export default function App() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }
  return (
    <>
      {/* <Provider store={store}>
        <UserContext> */}
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <AuthContextProvider>
            <StackNavigator />
            <Toast />
          </AuthContextProvider>
        </ClerkLoaded>
      </ClerkProvider>
      {/* <ModalPortal /> */}
      {/* </UserContext>
      </Provider> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
