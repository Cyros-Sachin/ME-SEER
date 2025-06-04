import { createSlice } from "@reduxjs/toolkit";
import activityTypesExtraReducers from "./extraReducers/fetchActivities";

const initialState = {
  count: 1,
  activitySelected: null,
  subActivitySelected: null,
  activityTypes: [], // ✅ Fix: Set it as an array
  subActivityTypes: [],
  activityOptions: [],
  activityOptionSelected: null,
};

const activityTypeSlice = createSlice({
  name: "activity_type",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.activityTypes = action.payload;
    },

    updateActivitySelected: (state, action) => {
      state.activitySelected = action.payload;
    },
    updateSubActivitySelected: (state, action) => {
      state.subActivitySelected = action.payload;
    },

    addSubActivities: (state, action) => {
      state.subActivityTypes = action.payload;
    },

    addActivityOptions: (state, action) => {
      state.activityOptions = action.payload;
    },

    incrementCount: (state, action) => {
      state.count++;
    },
    updateactivityOptionSelected: (state, action) => {
      state.activityOptionSelected = action.payload;
    },
  },
});

export const {
  addData,
  incrementCount,
  addSubActivities,
  updateActivitySelected,
  updateSubActivitySelected,
  addActivityOptions,
  updateactivityOptionSelected,
} = activityTypeSlice.actions;
export default activityTypeSlice.reducer;
