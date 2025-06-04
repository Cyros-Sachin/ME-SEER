import { nanoid } from "nanoid";
import axios from "axios";
import { toast } from "react-toastify";
import getComputedRefreshType from "./getComputedRefreshType";

// Handler for adding a new notepad item
const handle_AddNotepad = async (
  todos,
  setTodos,
  spaceIdSelected,
  subSpaceClicked,
  refreshTypeSelected
) => {
  // Computing the refresh type :
  let newRefreshType = refreshTypeSelected.toLowerCase();
  let created_date = new Date().toISOString(); // Correct format
  let last_updated = new Date().toISOString(); // Correct format

  const obj = {
    id: nanoid(),
    type: "notepad",
    hastags: ["Fitness", "Jam", "Breakfast", "Dinner", "Lunch"],
    highlightColors: [
      "#FFEB3B",
      "#FFC107",
      "#FF5722",
      "#F44336",
      "#E91E63",
      "#9C27B0",
      "#673AB7",
      "#3F51B5",
      "#2196F3",
      "#03A9F4",
      "#00BCD4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#CDDC39",
      "#FFC107",
      "#FF9800",
      "#795548",
      "#9E9E9E",
      "#607D8B",
    ],
    header: "dummy header",
    wordpadContentId: null,
    refresh_type: newRefreshType,
    created_date,
    last_updated,
    sections: [],
    wordpad_id: null,
    contents: [],
  };

  let computedRefreshType = await getComputedRefreshType(newRefreshType);

  let data = {
    space_id: spaceIdSelected,
    subspace_id: subSpaceClicked,
    user_id: localStorage.getItem("userId"),
    refresh_type: newRefreshType,
    name: obj.header,
    last_state: true,
    created_date,
    last_updated,
  };

  try {
    const response = await axios.post(`https://meseer.com/dog/wordpads`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    obj.wordpad_id = response.data.wordpad_id;
    setTodos([...todos, obj]);
  } catch (error) {
    console.error("Error posting data:", error);
    toast(error);
  }
};

export default handle_AddNotepad;
