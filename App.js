import 'react-native-gesture-handler';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import DrawerNavigator from "./core/navigator/DrawerNavigator";
import {StatusBar} from "expo-status-bar";

export default function App() {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <DrawerNavigator></DrawerNavigator>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
