import {FlatList, Platform, Pressable, SafeAreaView, StyleSheet, useColorScheme, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, {useState} from "react";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {expenseIconOptions} from "./Options";

export default function InputIcon(props) {

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? DefaultTheme : DarkTheme;

  const [selected, setSelected] = useState();

  function handleChange(value) {
    setSelected(value);
    props.onChange(props.name, value)
  }

  const Icon = (props) => (
    <Pressable onPress={() => handleChange(props.name)}>
      <View style={[styles.iconContainer, {borderColor: theme.colors.border, backgroundColor: theme.colors.card}, props.name === selected ? {backgroundColor: theme.colors.border} : null]}>
        <Ionicons name={props.name} size={22} color={theme.colors.text}/>
      </View>
    </Pressable>
  );

  return(
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
        data={expenseIconOptions}
        renderItem={({item}) => <Icon name={item.name}></Icon>}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderWidth: 1,
    borderRadius: 3
  },
  icon: {
    textAlign: "center"
  }
})
