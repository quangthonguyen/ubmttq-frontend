import { combineReducers } from 'redux';
import userInfo from './userInfo';
import usersList from './usersList';
import cvdList from './cvdList';
import cvdiList from './cvdiList';

const rootReducer = combineReducers({
  userInfo,
  usersList,
  cvdList,
  cvdiList,
});

export default rootReducer;
