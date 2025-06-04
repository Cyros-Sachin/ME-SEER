import { nanoid } from "nanoid";
import axios from "axios";

/**
 * Handles the creation of a new item based on the selected option.
 *
 * @param {React.MouseEvent} e - The click event.
 * @param {Object} option - The option selected for the new item.
 * @param {Array} todos - The current list of todos.
 * @param {Function} setTodos - Function to update the todos.
 * @param {number} todoIndex - Index of the todo where the new item will be added.
 * @param {Function} setBasicBlocks - Function to toggle the visibility of basic blocks.
 */
const handleNewItem = async (
  e,
  option,
  todos,
  setTodos,
  todoIndex,
  setBasicBlocks,
  setShowBasicBlock
) => {
  e.stopPropagation();
  let newObj = {};
  let newTodos = [...todos];

  if (option.type === "bulletPoints") {
    newObj = {
      id: nanoid(),
      type: "bullet",
      content: "",
    };
  } else if (option.type === "header") {
    newObj = {
      id: nanoid(),
      type: "header",
      content: "",
    };
  } else if (option.type === "numberedPoints") {
    newObj = {
      id: nanoid(),
      type: "numbered",
      content: "",
    };
  } else if (option.type === "paragraph") {
    newObj = {
      id: nanoid(),
      type: "paragraph",
      content: "",
    };
  }

  let sections = newTodos[todoIndex].sections;

  if (newTodos[todoIndex].sections[sections.length - 1].content === "") {
    newTodos[todoIndex].sections[sections.length - 1] = newObj;
  } else {
    newTodos[todoIndex].sections.push(newObj);
  }

  setTodos(newTodos);
  // // setBasicBlocks(false);
  setShowBasicBlock(false);

  // add the new item to the backend and from then , the items would only be updated and deleted and not added

  /**
   * 1. get the wordpad id to push the new content
   * 2. manipulate the data with the selected user's choice and change it to <p>, <1>, <2> or anything else
   * 3. i need to get the content which is prefed and concatenate the string
   * 4. push the empty content in the database
   * 5. From there , the handleNotePadInputItem.js would start playing with its update method using wordpad content id
   */

  // step 1

  let wordpadId = todos[todoIndex].wordpad_id;
  let wordpadContentId = todos[todoIndex].wordpadContentId;
  let type = newObj.type;
  console.log(wordpadId, wordpadContentId, type);

  // step 2 : manipulating the complete data
  let tokenString =
    type === "paragraph"
      ? "<par>"
      : type === "header"
      ? "<h>"
      : type === "bullet"
      ? "<bul>"
      : "<num>";

  let newContent = tokenString + newObj.content;

  // step 3 : Fetch the current data shown
  const currentData = await axios.get(
    `https://meseer.com/dog/wordpad-content/${wordpadContentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
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
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  console.log(response);
};

export default handleNewItem;
