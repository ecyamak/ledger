import {StyleSheet, Text, TextInput, useColorScheme, View} from "react-native";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";

export default function SearchBar(props) {

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? DefaultTheme : DarkTheme;

  return(
    <TextInput
      placeholder={props.placeholder}
      style={[styles.input, {color: theme.colors.text, backgroundColor: theme.colors.border}]}
    >
    </TextInput>
  );

}

const styles = StyleSheet.create({
  input: {
    minWidth: '100%',
    borderRadius: 3,
    height: 30,
    //margin: 10,
    paddingHorizontal: '5%'
  }
});

