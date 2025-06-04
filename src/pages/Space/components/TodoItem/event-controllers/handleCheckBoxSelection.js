// /*
//   todos = All the todos of the subspace
//   todoIndex = The index of the (todo) which the user is currently checking the checkbox of
//   arrayIndex = The index of the (todoItem) respective to the checked and unchecked araray
//   details = The details of the (todoItem) containing tc_id, checked , checkbox, urgent , important and so on...
// */

// const handleCheckBox = async (
//   e,
//   setIsChecked,
//   isChecked,
//   todos,
//   todoIndex,
//   arrayIndex,
//   setTodos,
//   detail
// ) => {
//   e.stopPropagation();

//   const updatedCheckboxState = !isChecked;

//   // Api call
//   await axios
//     .put(`https://meseer.com/dog/todo_content/${detail.tc_id}`, {
//       checked: updatedCheckboxState,
//     })
//     .catch((error) => {
//       console.error("Error updating the todo item:", error);
//     });

//   // Change the state : Since state change is time taking process so we have to manually change the state
//   // Shift the item to unchecked and checked array depending on the isChecked property
//   let newTodos = [...todos];

//   // if the isChecked is false it means that the item was in unchecked array and needs to be shifted to checked
//   if (!isChecked) {
//     let todoItemToBeRemoved = newTodos[todoIndex].unchecked[arrayIndex];
//     let newTodoItemToBeRemoved = {
//       ...todoItemToBeRemoved,
//       checkbox: true,
//       checked: true,
//     };
//     // shift the item from unchecked to the checkedarray
//     newTodos[todoIndex].checked.push(newTodoItemToBeRemoved);
//     // remove the item from uncheckedArray
//     newTodos[todoIndex].unchecked.splice(arrayIndex, 1);
//   } else {
//     let todoItemToBeRemoved = newTodos[todoIndex].checked[arrayIndex];
//     let newTodoItemToBeRemoved = {
//       ...todoItemToBeRemoved,
//       checkbox: false,
//       checked: false,
//     };
//     // shift the item from unchecked to the checkedarray
//     newTodos[todoIndex].unchecked.push(newTodoItemToBeRemoved);
//     // remove the item from uncheckedArray
//     newTodos[todoIndex].checked.splice(arrayIndex, 1);
//   }

//   // change the actual state
//   setIsChecked(!isChecked);

//   // get the new todos
//   setTodos(newTodos);
// };

// export default handleCheckBox;*/

import axios from "axios";

/*
  todos = All the todos of the subspace
  todoIndex = The index of the (todo) which the user is currently checking the checkbox of
  arrayIndex = The index of the (todoItem) respective to the checked and unchecked array
  details = The details of the (todoItem) containing tc_id, checked , checkbox, urgent , important and so on...
*/

const handleCheckBox = async (
  e,
  setIsChecked,
  isChecked,
  todos,
  todoIndex,
  arrayIndex,
  setTodos,
  detail
) => {
  e.stopPropagation();
  e.preventDefault();

  const updatedCheckboxState = !isChecked;
  let newTodos = [...todos]; // Create a copy of todos

  // Determine which array the item belongs to and move it
  const sourceArray = isChecked ? "checked" : "unchecked";
  const targetArray = isChecked ? "unchecked" : "checked";

  // Remove the item from the source array
  let todoItem = newTodos[todoIndex][sourceArray].splice(arrayIndex, 1)[0];

  // Update its checked/checkbox state
  todoItem = {
    ...todoItem,
    checkbox: updatedCheckboxState,
    checked: updatedCheckboxState,
  };

  // Add the item to the target array
  newTodos[todoIndex][targetArray].push(todoItem);

  // Optimistically update the UI first
  setTodos(newTodos);
  setIsChecked(updatedCheckboxState);

  // Update the API in the background
  try {
    await axios.put(`https://meseer.com/dog/todo_content/${detail.tc_id}`, {
      checked: updatedCheckboxState,
    });
  } catch (error) {
    console.error("Error updating the todo item:", error);
    // Optionally revert the state if the API call fails (not required unless you want to ensure sync)
  }
};

export default handleCheckBox;
