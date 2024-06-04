import {Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View} from "react-native";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";

import InputIcon from "../core/form/InputIcon";
import InputGroup from "../core/form/InputGroup";
import InputText from "../core/form/InputText";
import InputList from "../core/form/InputList";
import InputTag from "../core/form/InputTag";
import InputAmount from "../core/form/InputAmount";
import InputDateRange from "../core/form/InputDateRange";
import {useState} from "react";
import {useExpenseDispatch} from "../core/provider/ExpenseProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import {expenseRenewOptions, expenseTypeOptions} from "../core/form/Options";
import {mockData} from "../tests/MockData";

export default function AddItem(props) {

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? DefaultTheme : DarkTheme;

  const dispatch = useExpenseDispatch();

  const [expense, setExpense] = useState({
    icon: '',
    title: '',
    type: '',
    description: '',
    tag: '',
    amount: 0,
    currency: '',
    bank: '',
    card: '',
    renew: '',
    startDate: '',
    endDate: ''
  });

  function handleChange(name, value) {
    setExpense(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    });
  }

  function onSubmit() {
    props.modalRef.current.close();
    dispatch({
      type: "add",
      payload: expense.icon === '' ? mockData : expense
    })
  }

  function onCancel() {
    props.modalRef.current.close()
  }

  return(
    <>
      <View style={styles.headerContainer}>
        <Pressable onPress={onSubmit}>
          <Ionicons name={'checkmark-outline'} color={theme.colors.text} size={24}/>
        </Pressable>
        <Text style={{color: theme.colors.text, fontWeight: 'bold'}}>New Expense</Text>
        <Pressable onPress={onCancel}>
          <Ionicons name={'close-outline'} color={theme.colors.text} size={24}/>
        </Pressable>
      </View>
      <View style={styles.bodyContainer}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.bodyContent} nestedScrollEnabled={true}>
            <InputGroup header={'Icon'}>
              <InputIcon name={"icon"} onChange={handleChange}/>
            </InputGroup>
            <InputGroup header={'Description'}>
              <View style={{flexDirection: 'column'}}>
                <InputText name={"title"} placeholder={'Title'} onChange={handleChange}/>
                <InputList name={"type"} placeholder={'Type'} onChange={handleChange} options={expenseTypeOptions}/>
                <InputText name={"description"} placeholder={'Description'} onChange={handleChange}/>
                <InputTag name={"tag"} placeholder={'Tag'} onChange={handleChange}/>
              </View>
            </InputGroup>
            <InputGroup header={'Payment'}>
              <View style={{flexDirection: 'column'}}>
                <InputAmount name={"amount"} placeholder={'Amount'} onChange={handleChange}/>
                <InputText name={"bank"} placeholder={'Bank'} onChange={handleChange}/>
                <InputText name={"card"} placeholder={'Card'} onChange={handleChange}/>
              </View>
            </InputGroup>
            <InputGroup header={"Duration"}>
              <View style={{flexDirection: 'column'}}>
                <InputList name={"renew"} placeholder={'Renew'} onChange={handleChange} options={expenseRenewOptions}/>
                <InputDateRange name={"duration"} placeholder={'Duration'} onChange={handleChange}/>
              </View>
            </InputGroup>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );

}

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40
  },
  bodyContent: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
})
