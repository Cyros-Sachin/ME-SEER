// Sidebar.js
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Sidebar css
import "./sidebar.css";
// components
import handler from "./sidebar_handler";
import componentController from "./component-controller";
import contextController from "./context-controller";
import assetController from "./asset-controller/index";
import activityContext from "../sidebar/context-controller/activityContext";

const Sidebar = () => {
  //#region --------------------- SPACE RELATED STUFF
  const { profileName, settings, isMealOpen, subSpaceId, setSubSpaceId } =
    useContext(contextController.SidebarContext);

  const { foodTableData, setFoodTableData } = useContext(
    contextController.FoodTableDataContext
  );
  const { mealResizeData } = useContext(contextController.FoodTableDataContext);
  const { spaceSubMenu, editOpen, setEditOpen } = useContext(
    contextController.MenuContext
  );

  const { spaceIdSelected, subSpaceIdSelected, subSpaceClicked } = useContext(
    contextController.UserClickTracingContext
  );

  const { todos, setTodos } = useContext(contextController.TodoContext);
  const { pathname } = useLocation(); // useLocation for getting current path
  const [refreshTypeSelected, setRefreshTypeSelected] = useState("");
  const [activation, setActivation] = useState("");
  //#endregion --------------------- SPACE RELATED STUFF

  //#region --------------------- ACTIVITY RELATED STUFF
  const { sidebarDropDownActivity } = useContext(
    activityContext.contextController.AcitivitySideBarDropDownContext
  );

  const { activitySidebarOptionsForSelectedActivity } = useContext(
    activityContext.contextController
      .AcitivitySideBarPinnedActivityOptionsContext
  );

  const { activityPinnedItemOptions } = useContext(
    activityContext.contextController.Activity_PinnedItemSelectedOptionsContext
  );
  //#endregion --------------------- ACTIVITY RELATED STUFF

  useEffect(() => {
    if (activation !== "") {
      if (refreshTypeSelected !== "" && activation === "wordpad") {
        handler.handle_AddNotepad(
          todos,
          setTodos,
          spaceIdSelected,
          subSpaceClicked,
          refreshTypeSelected
        );
      } else if (refreshTypeSelected !== "" && activation === "todo") {
        handler.handle_AddTodo(
          todos,
          setTodos,
          spaceIdSelected,
          subSpaceIdSelected,
          subSpaceClicked,
          refreshTypeSelected
        );
      }
      setRefreshTypeSelected("");
    }
  }, [refreshTypeSelected]);

  return (
    <div className="">
      {editOpen && (
        <componentController.EditModal
          editOpen={editOpen}
          setEditOpen={setEditOpen}
        />
      )}

      <div
        className={`sidebar-main-container p-4 bg-[#e3e3e3b9] sidebarScrollbar`}
      >
        <componentController.Profile
          name={profileName}
          image={assetController.profilePic}
          arrowimage={assetController.downarrow}
          uparrow={assetController.uparrow}
          settings={settings}
        />

        <div className="mt-2">
          <componentController.NavigationTabs
            tabImage={assetController.space}
            tabAlternate="space-img"
            tabTitle="SPACE"
            subTabArray={spaceSubMenu}
            arrowImage={assetController.downarrow}
            uparrowImage={assetController.uparrow}
            subMenuShouldOpen
          />
          <componentController.SearchBarTabs />

          <componentController.NavigationTabs
            tabImage={assetController.activity}
            tabAlternate="activity-img"
            tabTitle="ACTIVITY"
            subTabArray={sidebarDropDownActivity}
            arrowImage={assetController.downarrow}
            uparrowImage={assetController.uparrow}
            name="activity"
          />
          <componentController.NavigationTabs
            tabImage={assetController.dashboard}
            tabAlternate="dashboard-img"
            tabTitle="DASHBOARD"
            subTabArray={[]}
            arrowImage={assetController.downarrow}
            uparrowImage={assetController.uparrow}
            name="dashboard"
          />
          <componentController.NavigationTabs
            tabImage={assetController.help}
            tabAlternate="help-img"
            tabTitle="HELP AND SUPPORT"
            subTabArray={[]}
            arrowImage={assetController.downarrow}
            uparrowImage={assetController.uparrow}
          />

          <div className="mt-10">
            {/* Conditional Rendering Based on Pathname */}
            {pathname === "/spaces/notes" && (
              <componentController.SpaceNotesSidebar
                todos={todos}
                setTodos={setTodos}
                spaceIdSelected={spaceIdSelected}
                subSpaceIdSelected={subSpaceIdSelected}
                subSpaceClicked={subSpaceClicked}
                refreshTypeSelected={refreshTypeSelected}
                setRefreshTypeSelected={setRefreshTypeSelected}
                setActivation={setActivation}
                editOpen={editOpen}
                setEditOpen={setEditOpen}
                setSubSpaceId={setSubSpaceId}
              />
            )}

            {pathname === "/activity/meals" && (
              <componentController.ActivityMealsSidebar
                isMealOpen={isMealOpen}
                foodTableData={foodTableData}
                setFoodTableData={setFoodTableData}
                mealResizeData={mealResizeData}
                activitySidebarOptionsForSelectedActivity={
                  activitySidebarOptionsForSelectedActivity
                }
                setSubSpaceId={setSubSpaceId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
