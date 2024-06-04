import {Animated, StyleSheet, Text, TouchableWithoutFeedback, useColorScheme, Vibration, View} from "react-native";
import React, {useState} from "react";
import CollapsibleView from "../core/view/CollapsibleView";
import SwipeableView from "../core/view/SwipeableView";
import * as Haptics from "expo-haptics";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Item(props) {

  const colorScheme = useColorScheme();
  const containerStyle = colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const textStyle = colorScheme === "light" ? styles.lightText : styles.darkText;

  const [expanded, setExpanded] = useState(false);

  const [data = props.data, setData] = useState();

  const onItemPress = () => {
    setExpanded(!expanded);
  };

  this.scaleAnimation = new Animated.Value(1);

  function handlePressIn() {
    Animated.spring(this.scaleAnimation, {
      toValue: 3,
      friction: 3,
      tension: 40,
      useNativeDriver: false
    }).start();
  }

  function handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40
    }).start();
  }

  return(
    <SwipeableView>
      <TouchableWithoutFeedback onPressIn={handlePressIn} onPress={onItemPress} onLongPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
        <View style={[styles.item, containerStyle]}>
          <View style={styles.icon}>
            <Ionicons name={data.icon} size={22} style={textStyle}/>
          </View>
          <View style={styles.context}>
            <View style={styles.title}>
              <Text style={[styles.heading, textStyle]}>{data.title}</Text>
            </View>
            <View style={styles.subtitle}>
              <Text style={[styles.subheading, textStyle]}>{data.type}</Text>
            </View>
          </View>
          <View style={styles.amount}>
            <Text style={[styles.duration2, textStyle]}>{data.renew}</Text>
            <Text style={[styles.divider2, textStyle]}>/</Text>
            <Text style={[styles.price, textStyle]}>{data.amount + data.currency}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <CollapsibleView expanded={expanded}>
        <View style={styles.left}>
          <View style={styles.down}>
            <Text style={[styles.description, textStyle]}>{data.description}</Text>
          </View>
          <View style={styles.top}>
            <Text style={[styles.tag, textStyle]}>{data.tag}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.top}>
            <Text style={[styles.bank, textStyle]}>{data.bank}</Text>
          </View>
          <View style={styles.center}>
            <Text style={[styles.card, textStyle]}>{data.card}</Text>
          </View>
          <View style={styles.down}>
            <View style={styles.duration}>
              <Text style={[styles.start, textStyle]}>{data.startDate}</Text>
              <Text style={[styles.divider, textStyle]}>to</Text>
              <Text style={[styles.end, textStyle]}>{data.endDate}</Text>
              <Text style={[styles.divider, textStyle]}></Text>
              <Text style={[styles.bill, textStyle]}>(Every 15th)</Text>
            </View>
          </View>
        </View>
      </CollapsibleView>
    </SwipeableView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: "space-between",
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
  icon: {
  },
  context: {
    width: '50%'
  },
  title: {},
  heading: {
    fontSize: 15,
    fontWeight: "bold"
  },
  subtitle: {},
  subheading: {
    fontSize: 12
  },
  amount: {
    flexDirection: 'row',
    alignItems: "center"
  },
  duration2: {},
  divider2: {
    paddingHorizontal: 5
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  left: {
    width: '50%'
  },
  tag: {
    fontSize: 12,
  },
  right: {
    flexDirection: 'column',
    width: '50%',
    alignItems: 'flex-end'
  },
  bank: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  card: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  duration: {
    flexDirection: 'row'
  },
  start: {
    fontSize: 12
  },
  divider: {
    paddingHorizontal: 2,
    fontSize: 12
  },
  end: {
    fontSize: 12
  },
  bill: {
    fontSize: 12
  },
});
