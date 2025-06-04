import React, { useContext, useEffect, useState } from "react";
import {
  CaretDoubleRight,
  LineVertical,
  CaretUp,
  CaretDown,
  DotsThree,
} from "@phosphor-icons/react";
import axios from "axios";
// Contexts
import { ActivityUserClickTracingContext } from "../../contexts/ActivityUserClickTracing";
import { Activity_PinnedItemSelectedOptionsContext } from "../../contexts/Activity_PinnedItemSelectedOptions";
import { PinnedActivityTabResizeContext } from "../../contexts/PinnedActivityTabResizeItem";
import UserActivity from "./components/UserActivity/UserActivity";
import { templates } from "./components/Template";
import { AcitivitySideBarDropDownContext } from "../../contexts/ActivitySideBarDropdownOption/ActivitySideBarDropDownOptionContext";
// asdasd
const ActivityResizeItemComputed = ({
  handleResizeClose,
  pinnedResizeItemName,
}) => {
  const { activityPinnedItemOptions } = useContext(
    Activity_PinnedItemSelectedOptionsContext
  );
  const { activitySelected, collectiveId } = useContext(
    ActivityUserClickTracingContext
  );

  const { trigger } = useContext(AcitivitySideBarDropDownContext);

  const [resizeData, setResizeData] = useState([]);

  useEffect(() => {
    // Fetch options data
    const getOptionsData = async (aid, collectiveId, option) => {
      let optionName = option.name;
      let flag = option.flag;
      let response1 = null;
      let response2 = null;

      // console.log(templates[aid]);

      try {
        const res1 = await axios.get(
          `https://meseer.com/dog/generic/get-it/${localStorage.getItem(
            "userId"
          )}/${aid}/${collectiveId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        response1 = res1.data;
        response2 = templates[aid];
      } catch (err) {
        console.error(`Error fetching data for aid: ${aid}`, err);
        response1 = [];
        response2 = templates[aid];
      }

      // Handle the case where response1 is null, undefined or any falsy value
      if (!response1 || response1 === null || response1 === "undefined") {
        response1 = [];
      }

      // Handle the case where empty object is getting returned or an empty array
      if (Object.keys(response1).length <= 0 || response1.length <= 0) {
        response1 = [];
      }

      if (Object.keys(response1).length > 0 && !Array.isArray(response1)) {
        // if 10/129 case
        let key = Object.keys(response1);
        console.log(key);
        let apiItem = response1[key[0]];
        response1 = [{ ...apiItem }];
      }

      let templateArray = [];
      if (!response1 || response1.length === 0) {
        templateArray.push(response2);
      }

      return {
        optionName,
        at_id: aid,
        a_id: activitySelected,
        collectiveId,
        flag,
        response: response1 || [],
        template: response2 || [],
        templateArray,
        trigger,
      };
    };

    // Fetch all activities and update state
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchActivitiesData = async () => {
      if (activityPinnedItemOptions && activityPinnedItemOptions.length > 0) {
        const batchSize = 1; // Limit to three requests per batch
        let results = [];

        for (let i = 0; i < activityPinnedItemOptions.length; i += batchSize) {
          const batch = activityPinnedItemOptions.slice(i, i + batchSize);

          const batchPromises = batch.map((activity) =>
            getOptionsData(activity.a_id, collectiveId, activity)
          );

          const batchResults = await Promise.all(batchPromises);
          results = results.concat(batchResults);

          // Add delay after each batch
          if (i + batchSize < activityPinnedItemOptions.length) {
            await delay(500); // 500 milliseconds delay
          }
        }

        setResizeData(results);
      }
    };

    fetchActivitiesData();
  }, [activityPinnedItemOptions, collectiveId]);

  useEffect(() => {
    console.log(resizeData);
  }, [resizeData]);

  return (
    <div className="scrollbar z-50 h-screen w-full md:w-[850px] overflow-auto bg-white absolute right-0 shadow-lg shadow-[#00000066] flex flex-col p-2">
      <div className="flex justify-between p-2">
        <div className="flex items-center">
          <CaretDoubleRight
            size={20}
            className="cursor-pointer"
            onClick={handleResizeClose}
          />
          <LineVertical size={20} />
          <CaretUp size={20} />
          <CaretDown size={20} />
        </div>
        <div>
          <DotsThree size={20} />
        </div>
      </div>

      <div className="flex w-full p-2 mt-8">
        <div className="w-[120px]">Item</div>
        <input
          className="w-full border border-black pl-2 rounded-lg text-xs"
          value={pinnedResizeItemName}
          readOnly
        />
      </div>

      {resizeData && resizeData.length > 0 ? (
        resizeData.map((sizeData, index) => {
          console.log(sizeData);
          return (
            <UserActivity
              key={index}
              data={sizeData}
              resizeData={resizeData}
              setResizeData={setResizeData}
              index={index}
              trigger={sizeData.trigger}
            />
          );
        })
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#000000]"></div>
            <p className="text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityResizeItemComputed;
