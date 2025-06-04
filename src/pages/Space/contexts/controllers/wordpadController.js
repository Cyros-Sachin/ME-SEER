// wordpadController.js

import { nanoid } from "nanoid";
import { getCurrentVersion } from "../../components/Notepad/event-controllers/getCurrentVersion";

const extractString = (s, start) => {
  let string = "";
  let i = start;

  while (i < s.length && s[i] !== "<") {
    string += s[i];
    i++;
  }

  return string.trim();
};

const createArrayFromContent = (content) => {
  let myNewContent = [];
  let delimiters = content.match(/<h>|<num>|<par>|<bul>|<\d+>/g);
  let currentIndex = 0;
  let i = 0;

  while (i < delimiters.length) {
    let delimiterIndex = content.indexOf(delimiters[i], currentIndex);
    let extractedContent = extractString(
      content,
      delimiterIndex + delimiters[i].length
    );

    let newObj = {
      delim: delimiters[i],
      content: extractedContent,
    };

    myNewContent.push(newObj);

    currentIndex =
      delimiterIndex + delimiters[i].length + extractedContent.length;
    i++;
  }

  return myNewContent;
};

// export const transformWordPadData = (wordPadData) => {
//   return wordPadData.map((wordpad) => {
//     const length = wordpad.contents.length; // length of the content
//     const myWordpad = wordpad.contents[length - 1]; // the whole wordpad content
//     const newContent = myWordpad.content.trim(); // the actual string content
//     const wordpadContentId = myWordpad.wc_id; // wc_id

//     console.log(
//       "Contents are : ",
//       "Length is : ",
//       length,
//       "Wordpad is :",
//       myWordpad,
//       "Content is :",
//       newContent,
//       "WordpadContentID",
//       wordpadContentId
//     );

//     const tokenisedContent = createArrayFromContent(newContent);

//     const sections = tokenisedContent.map((tokenised) => {
//       let type;

//       switch (tokenised.delim) {
//         case "<h>":
//           type = "header";
//           break;
//         case "<bul>":
//           type = "bullet";
//           break;
//         case "<par>":
//           type = "paragraph";
//           break;
//         case "<num>":
//           type = "numbered";
//           break;
//         default:
//           type = "paragraph";
//       }

//       return {
//         id: nanoid(),
//         content: tokenised.content,
//         type: type,
//       };
//     });

//     return {
//       id: nanoid(),
//       wordpadContentId,
//       type: "notepad",
//       hastags: ["Fitness", "Jam", "Breakfast", "Dinner", "Lunch"],
//       highlightColors: [
//         "#FFEB3B",
//         "#FFC107",
//         "#FF5722",
//         "#F44336",
//         "#E91E63",
//         "#9C27B0",
//         "#673AB7",
//         "#3F51B5",
//         "#2196F3",
//         "#03A9F4",
//         "#00BCD4",
//         "#009688",
//         "#4CAF50",
//         "#8BC34A",
//         "#CDDC39",
//         "#FFC107",
//         "#FF9800",
//         "#795548",
//         "#9E9E9E",
//         "#607D8B",
//       ],
//       header: wordpad.name,
//       sections,
//       ...wordpad,
//     };
//   });
// };

// New Implementation

// Now the wordpad content post will not work because the wordpadcontent id which is pushed inside is garbage
// The process

// [DOUBTS]
/*
    1. The wordpad while creating will be passing a version as well : Incomplete
        https://meseer.com/dog/wordpads   the data needs to be passed is still unclear

        data passed right now is :
        let data = {
        space_id: spaceIdSelected,
        subspace_id: subSpaceClicked,
        user_id: localStorage.getItem("userId"),
        name: obj.header,
        refresh_type: "daily",
        last_state: true,

        };


    2. The wordpad while creation will be passing having a wordpad content id which is updating when the user is typing any data in wordpad 
    // This is also throwing an error due to unknown cause

    https://meseer.com/dog/wordpad-content

    This is hapenning during post of wordpad content
    data passed is :  {
    "wordpad_id":110,
    "content":"<h>Hello New User"
    };

    I think the wordpad content id should also be needed here to update.

    also causing an issue throwing error


    3. // Similarly with todos need to clearify api endpoints
    
    5. Need to clearify when the content is filled up then what it is returning
    6. Need to understand the versioning
    

*/

export const transformWordPadData = (wordPadData, comingFrom = false) => {
  // Fetch only if the version matches the calculated version
  let transformedWordpads;
  transformedWordpads = wordPadData.map((wordpad, index) => {
    const length = wordpad.contents.length;
    let id = wordpad.wordpad_id;
    let wordpad_refreshType = wordpad.refresh_type;
    let currentVersion = getCurrentVersion(wordpad_refreshType);

    // When there is no data coming , which is not any case.
    // This is running when there is no data coming from backend
    if (length === 0) {
      // console.log("This ran for new wordpad");
      return {
        id: nanoid(),
        wordpadContentId: null,
        type: "notepad",
        hastags: [],
        highlightColors: [],
        header: wordpad.name || "Untitled",
        sections: [],
        ...wordpad,
      };
    }

    // asdadas

    // Somehow i need to check wheather version is equal to the each content
    let sections = [];
    let wordpadContentId = null;

    // Looping over contents array, which will always be a single string because version match is there
    // Contents array will be having multiple contents each with different version.
    // We need to pick up the version which matches the current version and show it to the user.
    let myWordpad = wordpad.contents.map((content) => {
      // Only one version will be found out as, if the versions matches then user will be able to update the data itself
      if (content.version === currentVersion) {
        console.log("Matching");
        wordpadContentId = content.wc_id;
        const newContent = content.content?.trim() || "";

        // This will create a array of para bul and other things
        const tokenisedContent = createArrayFromContent(newContent);
        // Will be something like sections is a array
        sections = tokenisedContent.map((tokenised) => {
          let type;
          switch (tokenised.delim) {
            case "<h>":
              type = "header";
              break;
            case "<bul>":
              type = "bullet";
              break;
            case "<par>":
              type = "paragraph";
              break;
            case "<num>":
              type = "numbered";
              break;
            default:
              type = "paragraph";
          }

          return {
            id: nanoid(),
            content: tokenised.content,
            type: type,
          };
        });
      }
    });

    return {
      id: nanoid(),
      wordpadContentId,
      type: "notepad",
      hastags: ["Fitness", "Jam", "Breakfast", "Dinner", "Lunch"],
      highlightColors: [
        "#FFEB3B",
        "#FFC107",
        "#FF5722",
        "#F44336",
        "#E91E63",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#2196F3",
        "#03A9F4",
        "#00BCD4",
        "#009688",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFC107",
        "#FF9800",
        "#795548",
        "#9E9E9E",
        "#607D8B",
      ],
      header: wordpad.name,
      sections,
      ...wordpad,
    };
  });

  console.log(transformedWordpads);
  return transformedWordpads;
};
