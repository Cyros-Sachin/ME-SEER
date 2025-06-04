import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTask: null, // Initially, no task is selected
  selectedColor: null, // Initially, no color is selected
};

const selectedTaskSlice = createSlice({
  name: "selectedTask",
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload; // Update selected task
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null; // Clear selection
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload; // Set new selected color
    },
    clearSelectedColor: (state) => {
      state.selectedColor = null; // Clear color selection
    },
  },
});

export const {
  setSelectedTask,
  clearSelectedTask,
  setSelectedColor,
  clearSelectedColor,
} = selectedTaskSlice.actions;
export default selectedTaskSlice.reducer;
