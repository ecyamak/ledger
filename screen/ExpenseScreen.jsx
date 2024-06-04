import {ScrollView, StyleSheet, Text, useColorScheme, View} from "react-native";
import Item from "../component/Item";
import React, {useEffect, useState} from "react";
import {useExpense} from "../core/provider/ExpenseProvider";
import {label} from "../localization/Labels";

export default function ExpenseScreen(props) {

  const colorScheme = useColorScheme();
  const containerStyle = colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const textStyle = colorScheme === "light" ? styles.lightText : styles.darkText;

  const expense = useExpense();

  const expenseList = expense.map((item, index) => {
    return <Item key={index} data={item}></Item>
  });

  const totalAmount = expense.reduce((total, item) => total + item.amount, 0);
  const totalCount = expense.length;

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView style={styles.content}>
        <Text style={[styles.header, textStyle]}>{label.expenses.title}</Text>
        <View style={styles.summary}>
          <View style={styles.right}>
            <Text style={[styles.total, textStyle]}>{`Total: ${totalAmount}$`}</Text>
            <Text style={[styles.info, textStyle]}>{`${totalCount} element(s) listed.`}</Text>
          </View>
        </View>
        <View style={styles.items}>
          {expenseList}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  lightContainer: {
    backgroundColor: '#F2F2F7',
  },
  darkText: {
    color: '#FFFFFF'
  },
  lightText: {
    color: '#000000'
  },
  content: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    paddingHorizontal: 10,
    fontSize: 25,
    fontWeight: "bold"
  },
  items: {
    paddingVertical: 10
  },
  summary: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  right: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
