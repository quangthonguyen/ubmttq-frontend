import { createSlice } from '@reduxjs/toolkit';

const userInfo = createSlice({
  name: 'userInfo',
  initialState: {},
  reducers: {
    getUserInfo(state, action) {
      return action.payload;
    },
    reduxRemoveUserInfo(state, action) {
      return {};
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = userInfo;
// Extract and export each action creator by name
export const { getUserInfo, reduxRemoveUserInfo } = actions;
// Export the reducer, either as a default or named export
export default reducer;
