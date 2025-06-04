import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "./context/ModalContext";
import ModalComponentHead from "../../pages/Activity/components/ModalComponents/ModalComponentsHead";
import { useLocation } from "react-router-dom";
import { useSidebarTracing } from "../SidebarAdvanced/contexts/SidebarTracing";
import SubspaceEditModal from "../SubspaceEditModal.jsx/SubspaceEditModal";
import UserPinnedItemExpanded from "../../pages/Activity/activity-main-components/UserPinnedItemExpanded/UserPinnedItemExpanded";
import { useDispatch, useSelector } from "react-redux";
import { flipIsModalOpen } from "../../pages/Activity/Redux/PinnedItems";
import GoalsModal from "../../pages/Goals/components/GoalsModal/GoalsModal";

const ModalComponent = ({ eventTitle, dateStart, title, onSubmit }) => {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const { isEditModalOpen, setIsEditModalOpen } = useSidebarTracing();
  const isUserPinnedItemClicked = useSelector(
    (state) => state.pinnedActivities.isUserPinnedItemClicked
  );

  const {
    isCalendarModal,
    setIsCalendarModal,
    modalPosition,
    setModalPosition,
  } = useContext(ModalContext);

  useEffect(() => {
    console.log(isCalendarModal);
  }, []);

  const dispatch = useDispatch();

  const isModalExpanded = useSelector(
    (state) => state.pinnedActivities.isModalExpanded
  );

  const pathname = useLocation().pathname;

  // if (!isModalOpen) return null; // Don't render anything if the modal is not open

  // Function to handle the click on the background
  const handleBackgroundClick = (e) => {
    // Close the modal only if the click was on the background (not the modal content)
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const handleModalBackgroundClick = () => {
    dispatch(flipIsModalOpen(false));
  };

  if (isModalOpen) {
    return ReactDOM.createPortal(
      <div
        onClick={handleBackgroundClick}
        className="w-screen h-screen bg-[#c7c7c7bb] fixed z-50 flex justify-center items-center"
      >
        {/* Render all modal components here */}

        {pathname === "/activity/meals" && (
          <div className="modal-content">
            <ModalComponentHead />
          </div>
        )}

        {pathname === "/spaces/notes" && isEditModalOpen && (
          <SubspaceEditModal />
        )}
      </div>,
      document.getElementById("modal") // Ensure this element exists in your HTML
    );
  }

  if (isModalExpanded) {
    return ReactDOM.createPortal(
      <div
        // onClick={handleModalBackgroundClick}
        className="w-2/3 h-screen fixed z-30 flex justify-center items-center"
      >
        {pathname === "/activity/meals" && isUserPinnedItemClicked && (
          <UserPinnedItemExpanded />
        )}
      </div>,
      document.getElementById("modal")
    );
  }

  if (isCalendarModal) {
    return ReactDOM.createPortal(
      <div
        style={{
          position: "fixed",
          top: `${modalPosition.y}px`,
          left: `${modalPosition.x}px`,
          width: "280px",
          height: "280px",
          backgroundColor: "white",
          border: "1px solid red",
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {pathname === "/goals" && (
          <GoalsModal
            eventTitle={eventTitle}
            dateStart={dateStart}
            title={title}
            onSubmit={onSubmit}
          />
        )}
      </div>,
      document.getElementById("modal")
    );
  }
};

export default ModalComponent;
