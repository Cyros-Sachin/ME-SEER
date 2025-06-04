import React, { useContext, useEffect, useRef, useState } from "react";
import "./activity.css";

// controllers
import assetController from "./asset-controller";
import contextController from "./context-controller";
import eventController from "./event-controller";
import componentController from "./component-controller/index";
import ModalComponent from "../../common-components/ModalComponent/ModalComponent";
import { PinnedActivityTabResizeContext } from "./contexts/PinnedActivityTabResizeItem";
import { AcitivitySideBarDropDownContext } from "./contexts/ActivitySideBarDropdownOption/ActivitySideBarDropDownOptionContext";
import ActivityResizeItem from "../../common-components/ActivityResizeItem/ActivityResizeItem";

const Activity = () => {
  // context
  const { foodTableData, setFoodTableData, mealResizeData, setMealResizeData } =
    useContext(contextController.FoodTableDataContext);
  const { sidebarDropDownActivity } = useContext(
    AcitivitySideBarDropDownContext
  );
  const { isMealOpen, setIsMealOpen } = useContext(
    contextController.SidebarContext
  );
  const { pinnedActivitiesThorughActivityId } = useContext(
    contextController.PinnedActivityTabContext
  );
  const { activitySelected, setCollectiveId, renderNone, setRenderNone } =
    useContext(contextController.ActivityUserClickTracingContext);

  // Problem:

  const { pinnedResizeName, setPinnedResizeName, pinnedIndex, setPinnedIndex } =
    useContext(PinnedActivityTabResizeContext);

  // Ref
  const foodPlanRef = useRef();
  const bodyRef = useRef();

  const [ActivityName, setActivityName] = useState("");

  const handleResizeClose = () => {
    setIsMealOpen(false);
  };

  // Update Activity Name based on selection
  useEffect(() => {
    const activity = sidebarDropDownActivity.find(
      (item) => item.at_id === activitySelected
    );
    if (activity?.description) {
      setActivityName(
        activity.description[0].toUpperCase() + activity.description.slice(1)
      );
    } else {
      setActivityName("");
    }
  }, [activitySelected, sidebarDropDownActivity]);

  // Close meal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bodyRef.current && bodyRef.current === e.target) {
        setIsMealOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMealOpen]);

  // Abstracted grouped button component
  const GroupedButton = ({ img, title }) => (
    <div className="ml-4 w-36 h-6 flex justify-center items-center">
      <componentController.Button
        img={img}
        title={title}
        background
        textCenter
      />
    </div>
  );

  return (
    <>
      <componentController.Sidebar />
      {/* <componentController.SidebarAdvanced /> */}
      {/* <PinnedActivityTabResizeContext> */}
      <ActivityResizeItem />
      {/* </PinnedActivityTabResizeContext> */}
      <ModalComponent />
      <div
        ref={bodyRef}
        className={`flex flex-col min-h-screen relative ml-[220px] bg-[#ffffff]`}
      >
        {/* {isMealOpen && (
          <componentController.MealResize
            // ref={foodPlanRef}
            handleResize={handleResizeClose}
          />
        )} */}
        <div className="flex items-center mt-8 pl-6">
          <GroupedButton img={assetController.tabs} title="Grouped" />
          <GroupedButton img={assetController.tabs} title="Grouped" />
          <GroupedButton img={assetController.tabs} title="Grouped" />
        </div>

        {/* Meals Display Section */}
        <div className="flex flex-col mt-2 w-full p-2">
          <div className="text-md font-semibold text-slate-800 pl-8 cursor-default">
            Activity {" > "} {ActivityName || ""}
          </div>
          <div
            className="grid grid-cols-4 gap-16 text-[#c6c6c6] rounded-lg cursor-pointer text-sm pl-8 pr-8 mt-8 mb-8 tracking-tight"
            // className="text-xl font-semibold text-stone-500"
          >
            {pinnedActivitiesThorughActivityId?.length > 0 ? (
              pinnedActivitiesThorughActivityId.map((pinnedActivityTabs) => (
                <div
                  key={pinnedActivityTabs.collective_id}
                  // className="grid grid-cols-4 gap-4 bg-gradient-to-r from-black to-gray-500 text-[#c6c6c6] rounded-lg cursor-pointer text-sm p-4 tracking-tight shadow-md shadow-[#0000003f]"
                  className="transform transition-transform duration-300 hover:scale-105 bg-white text-black rounded-md cursor-pointer w-full text-sm p-4 bg-transparent tracking-tight shadow-md shadow-[#0000003f]"
                >
                  <componentController.ActivityButton
                    name={pinnedActivityTabs.name}
                    hover
                    onClickHandler={() =>
                      eventController.handleMealOpen(
                        isMealOpen,
                        setIsMealOpen,
                        pinnedActivityTabs.collective_id,
                        setCollectiveId,
                        setRenderNone,
                        setPinnedResizeName,
                        pinnedActivityTabs.name,
                        setPinnedIndex
                      )
                    }
                  />
                </div>
              ))
            ) : (
              <div>No pinned activities found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
