import React, {useRef} from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {useColorScheme} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";

import {ModalView} from "../view/ModalView";
import Expenses from "../../screen/Expenses";
import Incomes from "../../screen/Incomes";
import Settings from "../../screen/Settings";
import Analysis from "../../screen/Analysis";
import AddItem from "../../component/AddItem";
import {ExpenseProvider} from "../provider/ExpenseProvider";
import {label} from "../../localization/Labels";

export default function DrawerNavigator(props) {

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? DefaultTheme : DarkTheme;
  const Drawer = createDrawerNavigator();
  const modalRef = useRef(null);

  function search() {
    return(
      <Ionicons name="filter-outline"
                size={24}
                onPress={() => modalRef.current.open()}
                style={{paddingLeft: 20, color: theme.colors.text}}/>
    );
  }

  function create() {
    return(
      <Ionicons name="create-outline"
                size={24}
                onPress={() => modalRef.current.open()}
                style={{paddingRight: 20, color: theme.colors.text}}/>
    );
  }

  return(
    <ExpenseProvider>
      <NavigationContainer theme={theme} independent={true}>
        <Drawer.Navigator id={'drawerView'}
                          initialRouteName={label.drawerNavigator.expenses}
                          screenOptions={{
                            headerShown: true,
                            headerTitle: label.appName,
                            headerRight: create,
                            headerLeft: search,
                            headerShadowVisible: false,
                            drawerActiveBackgroundColor: theme.colors.border,
                            drawerActiveTintColor: theme.colors.text}}>
          <Drawer.Screen name={label.drawerNavigator.expenses}
                         navigationKey={'expenses'}
                         component={Expenses}
                         options={{drawerIcon: ({color}) => (<Ionicons name="wallet-outline" size={24} color={color}/>)}}/>
          <Drawer.Screen name={label.drawerNavigator.incomes}
                         navigationKey={'incomes'}
                         component={Incomes}
                         options={{drawerIcon: ({color}) => (<Ionicons name="cash-outline" size={24} color={color}/>)}}/>
          <Drawer.Screen name={label.drawerNavigator.analysis}
                         navigationKey={'charts'}
                         component={Analysis}
                         options={{drawerIcon: ({color}) => (<Ionicons name="analytics-outline" size={24} color={color}/>)}}/>
          <Drawer.Screen name={label.drawerNavigator.settings}
                         navigationKey={'settings'}
                         component={Settings}
                         options={{drawerIcon: ({color}) => (<Ionicons name="settings-outline" size={24} color={color}/>)}}/>
        </Drawer.Navigator>
      </NavigationContainer>

      <ModalView ref={modalRef} animation={'slide'} transparent={true}>
        <AddItem modalRef={modalRef} />
      </ModalView>
    </ExpenseProvider>
  );
}
