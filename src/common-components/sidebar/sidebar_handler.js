import handle_AddTodo from "./event-controllers/handleAddTodo";
import handle_AddNotepad from "./event-controllers/handleAddWordpad";
import createMeal from "./event-controllers/createMeal";
import addFoodItem from "./event-controllers/createMeal";
import handleEditModal from "./event-controllers/handleEditModal";
import handleSubSpaceAdd from "./event-controllers/handleSubSpaceAdd";
import getComputedRefreshType from "./event-controllers/getComputedRefreshType";

// Export all the methods
const handler = {
  handle_AddTodo,
  handle_AddNotepad,
  createMeal,
  addFoodItem,
  handleSubSpaceAdd,
  handleEditModal,
  getComputedRefreshType,
};

export default handler;
