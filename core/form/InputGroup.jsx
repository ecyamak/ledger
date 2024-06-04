import {StyleSheet, Text, useColorScheme, View} from "react-native";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";

export default function InputGroup(props) {

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? DefaultTheme : DarkTheme;

  return(
    <View style={styles.group}>
      <View style={{flexDirection:'row', alignItems: 'center', margin: '1%'}}>
        <View style={{flex: 1, height: 1, maxWidth: '5%', backgroundColor: theme.colors.text}}/>
        <Text style={[styles.header, {color: theme.colors.text, fontWeight: 'bold'}]}>{props.header}</Text>
        <View style={{flex: 1, height: 1, backgroundColor: theme.colors.text}}/>
      </View>
      <View style={[styles.inputGroupContainer, {borderColor: theme.colors.text}]}>
        {props.children}
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  group: {
    width: '100%'
  },
  inputGroupContainer: {
    flexDirection: 'row',

    //borderStyle: 'solid',
    //borderColor: '#1C1C1E',
    //borderColor: 'white',
    //borderRadius: 5,
    //borderWidth: 1,

    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',

    padding: 5,
    marginVertical: 5,
  },
  inputGroupHeader: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  border: {
    width: '40%',
    borderStyle: 'solid',
    borderColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 3,
  },
  title: {
    //borderStyle: 'solid',
    //borderColor: 'white',
    //borderWidth: 1,
    height: 20,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    position: "absolute",
    top: -10,
    left: 0,
    //backgroundColor: '#1C1C1E'
  },
  header: {
    //alignSelf: 'flex-start',
    paddingHorizontal: '2%',
    //margin: 5,
    //paddingHorizontal: 10,
    //color: '#F2F2F7',
    //fontWeight: 'bold'
  }
})
