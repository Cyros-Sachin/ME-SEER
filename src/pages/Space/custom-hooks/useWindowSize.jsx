import { useState, useEffect } from "react";

/**
 * Custom hook to get the current window size.
 * @returns {Object} An object containing the current width and height of the window.
 */
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler to update the window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set up the event listener
    window.addEventListener("resize", handleResize);

    // Call the handler once to set the initial size
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return windowSize;
};

export default useWindowSize;
