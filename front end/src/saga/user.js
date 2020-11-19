import { put, call, all } from 'redux-saga/effects';
import Axios from '../axios/configAxios';
import { message } from 'antd';
import { getUserInfo, reduxRemoveUserInfo } from '../redux/slice/userInfo';

const setLocalStorage = (obj) => {
  localStorage.username = obj.username;
  localStorage.password = obj.password;
};

export function* login(action) {
  yield console.log({ forSaga: action.payload });
  try {
    const userInfo = yield Axios.post('/users/login', {
      username: action.payload.username,
      password: action.payload.password,
    });
    if (userInfo.data.length === 0) {
      message.error(`Tài khoản hoặc mật khẩu không tồn tại!`);
    } else {
      yield call(setLocalStorage, {
        username: action.payload.username,
        password: action.payload.password,
      });
      yield put(getUserInfo(userInfo.data[0]));
      // yield message.success(
      //   `Chào ${userInfo.data[0].lastname} ${userInfo.data[0].firstname} đã quay trở lại.`
      // );
    }
  } catch (error) {
    message.error(`Sever error!`);
  }
}

export function* logout(action) {
  yield all([
    localStorage.removeItem('username'),
    localStorage.removeItem('password'),
  ]);
  yield put(reduxRemoveUserInfo());
}
