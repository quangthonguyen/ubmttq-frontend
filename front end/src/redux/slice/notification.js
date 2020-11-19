import { createSlice } from '@reduxjs/toolkit';

const nofication = createSlice({
  name: 'nofication',
  initialState: false,
  reducers: {
    reduxAddNotification(state, action) {
      return { ...state, notiCvd: action.payload.notiCvd };
    },
    reduxAddNotificationCvdi(state, action) {
      return { ...state, notiCvdi: action.payload.notiCvd };
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
  reduxAddNotificationCvdi,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
