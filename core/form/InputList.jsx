import {
  Animated,
  FlatList, Pressable, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View
} from "react-native";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import React, {useRef, useState} from "react";
import {default as ReAnimated, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";


export default function InputList(props) {

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? DefaultTheme : DarkTheme;

  const textInputRef = useRef(null);

  const [expanded= false, setExpanded] = useState();
  const [placeholder = props.placeholder, setPlaceholder] = useState();
  const [selected, setSelected] = useState();

  const animation = useRef(new Animated.Value(0)).current;

  function toggleFocus() {
    if (!expanded)
      onFocus();
    else
      onBlur();
  }

  function onFocus() {
    setExpanded(true);
    if (!selected) {
      togglePlaceholder();
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }

  function onBlur() {
    setExpanded(false);
    if (!selected) {
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

  const Item = (props) => (
    <Pressable onPress={() => onSelect(props.name)}>
      <View style={[styles.item, {borderColor: theme.colors.border, color: theme.colors.text}]}>
        <Text style={[styles.itemText, {color: theme.colors.text}]}>{props.name}</Text>
      </View>
    </Pressable>
  );

  function onSelect(value) {
    setSelected(value)
    setExpanded(false);
    props.onChange(props.name, value)
    textInputRef.current.blur();
  }

  const translateY = useSharedValue(0);

  const handlePress = () => {
    translateY.value += 50;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateY.value * 2) }],
  }));

  return(

    <View style={[styles.border, {borderColor: theme.colors.border}]}>
      <View>
        <Animated.View style={[styles.labelContainer, {opacity: animation}]}>
          <Text style={[styles.label, {color: theme.colors.text, backgroundColor: theme.colors.card, display: placeholder === null ? 'flex' : 'none'}]}>{placeholder === null ? props.placeholder : null}</Text>
        </Animated.View>
        <TextInput
          ref={textInputRef}
          //onPressIn={toggleFocus}
          onFocus={onFocus}
          onBlur={onBlur}
          //caretHidden={true}
          //editable={false}
          inputMode={"none"}
          value={selected}
          placeholder={placeholder}
          style={[styles.input, {color: theme.colors.text, backgroundColor: theme.colors.card}]}>
        </TextInput>
      </View>
      <ReAnimated.View style={[styles.options, {borderColor: theme.colors.border, display: expanded ? null : 'none'}, animatedStyles]}>
        <ScrollView nestedScrollEnabled={true}>
          <FlatList scrollEnabled={false}
                    data={props.options}
                    renderItem={({item}) => <Item name={item.name}></Item>}
          />
        </ScrollView>
      </ReAnimated.View>
    </View>
  )

}

const styles = StyleSheet.create({
  input: {
    minWidth: '100%',
    borderRadius: 3,
    height: 40,
    margin: 2,
    paddingHorizontal: '5%',
    fontWeight: "500"
  },
  item: {
    //backgroundColor: 'grey',
    height: 40,
    //borderWidth: 1,
    borderBottomWidth: 1,
    //borderRadius: 3,
    marginHorizontal: 10,
    //paddingHorizontal: 10,
    //minWidth: '100%',
    flexDirection: 'row',
    //justifyContent: "flex-start"
  },
  itemText: {
    minWidth: '100%',
    paddingLeft: 10,
    alignSelf: "center",
    fontWeight: "500"
  },
  options: {
    //borderWidth: 1,
    borderTopWidth: 1,
    //marginBottom: 4,
    borderRadius: 3,
    height: 120
  },
  text: {
    alignSelf: "center",
    paddingLeft: '4%'
  },
  border: {
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 4
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
});

