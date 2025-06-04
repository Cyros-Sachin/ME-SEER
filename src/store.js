import { configureStore } from "@reduxjs/toolkit";
import ActivityReducerController from "./pages/Activity/Redux/index";
import selectedTaskReducer from "./pages/Goals/Redux/selectedTaskSlice";

// reducers

export const store = configureStore({
  reducer: {
    activityTypes: ActivityReducerController.ActivityTypesReducer,
    pinnedActivities: ActivityReducerController.PinnedActivityReducer,
    userSelectedParams: ActivityReducerController.UserSelectedParameterReducer,
    userSelectedPinnedItem:
      ActivityReducerController.UserSelectedPinnedItemDataReducer,
    selectedTask: selectedTaskReducer,
  },
});
