import axios from "axios";
import React, { useState, useContext } from "react";
import { modifyUserPinnedActivities } from "../../../../Redux/PinnedItems";
import { useDispatch, useSelector } from "react-redux";
import { ModalContext } from "../../../../../../common-components/ModalComponent/context/ModalContext";
import { toast } from "react-toastify";

const CreateWorkout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const ActivitySelectedByUser = useSelector(
    (state) => state.userSelectedParams.ActivitySelectedByUser
  );
  const dispatch = useDispatch();
  const { setIsModalOpen } = useContext(ModalContext);
  const activityOptionSelected = useSelector(
    (state) => state.activityTypes.activityOptionSelected
  );

  const handleMealNameInputChange = (e) => {
    setWorkoutName(e.target.value);
  };

  const handleAddWorkout = async () => {
    // api controls
    if (!workoutName) {
      return;
    }

    let obj = {
      collective_id: "",
      name: workoutName,
    };

    dispatch(modifyUserPinnedActivities(obj));
    let event_time = new Date().toISOString().split(".")[0]; // Correct usage

    // Need improvement
    // a_id will be associated with the option user is selecting     -- option
    try {
      let body = {
        user_id: localStorage.getItem("userId"),
        name: workoutName,
        event_time,
        group_id: 0,
        type: "Flexibility",
        a_id: activityOptionSelected,
        instructions: null,
      };

      try {
        const response = await axios.post(
          `https://meseer.com/dog/add-data/primary-mwb/`,
          body
        );
        console.log(response);
      } catch (err) {
        console.error(err);
      }

      setIsModalOpen(false);
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <div className="w-[450px] h-40 bg-white rounded-lg flex flex-col p-4">
      <label className="mt-2 text-xs text-gray-500">Workout Name</label>
      <input
        placeholder="Add Workout Name"
        value={workoutName}
        onChange={handleMealNameInputChange}
        className="mt-3 border border-black pl-2"
      />
      <button
        onClick={handleAddWorkout}
        className="mt-4 border border-black w-1/3 bg-blue-500 text-sm text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default CreateWorkout;
