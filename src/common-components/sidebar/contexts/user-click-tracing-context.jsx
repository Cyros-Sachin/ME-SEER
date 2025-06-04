import React, { createContext, useEffect, useState } from "react";
import useUserId from "../../../global-custom-hooks/useUserId";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UserClickTracingContext = createContext();

const UserClickTracingProvider = ({ children }) => {
  const [spaceIdSelected, setSpaceIdSelected] = useState(1); // Set to null or appropriate default
  const [spaceIdName, setSpaceIdName] = useState("Work");
  const [subSpaceIdName, setSubSpaceIdName] = useState(null);
  const [subSpaceClicked, setSubSpaceClicked] = useState(1);
  const [subSpaceIdSelected, setSubSpaceIdSelected] = useState([]);
  const userId = useUserId();

  // User Selection Tracing

  useEffect(() => {
    const getSubspaceContent = async () => {
      try {
        // Check if userId exists
        if (!userId) {
          console.error("No userId found in localStorage");
          return;
        }

        const response = await axios.get(
          `https://meseer.com/dog/subspaces/${spaceIdSelected}/${userId}`
        );

        if (response.data) {
          setSubSpaceIdSelected(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching subspace content:", error);
      }
    };

    getSubspaceContent();
  }, [spaceIdSelected]);

  return (
    <UserClickTracingContext.Provider
      value={{
        spaceIdSelected,
        setSpaceIdSelected,
        subSpaceIdSelected,
        setSubSpaceIdSelected,
        subSpaceClicked,
        setSubSpaceClicked,
        spaceIdName,
        setSpaceIdName,
        subSpaceIdName,
        setSubSpaceIdName,
      }}
    >
      {children}
    </UserClickTracingContext.Provider>
  );
};

export { UserClickTracingContext, UserClickTracingProvider };
