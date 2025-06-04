import { FoodTableDataContext } from "../../../context/FoodTableData";
import { SidebarContext } from "../../../common-components/sidebar/contexts/sidebar-context";

import { AcitivitySideBarDropDownContext } from "../contexts/ActivitySideBarDropdownOption/ActivitySideBarDropDownOptionContext";
import { AcitivitySideBarPinnedActivityOptionsContext } from "../contexts/ActivitySideBarPinnedActivityOptionsContext";
import { ActivityUserClickTracingContext } from "../contexts/ActivityUserClickTracing";
import { PinnedActivityTabContext } from "../contexts/PinnedActivityTabsContext";
import { Activity_PinnedItemSelectedOptionsContext } from "../contexts/Activity_PinnedItemSelectedOptions";
import { PinnedActivityTabResizeContext } from "../contexts/PinnedActivityTabResizeItem";

const contextController = {
  FoodTableDataContext,
  SidebarContext,
  AcitivitySideBarDropDownContext,
  AcitivitySideBarPinnedActivityOptionsContext,
  ActivityUserClickTracingContext,
  PinnedActivityTabContext,
  Activity_PinnedItemSelectedOptionsContext,
  PinnedActivityTabResizeContext,
};

export default contextController;
