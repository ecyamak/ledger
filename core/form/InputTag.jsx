import {FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View} from "react-native";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import React, {useEffect, useRef, useState} from "react";
import {Animated as RAnimated} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {expenseTagOptions} from "./Options";

export default function InputTag(props) {

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? DefaultTheme : DarkTheme;

  const [expanded= false, setExpanded] = useState();
  const [placeholder = props.placeholder, setPlaceholder] = useState();
  const [selected, setSelected] = useState();

  const [selectedTags, setSelectedTags] = useState([]);

  const animation = useRef(new RAnimated.Value(0)).current;

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
      RAnimated.timing(animation, {
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
      RAnimated.timing(animation, {
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
    let index = selectedTags.indexOf(value);
    if (index !== -1) {
      selectedTags.splice(index, 1);
    } else {
      selectedTags.push(value);
    }
    setSelected(value);
    //setExpanded(false);
    props.onChange(props.name, selectedTags.toString());
  }

  const translateY = useSharedValue(0);

  const handlePress = () => {
    translateY.value += 50;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateY.value * 2) }],
  }));

  const Item = (props) => (
    <Pressable onPress={() => onSelect(props.name)}>
      <View style={[styles.item, {borderColor: theme.colors.border, color: theme.colors.text}, selectedTags.includes(props.name) ? {backgroundColor: theme.colors.border} : null]}>
        <Text style={[styles.itemText, {color: theme.colors.text}]}>{props.name}</Text>
      </View>
    </Pressable>
  );

  return(
    <View style={[styles.border, {borderColor: theme.colors.border}]}>
      <View>
        <RAnimated.View style={[styles.labelContainer, {opacity: animation}]}>
          <Text style={[styles.label, {color: theme.colors.text, backgroundColor: theme.colors.card, display: placeholder === null ? 'flex' : 'none'}]}>{placeholder === null ? props.placeholder : null}</Text>
        </RAnimated.View>
        <TextInput
          //onPressIn={toggleFocus}
          onFocus={onFocus}
          onBlur={onBlur}
          value={selectedTags.toString()}
          inputMode={"none"}
          placeholder={placeholder}
          style={[styles.input, {color: theme.colors.text, backgroundColor: theme.colors.card}]}>
        </TextInput>
      </View>
      <Animated.View style={[styles.options, {borderColor: theme.colors.border, display: expanded ? null : 'none'}, animatedStyles]}>
        <FlatList horizontal={true}
                    data={expenseTagOptions}
                    renderItem={({item}) => <Item name={item.name}></Item>}
        />

      </Animated.View>
    </View>
  );

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
  options: {
    //borderWidth: 1,
    borderTopWidth: 1,
    //marginBottom: 4,
    borderRadius: 3,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5
  },
  item: {
    height: 30,
    borderWidth: 1,
    //borderRightWidth: 1,
    //borderBottomWidth: 1,
    borderRadius: 5,
    marginRight: 4,
    //paddingHorizontal: 4,
    //minWidth: '100%',
    flexDirection: 'row',
    //justifyContent: "flex-start"
  },
  itemText: {
    minWidth: '100%',
    paddingHorizontal: 10,
    alignSelf: "center",
    fontWeight: '500'
  },
  separator: {
    borderWidth: 1,
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
