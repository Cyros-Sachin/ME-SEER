/**
 * Initializes the speech recognition instance and sets up event handlers.
 *
 * @param {Function} setTranscript - Function to set the transcript state.
 * @param {Function} setIsListening - Function to update the listening state.
 * @returns {Object} - The initialized speech recognition instance.
 */
const initializeRecognition = (setTranscript, setIsListening) => {
  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcriptText = event.results[current][0].transcript;
    setTranscript(transcriptText);
  };

  recognition.onend = () => {
    setIsListening(false); // Update the state to indicate listening has stopped
  };

  return recognition;
};

export default initializeRecognition;
