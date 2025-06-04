import { createContext, useContext, useState } from "react";

// Create Sidebar Context
const SidebarControls = createContext();

export const SidebarControlsProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <SidebarControls.Provider value={{ isExpanded, toggleSidebar }}>
      {children}
    </SidebarControls.Provider>
  );
};

// Custom Hook to use Sidebar Context
export const useSidebar = () => {
  return useContext(SidebarControls);
};
