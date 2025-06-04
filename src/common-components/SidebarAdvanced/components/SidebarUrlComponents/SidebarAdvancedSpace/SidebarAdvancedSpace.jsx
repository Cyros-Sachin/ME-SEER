import React, { useContext, useEffect, useState } from "react";
import componentController from "../../../controllers/componentController";
import ControlPuck from "../../ControlPuck/ControlPuck";
import axios from "axios";
import {
  SidebarTracingProvider,
  useSidebarTracing,
} from "../../../contexts/SidebarTracing";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { nanoid } from "nanoid";
import SubspaceOptionTab from "./components/SubspaceOptionTab/SubspaceOptionTab";
import { IoPencil } from "react-icons/io5";
import { ModalContext } from "../../../../ModalComponent/context/ModalContext";
import ModalComponent from "../../../../ModalComponent/ModalComponent";

const SidebarAdvancedSpace = ({ isExpanded, toggleSidebar, setSidebarUrl }) => {
  const {
    spaceSelected,
    setSpaceSelected,
    spaceIdSelected,
    updateSpaceIdSelected, // Exposing method
    subSpaceIdSelected,
    updateSubSpaceIdSelected, // Exposing method
    userSpaceSelected,
    setUserSpaceSelected,
    userSubSpaceSelected,
    setUserSubspaceSelected,
    spaces,
    setSpaces,
    subspaces,
    setSubSpaces,
    spaceOptions,
    setSpaceOptions,
    isEditModalOpen,
    setIsEditModalOpen,
    updatre,
  } = useSidebarTracing();
  const userId = localStorage.getItem("userId");

  const { updateSidebarUrl } = useSidebarTracing();
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  useEffect(() => {
    const getSpaces = async () => {
      const response = await axios.get(`https://meseer.com/dog/spaces`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSpaces(response.data);
    };
    getSpaces();
  }, []);

  useEffect(() => {
    const getSubspaces = async () => {
      const response = await axios.get(
        `https://meseer.com/dog/subspaces/${spaceIdSelected}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // check if the subspace id is there in the localStorage persisted
      // other wise select the first subspace asdas

      console.log("Subacts : ", response.data);
      setSubSpaces(response.data);

      // update the first subspace
      // By default the first subspace will be selected
      if (response.data) {
        let defaultSubspace = response.data[0];
        updateSubSpaceIdSelected(defaultSubspace.subspace_id);
      }
    };
    getSubspaces();
  }, [spaceIdSelected]);

  const navigateSidebarUrl = () => {
    //setSidebarUrl("/");
    updateSidebarUrl("/");
  };

  const handleEditModalOpen = () => {
    setIsModalOpen(true);
    setIsEditModalOpen(true);
  };

  return (
    <div
      className={`text-xs ${
        isExpanded
          ? "w-[220px] flex flex-col"
          : "w-[70px] flex flex-col items-center"
      } fixed w-[220px] h-screen shadow-md shadow-[#00000077] p-2`}
    >
      <ModalComponent />
      <div className="flex w-full items-center justify-between mt-4">
        <div
          onClick={navigateSidebarUrl}
          className="bg-black p-1 cursor-pointer ml-2"
        >
          <IoIosArrowBack size={15} color="white" />
        </div>
        <div className="mr-16 text-lg">
          {spaceSelected ? spaceSelected.toUpperCase() : "LOADING..."}
        </div>
      </div>
      <div className="mt-4 p-2">
        <div className="text-gray-400 text-sm pb-2 border-b border-b-[#aeaeae]">
          Spaces
        </div>
        <div className="mt-4">
          {spaces &&
            spaces.length > 0 &&
            spaces.map((space, index) => {
              return (
                <div
                  className={`${
                    index === 0 ? "mt-2" : "mt-2"
                  } flex items-center justify-between`}
                >
                  <div>{space.name}</div>
                  <div
                    onClick={() => {
                      updateSpaceIdSelected(space.space_id);
                      // setUserSpaceSelected(space.space_id);
                    }}
                    className={`mr-4 ${
                      space.space_id === spaceIdSelected
                        ? "bg-black"
                        : "bg-gray-200"
                    } p-1`}
                  >
                    <IoIosArrowForward
                      className="cursor-pointer"
                      color={
                        space.space_id === spaceIdSelected ? "white" : "black"
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
          <div>Subspaces</div>
          <IoPencil
            onClick={handleEditModalOpen}
            className="mr-6 cursor-pointer"
            color="black"
          />
        </div>
        <div className="mt-2 max-h-40 overflow-auto scrollbar">
          {subspaces &&
            subspaces.length > 0 &&
            subspaces.map((subspace, index) => {
              return (
                <div
                  className={`${
                    index === 0 ? "mt-2" : "mt-2"
                  } flex items-center justify-between`}
                >
                  <div>{subspace.name}</div>
                  <div
                    onClick={() => {
                      updateSubSpaceIdSelected(subspace.subspace_id);
                    }}
                    className={`mr-4 ${
                      subspace.subspace_id === subSpaceIdSelected
                        ? "bg-black"
                        : "bg-gray-200"
                    } mr-4 p-1`}
                  >
                    <IoIosArrowForward
                      className="cursor-pointer"
                      color={
                        subspace.subspace_id === subSpaceIdSelected
                          ? "white"
                          : "black"
                      }
                    />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="mt-8  relative">
          <div className="text-gray-400 text-sm pb-2 border-b border-b-[#aeaeae]">
            Add
          </div>
          <div className="mt-2 max-h-40 overflow-auto scrollbar">
            {spaceOptions &&
              spaceOptions.length > 0 &&
              spaceOptions.map((subspace, index) => {
                return (
                  <SubspaceOptionTab
                    subspacename={subspace.name}
                    index={index}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

// asdasda

export default SidebarAdvancedSpace;
