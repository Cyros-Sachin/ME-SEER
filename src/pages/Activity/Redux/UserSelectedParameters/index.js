// This will be the component responsible for middle part
//

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  IdsFromOptions: [],
  ActivitySelectedByUser: null,
  collectiveIdSelectedByUser: null,
  activityTrigger: null,
  selectedActivityName: null,
};

const UserSelectedParams = createSlice({
  name: "user_selected_params",
  initialState,
  reducers: {
    addOptionsIds: (state, action) => {
      state.IdsFromOptions = action.payload;
    },

    setActivitySelectedByUser: (state, action) => {
      state.ActivitySelectedByUser = action.payload;
    },

    setCollectiveIdSelectedByUser: (state, action) => {
      state.collectiveIdSelectedByUser = action.payload;
    },

    setActivityTrigger: (state, action) => {
      state.activityTrigger = action.payload;
    },
    setSelectedActivityName: (state, action) => {
      state.selectedActivityName = action.payload;
    },
  },
});

export const {
  addOptionsIds,
  setActivitySelectedByUser,
  setCollectiveIdSelectedByUser,
  setActivityTrigger,
  setSelectedActivityName,
} = UserSelectedParams.actions;
export default UserSelectedParams.reducer;
