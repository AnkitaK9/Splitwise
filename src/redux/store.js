import { createStore, combineReducers } from 'redux';
import expensesReducer from './reducers/expenses';

const rootReducer = combineReducers({
  expenses: expensesReducer,
});

const store = createStore(rootReducer);

export default store;
