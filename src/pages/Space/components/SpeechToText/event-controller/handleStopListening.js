/**
 * Stops the speech recognition and updates the todos with the transcript.
 *
 * @param {Object} recognition - The speech recognition instance.
 * @param {string} transcript - The transcript text captured from speech.
 * @param {Function} setTranscript - Function to clear the transcript state.
 * @param {Array} todos - The current list of todos.
 * @param {number} todoIndex - The index of the todo to update.
 * @param {Function} setTodos - Function to update the todos state.
 */
import { nanoid } from "nanoid";

const handleStopListening = (
  recognition,
  transcript,
  setTranscript,
  todos,
  todoIndex,
  setTodos
) => {
  recognition.stop();
  if (transcript.trim() !== "") {
    const newObj = {
      id: nanoid(),
      type: "paragraph",
      content: transcript,
    };

    const newTodos = [...todos];
    newTodos[todoIndex].sections.push(newObj);
    setTodos(newTodos);
    setTranscript(""); // Clear the transcript after saving

    // api call to add another paragraph
  }
};

export default handleStopListening;
