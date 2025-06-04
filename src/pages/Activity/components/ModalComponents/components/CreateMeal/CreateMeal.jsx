import React, { useContext, useEffect, useState } from "react";
import { PinnedActivityTabContext } from "../../../../contexts/PinnedActivityTabsContext";
import { toast } from "react-toastify";
import axios from "axios";
import { PlusCircle } from "@phosphor-icons/react";
import { Activity_PinnedItemSelectedOptionsContext } from "../../../../contexts/Activity_PinnedItemSelectedOptions";
import { ActivityUserClickTracingContext } from "../../../../contexts/ActivityUserClickTracing";
import {
  AcitivitySideBarPinnedActivityOptionsContext,
  AcitivitySideBarPinnedActivityOptionsProvider,
} from "../../../../contexts/ActivitySideBarPinnedActivityOptionsContext";
import { TRIGGERS } from "../../../../constants/constants";
import { ModalContext } from "../../../../../../common-components/ModalComponent/context/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import { modifyUserPinnedActivities } from "../../../../Redux/PinnedItems";

const CreateMeal = () => {
  const [mealName, setMealName] = useState("");
  const { setIsModalOpen } = useContext(ModalContext);
  const dispatch = useDispatch();
  // const [isMoreClicked, setIsMoreClicked] = useState(false);
  // // State to manage food items as an array of objects
  // const [foodItems, setFoodItems] = useState([{ foodName: "", quantity: "" }]);
  // const [bulKFoodItem, setBulkFoodItem] = useState("");

  // get a_id , at_id, flags

  const {
    pinnedActivitiesThorughActivityId,
    setPinnedActivitiesThroughActivityId,
  } = useContext(PinnedActivityTabContext);

  const { activitySelected, actionIdSelected } = useContext(
    ActivityUserClickTracingContext
  );

  const { activitySidebarOptionsForSelectedActivity } = useContext(
    AcitivitySideBarPinnedActivityOptionsContext
  );

  const ActivitySelectedByUser = useSelector(
    (state) => state.userSelectedParams.ActivitySelectedByUser
  );

  const activityOptionSelected = useSelector(
    (state) => state.activityTypes.activityOptionSelected
  );

  //#region  -------------------- CALLED UP IN THE REDUX

  const handleMealNameInputChange = (e) => {
    setMealName(e.target.value);
  };

  const handleAddMeal = async () => {
    if (!mealName) {
      return;
    }

    // Old Code
    let obj = {
      collective_id: "",
      name: mealName,
    };

    let newPinnedActivitiesThorughActivityId = [
      ...pinnedActivitiesThorughActivityId,
    ];

    newPinnedActivitiesThorughActivityId.push(obj);
    // setPinnedActivitiesThroughActivityId(newPinnedActivitiesThorughActivityId);

    // New Code :

    // dispatch(modifyUserPinnedActivities(obj));

    // Making an API call
    // API Call : group id is the problem
    let event_time = new Date().toISOString().split(".")[0]; // Correct usage

    // why 8
    // Need improvement
    // a_id will be associated with the option user is selecting     -- option
    try {
      let body = {
        user_id: localStorage.getItem("userId"),
        name: mealName,
        event_time,
        group_id: 0,
        type: "VEG",
        // a_id: ActivitySelectedByUser,
        a_id: activityOptionSelected,
      };

      try {
        const response = await axios.post(
          `https://meseer.com/dog/add-data/primary-mwb/`,
          body,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(response.data);
        obj.collective_id = response.data.collective_id.collective_id;
        dispatch(modifyUserPinnedActivities(obj));
      } catch (err) {
        console.error(err);
      }

      setIsModalOpen(false);
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <div className="w-[450px] min-h-40 max-h-96 bg-white rounded-lg flex flex-col p-4 overflow-auto">
      <label className="mt-2 text-xs text-gray-500">Meal Name</label>
      <input
        placeholder="Add Meal Name"
        value={mealName}
        onChange={handleMealNameInputChange}
        className="mt-3 border border-black pl-2"
      />
      <button
        onClick={handleAddMeal}
        className="mt-4 border w-[45%] p-2 text-xs bg-blue-500 text-white rounded-md font-semibold"
      >
        Submit
      </button>
    </div>
  );
};

export default CreateMeal;
