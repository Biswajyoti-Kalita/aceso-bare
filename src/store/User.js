import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from '../services/StorageService';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth: false,
    username: '',
    token: '',
    patientId: null,
    verified: false,
    profile: {},
    email: ""
  },
  reducers: {
    registerUser(state, action) {
      console.log('registerUser', { payload: action.payload });
      if (action.payload && action.payload.patientId) {
        state.patientId = action.payload.patientId;
        state.email = action.payload.email;
      }
    },
    updateUserFields(state, action) {
      if (action.payload) {
        if (action.payload.email)
          state.email = action.payload.email;

        if (action.payload.verified)
          state.verified = action.payload.verified;

        if (action.payload.token)
          state.token = action.payload.token;
      }
    },
    signinUser(state, action) {
      console.log('signinUser', { payload: action.payload });
      if (action.payload) {
        state.auth = true;
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.profile = action.payload?.profile;
        state.verified = action.payload?.verified;

        storage.save("userAuth", state);
      }
    },
    signoutUser(state, action) {
      console.log({ action });
      state.auth = false;
      state.username = '';
      state.token = '';
      state.refreshToken = '';
      state.profile = {};
      state.patientId = null;
      state.verified = false;
      storage.removeItem("userAuth");
    },
  },
});

export const { signinUser, signoutUser, registerUser, updateUserFields } = userSlice.actions;
export default userSlice.reducer;
