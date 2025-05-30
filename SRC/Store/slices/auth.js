import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  fcmToken: null,
  isVerified: false,
  userWalkThrough: false,
  isGoalCreated : false ,
  role : '',
};

const AuthSlice = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    setUserToken(state, action) {
      state.token = action?.payload?.token;   
    },
    SetFCMToken(state, action) {
      state.fcmToken = action?.payload?.fcmToken;
    },
    SetUserRole(state, action) {
      console.log('in reduxxxxxxxxx' , action.payload)
      state.role = action?.payload;
    },
    setUserLogin(state, action) {
      state.token = action?.payload;
    },
    setUserLogoutAuth(state, action) {
      state.token = null;
      state.fcmToken = null;
    },
    setWalkThrough(state, action) {
      state.userWalkThrough = action.payload;
      // console.log("🚀 ~ setWalkThrough ~ action.payload:", action.payload)
    },
  },
});

export const {
  setUserLogin,
  setUserLogoutAuth,
  setUserToken,
  SetFCMToken,
  setWalkThrough,
  SetUserRole
} = AuthSlice.actions;

export default AuthSlice.reducer;
