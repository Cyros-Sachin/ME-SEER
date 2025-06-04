// ActivityMealsSidebar.js
import React, { useContext } from "react";
import componentController from "../../../../component-controller/index";
import handler from "../../../../sidebar_handler";
import { Activity_PinnedItemSelectedOptionsContext } from "../../../../../../pages/Activity/contexts/Activity_PinnedItemSelectedOptions";
import { ModalContext } from "../../../../../ModalComponent/context/ModalContext";

const ActivityMealsSidebar = ({
  isMealOpen,
  foodTableData,
  setFoodTableData,
  mealResizeData,
  activitySidebarOptionsForSelectedActivity,
  setSubSpaceId,
}) => {
  const { activityPinnedItemOptions } = useContext(
    Activity_PinnedItemSelectedOptionsContext
  );

  const { modalType, setModalType, isModalOpen, setIsModalOpen } =
    useContext(ModalContext);

  const openModal = (option) => {
    // if (option === "food item") {
    //   setModalType("food item");
    // }
    console.log(option);
    setModalType(option);
    setIsModalOpen(true);
  };

  console.log(activitySidebarOptionsForSelectedActivity);

  return (
    <div className="">
      <div className="mt-4 text-xs font-semibold">ACTIVITIES</div>
      <div className="bg-white w-full border mt-2 rounded-md shadow-md shadow-[#00000061] overflow-auto h-40 p-2">
        {activitySidebarOptionsForSelectedActivity &&
          activitySidebarOptionsForSelectedActivity.length > 0 &&
          activitySidebarOptionsForSelectedActivity.map((subMenu) => {
            console.log(subMenu);
            return (
              <componentController.SubMenu
                key={subMenu.subspace_id}
                menuItem={subMenu}
                routing
                setSubSpaceId={setSubSpaceId}
                id={subMenu.subspace_id}
                background
                openModal
                clickHandler={openModal}
              />
            );
          })}
      </div>

      <div className="mt-4 text-xs font-semibold">OPTIONS</div>
      <div className="bg-white w-full mt-1 rounded-md shadow-md shadow-[#00000061] overflow-auto h-40 p-2">
        {activityPinnedItemOptions &&
          activityPinnedItemOptions.length > 0 &&
          activityPinnedItemOptions.map((pinnedItemOption) => {
            return (
              <div
                onClick={() => openModal(pinnedItemOption.name)}
                key={pinnedItemOption.at_id}
                className="p-1 text-sm cursor-pointer"
              >
                {pinnedItemOption.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ActivityMealsSidebar;
