import { createSlice } from '@reduxjs/toolkit';

const qlcvList = createSlice({
  name: 'qlcvList',
  initialState: {},
  reducers: {
    reduxSetQlcvList(state, action) {
      return action.payload;
    },
    // reduxAddCvd(state, action) {
    //   state.data.unshift(action.payload);
    //   return state;
    // },
    // reduxRemoveCvd(state, action) {
    //   const data = state.data;
    //   const newdata = data.filter(
    //     (value, index) => value._id !== action.payload.id
    //   );
    //   const newstate = { ...state, data: newdata };
    //   return newstate;
    // },
    reduxUpdateQlcv(state, action) {
      const data = state.data;
      const indexUpdateCvd = data.findIndex(
        (value) => value._id === action.payload._id
      );
      console.log({ redux: action.payload._id });

      state.data[indexUpdateCvd] = action.payload;
      return state;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = qlcvList;
// Extract and export each action creator by name
export const { reduxSetQlcvList, reduxUpdateQlcv } = actions;
// Export the reducer, either as a default or named export
export default reducer;
