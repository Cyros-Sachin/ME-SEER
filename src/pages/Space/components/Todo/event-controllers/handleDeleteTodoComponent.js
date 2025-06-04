import axios from "axios";

const handleDeleteTodoComponent = async (todos, todoIndex, setTodos) => {
  const todoId = todos[todoIndex].todo_id;
  const todo = todos[todoIndex];

  console.log(todos[todoIndex]);
  console.log(todo);
  const newTodos = todos.filter((_, index) => index !== todoIndex);
  setTodos(newTodos);

  try {
    // API call to delete the todo
    const response = await axios.delete(
      `https://meseer.com/dog/todos/${todoId}/${localStorage.getItem("userId")}`
    );
    console.log(response);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

export default handleDeleteTodoComponent;
