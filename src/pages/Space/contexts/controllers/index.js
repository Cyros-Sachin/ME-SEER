// index.js

import { transformTodoData } from "./todoController";
import { transformWordPadData } from "./wordpadController";
import { fetchTodos } from "./fetchTodo";

const eventController = { transformTodoData, fetchTodos, transformWordPadData };

export default eventController;
