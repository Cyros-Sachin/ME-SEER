// handleHeaderInputValue.js
import axios from "axios";

const handleHeaderInputValue = async (
  e,
  setHeaderInputValue,
  todos,
  todoIndex,
  setTodos
) => {
  setHeaderInputValue(e.target.value);
  console.log(e.target.value);

  let newTodos = [...todos];
  newTodos[todoIndex].header = e.target.value;
  setTodos(newTodos);

  let input = e.target.value;
  let wordpadId = todos[todoIndex].wordpad_id;

  // api call
  const response = await axios.put(
    `https://meseer.com/dog/wordpads/${wordpadId}`,
    {
      name: input,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export default handleHeaderInputValue;
