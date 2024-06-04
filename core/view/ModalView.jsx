import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  useColorScheme,
  View
} from "react-native";
import {forwardRef, useImperativeHandle, useState} from "react";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";

export const ModalView = forwardRef((props, ref) => {

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? DefaultTheme : DarkTheme;

  const [isVisible, setVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open() {
        setVisible(true);
      },
      close() {
        setVisible(false);
      }
    }),
  );

  return(
    <Modal animationType={props.animation} transparent={props.transparent} visible={isVisible}>
      <KeyboardAvoidingView behavior={'height'} style={styles.container}>
        <View style={[styles.content, {backgroundColor: theme.colors.card}]}>
          {props.children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0,0, 0.5)'
  },
  content: {
    height: '85%',
    width: '100%',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0
  }
});
