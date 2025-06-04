const itemDetailChange = (
  inputValue,
  todos,
  setTodos,
  todoIndex,
  arrayIndex,
  isChecked
) => {
  // Determine which array to update based on the isChecked flag
  const arrayName = isChecked ? "checked" : "unchecked";

  // Clone the selected array
  let newArray = [...todos[todoIndex][arrayName]];

  // Ensure the item at the given index exists
  if (newArray[arrayIndex]) {
    // Update the title of the item
    newArray[arrayIndex].title = inputValue;

    // Clone the object for the current todo
    let newObj = { ...todos[todoIndex] };
    newObj[arrayName] = newArray;

    // Clone the todos array and update the specific todo object
    let newTodos = [...todos];
    newTodos[todoIndex] = newObj;

    // Update the state
    setTodos(newTodos);
  } else {
    console.error(
      `Item at index ${arrayIndex} does not exist in the ${arrayName} array.`
    );
  }
};

export default itemDetailChange;
