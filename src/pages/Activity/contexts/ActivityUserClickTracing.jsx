import React, { createContext, useContext, useEffect, useState } from "react";
import { PinnedActivityTabResizeContext } from "./PinnedActivityTabResizeItem";
import axios from "axios";

const ActivityUserClickTracingContext = createContext();

const ActivityUserClickTracingProvider = ({ children }) => {
  // Activity selected
  const [activitySelected, setActivitySelected] = useState(1); // at_id
  const [actionIdSelected, setActionIdSelected] = useState([]); // a_id      // will be stored as array
  const [collectiveId, setCollectiveId] = useState(1);
  const [isMealClicked, setIsMealClicked] = useState(false);

  // if the collective id is not present then it is showing up as true.
  // But after the changes to the api call , the collective ids are getting formed. So i need to check if
  // ther are no data retuning back from get then i have to setup none

  const [renderNone, setRenderNone] = useState(false);
  const [activityHeadName, setActivityHeadName] = useState(null);
  const { pinnedResizeItem, setPinnedResizeItem } = useContext(
    PinnedActivityTabResizeContext
  );

  // useEffect(() => {
  //   const fetchPinnedResizeItems = async () => {
  //     try {
  //       // Use Promise.all to wait for all API calls
  //       const results = await Promise.all(
  //         actionIdSelected.map((actionId) =>
  //           axios.get(
  //             `https://meseer.com/dog/generic/get-it/ab12c/${actionId}/${collectiveId}`
  //           )
  //         )
  //       );

  //       setPinnedResizeItem(results.map((res) => res.data));
  //     } catch (error) {
  //       setPinnedResizeItem([]);
  //     }
  //   };

  //   fetchPinnedResizeItems();
  // }, [collectiveId]); // Run this effect once on mount

  // useEffect(() => {
  //   console.log(pinnedResizeItem);
  // }, [pinnedResizeItem]);

  return (
    <ActivityUserClickTracingContext.Provider
      value={{
        activitySelected,
        setActivitySelected,
        actionIdSelected,
        setActionIdSelected,
        collectiveId,
        setCollectiveId,
        renderNone,
        setRenderNone,
        activityHeadName,
        setActivityHeadName,
      }}
    >
      {children}
    </ActivityUserClickTracingContext.Provider>
  );
};

export { ActivityUserClickTracingContext, ActivityUserClickTracingProvider };
