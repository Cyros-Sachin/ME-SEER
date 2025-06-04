import React, { Children, createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { ActivityUserClickTracingContext } from "./ActivityUserClickTracing";
import axios from "axios";

const AcitivitySideBarPinnedActivityOptionsContext = createContext();

const AcitivitySideBarPinnedActivityOptionsProvider = ({ children }) => {
  const [
    activitySidebarOptionsForSelectedActivity,
    setActivitySidebarOptionsForSelectedActivity,
  ] = useState([]);

  const { activitySelected } = useContext(ActivityUserClickTracingContext); // at_id

  useEffect(() => {
    // get the activity id
    const getNewActivityOptions = async () => {
      const response = await axios.get(
        `https://meseer.com/dog/activities-items/${activitySelected}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setActivitySidebarOptionsForSelectedActivity(response.data);
    };

    getNewActivityOptions();
  }, [activitySelected]);

  return (
    <AcitivitySideBarPinnedActivityOptionsContext.Provider
      value={{
        activitySidebarOptionsForSelectedActivity,
        setActivitySidebarOptionsForSelectedActivity,
      }}
    >
      {children}
    </AcitivitySideBarPinnedActivityOptionsContext.Provider>
  );
};

export {
  AcitivitySideBarPinnedActivityOptionsContext,
  AcitivitySideBarPinnedActivityOptionsProvider,
};
