import React, { useContext, useEffect } from "react";
import { IoIosArrowBack, IoPencil, IoIosArrowForward } from "react-icons/io";
import { useSidebarTracing } from "../../../contexts/SidebarTracing";
import { useDispatch, useSelector } from "react-redux";
import { ModalContext } from "../../../../ModalComponent/context/ModalContext";
import axios from "axios";
import {
  addData,
  incrementCount,
  addSubActivities,
  updateActivitySelected,
  addActivityOptions,
  updateactivityOptionSelected,
} from "../../../../../pages/Activity/Redux/ActivityTypes";
import {
  addOptionsIds,
  setActivitySelectedByUser,
  setActivityTrigger,
} from "../../../../../pages/Activity/Redux/UserSelectedParameters";
import { toast } from "react-toastify";

// https://meseer.com/dog/activities-items/${activitySelected}

const SidebarAdvancedActivity = ({ isExpanded = true, toggleSidebar }) => {
  const { updateSidebarUrl } = useSidebarTracing();

  const navigateSidebarUrl = () => {
    updateSidebarUrl("/");
  };

  const activityTypes = useSelector(
    (state) => state.activityTypes.activityTypes
  );
  const subActivityTypes = useSelector(
    (state) => state.activityTypes.subActivityTypes
  );
  const activityOptions = useSelector(
    (state) => state.activityTypes.activityOptions
  );

  const activitySelected = useSelector(
    (state) => state.activityTypes.activitySelected
  );

  const isModalExpanded = useSelector(
    (state) => state.pinnedActivities.isModalExpanded
  );

  const activityData = useSelector(
    (state) => state.userSelectedPinnedItem.activityData
  );

  const {
    isModalOpen,
    setIsModalOpen,
    modalType,
    setModalType,
    selectedTemplate,
    setSelectedTemplate,
  } = useContext(ModalContext);

  const dispatch = useDispatch();

  // When the component will load
  const getActivityTypes = async () => {
    const response = await axios.get(
      `https://meseer.com/dog/get-activity-type`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch(addData(response.data));
    // Also by default select the first at_id
  };

  useEffect(() => {
    getActivityTypes();
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(activityTypes);
  // }, [activityTypes]);

  // This is giving the SubActivities in the UI
  useEffect(() => {
    const getActivityOptions = async () => {
      const response = await axios.get(
        `https://meseer.com/dog/activities-items/${activitySelected}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // call the dispatch method
      dispatch(addActivityOptions(response.data));
    };

    if (activitySelected) {
      getActivityOptions();
    }
  }, [activitySelected]);

  // This is giving the Options in the UI   : This is where i need to set the options_id to the UserSelectedParameters
  useEffect(() => {
    const getSubActivities = async () => {
      let ids = []; // a_ids
      if (activitySelected === 301) {
        const response = await axios.get(
          `https://meseer.com/dog/pinned-activities-items/302`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // For a_id 5 testing
        console.log(response.data);

        if (response.data) {
          const fetchedIds =
            response.data &&
            response.data.length > 0 &&
            response.data.map((data) => {
              return data;
            });

          ids = fetchedIds.map((ids) => ids);
        }
      }

      const response = await axios.get(
        `https://meseer.com/dog/pinned-activities-items/${activitySelected}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (activitySelected === 301) {
        // fetched ids should be pushed to the old
        let fetchedIds = response.data;
        ids.push(...fetchedIds);
      } else {
        if (response.data) {
          ids =
            response.data &&
            response.data.length > 0 &&
            response.data.map((data) => {
              return data;
            });
        }
      }

      console.log(ids);

      // pass the array of ids captured by the above response
      dispatch(addSubActivities([...ids]));
      dispatch(addOptionsIds(ids));
    };

    if (activitySelected) {
      getSubActivities();
    }
  }, [activitySelected]);

  const handleActivitySelected = (act_id, trigger) => {
    dispatch(updateActivitySelected(act_id));
    dispatch(setActivitySelectedByUser(act_id));
    // write code for description
    dispatch(setActivityTrigger(trigger));
  };

  const handleSubActivitySelected = (subActivity) => {
    let activityOption = subActivity.a_id;
    let activityName = subActivity.name;
    dispatch(updateactivityOptionSelected(activityOption));

    if (activityName === "create meal") {
      setModalType("create meal");
    } else if (activityName === "create workout") {
      setModalType("create workout");
    } else if (activityName === "create goal") {
      setModalType("create goal");
    } else if (activityName === "add task") {
      setModalType("create task");
    }
    // console.log("Hapenning");
    setIsModalOpen(true);
  };

  const handleOptionActivitySelected = async (optionname, option) => {
    // Logic to find out if the PH item already exist
    if (option.flag === "PH") {
      let keyToFind = option.name;
      if (activityData[keyToFind].content.length > 0) {
        toast(`PH Item can be added once`);
        return;
      }
    }

    // console.log(option);
    setIsModalOpen(true);
    setModalType("Load Template");
    setSelectedTemplate(option);
  };

  return (
    <div
      className={`text-xs z-40 ${
        isExpanded
          ? "w-[220px] flex flex-col"
          : "w-[70px] flex flex-col items-center"
      } fixed w-[220px] h-screen shadow-md shadow-[#00000077] p-2`}
    >
      <div className="flex w-full items-center justify-between mt-4">
        <div
          onClick={navigateSidebarUrl}
          className="bg-black p-1 cursor-pointer ml-2"
        >
          <IoIosArrowBack size={15} color="white" />
        </div>
        <div className="mr-16 text-lg">Activity</div>
      </div>
      <div className="mt-4 p-2">
        <div className="text-gray-400 text-sm pb-2 border-b border-b-[#aeaeae]">
          ACTIVITY
        </div>

        <div className="mt-4">
          {activityTypes &&
            activityTypes.length > 0 &&
            activityTypes.map((acts, index) => {
              return (
                <div
                  className={`${
                    index === 0 ? "mt-2" : "mt-2"
                  } flex items-center justify-between`}
                >
                  <div>{acts.name}</div>
                  <div
                    onClick={() =>
                      handleActivitySelected(acts.at_id, acts.description)
                    }
                    className={`${
                      acts.at_id === activitySelected
                        ? "bg-black"
                        : "bg-gray-200"
                    } mr-4 bg-black p-1 border`}
                    //${
                    //   subspace.subspace_id === subSpaceIdSelected
                    //     ? "bg-black"
                    //     : "bg-gray-200"
                    // } `}
                  >
                    <IoIosArrowForward
                      className="cursor-pointer"
                      color={
                        acts.at_id === activitySelected ? "white" : "black"
                      }
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="mt-4 p-2">
        <div className="text-gray-400 text-sm pb-2 border-b border-b-[#aeaeae] flex justify-between ">
          <div>Sub Activities</div>
        </div>
        <div className="mt-2 max-h-40 overflow-auto scrollbar">
          {activityOptions &&
            activityOptions.length > 0 &&
            activityOptions.map((subs, index) => {
              return (
                <div
                  className={`${
                    index === 0 ? "mt-2" : "mt-2"
                  } flex items-center justify-between`}
                >
                  <div>
                    {subs &&
                      subs.name &&
                      subs.name[0].toUpperCase() + subs.name.slice(1)}
                  </div>
                  <div
                    onClick={() => handleSubActivitySelected(subs)}
                    className={`mr-4 bg-black p-1`}
                    //${
                    //   subspace.subspace_id === subSpaceIdSelected
                    //     ? "bg-black"
                    //     : "bg-gray-200"
                    // } `}
                  >
                    <IoIosArrowForward
                      className="cursor-pointer"
                      color={
                        "white"
                        // subspace.subspace_id === subSpaceIdSelected
                        //   ? "white"
                        //   : "black"
                      }
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {isModalExpanded && (
        <div className="mt-4 p-2">
          <div className="text-gray-400 text-sm pb-2 border-b border-b-[#aeaeae] flex justify-between ">
            <div>Options</div>
          </div>
          <div className="mt-2 max-h-40 overflow-auto scrollbar">
            {subActivityTypes &&
              subActivityTypes.length > 0 &&
              subActivityTypes.map((subs, index) => {
                return (
                  <div
                    className={`${
                      index === 0 ? "mt-2" : "mt-2"
                    } flex items-center justify-between`}
                  >
                    <div>
                      {subs &&
                        subs.name &&
                        subs.name[0].toUpperCase() + subs.name.slice(1)}
                    </div>
                    <div
                      onClick={() =>
                        handleOptionActivitySelected(subs.name, subs)
                      }
                      className={`mr-4 bg-black p-1`}
                      //${
                      //   subspace.subspace_id === subSpaceIdSelected
                      //     ? "bg-black"
                      //     : "bg-gray-200"
                      // } `}
                    >
                      <IoIosArrowForward
                        className="cursor-pointer"
                        color={
                          "white"
                          // subspace.subspace_id === subSpaceIdSelected
                          //   ? "white"
                          //   : "black"
                        }
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarAdvancedActivity;
