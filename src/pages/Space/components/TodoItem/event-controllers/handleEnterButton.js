import eventController from "../../Todo/event-controllers/index";

const handleEnterButton = async (e, index, todos, setTodos, details) => {
  if (e.key === "Enter") {
    await eventController.handleAddTodoListItem(
      index,
      todos,
      setTodos,
      details
    );
  }
};
export default handleEnterButton;
