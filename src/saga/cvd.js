import { put } from 'redux-saga/effects';
import Axios from '../axios/configAxios';
import { message } from 'antd';
import {
  setCvdList,
  reduxAddCvd,
  reduxRemoveCvd,
  reduxUpdateCvd,
} from '../redux/slice/cvdList';

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
