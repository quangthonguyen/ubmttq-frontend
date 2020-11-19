import { put } from 'redux-saga/effects';
import Axios from '../axios/configAxios';
import { message, notification } from 'antd';
import {
  reduxAddUser,
  reduxUpdateUser,
  reduxDeleteUser,
} from '../redux/slice/usersList';

export function* createUser(action) {
  try {
    console.log(action.payload);
    const addUser = yield Axios.post(`/users`, action.payload);
    // console.log({ resupdate: updatedCvd.data });
    yield put(reduxAddUser(addUser.data));
    notification.success({
      message: `Thêm người dùng thành công `,
      placement: 'bottomRight',
    });
  } catch (error) {
    message.error(`Sever error!`);
  }
}

export function* updateUserList(action) {
  try {
    console.log(action.payload);
    const updatedUser = yield Axios.patch(
      `/users/${action.payload.id}`,
      action.payload.data
    );
    console.log({ resupdate: updatedUser.data });
    yield put(reduxUpdateUser(updatedUser.data));
    notification.success({
      message: `Cập nhập người dùng thành công `,
      placement: 'bottomRight',
    });
  } catch (error) {
    message.error(`Sever error!`);
  }
}

export function* removeUser(action) {
  try {
    yield Axios.delete(`/users/${action.payload._id}`);
    yield put(reduxDeleteUser({ id: action.payload._id }));
  } catch (error) {
    message.error(`Sever error!`);
  }
}
