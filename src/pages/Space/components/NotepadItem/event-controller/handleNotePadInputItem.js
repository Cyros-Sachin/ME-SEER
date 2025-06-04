// src/components/notepad-item/event-controller/handleNotePadInputItem.js
import axios from "axios";

let debouncedDelay = 1000;
let typingTimer;

function extractString(s, start) {
  let string = "";
  let i = start;

  // Loop until we hit another delimiter
  while (i < s.length && s[i] !== "<") {
    string += s[i];
    i++;
  }

  return string.trim();
}

function createArrayFromContent(content) {
  let myNewContent = [];
  // Match all the tokens like <h>, <bul>, <1>, <2> etc.
  let delimiters = content.match(/<h>|<par>|<bul>|<\d+>/g);
  let currentIndex = 0;
  let i = 0;

  while (i < delimiters.length) {
    // Find where the current delimiter appears in the string
    let delimiterIndex = content.indexOf(delimiters[i], currentIndex);

    // Extract content after the delimiter
    let extractedContent = extractString(
      content,
      delimiterIndex + delimiters[i].length
    );

    // Create an object with the delimiter and its associated content
    let newObj = {
      delim: delimiters[i],
      content: extractedContent,
    };

    myNewContent.push(newObj);

    // Move currentIndex forward past this token to avoid repeated matches
    currentIndex =
      delimiterIndex + delimiters[i].length + extractedContent.length;
    i++;
  }

  return myNewContent;
}

const handleNotePadInputItem = (
  e,
  setNotePadInputItem,
  todos,
  todoIndex,
  noteItemIndex
) => {
  // I have to tokenize the whole thing
  // I have to detect which is getting updated
  console.log(todos[todoIndex].sections);
  console.log("This is running");

  e.stopPropagation();
  setNotePadInputItem(e.target.value);

  // console.log(e.target.value);
  let targetWordPad = todos[todoIndex];
  let sections = targetWordPad.sections;
  let wordpadContentId = targetWordPad.wordpadContentId;
  let wordpadId = targetWordPad.wordpad_id;

  // console.log(targetWordPad);

  // convert this to string and push
  const typeToTag = {
    bullet: "<bul>",
    paragraph: "<par>",
    numbered: "<num>",
    header: "<h>",
  };

  clearTimeout(typingTimer);
  // detect if the user has stopped typing.
  typingTimer = setTimeout(() => {
    const result = sections
      .map((item) => {
        const tag = typeToTag[item.type] || "";
        return tag + item.content;
      })
      .join("");

    const pushToDtabase = async () => {
      // Check for created_date and updated_date
      // fetch the todos[todoIndex] and check if the keys created_date and updated_date is present or not

      let created_date;
      let last_updated;

      if (!todos[todoIndex].created_date && !todos[todoIndex].last_updated) {
        created_date = new Date().toISOString(); // Correct format
        last_updated = new Date().toISOString(); // Correct format
      }

      // Needs to update the version here
      const response = await axios.put(
        `https://meseer.com/dog/wordpad-content/${wordpadContentId}`,
        {
          wordpad_id: wordpadId,
          wc_id: wordpadContentId,
          content: result,
          created_date,
          last_updated,
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
  }, debouncedDelay);

  // get the todoItem

  // update the inputs, need access of the complete notpad content and wordpad content id and wordpad id
};

export default handleNotePadInputItem;
