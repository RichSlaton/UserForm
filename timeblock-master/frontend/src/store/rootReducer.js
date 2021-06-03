import { combineReducers } from 'redux';
import items from './items/itemsReducer';
import app from './app/appReducer';

const rootReducer = combineReducers({
  items,
  app,
});

export default rootReducer;
