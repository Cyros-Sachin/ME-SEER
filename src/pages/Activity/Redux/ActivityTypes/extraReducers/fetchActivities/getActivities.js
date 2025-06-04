import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch activity types
export const getActivityTypes = createAsyncThunk(
  "activityTypes/getActivityTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://meseer.com/dog/get-activity-type"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching activity types"
      );
    }
  }
);
