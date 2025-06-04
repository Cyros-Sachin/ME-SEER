import { toast } from "react-toastify";
import eventController from "./index";
import axios from "axios";

// export const fetchTodos = async (
//   axios,
//   userId,
//   subSpaceClicked,
//   pathname,
//   setTodos
// ) => {
//   if (pathname === "/spaces/notes") {
//     try {
//       let fetchedTodos = [];
//       let fetchedWordpad = [];
//       let todoData = [];
//       let data = [];
//       // Second API call
//       try {
//         const response = await axios.get(
//           `https://meseer.com/dog/get-todo-wordpad/lastest-version/${userId}/${subSpaceClicked}`
//         );
//         const wordpads = response.data.wordpad_data;
//         const todos = response.data.todo_data;

//         console.log(todos);

//         if (todos) {
//           todoData = todos.map((todo) => {
//             const todoObject = Object.keys(todo)[0];
//             const todoContentObject = todo[todoObject];
//             return todoContentObject[0];
//           });
//         }

//         if (wordpads) {
//           data = wordpads.map((wordpad) => {
//             const object = Object.keys(wordpad)[0];
//             const objectData = wordpad[object];
//             return objectData[0];
//           });
//         }

//         // There is no wordpad content coming in this data from the database

//         fetchedWordpad = eventController.transformWordPadData(data);
//         console.log(fetchedWordpad);

//         // console.log(fetchedWordpad);
//       } catch (err) {
//         console.log("Running due to error");
//         fetchedWordpad = []; // Set empty array as fallback
//       }

//       let transformedData = eventController.transformTodoData(todoData);
//       let mergedData = transformedData.concat(fetchedWordpad);

//       setTodos(mergedData);
//     } catch (err) {
//       console.log("Unexpected error:", err);
//       setTodos([]); // Set empty array as fallback for todos
//     }
//   }
// };

// Old implementation and working
export const fetchTodos = async (
  axios,
  userId,
  subSpaceClicked,
  pathname,
  setTodos
) => {
  if (pathname === "/spaces/notes") {
    try {
      let fetchedTodos = [];
      let fetchedWordpad = [];

      try {
        const response = await axios.get(
          `https://meseer.com/dog/get-todo-wordpad/lastest-version/${userId}/${subSpaceClicked}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Validate and Manipulate Data
        let returnedTodoData = response.data.todo_data || [];
        if (Array.isArray(returnedTodoData)) {
          const myTodos = returnedTodoData.map((todo) => {
            const object = Object.keys(todo);
            const objectData = todo[object];
            return objectData[0];
          });
          fetchedTodos = myTodos;
          console.log(myTodos);
        }

        let returnedWordpadData = response.data.wordpad_data || [];
        if (Array.isArray(returnedWordpadData)) {
          const wordpads = returnedWordpadData.map((wordpad) => {
            const object = Object.keys(wordpad)[0];
            const objectData = wordpad[object];
            return objectData[0];
          });

          // Uptil here coming from backend
          fetchedWordpad = eventController.transformWordPadData(wordpads);
          console.log(fetchedWordpad);
        }
      } catch (err) {
        fetchedWordpad = [];
      }

      let transformedData = eventController.transformTodoData(fetchedTodos);
      let mergedData = transformedData.concat(fetchedWordpad);

      setTodos(mergedData);
    } catch (err) {
      setTodos([]);
    }
  }
};
