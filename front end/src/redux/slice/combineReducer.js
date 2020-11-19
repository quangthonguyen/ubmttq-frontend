import { combineReducers } from 'redux';
import userInfo from './userInfo';
import usersList from './usersList';
import cvdList from './cvdList';
import cvdiList from './cvdiList';
import notification from './notification';

const rootReducer = combineReducers({
  userInfo,
  usersList,
  cvdList,
  cvdiList,
  notification,
});

export default rootReducer;
