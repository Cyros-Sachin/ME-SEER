import axios from "axios";
import getComputedRefreshType from "../../../../../common-components/sidebar/event-controllers/getComputedRefreshType";

let debounceTimeout;

const handleInputItemTodoChange = async (
  e,
  setInputValue,
  todos,
  todoIndex,
  arrayIndex,
  setTodos,
  detail,
  isEditable,
  setIsEditable,
  isChecked // Determines if the todo item is from checked or unchecked array
) => {
  if (!isEditable) {
    setIsEditable(true);
  }

  setInputValue(e.target.value);
  let inputValue = e.target.value;

  // Create a copy of the todos array
  let newTodos = [...todos];

  // Determine which array to modify based on `isChecked`
  let arrayToModify = isChecked
    ? newTodos[todoIndex]["checked"]
    : newTodos[todoIndex]["unchecked"];

  // Update the content
  arrayToModify[arrayIndex].content = inputValue;

  // Create a new object for the updated todo item
  let newObj = { ...newTodos[todoIndex] };

  if (isChecked) {
    newObj["checked"] = arrayToModify;
  } else {
    newObj["unchecked"] = arrayToModify;
  }

  // Update the todos array
  newTodos[todoIndex] = newObj;
  setTodos(newTodos);

  console.log("Updated Todos:", newTodos[todoIndex]);

  // Clear previous debounce timeout
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  // Set a new debounce timeout for API call
  debounceTimeout = setTimeout(async () => {
    try {
      let refreshType = newTodos[todoIndex].refresh_type;
      let version = getComputedRefreshType(refreshType);
      let todoContentId = arrayToModify[arrayIndex].tc_id;

      const response = await axios.put(
        `https://meseer.com/dog/todo_content/${todoContentId}`,
        {
          content: inputValue,
          version: version,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("API call successful, updated content:", response.data);
    } catch (error) {
      console.error("Error updating the content:", error);
    }
  }, 1000); // Wait 1 second after user stops typing before making the API call
};

export default handleInputItemTodoChange;
