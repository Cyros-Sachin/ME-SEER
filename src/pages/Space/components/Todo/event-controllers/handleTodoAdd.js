import { nanoid } from "nanoid";
import axios from "axios";
import getComputedRefreshType from "../../../../../common-components/sidebar/event-controllers/getComputedRefreshType";

const handleAddTodoListItem = async (index, todos, setTodos, details) => {
  let refresh_type = todos[index].refresh_type;

  // console.log(refreshType);
  let version = getComputedRefreshType(refresh_type);
  let created_date = new Date().toISOString(); // Correct format
  let last_updated = new Date().toISOString(); // Correct format

  // console.log(todos[index]);
  const payload = {
    todo_id: todos[index].todo_id,
    content: ``,
    checked: false,
    urgent: true,
    important: false,
    version: version,
    created_date,
    last_updated,
    refresh_type,
  };

  console.log("Hitting");

  const response = await axios.post(
    `https://meseer.com/dog/todo_content`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  let newTodoItem = {
    id: nanoid(),
    // todo_id: response.data.todo_id,
    tc_id: response.data.tc_id,
    checkbox: response.data.checked,
    checked: response.data.checked,
    content: response.data.content,
    important: response.data.important,
    urgent: response.data.urgent,
    last_updated: response.data.last_updated,
    version: version,
    created_date,
    last_updated,
  };
  let newTodos = [...todos];
  newTodos[index]["unchecked"].push(newTodoItem);
  setTodos(newTodos);
};

export default handleAddTodoListItem;
