import { TodoContext } from "../../../contexts/todos-context";
import { ResizeProvider } from "../../../contexts/resize-context";
import { MenuContext } from "../../../../../common-components/sidebar/contexts/menu-context";
import { UserClickTracingContext } from "../../../../../common-components/sidebar/contexts/user-click-tracing-context";

const contextController = {
  TodoContext,
  ResizeProvider,
  MenuContext,
  UserClickTracingContext
};

export default contextController;
