import { createSlice } from '@reduxjs/toolkit';

const usersList = createSlice({
  name: 'usersList',
  initialState: [],
  reducers: {
    getUsersList(state, action) {
      return action.payload;
    },
    reduxAddUser(state, action) {
      state.unshift(action.payload);
      return state;
    },
    reduxUpdateUser(state, action) {
      const index = state.findIndex((e) => action.payload._id === e._id);
      console.log(index);

      state[index] = action.payload;
      return state;
    },
    reduxDeleteUser(state, action) {
      const newstate = state.filter(
        (value, index) => value._id !== action.payload.id
      );
      return newstate;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = usersList;
// Extract and export each action creator by name
export const {
  getUsersList,
  reduxAddUser,
  reduxUpdateUser,
  reduxDeleteUser,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
