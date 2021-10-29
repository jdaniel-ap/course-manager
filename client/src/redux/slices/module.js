import { createSlice } from "@reduxjs/toolkit";

const initialState = {
}

const slice = createSlice({
  name: 'module',
  initialState,
  reducers: {
    setModuleData(state, {payload}) {
      return {...payload}
    },
    setLessonData(state, { payload }) {
      return {...state, lesson: [...state.lesson, payload]};
    },
    updateModuleName(state, { payload }) {
      return {...state, name: payload }
    }
  }
});

export const { setModuleData, setLessonData, updateModuleName } = slice.actions;

export default slice.reducer;
