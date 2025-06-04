import React, { createContext, useState } from "react";
import { nanoid } from "nanoid";

import headerImage from "../assets/header.png";
import bulletPoints from "../assets/bullets.png";
import numberedPoints from "../assets/numbered.png";
import paragraph from "../assets/text.png";

// create a context
const NotepadContext = createContext();

const NotepadProvider = ({ children }) => {
  const [blockOptions, setBlockOptions] = useState([
    {
      id: nanoid(),
      type: "header",
      img: headerImage,
      alt: "header-img",
      option: "Header",
    },
    {
      id: nanoid(),
      type: "bulletPoints",
      img: bulletPoints,
      alt: "bullets-img",
      option: "Bullets",
    },
    {
      id: nanoid(),
      type: "numberedPoints",
      img: numberedPoints,
      alt: "numberedPoints-img",
      option: "Numbers",
    },
    {
      id: nanoid(),
      type: "paragraph",
      img: paragraph,
      alt: "paragraph-img",
      option: "Text",
    },
  ]);

  return (
    <NotepadContext.Provider
      value={{
        blockOptions,
      }}
    >
      {children}
    </NotepadContext.Provider>
  );
};

export { NotepadContext, NotepadProvider };
