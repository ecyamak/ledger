import {RectButton, Swipeable} from "react-native-gesture-handler";
import React from "react";
import {Animated, I18nManager, StyleSheet, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SwipeableView(props) {

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text style={[styles.actionText, {transform: [{ translateX: trans }]}]}>
          <Ionicons name='pin-outline' size={22} color="#FFFFFF"/>
        </Animated.Text>
      </RectButton>
    );
  };

  const renderRightActions = (progress) =>  {
    const renderRightAction = (icon, color, x, progress) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [x, 0],
      });

      const pressHandler = () => {
        close()
        alert(icon);
      };

      return (
        <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
          <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
            <Ionicons name={icon} size={22} color="#FFFFFF"/>
          </RectButton>
        </Animated.View>
      );
    };

    return(
      <View style={{ width: 192, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
        {renderRightAction('copy-outline', '#C8C7CD', 192, progress)}
        {renderRightAction('pencil-outline', '#FFAB00', 128, progress)}
        {renderRightAction('trash-outline', '#DD2C00', 64, progress)}
      </View>
    );
  };

  const updateRef = ref => {
    this._swipeableRow = ref;
  };

  this.close = () => {
    this._swipeableRow.close();
  };


  return(
    <Swipeable
      containerStyle={styles.container}
      ref={updateRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      {props.children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    borderRadius: 10,
  },
  leftAction: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
