import { createSlice } from "@reduxjs/toolkit";
// qwewqewq
const initialState = {
  activityData: {},
};

const UserSelectedPinnedItemDataSlice = createSlice({
  name: "user_selected_pinned_item_data",
  initialState,
  reducers: {
    updateActivityData: (state, action) => {
      // Correct way: Mutating state using Redux Toolkit (Immer under the hood)
      //   state.activityData.push(action.payload);
      //   console.log(action.payload);
      let key = Object.keys(action.payload)[0];
      state.activityData[key] = action.payload[key];
      // Alternative (Immutable way):
      // state.activityData = [...state.activityData, action.payload];
    },
  },
});

// Exporting the action correctly
export const { updateActivityData } = UserSelectedPinnedItemDataSlice.actions;
export default UserSelectedPinnedItemDataSlice.reducer;
