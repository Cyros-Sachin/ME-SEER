import axios from "axios";

const handleImportantClick = async (
  setIsImportant,
  isImportantCheck,
  todoContentId
) => {
  // Check if the current state is different before making an API call
  const newImportantStatus = !isImportantCheck;
  if (isImportantCheck === newImportantStatus) return;

  // Optimistically update UI
  setIsImportant(newImportantStatus);

  try {
    const response = await axios.put(
      `https://meseer.com/dog/todo_content/${todoContentId}`,
      { important: newImportantStatus }
    );

    if (response.status !== 200) {
      // Revert if response is not OK
      setIsImportant(isImportantCheck);
      console.error("Failed to update importance status");
    }
  } catch (error) {
    // Roll back the change in case of an error
    setIsImportant(isImportantCheck);
    console.error("Error updating importance status:", error);
  }
};

export default handleImportantClick;
