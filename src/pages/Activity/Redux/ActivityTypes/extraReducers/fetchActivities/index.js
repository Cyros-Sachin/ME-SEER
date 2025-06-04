import { getActivityTypes } from "./getActivities";

const activityTypesExtraReducers = (builder) => {
  builder
    .addCase(getActivityTypes.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getActivityTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.activityTypes = action.payload;
    })
    .addCase(getActivityTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
};

export default activityTypesExtraReducers;
