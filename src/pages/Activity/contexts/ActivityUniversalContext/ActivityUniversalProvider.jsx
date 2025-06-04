import React from "react";
import { ActivityUniversalProvider } from "./ActivityUniversalContext";
import { PinnedActivityTabResizeProvider } from "../PinnedActivityTabResizeItem";
import { Activity_PinnedItemSelectedOptionsProvider } from "../Activity_PinnedItemSelectedOptions";
import { PinnedActivityTabContextProvider } from "../PinnedActivityTabsContext";
import { AcitivitySideBarDropDownProvider } from "../ActivitySideBarDropdownOption/ActivitySideBarDropDownOptionContext";
import { AcitivitySideBarPinnedActivityOptionsProvider } from "../ActivitySideBarPinnedActivityOptionsContext";
import { ActivityUserClickTracingProvider } from "../ActivityUserClickTracing";

const ActivityProviders = ({ children }) => {
  return (
    <PinnedActivityTabResizeProvider>
      <ActivityUserClickTracingProvider>
        <Activity_PinnedItemSelectedOptionsProvider>
          <PinnedActivityTabContextProvider>
            <AcitivitySideBarDropDownProvider>
              <AcitivitySideBarPinnedActivityOptionsProvider>
                <ActivityUniversalProvider>
                  {children}
                </ActivityUniversalProvider>
              </AcitivitySideBarPinnedActivityOptionsProvider>
            </AcitivitySideBarDropDownProvider>
          </PinnedActivityTabContextProvider>
        </Activity_PinnedItemSelectedOptionsProvider>
      </ActivityUserClickTracingProvider>
    </PinnedActivityTabResizeProvider>
  );
};

export default ActivityProviders;
