import { createSlice } from '@reduxjs/toolkit';

const nofication = createSlice({
  name: 'nofication',
  initialState: {},
  reducers: {
    reduxAddNotification(state, action) {
      return action.payload;
    },
    reduxAddOneNotiQlcv(state, action) {
      state.qlcv++;
      return state;
    },
    reduxAddOneNotiGuest(state, action) {
      state.guestCvd++;
      return state;
    },
    reduxRemoveOneNotiQlcv(state, action) {
      state.qlcv--;
      return state;
    },
    reduxRemoveOneNotiGuest(state, action) {
      state.guestCvd--;
      return state;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = nofication;
// Extract and export each action creator by name
export const {
  reduxAddNotification,
  reduxAddOneNotiQlcv,
  reduxAddOneNotiGuest,
  reduxRemoveOneNotiQlcv,
  reduxRemoveOneNotiGuest,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
