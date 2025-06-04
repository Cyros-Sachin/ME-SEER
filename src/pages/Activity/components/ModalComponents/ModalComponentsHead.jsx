import React from "react";
import { useContext } from "react";
import { ModalContext } from "../../../../common-components/ModalComponent/context/ModalContext";
import FoodItemModal from "./components/FoodItemModal/FoodItemModal";
import AssignMealModal from "./components/AssignMeal/AssignModal";
import CreateMeal from "./components/CreateMeal/CreateMeal";
import CreateWorkout from "./components/CreateWorkout/CreateWorkout";
import CreateGoal from "./components/CreateGoal/CreateGoal";
import PostOnly from "./components/PostOnly/PostOnly";
import { Activity_PinnedItemSelectedOptionsContext } from "../../contexts/Activity_PinnedItemSelectedOptions";
import LoadTemplate from "./components/LoadTemplate/LoadTemplate";
import UpdateTemplate from "./components/UpdateTemplate/UpdateTemplate";
import CreateTask from "./components/CreateTask/CreateTask";
import AllActivities from "./components/AllActivities/AllActivities";

const ModalComponentHead = () => {
  const {
    modalType,
    setModalType,
    isModalOpen,
    setIsModalOpen,
    selectedTemplate,
    setSelectedTemplate,
  } = useContext(ModalContext);

  return (
    <div>
      {modalType === "food item" ? (
        <FoodItemModal />
      ) : modalType === "assign meal" ? (
        <AssignMealModal />
      ) : modalType === "create meal" ? (
        <CreateMeal />
      ) : modalType === "create workout" ? (
        <CreateWorkout />
      ) : modalType === "create goal" ? (
        <CreateGoal />
      ) : modalType === "Load Template" ? (
        <LoadTemplate template={selectedTemplate} />
      ) : modalType === "Update Template" ? (
        <UpdateTemplate />
      ) : modalType === "create task" ? (
        <CreateTask />
      ) : modalType === "Allactivities" ? (
        <AllActivities />
      ) : (
        <PostOnly />
      )}
    </div>
  );
};

export default ModalComponentHead;
