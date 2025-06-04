import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import contextController from "./context-controller";
import componentController from "./component-controller";

const EditModal = ({ editOpen, setEditOpen }) => {
  const { spaceIdSelected, subSpaceIdSelected } = useContext(
    contextController.UserClickTracingContext
  );

  const modalRef = useRef();

  useEffect(() => {
    if (editOpen) {
      document.body.style.overflow = "hidden";
    }
  }, [editOpen]);

  const handleEditModal = (event) => {
    // Check if click happened outside the modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setEditOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  const handleAddSubMenu = async (selectedIcon, inputValue) => {
    // Initialize loading state
    // Load in the UI part also

    // Input validation
    if (!inputValue || !spaceIdSelected || !localStorage.getItem("userId")) {
      console.error("Invalid input: missing required values");
      return;
    }

    // Adding the space and subspaces

    try {
      // Prepare the request payload
      const payload = {
        space_id: spaceIdSelected, // Ensure this variable is correctly set in your component
        user_id: localStorage.getItem("userId"), // Ensure userId exists in localStorage
        name: inputValue, // The name for the subspace, from the input,
        icon: "asdas",
      };

      // Send the POST request
      const response = await axios.post(
        `https://meseer.com/dog/subspaces`,
        payload
      );

      // Handle successful response
      console.log("Subspace added successfully:", response.data);

      // Optionally, update UI or state with the response data
      // e.g., refresh subspace list, show success notification, etc.
    } catch (error) {
      // Handle any errors that occur during the API call
      if (error.response) {
        // The request was made, but the server responded with an error
        console.error("Response Error:", error.response.data);
        console.error("Response Status:", error.response.status);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received from server:", error.request);
      } else {
        // Other errors, such as in setting up the request
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <div
      style={{ zIndex: "100000" }}
      onClick={handleEditModal} // Handle click on the backdrop
      className="h-full w-full bg-[#2424245b] flex justify-center items-center absolute"
    >
      <div
        className="shadow-lg h-[450px] w-[550px] flex justify-between items-center bg-white rounded-lg p-2"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} // Prevent modal content click from triggering modal close
      >
        <div className="w-[35%] h-full">
          {/* <div className="w-full flex justify-end items-end text-black mt-2 ">
            <img
              className="cursor-pointer h-5 mr-4"
              src={assetController.add}
              alt="add-space-button"
              role="button"
            />
          </div> */}
          <div className="option-container-scroll overflow-auto h-full">
            {subSpaceIdSelected && subSpaceIdSelected.length > 0
              ? subSpaceIdSelected.map((subMenu) => {
                  return (
                    <componentController.SubMenu
                      id={subMenu.subspace_id}
                      key={subMenu.subspace_id}
                      menuItem={subMenu}
                      routing={false}
                      enableEdit
                      remove
                    />
                  );
                })
              : ""}
          </div>
        </div>
        <div className=" bg-[#79797927] w-[65%] h-full flex justify-center items-center rounded-lg">
          <componentController.SubMenuHandler
            setEditOpen={setEditOpen}
            clickHandler={handleAddSubMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default EditModal;
