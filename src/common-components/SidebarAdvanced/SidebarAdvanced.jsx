import React, { useEffect } from "react";
import { useSidebar } from "./contexts/SidebarControls";
import SidebarAdvancedMain from "./components/SidebarUrlComponents/SidebarAdvancedMain/SidebarAdvancedMain";
import SidebarAdvancedSpace from "./components/SidebarUrlComponents/SidebarAdvancedSpace/SidebarAdvancedSpace";
import { useSidebarTracing } from "./contexts/SidebarTracing";
import SidebarAdvancedActivity from "./components/SidebarUrlComponents/SidebarAdvancedActivity/SidebarAdvancedActivity";
import SidebarAdvancedGoals from "./components/SidebarUrlComponents/SidebarAdvancedGoals/SidebarAdvancedGoals";
import { useLocation } from "react-router-dom";
import SidebarAdvancedSettings from "./components/SidebarUrlComponents/SidebarAdvancedSettings/SidebarAdvancedSettings";

const SidebarAdvanced = ({ setDraggedTask, setTodoIds }) => {
  const { isExpanded, toggleSidebar } = useSidebar();
  const { sidebarUrl, updateSidebarUrl } = useSidebarTracing();
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (!sidebarUrl) {
      updateSidebarUrl(pathname);
    }
  }, [pathname]);

  const renderSidebarContent = () => {
    switch (sidebarUrl) {
      case "/":
        return (
          <SidebarAdvancedMain
            isExpanded={isExpanded}
            toggleSidebar={toggleSidebar}
            setCurrentUrl={updateSidebarUrl}
          />
        );
      case "/spaces/notes":
        return (
          <SidebarAdvancedSpace
            isExpanded={isExpanded}
            toggleSidebar={toggleSidebar}
            setSidebarUrl={updateSidebarUrl}
          />
        );
      case "/activity/meals":
        return (
          <SidebarAdvancedActivity
            isExpanded={isExpanded}
            toggleSidebar={toggleSidebar}
            setSidebarUrl={updateSidebarUrl}
          />
        );
      case "/goals":
        return (
          <SidebarAdvancedGoals
            isExpanded={isExpanded}
            setDraggedTask={setDraggedTask}
            setTodoIds={setTodoIds}
          />
        );
      case "/settings":
        return <SidebarAdvancedSettings isExpanded={isExpanded} />;
      default:
        if (sidebarUrl.includes("url/settings")) {
          return <SidebarAdvancedSettings isExpanded={isExpanded} />;
        } else {
          return (
            <SidebarAdvancedMain
              isExpanded={isExpanded}
              toggleSidebar={toggleSidebar}
              setCurrentUrl={updateSidebarUrl}
            />
          );
        }
    }
  };

  return renderSidebarContent();
};

export default SidebarAdvanced;
