import React, { useEffect, useState } from "react";
import {
  CaretDoubleRight,
  LineVertical,
  CaretUp,
  CaretDown,
  DotsThree,
} from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { flipIsModalOpen } from "../../Redux/PinnedItems";
import axios from "axios";
import { updateActivityData } from "../../Redux/UserSelectedPinnedItemData";
import SingleActivityItem from "../SingleActivityItem/SingleActivityItem";

const UserPinnedItemExpanded = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const handleResizeClose = () => {
    dispatch(flipIsModalOpen(false));
    dispatch(updateActivityData([]));
  };

  const IdsFromOptions = useSelector(
    (state) => state.userSelectedParams.IdsFromOptions || []
  );
  const ActivitySelectedByUser = useSelector(
    (state) => state.userSelectedParams.ActivitySelectedByUser || ""
  );
  const collectiveIdSelectedByUser = useSelector(
    (state) => state.userSelectedParams.collectiveIdSelectedByUser || ""
  );
  const activityTrigger = useSelector(
    (state) => state.userSelectedParams.activityTrigger || ""
  );
  const selectedActivityName = useSelector(
    (state) => state.userSelectedParams.selectedActivityName || ""
  );

  const userid = localStorage.getItem("userId");

  const activityData = useSelector(
    (state) => state.userSelectedPinnedItem.activityData || {}
  );

  console.log("Activity Data is : ", activityData);

  useEffect(() => {
    const getUserSelectedPinnedActivityData = async (
      a_id,
      collective_id,
      options_data
    ) => {
      // console.log(a_id);
      // console.log(collective_id);

      try {
        const response = await axios.get(
          `https://meseer.com/dog/generic/get-it/${userid}/${a_id}/${collective_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        let content = Array.isArray(response.data)
          ? [...response.data]
          : Object.values(response.data);

        let optionItem = IdsFromOptions.find((item) => item.a_id === a_id);
        let optionName = optionItem ? optionItem.name : "Unknown";

        let modifiedResponseData = {
          optionName,
          trigger: activityTrigger,
          flag: options_data.flag,
          a_id,
          at_id: ActivitySelectedByUser,
          collective_id,
          is_active: true,
          description: `A ${selectedActivityName} item`,
          event_time: "",
          user_id: userid,
          content,
        };

        let finalObj = {
          [optionName]: modifiedResponseData,
        };

        dispatch(updateActivityData(finalObj));
      } catch (error) {
        console.error("Error fetching activity data:", error);

        let optionItem = IdsFromOptions.find((item) => item.a_id === a_id);
        let optionName = optionItem ? optionItem.name : "Unknown";

        let modifiedResponseData = {
          trigger: activityTrigger,
          flag: options_data.flag,
          a_id,
          at_id: ActivitySelectedByUser,
          collective_id,
          is_active: true,
          description: `A ${selectedActivityName} item`,
          event_time: "",
          user_id: userid,
          content: [],
        };

        let finalObj = {
          [optionName]: modifiedResponseData,
        };

        dispatch(updateActivityData(finalObj));
      }
    };

    if (collectiveIdSelectedByUser) {
      Promise.all(
        IdsFromOptions.map((ids) =>
          getUserSelectedPinnedActivityData(
            ids.a_id,
            collectiveIdSelectedByUser,
            ids
          )
        )
      ).then(() => setLoading(false));
    }
  }, [collectiveIdSelectedByUser, activityTrigger, selectedActivityName]);

  useEffect(() => {
    console.error(activityData);
  }, [activityData]);

  return (
    <div className="bg-[#ffffff] text-black fixed right-0 h-full w-2/3 p-4 overflow-y-auto scrollbar shadow-lg shadow-black">
      <div className="flex justify-between">
        <div className="flex items-center">
          <CaretDoubleRight
            size={20}
            className="cursor-pointer"
            onClick={handleResizeClose}
            color="black"
          />
          <LineVertical size={20} color="black" />
          <CaretUp size={20} color="black" />
          <CaretDown size={20} color="black" />
        </div>
        <div>
          <DotsThree size={20} color="black" />
        </div>
      </div>

      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-4 flex text-xs text-black">
            <div className="w-1/12 flex items-center">
              {activityTrigger?.charAt(0).toUpperCase() +
                activityTrigger?.slice(1)}
            </div>
            <input
              value={selectedActivityName}
              className="w-full bg-transparent border border-black rounded-md p-1"
              readOnly
            />
          </div>

          <div className="mt-4 flex text-sm flex-col">
            {activityData &&
              Object.keys(activityData).map((key, index) => {
                let displayData = activityData[key];

                return displayData?.content?.length > 0 ? (
                  <SingleActivityItem
                    key={displayData.a_id}
                    userActivityData={displayData}
                    index={index}
                  />
                ) : null;
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default UserPinnedItemExpanded;
