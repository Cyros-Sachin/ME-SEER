// UICards.jsx
import React, { useContext } from "react";
import { Trash } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../../../common-components/ModalComponent/context/ModalContext";
import { updateactivityOptionSelected } from "../../Redux/ActivityTypes";
import {
  setCollectiveIdSelectedByUser,
  setSelectedActivityName,
} from "../../Redux/UserSelectedParameters";
import {
  flipIsModalOpen,
  flipIsUserPinnedItemClicked,
} from "../../Redux/PinnedItems";

const UICards = ({
  userPinnedActivities,
  handleDeleteUserActivity,
  handleUserPinnedItemSelected,
}) => {
  const dispatch = useDispatch();
  const {
    isModalOpen,
    setIsModalOpen,
    modalType,
    setModalType,
    selectedTemplate,
    setSelectedTemplate,
  } = useContext(ModalContext);

  const handleAddTaskModal = (goalid) => {
    let activity_a_id = 27;
    let activityName = "add task";
    dispatch(updateactivityOptionSelected(activity_a_id));
    dispatch(setCollectiveIdSelectedByUser(goalid));

    if (activityName === "add task") {
      setModalType("create task");
    }
    // asd
    setIsModalOpen(true);
  };

  const handleOpenTaskModal = (selectedActivityName, selectedCollectiveId) => {
    let activity_a_id = 28; // for opening taskmetadata
    // dispatch(updateactivityOptionSelected(activity_a_id));
    dispatch(flipIsUserPinnedItemClicked(true));
    dispatch(flipIsModalOpen(true));
    dispatch(setSelectedActivityName(selectedActivityName));
    dispatch(setCollectiveIdSelectedByUser(selectedCollectiveId));
  };

  if (!userPinnedActivities || Object.keys(userPinnedActivities).length === 0) {
    return <p>No pinned activities.</p>;
  }

  return Object.entries(userPinnedActivities).map(([key, tasks], index) => {
    let goalId, goalName;

    try {
      const keyParts = key.slice(1, -1).split(",");
      goalId = keyParts[0];
      goalName = keyParts.slice(1).join(",").trim();
    } catch (err) {
      console.error("Key parsing failed for:", key, err);
      goalId = null;
      goalName = "Unknown Goal";
    }

    return (
      <div
        key={index}
        className="shadow-md w-full h-72 p-2 rounded-md flex flex-col items-center relative border border-gray-300"
      >
        <div className="bg-white flex justify-between rounded-sm p-2 w-full text-black cursor-pointer tracking-wider">
          <div
            onClick={() => handleUserPinnedItemSelected(goalName, goalId)}
            className=""
          >
            {goalName}
          </div>
          <div
            onClick={() =>
              handleDeleteUserActivity({ goalId, goalName }, index)
            }
            className="cursor-pointer bg-black p-1 rounded-md shadow-lg"
          >
            <Trash size={15} color="white" />
          </div>
        </div>

        <div className="scrollbar mt-2 w-full h-[95%] bg-gray-200 rounded-2xl text-black overflow-y-auto p-4">
          <div className="text-xs font-semibold">Associated Tasks</div>
          <div className="w-full overflow-auto grid grid-cols-2 gap-4 mt-2">
            {Array.isArray(tasks) ? (
              tasks.map((task, taskIndex) => (
                <div
                  key={task.task_id}
                  className="w-full bg-white p-2 rounded-md shadow-md border border-[#7272726a]"
                >
                  <div className="flex justify-between items-end">
                    <div>{task.task_name}</div>
                    <div className="text-[10px] text-gray-500">
                      {task.created_timestamp.split("T")[0]}
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      handleOpenTaskModal(task.task_name, task.task_id)
                    }
                    className="bg-gray-200 w-full mt-3 text-xs p-1 border border-blue-200 rounded-md flex justify-center items-center cursor-pointer"
                  >
                    Open
                  </div>
                </div>
              ))
            ) : (
              <div>No tasks available.</div>
            )}
          </div>

          <div
            onClick={() => handleAddTaskModal(goalId)}
            className="text-white shadow-md cursor-pointer font-extralight w-full text-lg bg-gray-400 mt-4 p-2 rounded-md flex justify-center items-center"
          >
            <div className="text-sm font-semibold">+</div>
          </div>
        </div>
      </div>
    );
  });
};

export default UICards;
