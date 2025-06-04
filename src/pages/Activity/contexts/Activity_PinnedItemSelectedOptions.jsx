import axios from "axios";
import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityUserClickTracingContext } from "./ActivityUserClickTracing";

const Activity_PinnedItemSelectedOptionsContext = createContext();

const Activity_PinnedItemSelectedOptionsProvider = ({ children }) => {
  const [activityPinnedItemOptions, setActivityPinnedItemOptions] = useState(
    []
  );

  const { setActionIdSelected } = useContext(ActivityUserClickTracingContext);
  const { activitySelected } = useContext(ActivityUserClickTracingContext);

  useEffect(() => {
    setActivityPinnedItemOptions([]);
    const getPinnedActivityItemOptions = async () => {
      const response = await axios.get(
        `https://meseer.com/dog/pinned-activities-items/${activitySelected}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setActivityPinnedItemOptions(response.data);

      //set actions ids
      let actionsIds = [];
      response.data.forEach((element) => {
        let a_id = element.a_id;
        actionsIds.push(a_id);
      });

      setActionIdSelected(actionsIds);
    };

    getPinnedActivityItemOptions();
  }, [activitySelected]);

  return (
    <Activity_PinnedItemSelectedOptionsContext.Provider
      value={{ activityPinnedItemOptions, setActivityPinnedItemOptions }}
    >
      {children}
    </Activity_PinnedItemSelectedOptionsContext.Provider>
  );
};

export {
  Activity_PinnedItemSelectedOptionsContext,
  Activity_PinnedItemSelectedOptionsProvider,
};
