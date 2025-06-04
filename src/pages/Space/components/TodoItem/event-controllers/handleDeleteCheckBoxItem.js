import axios from "axios";

const handleDeleteItem = async (
  e,
  todos,
  todoIndex,
  arrayIndex,
  setTodos,
  fromChecked = false,
  detail
) => {
  e.stopPropagation();

  // Create a copy of the todos array
  let newTodos = [...todos];

  // Access the appropriate array based on the `fromChecked` parameter
  let arrayToModify = fromChecked
    ? newTodos[todoIndex]["checked"]
    : newTodos[todoIndex]["unchecked"];

  let todoContentId = arrayToModify[arrayIndex].tc_id;
  // Remove the item from the selected array
  arrayToModify.splice(arrayIndex, 1);

  // Create a new object for the updated todo item
  let newObj = { ...newTodos[todoIndex] };

  // Update the correct array in the todo object
  if (fromChecked) {
    newObj["checked"] = arrayToModify;
  } else {
    newObj["unchecked"] = arrayToModify;
  }

  // Update the todos array with the modified todo object
  newTodos[todoIndex] = newObj;

  // Set the new state
  setTodos(newTodos);

  // Api call
  // await axios.delete(`https://meseer.com/dog/todo_content/${detail.tc_id}`);
  const response = await axios.delete(
    `https://meseer.com/dog/todo_content/${todoContentId}`
  );

  console.log(response);
};

export default handleDeleteItem;
