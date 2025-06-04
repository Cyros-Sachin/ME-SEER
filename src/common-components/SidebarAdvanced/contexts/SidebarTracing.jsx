import { nanoid } from "nanoid";
import { createContext, useContext, useState, useEffect } from "react";

// Create Sidebar Context
const SidebarTracing = createContext();

export const SidebarTracingProvider = ({ children }) => {
  const [userPersistenceSettings, setUserPersistenceSettings] = useState({
    spaceIdSelected: "",
    subSpaceIdSelected: "",
    spaceName: "",
    subspaceName: "",
    activityIdSelected: "",
    sidebarUrl: "",
    browserUrl: "",
    activityIdSelected: "",
    subActivitySelected: "",
  });

  // Retrieve persisted data from localStorage safely
  const getPersistedState = (key, defaultValue) => {
    try {
      const storedValue = localStorage.getItem("persistTracing");
      if (storedValue) {
        const parsedData = JSON.parse(storedValue);
        return parsedData[key] !== undefined ? parsedData[key] : defaultValue;
      }
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage:`, error);
    }
    return defaultValue;
  };

  // Names to display
  const [spaceSelected, setSpaceSelected] = useState("Space");

  // Ids
  const [spaceIdSelected, setSpaceIdSelected] = useState(
    getPersistedState("spaceIdSelected", 1)
  );
  const [subSpaceIdSelected, setSubSpaceIdSelected] = useState(
    getPersistedState("subSpaceIdSelected", 1)
  );
  const [spaces, setSpaces] = useState([]);
  const [subspaces, setSubSpaces] = useState([]);
  const [sidebarUrl, setSidebarUrl] = useState(
    getPersistedState("sidebarUrl", "/")
  );

  const [spaceOptions, setSpaceOptions] = useState([
    { id: nanoid(), name: "Todo" },
    { id: nanoid(), name: "Wordpad" },
  ]);

  // Method to update localStorage asdad
  const updateLocalStorage = (spaceId, subSpaceId, url) => {
    const persistData = {
      spaceIdSelected: spaceId,
      subSpaceIdSelected: subSpaceId,
      sidebarUrl: url,
    };
    localStorage.setItem("persistTracing", JSON.stringify(persistData));
  };

  // Ensure initial values are persisted in localStorage if not present
  useEffect(() => {
    const persistData = JSON.parse(localStorage.getItem("persistTracing"));
    if (!persistData) {
      updateLocalStorage(1, 1, "/");
    }
  }, []);

  // Methods to update state and persist changes
  const updateSpaceIdSelected = (id) => {
    setSpaceIdSelected(id);
    updateLocalStorage(id, subSpaceIdSelected, sidebarUrl);
  };

  const updateSubSpaceIdSelected = (id) => {
    setSubSpaceIdSelected(id);
    updateLocalStorage(spaceIdSelected, id, sidebarUrl);
  };

  const updateSidebarUrl = (url) => {
    setSidebarUrl(url); // Ensure UI updates immediately
    updateLocalStorage(spaceIdSelected, subSpaceIdSelected, url);
  };

  // Modal Controllers
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <SidebarTracing.Provider
      value={{
        spaceSelected,
        setSpaceSelected,
        spaceIdSelected,
        updateSpaceIdSelected,
        subSpaceIdSelected,
        updateSubSpaceIdSelected,
        spaces,
        setSpaces,
        subspaces,
        setSubSpaces,
        spaceOptions,
        setSpaceOptions,
        sidebarUrl,
        setSidebarUrl,
        updateSidebarUrl,
        isEditModalOpen,
        setIsEditModalOpen,
      }}
    >
      {children}
    </SidebarTracing.Provider>
  );
};

// Custom Hook to use Sidebar Context
export const useSidebarTracing = () => {
  return useContext(SidebarTracing);
};
