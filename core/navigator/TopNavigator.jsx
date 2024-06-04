import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {NavigationContainer, useTheme} from "@react-navigation/native";
import ExpenseScreen from "../../screen/ExpenseScreen";
import WorkInProgress from "../../screen/WorkInProgress";
import {label} from "../../localization/Labels";

export default function TopNavigator(props) {

  const theme = useTheme();
  const TopTab = createMaterialTopTabNavigator();

  function Summary() {
    return (
      <ExpenseScreen></ExpenseScreen>
    );
  }

  function Daily() {
    return (
      <WorkInProgress></WorkInProgress>
    );
  }

  function Monthly() {
    return (
      <WorkInProgress></WorkInProgress>
    );
  }

  function Yearly() {
    return (
      <WorkInProgress></WorkInProgress>
    );
  }

  return(
    <NavigationContainer theme={theme} independent={true}>
      <TopTab.Navigator id={'topTabView'}
                        initialRouteName={label.topNavigator.summary}
                        screenOptions={{tabBarIndicatorStyle: {backgroundColor: theme.colors.text}}}>
        <TopTab.Screen name={label.topNavigator.summary}
                       navigationKey={'summary'}
                       component={Summary} />
        <TopTab.Screen name={label.topNavigator.daily}
                       navigationKey={'daily'}
                       component={Daily} />
        <TopTab.Screen name={label.topNavigator.monthly}
                       navigationKey={'monthly'}
                       component={Monthly} />
        <TopTab.Screen name={label.topNavigator.yearly}
                       navigationKey={'yearly'}
                       component={Yearly} />
      </TopTab.Navigator>
    </NavigationContainer>
  );
}
