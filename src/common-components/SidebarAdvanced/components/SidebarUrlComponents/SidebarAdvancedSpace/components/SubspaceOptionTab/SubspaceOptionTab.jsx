import { nanoid } from "nanoid";
import React, { useContext, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { HiMinus } from "react-icons/hi2";
import handler from "../../../../../../sidebar/sidebar_handler";
import { useSidebarTracing } from "../../../../../contexts/SidebarTracing";
import { TodoContext } from "../../../../../../../pages/Space/contexts/todos-context";

const SubspaceOptionTab = ({ subspacename, index }) => {
  // asdasdasd

  // get refresh_type
  // get activation like wheather the buttons are used for notepad or todo   = subspacename
  // todos
  // setTodos
  // space id
  // subspace id
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
  } = useSidebarTracing();

  const { todos, setTodos } = useContext(TodoContext);

  const [displayOptions, setDisplayOptions] = useState([
    {
      id: nanoid(),
      name: "Select",
      options: ["Daily", "Weekly", "Monthly"],
    },
  ]);
  const [openTab, setOpenTab] = useState(false);
  const handleSubspaceoptionClicked = () => {
    setOpenTab(!openTab);
  };

  const handleOptionClick = (
    spaceid,
    subspaceid,
    refreshtype,
    todos,
    setTodos,
    typeOfTodo
  ) => {
    console.log(spaceid, subspaceid, refreshtype, typeOfTodo);
    setOpenTab(false);

    if (typeOfTodo && refreshtype) {
      if (typeOfTodo === "Wordpad") {
        handler.handle_AddNotepad(
          todos,
          setTodos,
          spaceid,
          subspaceid,
          refreshtype
        );
      } else if (typeOfTodo === "Todo") {
        handler.handle_AddTodo(
          todos,
          setTodos,
          spaceid,
          "Random",
          subspaceid,
          refreshtype
        );
      }
    }
  };

  return (
    <div>
      <div
        className={`${
          index === 0 ? "mt-2" : "mt-2"
        } flex flex-col justify-center relative w-full`}
      >
        <div
          className={`flex p-1 justify-between w-full border-b border-b-gray-200 pb-2`}
        >
          <div>{subspacename}</div>
          <div
            // onClick={() => setSpaceIdSelected(space.space_id)}
            className="mr-4 bg-gray-200 p-1"
            onClick={handleSubspaceoptionClicked}
          >
            {openTab ? (
              <HiMinus className="cursor-pointer" />
            ) : (
              <IoAddOutline className="cursor-pointer" />
            )}
          </div>
        </div>
        {openTab && (
          <div className="pb-4 pt-4 mt-1 p-1 w-[95%] bg-[#d6d6d641] rounded-md flex flex-col items z-50">
            {displayOptions &&
              displayOptions.map((display) => {
                return (
                  <div className="w-full">
                    <div className="flex flex-col">
                      {display.options.map((option, index) => {
                        return (
                          <div
                            onClick={() =>
                              handleOptionClick(
                                spaceIdSelected,
                                subSpaceIdSelected,
                                option.toLowerCase(),
                                todos,
                                setTodos,
                                subspacename
                              )
                            }
                            className={`${
                              index === 0 ? "" : "mt-2"
                            } cursor-pointer flex justify-between`}
                          >
                            <div>{option}</div>
                            <div className={`bg-gray-200 mr-4 p-1`}>
                              <IoIosArrowForward className="cursor-pointer" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubspaceOptionTab;
