import { takeEvery, put, call, all } from 'redux-saga/effects';
import Axios from '../axios/configAxios';
import { message, notification } from 'antd';
import { getUserInfo, reduxRemoveUserInfo } from '../redux/slice/userInfo';
import {
  getUsersList,
  reduxAddUser,
  reduxUpdateUser,
  reduxDeleteUser,
} from '../redux/slice/usersList';
import {
  setCvdList,
  reduxAddCvd,
  reduxRemoveCvd,
  reduxUpdateCvd,
} from '../redux/slice/cvdList';
import {
  setCvdiList,
  reduxAddCvdi,
  reduxRemoveCvdi,
  reduxUpdateCvdi,
} from '../redux/slice/cvdiList';
import {
  reduxAddNotification,
  reduxAddOneNotiQlcv,
  reduxAddOneNotiGuest,
  reduxRemoveOneNotiQlcv,
  reduxRemoveOneNotiGuest,
  reduxAddNotificationCvdi,
} from '../redux/slice/notification';

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
//cvd
export function* loadUsersList(action) {
  try {
    const usersList = yield Axios.get('/users');
    yield put(getUsersList(usersList.data));
  } catch (error) {
    message.error(`Sever error!`);
  }
}

export function* loadCvdList(action) {
  try {
    const cvdList = yield Axios.get(
      `/cvd?page=${action.payload.page}&limit=${action.payload.limit}${action.payload.filters}${action.payload.sorter}`,
      {
        transformResponse: [
          function (data) {
            const olddata = JSON.parse(data);
            olddata.data.forEach((e) => {
              const th = new Date(e.thoihan);
              if (
                (e.trangthai < 2 || e.trangthai === 3) &&
                th.getTime() < Date.now()
              ) {
                e.trangthai = 5;
              }
            });
            return olddata;
          },
        ],
      }
    );
    console.log(cvdList.data);
    yield put(setCvdList(cvdList.data));
  } catch (error) {
    message.error(`Sever error!`);
  }
}

export function* guestloadCvdList(action) {
  try {
    const cvdList = yield Axios.get(
      `/cvd/guest?page=${action.payload.page}&limit=${action.payload.limit}&id=${action.payload.id}${action.payload.filters}${action.payload.sorter}`,
      {
        transformResponse: [
          function (data) {
            const olddata = JSON.parse(data);
            olddata.data.forEach((e) => {
              const th = new Date(e.thoihan);
              if (
                (e.trangthai < 2 || e.trangthai === 3) &&
                th.getTime() < Date.now()
              ) {
                e.trangthai = 5;
              }
              if (!e.thoihan) {
                e.trangthai = null;
              }
            });
            return olddata;
          },
        ],
      }
    );
    yield put(setCvdList(cvdList.data));
  } catch (error) {
    message.error(`Sever error!`);
  }
}

export function* addCvd(action) {
  try {
    console.log(action.payload);
    const newCvd = yield Axios.post(`/cvd`, action.payload);
    console.log(newCvd);
    yield put(reduxAddCvd(newCvd.data));
  } catch (error) {
    message.error(`Sever error!`);
  }
}

export function* removeCvd(action) {
  try {
    console.log(action.payload);
    const removedCvd = yield Axios.delete(`/cvd/${action.payload._id}`);
    console.log(removedCvd);
    yield put(reduxRemoveCvd({ id: action.payload._id }));
  } catch (error) {
    message.error(`Sever error!`);
  }
}

export function* updateCvd(action) {
  try {
    console.log(action.payload);
    const updatedCvd = yield Axios.patch(
      `/cvd/${action.payload.id}`,
      action.payload.data
    );
    console.log({ resupdate: updatedCvd.data });
    yield put(reduxUpdateCvd(updatedCvd.data));
    // notification.success({
    //   message: `Văn bản số ${updatedCvd.data.sovb} cập nhập thành công `,
    //   placement: 'bottomRight',
    // });
  } catch (error) {
    message.error(`Sever error!`);
  }
}

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
//qlcv
export function* loadQlcvList(action) {
  try {
    const cvdList = yield Axios.get(
      `/cvd/qlcv?page=${action.payload.page}&limit=${action.payload.limit}${action.payload.filters}${action.payload.sorter}`,
      {
        transformResponse: [
          function (data) {
            const olddata = JSON.parse(data);
            olddata.data.forEach((e) => {
              const th = new Date(e.thoihan);
              if (
                (e.trangthai < 2 || e.trangthai === 3) &&
                th.getTime() < Date.now()
              ) {
                e.trangthai = 5;
              }
              if (e.trangthai < 4 && th.getTime() < Date.now() - 172899999) {
                e.noti = 1;
              }
            });
            return olddata;
          },
        ],
      }
    );
    console.log({ test: cvdList.data });
    yield put(setCvdList(cvdList.data));
  } catch (error) {
    message.error(`Sever error!`);
  }
}
// cvdi
export function* loadCvdiList(action) {
  try {
    const cvdiList = yield Axios.get(
      `/cvdi?page=${action.payload.page}&limit=${action.payload.limit}${action.payload.filters}${action.payload.sorter}`
    );
    console.log(cvdiList.data);
    yield put(setCvdiList(cvdiList.data));
  } catch (error) {
    message.error(`Sever error!`);
  }
}

export function* guestloadCvdiList(action) {
  try {
    const cvdiList = yield Axios.get(
      `/cvdi/guest?page=${action.payload.page}&limit=${action.payload.limit}&id=${action.payload.id}${action.payload.filters}${action.payload.sorter}`
    );
    yield put(setCvdiList(cvdiList.data));
  } catch (error) {
    message.error(`Sever error!`);
  }
}

export function* addCvdi(action) {
  try {
    console.log(action.payload);
    const newCvdi = yield Axios.post(`/cvdi`, action.payload);
    console.log(newCvdi);
    yield put(reduxAddCvdi(newCvdi.data));
  } catch (error) {
    message.error(`Sever error!`);
  }
}

export function* removeCvdi(action) {
  try {
    console.log(action.payload);
    const removedCvdi = yield Axios.delete(`/cvdi/${action.payload._id}`);
    console.log(removedCvdi);
    yield put(reduxRemoveCvdi({ id: action.payload._id }));
  } catch (error) {
    message.error(`Sever error!`);
  }
}

export function* updateCvdi(action) {
  try {
    console.log(action.payload);
    const updatedCvd = yield Axios.patch(
      `/cvdi/${action.payload.id}`,
      action.payload.data
    );
    console.log({ resupdate: updatedCvd.data });
    yield put(reduxUpdateCvdi(updatedCvd.data));
    // notification.success({
    //   message: `Văn bản đi số ${updatedCvd.data.sovb} cập nhập thành công`,
    //   placement: 'bottomRight',
    // });
  } catch (error) {
    message.error(`Sever error!`);
  }
}
//socket
export function* socketAddCvd(action) {
  try {
    yield put(reduxAddCvd(action.payload));
    notification.success({
      message: `Bạn có 1 văn bản đến mới số ${action.payload.sovb} !`,
      placement: 'bottomRight',
      duration: 0,
    });
  } catch (error) {
    message.error(`Sever error!`);
  }
}
export function* socketAddCvdi(action) {
  try {
    yield put(reduxAddCvdi(action.payload));
    notification.success({
      message: `Bạn có 1 văn bản đi mới số ${action.payload.sovb} !`,
      placement: 'bottomRight',
      duration: 0,
    });
  } catch (error) {
    message.error(`Sever error!`);
  }
}
// export function* updateNotifi(action) {
//   try {
//     console.log(action.payload);
//     const updatedCvd = yield Axios.patch(
//       `/cvd/${action.payload.id}`,
//       action.payload.data
//     );
//     console.log({ resupdate: updatedCvd.data });
//     yield put(reduxUpdateCvd(updatedCvd.data));
//     notification.success({
//       message: `Văn bản số ${updatedCvd.data.sovb} cập nhập thành công `,
//       placement: 'bottomRight',
//     });
//   } catch (error) {
//     message.error(`Sever error!`);
//   }
// }
export function* socketUpdateCvd(action) {
  try {
    yield put(reduxUpdateCvd(action.payload));
  } catch (error) {
    message.error(`Sever error!`);
  }
}
export function* socketremoveCvd(action) {
  try {
    yield put(reduxRemoveCvd({ id: action.payload._id }));
  } catch (error) {
    message.error(`Sever error!`);
  }
}
export function* socketremoveCvdi(action) {
  try {
    yield put(reduxRemoveCvdi({ id: action.payload._id }));
  } catch (error) {
    message.error(`Sever error!`);
  }
}
// notification
export function* loadNotification(action) {
  try {
    const usersList = yield Axios.get('/cvd/notiCvd');
    yield put(reduxAddNotification(usersList.data));
  } catch (error) {
    message.error(`Sever error!`);
  }
}
export function* guestLoadNotification(action) {
  try {
    const usersList = yield Axios.get(
      `/cvd/guestNotiCvd?id=${action.payload.id}`
    );
    yield put(reduxAddNotification(usersList.data));
  } catch (error) {
    message.error(`Sever error!`);
  }
}
export function* guestLoadNotificationCvdi(action) {
  try {
    const usersList = yield Axios.get(
      `/cvdi/guestNotiCvdi?id=${action.payload.id}`
    );
    yield put(reduxAddNotificationCvdi(usersList.data));
  } catch (error) {
    message.error(`Sever error!`);
  }
}
export function* notiQlcvAddOne(action) {
  try {
    yield put(reduxAddOneNotiQlcv());
  } catch (error) {
    message.error(`Sever error!`);
  }
}
export function* notiGuestAddOne(action) {
  try {
    yield put(reduxAddOneNotiGuest());
  } catch (error) {
    message.error(`Sever error!`);
  }
}
export function* notiQlcvRemoveOne(action) {
  try {
    yield put(reduxRemoveOneNotiQlcv());
  } catch (error) {
    message.error(`Sever error!`);
  }
}
export function* notiGuestRemoveOne(action) {
  try {
    yield put(reduxRemoveOneNotiGuest());
  } catch (error) {
    message.error(`Sever error!`);
  }
}
function* watchFetchData() {
  //user
  yield takeEvery('LOGIN', login);
  yield takeEvery('LOGOUT', logout);
  //cvd
  yield takeEvery('LOAD_CVD_LIST', loadCvdList);
  yield takeEvery('GUEST_LOAD_CVD_LIST', guestloadCvdList);
  yield takeEvery('ADD_CVD', addCvd);
  yield takeEvery('REMOVE_CVD', removeCvd);
  yield takeEvery('UPDATE_CVD', updateCvd);
  //user list
  yield takeEvery('CREATE_USER', createUser);
  yield takeEvery('LOAD_USERS_LIST', loadUsersList);
  yield takeEvery('UPDATE_USER_LIST', updateUserList);
  yield takeEvery('REMOVE_USER', removeUser);
  //Qlcv
  yield takeEvery('LOAD_QLCV_LIST', loadQlcvList);
  //cvdi
  yield takeEvery('LOAD_CVDI_LIST', loadCvdiList);
  yield takeEvery('GUEST_LOAD_CVDI_LIST', guestloadCvdiList);
  yield takeEvery('ADD_CVDI', addCvdi);
  yield takeEvery('REMOVE_CVDI', removeCvdi);
  yield takeEvery('UPDATE_CVDI', updateCvdi);
  //socket
  yield takeEvery('SOCKET_ADD_CVD', socketAddCvd);
  yield takeEvery('SOCKET_UPDATE_CVD', socketUpdateCvd);
  yield takeEvery('SOCKET_REMOVE_CVD', socketremoveCvd);
  yield takeEvery('SOCKET_ADD_CVDI', socketAddCvdi);
  // yield takeEvery('SOCKET_UPDATE_CVDI', socketUpdateCvdi);
  yield takeEvery('SOCKET_REMOVE_CVDI', socketremoveCvdi);
  // notification
  yield takeEvery('LOAD_NOTIFICATION', loadNotification);
  yield takeEvery('GUEST_LOAD_NOTIFICATION', guestLoadNotification);
  yield takeEvery('GUEST_LOAD_NOTIFICATIONCVDI', guestLoadNotificationCvdi);
  yield takeEvery('NOTI_QLCV_ADD_ONE', notiQlcvAddOne);
  yield takeEvery('NOTI_GUEST_ADD_ONE', notiGuestAddOne);
  yield takeEvery('NOTI_QLCV_REMOVE_ONE', notiQlcvRemoveOne);
  yield takeEvery('NOTI_GUEST_REMOVE_ONE', notiGuestRemoveOne);
}

export default watchFetchData;
