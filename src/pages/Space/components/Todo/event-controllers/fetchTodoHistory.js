import axios from "axios";

const fetchTodoHistory = async (
  userid,
  subspaceClicked,
  setTodoDetails,
  todoid
) => {
  // Arrangement is needed acording to versions and date

  const response = await axios.get(
    // `https://meseer.com/dog/get-versions/todos/${todoid}/${userid}/5`
    `https://meseer.com/dog/get-versions/todos-populated/${todoid}/${userid}`
  );

  // setTodoDetails(response.data);
  return response.data;
};

export default fetchTodoHistory;
