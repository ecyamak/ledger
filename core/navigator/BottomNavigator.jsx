import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer, useTheme} from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Recent from "../../screen/Recent";
import Upcoming from "../../screen/Upcoming";
import Main from "../../screen/Main";
import {label} from "../../localization/Labels";

export default function BottomNavigator (props) {

  const theme = useTheme();
  const BottomTab = createBottomTabNavigator();

  return(
    <NavigationContainer theme={theme} independent={true}>
      <BottomTab.Navigator id={'bottomTabView'}
                           initialRouteName={label.bottomNavigator.all}
                           screenOptions={{
                             headerShown: false,
                             tabBarActiveTintColor: theme.colors.text}}>
        <BottomTab.Screen name={label.bottomNavigator.recent}
                          navigationKey={'recent'}
                          component={Recent}
                          options={{tabBarIcon: ({color }) => (<Ionicons name="reader-outline" size={24} color={color}/>)}}/>
        <BottomTab.Screen name={label.bottomNavigator.all}
                          navigationKey={'all'}
                          component={Main}
                          options={{tabBarIcon: ({color}) => (<Ionicons name="list-outline" size={24} color={color}/>)}}/>
        <BottomTab.Screen name={label.bottomNavigator.upcoming}
                          navigationKey={'upcoming'}
                          component={Upcoming}
                          options={{tabBarIcon: ({color}) => (<Ionicons name="clipboard-outline" size={24} color={color}/>)}}/>
      </BottomTab.Navigator>
    </NavigationContainer>
  );

}
