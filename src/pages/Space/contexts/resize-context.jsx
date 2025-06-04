import React, { createContext, useState } from "react";

const ResizeContext = createContext();

const ResizeProvider = ({ children }) => {
  const [resizeElement, setResizeElement] = useState([]);

  // this is added just to test

  return (
    <ResizeContext.Provider value={{ resizeElement, setResizeElement }}>
      {children}
    </ResizeContext.Provider>
  );
};

export { ResizeContext, ResizeProvider };
