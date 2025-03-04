import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  fcmToken: null,
  isVerified: false,
  userWalkThrough: false,
  isGoalCreated: false,
  role: '',
  user_type: '',
};

export const AuthSlice = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action?.payload?.token;
    },
    setUserType(state, action) {
      state.user_type = action.payload;
    },
    SetFCMToken(state, action) {
      state.fcmToken = action?.payload?.fcmToken;
    },
    SetUserRole(state, action) {
      state.role = action?.payload;
    },
    setUserLogin(state, action) {
      state.token = action?.payload;
    },
    setUserLogoutAuth(state, action) {
    //  return console.log("🚀 ~ setUserLogoutAuth ~ state:", state)
      state.token = null;
      state.fcmToken = null;
    },
    setWalkThrough(state, action) {
      state.userWalkThrough = action.payload;
      console.log('🚀 ~ setWalkThrough ~ action.payload:', action.payload);
    },
  },
});

export const {
  setUserLogin,
  setUserLogoutAuth,
  setUserToken,
  SetFCMToken,
  setWalkThrough,
  SetUserRole,
  setUserType,
} = AuthSlice.actions;

export default AuthSlice.reducer;
