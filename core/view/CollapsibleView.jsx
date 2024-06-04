import {useState} from "react";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {StyleSheet, Text, useColorScheme, View} from "react-native";

export default function CollapsibleView(props) {

  const colorScheme = useColorScheme();
  const containerStyle = colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const textStyle = colorScheme === "light" ? styles.lightText : styles.darkText;


  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event) => {
    const onLayoutHeight = event.nativeEvent.layout.height;
    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    };
  };

  const collapsibleStyle = useAnimatedStyle(() => {
    animatedHeight.value = props.expanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [props.expanded]);

  return (
    <Animated.View style={[collapsibleStyle, { overflow: "hidden" }]}>
      <View style={[styles.detail, containerStyle]} onLayout={onLayout}>
        {props.children}
      </View>
    </Animated.View>
  );

}


const styles = StyleSheet.create({
  detail: {
    position: 'absolute',
    minWidth: '100%',
    maxWidth: '100%',
    paddingBottom: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  darkContainer: {
    backgroundColor: '#1C1C1E',
  },
  lightContainer: {
    backgroundColor: '#FFFFFF',
  },
  darkText: {
    color: '#F2F2F7'
  },
  lightText: {
    color: '#000000'
  },
  description: {
    fontSize: 14
  },

})
