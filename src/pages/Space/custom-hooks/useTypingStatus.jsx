import { useState, useRef } from "react";

const useTypingStatus = (delay = 1000) => {
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);

  const handleTyping = () => {
    // Set typing to true as soon as typing starts
    if (!isTyping) {
      setIsTyping(true);
    }

    // Clear any existing timeout to reset the delay
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    // Set a new timeout that will change typing status to false after the delay
    typingTimeout.current = setTimeout(() => {
      setIsTyping(false);
    }, delay);
  };

  return [isTyping, handleTyping];
};

export default useTypingStatus;
