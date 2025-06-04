import React, { useContext, createContext } from "react";
import contextController from "../../context-controller";

const ActivityUniversalContext = createContext();

const ActivityUniversalProvider = ({ children }) => {
  // get all the context
  const { sidebarDropDownActivity } = useContext(
    contextController.AcitivitySideBarDropDownContext
  );
  const c2 = useContext(
    contextController.AcitivitySideBarPinnedActivityOptionsContext
  );
  const { activitySelected } = useContext(
    contextController.ActivityUserClickTracingContext
  );
  const c4 = useContext(
    contextController.Activity_PinnedItemSelectedOptionsContext
  );
  const c5 = useContext(contextController.PinnedActivityTabContext);
  const c6 = useContext(contextController.PinnedActivityTabResizeContext);

  console.log(activitySelected);

  return (
    <ActivityUniversalContext.Provider value={{ activitySelected }}>
      {children}
    </ActivityUniversalContext.Provider>
  );
};

export { ActivityUniversalContext, ActivityUniversalProvider };
