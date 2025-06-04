// PinnedActivityTabResizeProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { PinnedActivityTabContext } from "./PinnedActivityTabsContext";

export const PinnedActivityTabResizeContext = createContext();

export const PinnedActivityTabResizeProvider = ({ children }) => {
  const [pinnedResizeItem, setPinnedResizeItem] = useState([]);
  const [resizeInformation, setResizeInformation] = useState(null);
  const [pinnedResizeName, setPinnedResizeName] = useState("");
  const [pinnedIndex, setPinnedIndex] = useState("");

  useEffect(() => {
    console.log(pinnedIndex);
  }, [pinnedIndex]);

  return (
    <PinnedActivityTabResizeContext.Provider
      value={{
        pinnedResizeItem,
        setPinnedResizeItem,
        resizeInformation,
        setResizeInformation,
        pinnedResizeName,
        setPinnedResizeName,
        pinnedIndex,
        setPinnedIndex,
      }}
    >
      {children}
    </PinnedActivityTabResizeContext.Provider>
  );
};
