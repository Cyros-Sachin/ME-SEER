import { nanoid } from "nanoid";
import axios from "axios";
import { toast } from "react-toastify";
import getComputedRefreshType from "./getComputedRefreshType";

// Handler for adding a new todo item
const handle_AddTodo = async (
  todos,
  setTodos,
  spaceIdSelected,
  subSpaceIdSelected,
  subSpaceClicked,
  refreshTypeSelected
) => {
  let newRefreshType = refreshTypeSelected.toLowerCase();
  let created_date = new Date().toISOString(); // Correct format
  let last_updated = new Date().toISOString(); // Correct format
  // asdasd
  const obj = {
    id: nanoid(),
    type: "todo",
    checked: [],
    unchecked: [],
    refresh_type: newRefreshType,
    created_date,
    last_updated,
    header: "New Todo",
    name: "New Todo",
    todo_id: null,
  };

  const data = {
    space_id: spaceIdSelected,
    subspace_id: subSpaceClicked,
    user_id: localStorage.getItem("userId"),
    name: obj.header,
    refresh_type: newRefreshType,
    last_state: true,
    created_date,
    last_updated,
  };

  console.log(data);

  // Api call
  try {
    const response = await axios.post("https://meseer.com/dog/todos", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response.data);

    let todoId = response.data.todo_id;
    obj.todo_id = todoId;
    setTodos([...todos, obj]);
  } catch (err) {
    console.error("Error posting data:", err);
    toast(err);
  }
};

export default handle_AddTodo;
