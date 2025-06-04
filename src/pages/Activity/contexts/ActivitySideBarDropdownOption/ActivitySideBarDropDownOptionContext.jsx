import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AcitivitySideBarDropDownContext = createContext();

const AcitivitySideBarDropDownProvider = ({ children }) => {
  const [sidebarDropDownActivity, setSidebarDropDownActivity] = useState([]);
  const [trigger, setTrigger] = useState(null);

  useEffect(() => {
    console.log(sidebarDropDownActivity);
  }, [sidebarDropDownActivity]);

  useEffect(() => {
    const fetchActivityDropdownOptions = async () => {
      try {
        const response = await axios.get(
          "https://meseer.com/dog/get-activity-type",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSidebarDropDownActivity(response.data); // Save the response data in state
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchActivityDropdownOptions();
  }, []);

  return (
    <AcitivitySideBarDropDownContext.Provider
      value={{ sidebarDropDownActivity, trigger, setTrigger }}
    >
      {children}
    </AcitivitySideBarDropDownContext.Provider>
  );
};

export { AcitivitySideBarDropDownContext, AcitivitySideBarDropDownProvider };
