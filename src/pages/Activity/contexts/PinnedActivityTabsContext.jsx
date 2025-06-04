import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityUserClickTracingContext } from "./ActivityUserClickTracing";

const PinnedActivityTabContext = createContext();

const PinnedActivityTabContextProvider = ({ children }) => {
  const [
    pinnedActivitiesThorughActivityId,
    setPinnedActivitiesThroughActivityId,
  ] = useState([]);

  const { activitySelected } = useContext(ActivityUserClickTracingContext);

  useEffect(() => {
    const getActivitiesThroughActivityId = async () => {
      try {
        const response = await axios.get(
          `https://meseer.com/dog/generic/pinned-activity/user-data/${localStorage.getItem(
            "userId",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )}/${activitySelected}`
        );

        // Log the response to check the data
        // console.log("Pinned activities response:", response.data);

        if (response.data && Array.isArray(response.data.pinned_activity)) {
          setPinnedActivitiesThroughActivityId(response.data.pinned_activity);
        } else {
          console.log("No pinned activities found");
          setPinnedActivitiesThroughActivityId([]);
        }
      } catch (error) {
        console.error("Error fetching pinned activities:", error);
        setPinnedActivitiesThroughActivityId([]); // Handle error gracefully
      }
    };

    // Ensure activitySelected exists before fetching
    if (activitySelected) {
      getActivitiesThroughActivityId();
    }
  }, [activitySelected]);

  return (
    <PinnedActivityTabContext.Provider
      value={{
        pinnedActivitiesThorughActivityId,
        setPinnedActivitiesThroughActivityId,
      }}
    >
      {children}
    </PinnedActivityTabContext.Provider>
  );
};

export { PinnedActivityTabContext, PinnedActivityTabContextProvider };
