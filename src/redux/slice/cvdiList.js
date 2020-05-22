import { createSlice } from '@reduxjs/toolkit';

const cvdiList = createSlice({
  name: 'cvdiList',
  initialState: {},
  reducers: {
    setCvdiList(state, action) {
      return action.payload;
    },
    reduxAddCvdi(state, action) {
      state.data.unshift(action.payload);
      return state;
    },
    reduxRemoveCvdi(state, action) {
      const data = state.data;
      const newdata = data.filter(
        (value, index) => value._id !== action.payload.id
      );
      const newstate = { ...state, data: newdata };
      return newstate;
    },
    reduxUpdateCvdi(state, action) {
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
const { actions, reducer } = cvdiList;
// Extract and export each action creator by name
export const {
  setCvdiList,
  reduxAddCvdi,
  reduxRemoveCvdi,
  reduxUpdateCvdi,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
