import React, { createContext, useState } from "react";

const BasicBlockContext = createContext();
const blockOptions = [];

const BasicBlockProvider = ({ children }) => {
  const [basicBlockOptions, setBasicBlockOption] = useState(blockOptions);

  return (
    <BasicBlockContext.Provider value={{ basicBlockOptions }}>
      {children}
    </BasicBlockContext.Provider>
  );
};

export { BasicBlockProvider, BasicBlockContext };
