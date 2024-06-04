import {createContext, useContext, useReducer} from "react";

const ExpenseContext = createContext(null);
const ExpenseDispatchContext = createContext(null);

export function ExpenseProvider(props) {

  const [expenses, dispatch] = useReducer(expenseReducer, []);

  return(
    <ExpenseContext.Provider value={expenses}>
      <ExpenseDispatchContext.Provider value={dispatch}>
        {props.children}
      </ExpenseDispatchContext.Provider>
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  return useContext(ExpenseContext);
}

export function useExpenseDispatch() {
  return useContext(ExpenseDispatchContext);
}

function expenseReducer(state, action) {
  switch (action.type) {
    case 'add': {
      return [...state, action.payload];
    } case 'update': {
      return [...state, action.payload];
    } case 'delete': {
      return [...state, action.payload];
    }
    default: console.log("Unknown reducer type");
  }
}
