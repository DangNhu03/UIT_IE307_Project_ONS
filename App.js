// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import { ModalPortal } from "react-native-modals";
// import { Provider } from "react-redux";
import StackNavigator from "@navigation/Navigator";
// import store from "./store";
// import { UserContext } from "./UserContext"
import {AuthContextProvider} from "@contexts/AuthContext"
import Toast from 'react-native-toast-message';
export default function App() {
  return (
    <>
      {/* <Provider store={store}>
        <UserContext> */}
      <AuthContextProvider>
        <StackNavigator />
        <Toast />
      </AuthContextProvider>
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
