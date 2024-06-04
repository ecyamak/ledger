import {Animated, StyleSheet, Text, TextInput, useColorScheme, View} from "react-native";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {useEffect, useRef, useState} from "react";

export default function InputDateRange(props) {

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? DefaultTheme : DarkTheme;

  const [placeholder = props.placeholder, setPlaceholder] = useState();
  const [group, setGroup] = useState();
  const [value, setValue] = useState();

  const [startDate, setStartDate] = useState({
    month: null,
    year: null
  });
  const [endDate, setEndDate] = useState({
    month: null,
    year: null
  });



  const animation = useRef(new Animated.Value(0)).current;

  function onFocus(group) {
    if (!value) {
      setGroup(group)
      togglePlaceholder();
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }

  function onBlur(group) {
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

  useEffect(() => {
    if (startDate.month !== null && startDate.year !== null)
      props.onChange("startDate", startDate.month + "/" + startDate.year);
  }, [startDate]);

  useEffect(() => {
    if (endDate.month !== null && endDate.year !== null)
      props.onChange("endDate", endDate.month + "/" + endDate.year);
  }, [endDate]);

  function onChange(group, name, value) {
    if (group === "startDate") {
      setStartDate(prevState => {
        return {
          ...prevState,
          [name]: value,
        }
      });
    }
    else {
      setEndDate(prevState => {
        return {
          ...prevState,
          [name]: value
        }
      });
    }
  }

  return(
    <View style={[styles.border, {marginVertical: 4, borderColor: theme.colors.border}]}>
      <Animated.View style={[styles.labelContainer, {opacity: animation}]}>
        <Text style={[styles.label, {color: theme.colors.text, backgroundColor: theme.colors.card, display: placeholder === null ? 'flex' : 'none'}]}>{placeholder === null ? group : null}</Text>
      </Animated.View>

      <View style={[styles.start, {borderColor: theme.colors.border}]}>
        <TextInput
          onFocus={() => onFocus("Start Date")}
          onBlur={() => onBlur("Start Date")}
          onChangeText={newText => onChange("startDate", "month", newText)}
          placeholder={"Month"}
          selectionColor={theme.colors.text}
          inputMode={"numeric"}
          style={[styles.input, {color: theme.colors.text, backgroundColor: theme.colors.card}]}
        />
        <TextInput
          onFocus={() => onFocus("Start Date")}
          onBlur={() => onBlur("Start Date")}
          onChangeText={newText => onChange("startDate", "year", newText)}
          placeholder={"Year"}
          selectionColor={theme.colors.text}
          inputMode={"numeric"}
          style={[styles.input, {color: theme.colors.text, backgroundColor: theme.colors.card}]}
        />
      </View>

      <View style={styles.end}>
        <TextInput
          onFocus={() => onFocus("End Date")}
          onBlur={() => onBlur("End Date")}
          onChangeText={newText => onChange("endDate", "month", newText)}
          placeholder={"Month"}
          selectionColor={theme.colors.text}
          inputMode={"numeric"}
          style={[styles.input, {color: theme.colors.text, backgroundColor: theme.colors.card}]}
        />
        <TextInput
          onFocus={() => onFocus("End Date")}
          onBlur={() => onBlur("End Date")}
          onChangeText={newText => onChange("endDate", "year", newText)}
          placeholder={"Year"}
          selectionColor={theme.colors.text}
          inputMode={"numeric"}
          style={[styles.input, {color: theme.colors.text, backgroundColor: theme.colors.card}]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "space-evenly"
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
  start: {
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRightWidth: 1
  },
  end: {
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    minWidth: '23%',
    //borderRightWidth: 1,
    //borderWidth: 1,
    //borderColor: "white",
    //borderRadius: 3,
    height: 40,
    margin: 2,
    paddingHorizontal: '5%',
    fontWeight: "500"
  }
});
