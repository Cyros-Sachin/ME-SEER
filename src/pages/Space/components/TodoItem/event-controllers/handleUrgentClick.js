import axios from "axios";

const handleUrgentClick = async (setIsUrgent, isUrgentCheck, todoContentId) => {
  setIsUrgent(!isUrgentCheck);
  let newUrgentStatus = !isUrgentCheck;

  try {
    const response = await axios.put(
      `https://meseer.com/dog/todo_content/${todoContentId}`,
      { urgent: newUrgentStatus }
    );

    if (response.status !== 200) {
      // Revert if response is not OK
      setIsUrgent(newUrgentStatus);
      console.error("Failed to update urgent status");
    }
  } catch (error) {
    // Roll back the change in case of an error
    setIsUrgent(newUrgentStatus);
    console.error("Error updating urgent status:", error);
  }
};

export default handleUrgentClick;
