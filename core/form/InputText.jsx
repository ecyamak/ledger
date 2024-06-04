import {StyleSheet, Text, TextInput, useColorScheme, View} from "react-native";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {useRef, useState} from "react";
import {Animated} from "react-native";

export default function InputText(props) {

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? DefaultTheme : DarkTheme;

  const [placeholder = props.placeholder, setPlaceholder] = useState();
  const [value, setValue] = useState();


  const animation = useRef(new Animated.Value(0)).current;

  function onFocus() {
    if (!value) {
      togglePlaceholder();
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }

  function onBlur() {
    if (!value) {
      togglePlaceholder();
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }

  function togglePlaceholder() {
    setPlaceholder(placeholder === null ? props.placeholder : null);
  }

  function handleChange(value) {
    setValue(value);
    props.onChange(props.name, value);
  }

  return(
    <View style={[styles.border, {marginVertical: 4, borderColor: theme.colors.border}]}>
      <Animated.View style={[styles.labelContainer, {opacity: animation}]}>
        <Text style={[styles.label, {color: theme.colors.text, backgroundColor: theme.colors.card, display: placeholder === null ? 'flex' : 'none'}]}>{placeholder === null ? props.placeholder : null}</Text>
      </Animated.View>
      <TextInput
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={handleChange}
        placeholder={placeholder}
        selectionColor={theme.colors.text}
        style={[styles.input, {color: theme.colors.text, backgroundColor: theme.colors.card}]}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 3,
  },
  labelContainer: {
    position: "absolute",
    zIndex: 1,
    left: '4%',
    top: '-18%',
  },
  label: {
    paddingHorizontal: 4,
    fontWeight: 'bold',
    fontSize: 12,
  },
  input: {
    minWidth: '100%',
    //borderRadius: 3,
    height: 40,
    margin: 2,
    paddingHorizontal: '5%',
    fontWeight: "500"
  }
});
