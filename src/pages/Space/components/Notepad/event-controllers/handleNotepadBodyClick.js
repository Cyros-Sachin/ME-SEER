import { nanoid } from "nanoid";
import axios from "axios";
import { getCurrentVersion } from "./getCurrentVersion";
import { sectionsToString } from "./sectionsArrayToString";

let typingTimer;
let debouncedDelay = 1000;

const handleNotepadBodyClick = async (e, todos, todoIndex, setTodos) => {
  // console.log(todos[todoIndex]);
  e.stopPropagation();

  let contents = todos[todoIndex].contents;
  let length = contents?.length;
  let wordpadId = todos[todoIndex].wordpad_id;
  let obj = {
    id: nanoid(),
    type: "paragraph",
    content: "",
  };
  let refreshType = todos[todoIndex].refresh_type; // refresh type of the wordpad
  let currentversion = getCurrentVersion(refreshType); // calculated version according to the notepad refresh_type

  // When body clicks and the wordpad is fresh
  if (length <= 0) {
    // Add a new wordpad content and start editing it

    // push to the sections
    let newTodos = [...todos];
    newTodos[todoIndex].sections.push(obj);

    // Make the api call to create a new wordpadcontentid
    const newData = "<par>";
    const sampleContent = await axios.post(
      `https://meseer.com/dog/wordpad-content`,
      {
        wordpad_id: wordpadId,
        content: newData,
        version: currentversion,
        created_date: new Date().toISOString(), // Correct format
        last_updated: new Date().toISOString(), // Correct format
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Push this created content in the contents[0] place
    newTodos[todoIndex].contents[0] = sampleContent.data;
    // update the wordpadcontentid using sampleContent.wordpad
    let wordpadContentId = sampleContent.data.wc_id;
    newTodos[todoIndex].wordpadContentId = wordpadContentId;
    setTodos(newTodos);
  }
  // When the body clicks and the wordpad is not fresh
  else if (length > 0) {
    let selectedContent = contents[0]; // The actual content which is present in the contents aray
    let contentVersion = selectedContent.version;

    if (currentversion === contentVersion) {
      // start editing the same content

      // Detect if the previoud content in the sections array is empty or not. if it is empty then add new data in the sections
      // If the previous element is present then start focusing on the input

      let targetWordPad = todos[todoIndex];
      let sections = targetWordPad.sections;
      let wordpadContentId = targetWordPad.wordpadContentId;
      let wordpadId = targetWordPad.wordpad_id;

      const typeToTag = {
        bullet: "<bul>",
        paragraph: "<par>",
        numbered: "<num>",
        header: "<h>",
      };

      clearTimeout(typingTimer);

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

          if (
            !todos[todoIndex].created_date &&
            !todos[todoIndex].last_updated
          ) {
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

        // I need to detect if there is a content typed or not
        // only then i will run this otherwise no
        pushToDtabase();
      }, debouncedDelay);
    } else {
      // create a new content
      let newTodos = [...todos];
      newTodos[todoIndex].sections.push(obj);

      // Make the api call to create a new wordpadcontentid
      const newData = "<par>";
      const sampleContent = await axios.post(
        `https://meseer.com/dog/wordpad-content`,
        {
          wordpad_id: wordpadId,
          content: newData,
          version: currentversion,
          created_date: new Date().toISOString(), // Correct format
          last_updated: new Date().toISOString(), // Correct format
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Push this created content in the contents[0] place
      newTodos[todoIndex].contents[0] = sampleContent.data;
      // update the wordpadcontentid using sampleContent.wordpad
      let wordpadContentId = sampleContent.data.wc_id;
      newTodos[todoIndex].wordpadContentId = wordpadContentId;
      setTodos(newTodos);
    }
  }

  // let sections = todos[todoIndex].sections;
  // let lastItemInNotepad = todos[todoIndex].sections[sections.length - 1];
  // let wordpadContentId = todos[todoIndex].wordpadContentId;
  // let wordpadId = todos[todoIndex].wordpad_id;
  // let created_date = new Date().toISOString(); // Correct format
  // let last_updated = new Date().toISOString(); // Correct format
  // // New Object creation
  // let obj = {
  //   id: nanoid(),
  //   type: "paragraph",
  //   content: "",
  // };
  // if (
  //   todos[todoIndex].wordpadContentId !== null &&
  //   sections[0].version === version
  // ) {
  //   console.log("This is running");
  //   // Update the existing content
  //   if (sections.length === 0 || lastItemInNotepad.content !== "") {
  //     let newTodos = [...todos];
  //     newTodos[todoIndex].sections.push(obj);
  //     setTodos(newTodos);
  //   }
  // }
  // // When there is no new content in the notepad itself
  // else if (
  //   todos[todoIndex].wordpadContentId === null ||
  //   sections[0].version !== version
  // ) {
  //   console.log("This ran");
  //   // Create a new item in the section
  //   let newTodos = [...todos];
  //   newTodos[todoIndex].sections.push(obj);
  //   // Update with api for new item
  //   try {
  //     const newData = "<par>";
  //     const sampleContent = await axios.post(
  //       `https://meseer.com/dog/wordpad-content`,
  //       {
  //         wordpad_id: wordpadId,
  //         content: newData,
  //         version,
  //         created_date: "2025-01-21T14:59", // Correct format
  //         last_updated: "2025-01-21T14:59", // Correct format
  //       }
  //     );
  //     // console.log("Wordpad Content : ", sampleContent);
  //     let wordpadContentId = sampleContent.data.wc_id;
  //     newTodos[todoIndex].wordpadContentId = wordpadContentId;
  //     newTodos[todoIndex]["contents"] = [];
  //     newTodos[todoIndex].contents.push({
  //       content: newData,
  //       last_updated: last_updated,
  //       version,
  //       wc_id: wordpadContentId,
  //     });
  //     setTodos(newTodos);
  //   } catch (err) {
  //     console.error(
  //       `Something went wrong with new post content id for wordpad in handleNotepadBodyClick`,
  //       err.message
  //     );
  //   }
  // }
};

export default handleNotepadBodyClick;
