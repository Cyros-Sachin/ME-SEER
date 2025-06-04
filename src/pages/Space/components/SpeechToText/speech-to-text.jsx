import React, { useEffect, useState, useContext } from "react";

import eventController from "./event-controller";
import assetController from "./asset-controller";
import contextController from "./context-controller";

/**
 * SpeechToText component that handles speech recognition and updates todos with the recognized text.
 *
 * This component uses the Web Speech API to capture and transcribe speech to text,
 * updating the to-do list at the specified index with the transcribed text.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {number} props.todoIndex - Index of the to-do item where the recognized text will be added.
 *
 * @returns {JSX.Element} The rendered SpeechToText component.
 *
 * @example
 * <SpeechToText todoIndex={0} />
 *
 * @requires React
 * @requires eventController - Manages speech recognition initialization and control.
 * @requires assetController - Provides assets (icons) used in the component.
 * @requires contextController - Contains context for managing to-do list state.
 */

const SpeechToText = ({ todoIndex }) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { todos, setTodos } = useContext(contextController.TodoContext);

  useEffect(() => {
    // Initialize the speech recognition instance
    const recognition = eventController.initializeRecognition(
      setTranscript,
      setIsListening
    );

    // Start or stop listening based on the isListening state
    if (isListening) {
      recognition.start();
    } else {
      eventController.handleStopListening(
        recognition,
        transcript,
        setTranscript,
        todos,
        todoIndex,
        setTodos
      );
    }

    // Cleanup on unmount
    return () => {
      if (recognition) recognition.stop();
    };
  }, [isListening]);

  return (
    <img
      className="h-full"
      src={
        isListening ? assetController.nomicrophone : assetController.microphone
      }
      alt={isListening ? "Stop Listening" : "Start Listening"}
      onClick={() => eventController.toggleListening(setIsListening)}
      style={{ cursor: "pointer" }}
    />
  );
};

export default SpeechToText;
