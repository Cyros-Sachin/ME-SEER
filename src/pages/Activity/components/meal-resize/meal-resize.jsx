import React, { forwardRef, useContext, useEffect, useState } from "react";
import {
  CaretDoubleRight,
  LineVertical,
  CaretUp,
  CaretDown,
  DotsThree,
} from "@phosphor-icons/react";
// controllers
import { PinnedActivityTabResizeContext } from "../../contexts/PinnedActivityTabResizeItem";
import { Activity_PinnedItemSelectedOptionsContext } from "../../contexts/Activity_PinnedItemSelectedOptions";
import { PinnedActivityTabContext } from "../../contexts/PinnedActivityTabsContext";
import { ActivityUserClickTracingContext } from "../../contexts/ActivityUserClickTracing";
import MealComponents from "./components/MealComponents/MealComponents";
import CreateActivityTemplate from "./components/CreateActivityTemplate/CreateActivityTemplate";

const MealResize = forwardRef((props, ref) => {
  const { pinnedResizeItem, resizeInformation, setResizeInformation } =
    useContext(PinnedActivityTabResizeContext);

  const { activityPinnedItemOptions } = useContext(
    Activity_PinnedItemSelectedOptionsContext
  );

  const { pinnedActivitiesThorughActivityId } = useContext(
    PinnedActivityTabContext
  );

  const { renderNone, setRenderNone } = useContext(
    ActivityUserClickTracingContext
  );

  const [displayData, setDisplayData] = useState(null);
  const { pinnedResizeName } = useContext(PinnedActivityTabResizeContext);

  // Update `renderNone` based on `pinnedResizeItem`
  useEffect(() => {
    if (pinnedResizeItem && pinnedResizeItem.length > 0) {
      const allEmpty = pinnedResizeItem.every((item) => {
        if (!item) return true;
        const itemValues = Object.values(item)[0];
        return Array.isArray(itemValues)
          ? itemValues.length === 0
          : Object.keys(itemValues || {}).length === 0;
      });
      setRenderNone(allEmpty);
    } else {
      setRenderNone(true);
    }
  }, [pinnedResizeItem]);

  // Prepare `displayData` for rendering
  // When i am opening the right hand side so the api is showing up empty data which is also percieved as data.
  // So i am decideding if the data is empty then template will render and the renderkey in the display data will be false
  // other wise it will be true

  useEffect(() => {
    if (activityPinnedItemOptions) {
      const mealName =
        (Array.isArray(pinnedActivitiesThorughActivityId) &&
          pinnedActivitiesThorughActivityId[0]?.name) ||
        "Default Meal Name";

      const response = activityPinnedItemOptions
        .map((act, index) => {
          let render = false;
          if (pinnedResizeItem[index]) {
            const itemKey = Object.keys(pinnedResizeItem[index])[0];
            const items = pinnedResizeItem[index][itemKey];

            console.log(items);

            // Determine render condition
            render = Array.isArray(items)
              ? items.length > 0
              : Object.keys(items || {}).length > 0;

            return {
              mealName,
              render,
              data: {
                a_id: act.a_id,
                at_id: act.at_id,
                flag: act.flag,
                name: act.name,
                items,
              },
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      setDisplayData(response);
    }
  }, [
    activityPinnedItemOptions,
    pinnedResizeItem,
    pinnedActivitiesThorughActivityId,
  ]);

  const handleInputChange = (e) => {
    // Logic for handling input changes if required
  };

  const handleAddFoodItem = () => {
    const newFoodItem = {
      name: "",
      quantity: "",
      selectedunit: "",
      units: [],
    };
    const updatedResizeInformation = {
      ...resizeInformation,
      foodItems: [...(resizeInformation.foodItems || []), newFoodItem],
    };
    setResizeInformation(updatedResizeInformation);
  };

  return (
    <div className="z-50 h-screen w-full md:w-[850px] overflow-auto bg-white absolute right-0 shadow-lg shadow-[#00000066] flex flex-col p-2">
      {/* Header */}
      <div className="flex justify-between p-2">
        <div className="flex items-center">
          <CaretDoubleRight
            size={20}
            onClick={props.handleResize}
            className="cursor-pointer"
          />
          <LineVertical size={20} />
          <CaretUp size={20} />
          <CaretDown size={20} />
        </div>
        <div>
          <DotsThree size={20} />
        </div>
      </div>

      {/* Meal Name Section */}
      <div className="flex mt-4 p-2 items-center">
        <div className="w-[150px] flex items-center h-full ">Item</div>
        <div className="flex flex-col justify-center w-full">
          <label className="text-[10px] font-semibold text-[#808080]">
            Name
          </label>
          <input
            className="p-1 text-xs rounded-md pl-2w-full border border-black"
            type="text"
            value={pinnedResizeName || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="bg-transparent mt-4 p-2">
        {displayData &&
          displayData.length > 0 &&
          displayData.map((dat, index) =>
            dat.render ? (
              <MealComponents key={index} dat={dat} />
            ) : (
              <CreateActivityTemplate key={index} act={dat.data} />
            )
          )}
      </div>
    </div>
  );
});

export default MealResize;
