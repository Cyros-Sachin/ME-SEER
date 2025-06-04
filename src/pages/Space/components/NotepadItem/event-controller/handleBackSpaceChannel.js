// src/components/notepad-item/event-controller/handleBackSpaceChannel.js

import { nanoid } from "nanoid";
import axios from "axios";

const deleteMyWordpadItem = () => {
  //https://meseer.com/dog/wordpad-content/{wc_id}
};

const handleBackSpaceChannel = async (
  e,
  notepadInputItem,
  todos,
  setTodos,
  todoIndex,
  noteItemIndex,
  // setBasicBlocks,
  setShowBasicBlock
) => {
  let timer;
  const timeDelay = 1000;

  if (notepadInputItem === "" && (e.keyCode === 8 || e.key === "Backspace")) {
    let newTodos = [...todos];
    newTodos[todoIndex].sections.splice(noteItemIndex, 1);
    setTodos(newTodos);

    clearTimeout(timer);

    let targetWordPad = todos[todoIndex];
    let sections = targetWordPad.sections;
    let wordpadContentId = targetWordPad.wordpadContentId;
    let wordpadId = targetWordPad.wordpad_id;

    timer = setTimeout(() => {
      // user has stopped typeing fetch the correct data
      console.log(todos[todoIndex]);

      const typeToTag = {
        bullet: "<bul>",
        paragraph: "<par>",
        numbered: "<num>",
        header: "<h>",
      };

      // Transform the data into the desired format
      const result = todos[todoIndex].sections
        .map((item) => {
          const tag = typeToTag[item.type] || "";
          return tag + item.content;
        })
        .join("");

      const pushToDtabase = async () => {
        const response = await axios.put(
          `https://meseer.com/dog/wordpad-content/${wordpadContentId}`,
          {
            wordpad_id: wordpadId,
            content: result,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(response);
      };

      pushToDtabase();
    }, timeDelay);

    // removing the item
    // It will again update the whole string and then update it
  } else if (e.key === "/") {
    e.preventDefault();
    // setBasicBlocks(true);
    setShowBasicBlock(true);
  } else if (e.key === "Enter") {
    // check if the current element is numbered or bullet
    let newTodos = [...todos];
    let currentItem = newTodos[todoIndex].sections[noteItemIndex];
    let newobj = {
      id: nanoid(),
      type: "",
      content: "",
    };

    if (currentItem.type === "numbered") {
      newobj.type = "numbered";
    } else if (currentItem.type === "bullet") {
      newobj.type = "bullet";
    } else {
      newobj.type = "paragraph";
    }

    newTodos[todoIndex].sections.push(newobj);
    setTodos(newTodos);

    // based on the object we need to write the logic
    // similar to adding an item from basic block

    let wordpad = todos[todoIndex];
    let wordpadId = wordpad.wordpad_id;
    let wordpadContentId = wordpad.wordpadContentId;
    let type = newobj.type;

    console.log(wordpad, wordpadId, wordpadContentId, type);
    let tokenString =
      type === "paragraph"
        ? "<par>"
        : type === "header"
        ? "<h>"
        : type === "bullet"
        ? "<bul>"
        : "<num>";

    let newContent = tokenString + newobj.content;

    // step 3 : Fetch the current data shown
    const currentData = await axios.get(
      `https://meseer.com/dog/wordpad-content/${wordpadContentId}`
    );
    let oldContent = currentData.data.content;

    let newData = oldContent + newContent;
    console.log(newData);

    // Step 4 : update the content id
    const response = await axios.put(
      `https://meseer.com/dog/wordpad-content/${wordpadContentId}`,
      {
        wordpad_id: wordpadId,
        content: newData,
      }
    );

    console.log(response);
  }
};

export default handleBackSpaceChannel;
