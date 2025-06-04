/**
 * Toggles the listening state.
 *
 * @param {Function} setIsListening - Function to toggle the listening state.
 */
const toggleListening = (setIsListening) => {
  setIsListening((prevState) => !prevState); // Toggle the listening state
};

export default toggleListening;
