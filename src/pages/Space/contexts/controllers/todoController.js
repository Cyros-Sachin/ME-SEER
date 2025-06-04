// todoController.js

import { nanoid } from "nanoid";

export const transformTodoData = (todoData) => {
  return todoData.map((todo) => {
    const unchecked = todo.contents
      .filter((item) => !item.checked)
      .map((item) => ({
        id: nanoid(),
        ...item,
        checkbox: false,
      }));

    const checked = todo.contents
      .filter((item) => item.checked)
      .map((item) => ({
        id: nanoid(),
        ...item,
        checkbox: true,
      }));

    return {
      id: nanoid(),
      type: "todo",
      unchecked,
      checked,
      created_date: todo.created_date,
      last_state: todo.last_state,
      name: todo.name,
      refresh_type: todo.refresh_type,
      space_id: todo.space_id,
      subspace_id: todo.subspace_id,
      todo_id: todo.todo_id,
      user_id: todo.user_id,
      history: [],
    };
  });
};
