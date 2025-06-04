import { SidebarContext } from "../contexts/sidebar-context";
import { MenuContext } from "../contexts/menu-context";
import { TodoContext } from "../../../pages/Space/contexts/todos-context";
import { FoodTableDataContext } from "../../../context/FoodTableData";
import { UserClickTracingContext } from "../contexts/user-click-tracing-context";

const contextController = {
  SidebarContext,
  MenuContext,
  TodoContext,
  FoodTableDataContext,
  UserClickTracingContext,
};

export default contextController;
