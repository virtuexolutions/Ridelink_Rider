import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socketReducer",
  initialState: initialState,
  reducers: {
    updateSocket(state, action) {
      console.log(
        "in reduxx============>",
        action.payload,
        "fffffffffffdfsdsdsd"
      );
      state.socket = action.payload;
    },
  },
});

export const { updateSocket } = socketSlice.actions;

export default socketSlice.reducer;
