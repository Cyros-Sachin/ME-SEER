// handleDeleteTodo.js
import axios from "axios";

const handleDeleteTodo = async (todos, todoIndex, setTodos) => {
  const wordpadId = todos[todoIndex].wordpad_id;
  const newTodos = todos.filter((_, index) => index !== todoIndex);
  setTodos(newTodos);

  try {
    // API call to delete the todo
    await axios.delete(
      `https://meseer.com/dog/wordpads/${wordpadId}/${localStorage.getItem(
        "userId",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )}`
    );
  } catch (error) {
    console.error("Error deleting todo:", error);
    // Optionally, you could show an error message to the user
    // and revert the state if needed.
    setTodos(todos); // Revert to previous state if delete fails
  }
};

export default handleDeleteTodo;
