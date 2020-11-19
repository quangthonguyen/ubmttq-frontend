import { put } from 'redux-saga/effects';
import Axios from '../axios/configAxios';
import { message } from 'antd';
import {
  setCvdiList,
  reduxAddCvdi,
  reduxRemoveCvdi,
  reduxUpdateCvdi,
} from '../redux/slice/cvdiList';

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
