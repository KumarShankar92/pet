import thunk from "redux-thunk";
import Reducer from './Reducer/reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
const rootReducer = combineReducers({
  saveData:Reducer
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;