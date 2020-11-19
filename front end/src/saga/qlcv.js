import { put } from 'redux-saga/effects';
import Axios from '../axios/configAxios';
import { message } from 'antd';
import { setCvdList } from '../redux/slice/cvdList';

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
