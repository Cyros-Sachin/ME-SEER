import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 1,
  pinnedActivitySelected: null,
  isUserPinnedItemClicked: false,
  userPinnedActivities: [], // array of items
  userPinnedActivityMap: {}, // object for [id,name]: []
  isModalExpanded: false,
};

const PinnedActivitySlice = createSlice({
  name: "pinned_activity",
  initialState,
  reducers: {
    addUserPinnedActivities: (state, action) => {
      const data = action.payload;

      if (Array.isArray(data)) {
        state.userPinnedActivities = data;
      } else if (typeof data === "object" && data !== null) {
        state.userPinnedActivityMap = data;
      }
    },

    modifyUserPinnedActivities: (state, action) => {
      const { key, type, item } = action.payload;
      if (type === "addTaskToGoal") {
        // key is just the goal ID like 89
        for (let mapKey in state.userPinnedActivityMap) {
          let [id] = mapKey.split(",");
          id = id.split("[")[1];
          if (id === key) {
            state.userPinnedActivityMap[mapKey].push(item);
            break;
          }
        }
        return; // Prevent falling through to other conditions
      }
      if (type === "creategoal") {
        // Convert array key like [89, 'goal'] to string '89,goal'
        const stringKey = key.join(",");
        state.userPinnedActivityMap[stringKey] = [];
      } else {
        // For non-creategoal, treat it as array push
        state.userPinnedActivities.push(action.payload);
      }
    },

    removeUserPinnedActivities: (state, action) => {
      const { collective_id, index } = action.payload;

      if (collective_id) {
        state.userPinnedActivities = state.userPinnedActivities.filter(
          (activity) => activity.collective_id !== collective_id
        );
      } else if (index >= 0 && index < state.userPinnedActivities.length) {
        state.userPinnedActivities.splice(index, 1);
      }
    },

    flipIsUserPinnedItemClicked: (state, action) => {
      state.isUserPinnedItemClicked = action.payload;
    },

    flipIsModalOpen: (state, action) => {
      state.isModalExpanded = action.payload;
    },
  },
});

export const {
  addUserPinnedActivities,
  modifyUserPinnedActivities,
  removeUserPinnedActivities,
  flipIsUserPinnedItemClicked,
  flipIsModalOpen,
} = PinnedActivitySlice.actions;

export default PinnedActivitySlice.reducer;
