import {
  Animated,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View
} from "react-native";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import React, {useRef, useState} from "react";
import {default as ReAnimated, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {expenseCurrencyOptions} from "./Options";

export default function InputAmount(props) {

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? DefaultTheme : DarkTheme;

  const [placeholder = props.placeholder, setPlaceholder] = useState();

  const [value, setValue] = useState(0);

  const [expanded = false, setExpanded] = useState();
  const [selected = '$', setSelected] = useState('$');

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

  function onSelect(value) {
    setSelected(value)
    setExpanded(false);
    props.onChange('currency', value);
  }

  const translateY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(translateY.value * 2)}],
  }));

  const Item = (props) => (
    <Pressable onPress={() => onSelect(props.symbol)}>
      <View style={[styles.item, {borderColor: theme.colors.border, color: theme.colors.text}]}>
        <Text style={[styles.itemText, {color: theme.colors.text}]}>{props.name + " " + props.symbol}</Text>
      </View>
    </Pressable>
  );

  function onChange(value) {
    setValue(value);
    props.onChange(props.name, parseInt(value));
  }

  return (
    <View style={[styles.border, {marginVertical: 4, borderColor: theme.colors.border}]}>
      <View style={styles.amountText}>
        <Animated.View style={[styles.labelContainer, {opacity: animation}]}>
          <Text style={[styles.label, {
            color: theme.colors.text,
            backgroundColor: theme.colors.card,
            display: placeholder === null ? 'flex' : 'none'
          }]}>{placeholder === null ? props.placeholder : null}</Text>
        </Animated.View>
        <TextInput
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChange}
          placeholder={placeholder}
          selectionColor={theme.colors.text}
          inputMode={"decimal"}
          style={[styles.input, {
            color: theme.colors.text,
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border
          }]}
        />
        <TextInput
          onPressIn={() => setExpanded(!expanded)}
          onBlur={() => setExpanded(false)}
          caretHidden={true}
          //editable={false}
          inputMode={"none"}
          value={selected}
          //placeholder={placeholder}
          style={[styles.currency, {color: theme.colors.text, backgroundColor: theme.colors.card}]}>
        </TextInput>
      </View>
      <ReAnimated.View style={[styles.options, {borderColor: theme.colors.border, display: expanded ? null : 'none'}, animatedStyles]}>
        <ScrollView nestedScrollEnabled={true}>
          <FlatList scrollEnabled={false}
                    data={expenseCurrencyOptions}
                    renderItem={({item}) => <Item name={item.name} symbol={item.symbol}></Item>}
          />
        </ScrollView>
      </ReAnimated.View>
    </View>
  );

}

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 3,
  },
  amountText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  currency: {
    width: 45,
    height: 40,
    margin: 2,
    //borderWidth: 1,
    //borderColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
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
    borderRightWidth: 1,
    minWidth: '85%',
    height: 40,
    margin: 2,
    paddingHorizontal: '5%',
    fontWeight: "500"
  },
  options: {
    borderTopWidth: 1,
    //marginBottom: 4,
    borderRadius: 3,
    height: 120
  },
  item: {
    height: 40,
    //borderWidth: 1,
    borderBottomWidth: 1,
    //borderRadius: 3,
    marginHorizontal: 10,
    //paddingHorizontal: 10,
    //minWidth: '100%',
    flexDirection: 'row',
    justifyContent: "flex-end"
  },
  itemText: {
    //minWidth: '80%',
    paddingRight: 10,
    alignSelf: "center",
    fontWeight: "500"
  },
});
