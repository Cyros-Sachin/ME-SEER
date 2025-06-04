import React, { useContext, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { SidebarContext } from "../sidebar/contexts/sidebar-context";
import MealResize from "../../pages/Activity/components/meal-resize/meal-resize";
import ActivityResizeItemComputed from "../../pages/Activity/components/meal-resize/meal-resize-1";
import { PinnedActivityTabResizeContext } from "../../pages/Activity/contexts/PinnedActivityTabResizeItem";
import { PinnedActivityTabContextProvider } from "../../pages/Activity/contexts/PinnedActivityTabsContext";

const ActivityResizeItem = () => {
  const { isMealOpen, setIsMealOpen } = useContext(SidebarContext);
  const resizeRef = useRef(null);

  const { pinnedResizeName } = useContext(PinnedActivityTabResizeContext);

  const handleResizeClose = (e) => {
    setIsMealOpen(false);
    // if (resizeRef.current && !resizeRef.current.contains(e.target)) {
    // }
  };

  // Add event listener to handle outside clicks when the modal is open
  //   useEffect(() => {
  //     if (isMealOpen) {
  //       document.addEventListener("mousedown", handleResizeClose);
  //       return () => {
  //         document.removeEventListener("mousedown", handleResizeClose);
  //       };
  //     }
  //   }, [isMealOpen]);

  return ReactDOM.createPortal(
    isMealOpen && (
      <div
        // onClick={handleResizeClose}
        className="fixed inset-0 z-50 bg-[#0000002b]"
      >
        {/* Wrap the MealResize component with resizeRef to detect clicks outside */}
        <div className="w-full h-full" ref={resizeRef}>
          {/* <MealResize handleResize={handleResizeClose} /> */}
          <ActivityResizeItemComputed
            handleResizeClose={handleResizeClose}
            pinnedResizeItemName={pinnedResizeName}
          />
        </div>
      </div>
    ),
    document.getElementById("resize")
  );
};

export default ActivityResizeItem;
