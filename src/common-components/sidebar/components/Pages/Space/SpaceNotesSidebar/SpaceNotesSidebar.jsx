// SpaceNotesSidebar.js
import React from "react";
import componentController from "../../../../component-controller/index";
import handler from "../../../../sidebar_handler";
import { Pencil } from "@phosphor-icons/react";

const SpaceNotesSidebar = ({
  todos,
  setTodos,
  spaceIdSelected,
  subSpaceIdSelected,
  subSpaceClicked,
  refreshTypeSelected,
  setRefreshTypeSelected,
  setActivation,
  editOpen,
  setEditOpen,
  setSubSpaceId,
}) => {
  return (
    <div className="w-full">
      <div className="mt-4 text-xs font-semibold flex w-full justify-between p-2">
        <div>SUBSPACES</div>
        <Pencil size={15} onClick={() => setEditOpen(true)} />
      </div>
      <div className="border border-red-900 scrollbar p-2 bg-white mt-2 rounded-md shadow-md shadow-[#00000061] overflow-auto h-40">
        {subSpaceIdSelected &&
          subSpaceIdSelected.length > 0 &&
          subSpaceIdSelected.map((subMenu) => {
            return (
              <componentController.SubMenu
                key={subMenu.subspace_id}
                menuItem={subMenu}
                routing
                setSubSpaceId={setSubSpaceId}
                id={subMenu.subspace_id}
                background
              />
            );
          })}
      </div>
      <div className="navigation-seperation">
        <div className="navigation-heading">ADD</div>
        <componentController.ControlTabs
          tabTitle="ADD TODO"
          activationType="todo"
          setRefreshTypeSelected={setRefreshTypeSelected}
          setActivation={setActivation}
          clickHandler={() =>
            handler.handle_AddTodo(
              todos,
              setTodos,
              spaceIdSelected,
              subSpaceIdSelected,
              subSpaceClicked,
              refreshTypeSelected
            )
          }
        />
        {/* asdadasd */}
        <componentController.ControlTabs
          tabTitle="ADD NOTEPAD"
          activationType="wordpad"
          setRefreshTypeSelected={setRefreshTypeSelected}
          setActivation={setActivation}
          clickHandler={() =>
            handler.handle_AddNotepad(
              todos,
              setTodos,
              spaceIdSelected,
              subSpaceIdSelected,
              subSpaceClicked,
              refreshTypeSelected
            )
          }
        />
      </div>
    </div>
  );
};

export default SpaceNotesSidebar;
