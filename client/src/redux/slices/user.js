import { createSlice } from "@reduxjs/toolkit";

const initialState = {
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, {payload}) {
      return {...payload}
    }
  }
});

export const { setUserInfo } = slice.actions;

export default slice.reducer;
