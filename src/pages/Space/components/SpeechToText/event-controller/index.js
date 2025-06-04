import handleStopListening from "./handleStopListening";
import initializeRecognition from "./initializeRecognition";
import toggleListening from "./toggleListening";

/**
 * Event controller object for managing speech-to-text events.
 */
const eventController = {
  handleStopListening,
  initializeRecognition,
  toggleListening,
};

export default eventController;
