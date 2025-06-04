import React, { useContext, useEffect, useRef, useState } from "react";
import "./activity.css";

// controllers
import assetController from "./asset-controller";
import contextController from "./context-controller";
import eventController from "./event-controller";
import componentController from "./component-controller/index";
import ModalComponent from "../../common-components/ModalComponent/ModalComponent";
// import { PinnedActivityTabResizeContext } from "./contexts/PinnedActivityTabResizeItem";
// import { AcitivitySideBarDropDownContext } from "./contexts/ActivitySideBarDropdownOption/ActivitySideBarDropDownOptionContext";
// import ActivityResizeItem from "../../common-components/ActivityResizeItem/ActivityResizeItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Tabs, Gear, Wall, Trash } from "@phosphor-icons/react";
import {
  addUserPinnedActivities,
  flipIsModalOpen,
  flipIsUserPinnedItemClicked,
  removeUserPinnedActivities,
} from "./Redux/PinnedItems";
import { ModalContext } from "../../common-components/ModalComponent/context/ModalContext";
import {
  setCollectiveIdSelectedByUser,
  setSelectedActivityName,
} from "./Redux/UserSelectedParameters";
import { toast } from "react-toastify";
import UICards from "./activity-main-components/UICards/UICards";

const Activity = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const count = useSelector((state) => state.pinnedActivities.count);
  const { isModalOpen, setIsModalOpen, modalType, setModalType } =
    useContext(ModalContext);

  const activitySelected = useSelector(
    (state) => state.activityTypes.activitySelected
  );
  const userPinnedActivities = useSelector(
    (state) => state.pinnedActivities.userPinnedActivities
  );

  const userPinnedActivityMap = useSelector(
    (state) => state.pinnedActivities.userPinnedActivityMap
  );

  console.log("Pinned Activities here are : ", userPinnedActivities);

  useEffect(() => {
    const getUserCreatedActivities = async () => {
      try {
        if (activitySelected === 301) {
          const response = await axios.get(
            `https://meseer.com/dog/get_all_goals_tasks/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          dispatch(addUserPinnedActivities(response?.data));
        } else {
          const response = await axios.get(
            `https://meseer.com/dog/generic/pinned-activity/user-data/${userId}/${activitySelected}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(addUserPinnedActivities(response?.data?.pinned_activity));
        }

        // Add associated tasks with them also
        // Dummy tasks
      } catch (err) {
        console.error(
          `Something went wrong with user created activities fetch`
        );
        dispatch(addUserPinnedActivities([]));
      }
    };

    if (activitySelected) {
      getUserCreatedActivities();
    }
  }, [activitySelected]);

  // useEffect(() => {
  //   console.log(userPinnedActivities);
  // }, [userPinnedActivities]);

  const handleDeleteUserActivity = async (useract, index) => {
    // Delete the activity
    /*
      
     * data = {
    "ua_id": 357,
    "flag":"P",
    "a_id":1,
    "at_id":9,
    "action":'DELETE'
}
     */
    let { ua_id, flag, a_id, at_id } = useract;
    let body = {
      ua_id,
      flag,
      a_id,
      at_id,
      action: "DELETE",
    };

    try {
      let response = await axios.post(
        `https://meseer.com/dog/update-delete-data/primary-mwb`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);

      // Need to update the ui as well
      // pass the index of which you are deleting
      dispatch(
        removeUserPinnedActivities({
          collective_id: useract.collective_id,
          index,
        })
      );

      toast("User Activity Deleted");
    } catch (err) {
      console.error(
        `Something went wrong with deleting pinned activity`,
        err.message
      );
    }
  };

  const handleActivityPageNavigation = () => {
    setIsModalOpen(true);
    setModalType("Allactivities");
  };

  const handleUserPinnedItemSelected = (
    selectedActivityName,
    selectedCollectiveId
  ) => {
    dispatch(flipIsUserPinnedItemClicked(true));
    dispatch(flipIsModalOpen(true));
    // Also set the name of the activity
    dispatch(setSelectedActivityName(selectedActivityName));
    dispatch(setCollectiveIdSelectedByUser(selectedCollectiveId));

    // setIsModalOpen(true);
  };

  if (activitySelected === 301) {
    return (
      <>
        <componentController.SidebarAdvanced />
        <ModalComponent />
        <div
          className={`flex flex-col min-h-screen relative ml-[220px] bg-[#ffffff] p-4`}
        >
          <div className="flex items-center p-2">
            <div className="w-[300px] border flex text-xs bg-gray-200 rounded-lg p-2 justify-between shadow-md">
              <div className="cursor-pointer p-2 flex flex-col items-center bg-white rounded-md w-20">
                <Tabs size={20} />
                <div className="">Grouped</div>
              </div>
              <div className="cursor-pointer p-2 flex flex-col items-center bg-white rounded-md w-20">
                <Gear size={20} />
                <div>Settings</div>
              </div>
              <div
                onClick={handleActivityPageNavigation}
                className="cursor-pointer p-2 flex flex-col items-center bg-white rounded-md w-20"
              >
                <Wall size={20} />
                <div>All</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-2 w-full p-2">
            {/* <div className="grid grid-cols-4 gap-16 text-[#c6c6c6]  text-sm mb-8 tracking-tight">
              <UICards
                userPinnedActivities={userPinnedActivities}
                handleDeleteUserActivity={handleDeleteUserActivity}
                handleUserPinnedItemSelected={handleUserPinnedItemSelected}
              />
            </div> */}
            <div className="grid grid-cols-2 gap-16 text-[#c6c6c6]  text-sm mb-8 tracking-tight">
              <UICards
                userPinnedActivities={userPinnedActivityMap}
                handleDeleteUserActivity={handleDeleteUserActivity}
                handleUserPinnedItemSelected={handleUserPinnedItemSelected}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <componentController.SidebarAdvanced />
        {/* <ActivityResizeItem /> */}
        <ModalComponent />
        <div
          // ref={bodyRef}
          className={`flex flex-col min-h-screen relative ml-[220px] bg-[#ffffff] p-4`}
        >
          {/* Three Buttons to Control Multiple Things */}
          <div className="flex items-center p-2">
            <div className="w-[300px] border flex text-xs bg-gray-200 rounded-lg p-2 justify-between shadow-md">
              <div className="cursor-pointer p-2 flex flex-col items-center bg-white rounded-md w-20">
                <Tabs size={20} />
                <div className="">Grouped</div>
              </div>
              <div className="cursor-pointer p-2 flex flex-col items-center bg-white rounded-md w-20">
                <Gear size={20} />
                <div>Settings</div>
              </div>
              <div
                onClick={handleActivityPageNavigation}
                className="cursor-pointer p-2 flex flex-col items-center bg-white rounded-md w-20"
              >
                <Wall size={20} />
                <div>All</div>
              </div>
            </div>
          </div>

          {/* Meals Display Section */}
          <div className="flex flex-col mt-2 w-full p-2">
            <div className="grid grid-cols-4 gap-16 text-[#c6c6c6]  text-sm mb-8 tracking-tight">
              {userPinnedActivities && userPinnedActivities.length > 0 ? (
                userPinnedActivities.map((userActivities, index) => {
                  return (
                    <div className="shadow-md w-full p-2 rounded-md flex flex-col items-center relative border border-gray-300">
                      <div
                        onClick={() =>
                          handleDeleteUserActivity(userActivities, index)
                        }
                        className="absolute top-5 right-5 cursor-pointer bg-black p-1 rounded-md"
                      >
                        <Trash size={15} color="white" />
                      </div>
                      <div className="w-full h-60 bg-gray-200 rounded-2xl text-black">
                        {/* {userActivities.collective_id} */}
                      </div>
                      <div
                        onClick={() =>
                          handleUserPinnedItemSelected(
                            userActivities.name,
                            userActivities.collective_id
                          )
                        }
                        className="bg-white -mt-4 rounded-sm p-1 w-full text-black cursor-pointer tracking-wider"
                      >
                        {userActivities.name}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>No pinned Activities are found</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Activity;
