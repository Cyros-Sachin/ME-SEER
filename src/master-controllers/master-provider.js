import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AcitivitySideBarDropDownProvider } from "../pages/Activity/contexts/ActivitySideBarDropdownOption/ActivitySideBarDropDownOptionContext";
import { AcitivitySideBarPinnedActivityOptionsProvider } from "../pages/Activity/contexts/ActivitySideBarPinnedActivityOptionsContext";
import { ActivityUserClickTracingProvider } from "../pages/Activity/contexts/ActivityUserClickTracing";
import { PinnedActivityTabContextProvider } from "../pages/Activity/contexts/PinnedActivityTabsContext";
import { Activity_PinnedItemSelectedOptionsProvider } from "../pages/Activity/contexts/Activity_PinnedItemSelectedOptions";
import { UserClickTracingProvider } from "../common-components/sidebar/contexts/user-click-tracing-context";
import { FoodTableDataProvider } from "../context/FoodTableData";
import { SideBarProvider } from "../common-components/sidebar/contexts/sidebar-context";
import { MenuProvider } from "../common-components/sidebar/contexts/menu-context";
import { TodoProvider } from "../pages/Space/contexts/todos-context";
import { PinnedActivityTabResizeProvider } from "../pages/Activity/contexts/PinnedActivityTabResizeItem";
import { ModalProvider } from "../common-components/ModalComponent/context/ModalContext";
import { ActivityUniversalProvider } from "../pages/Activity/contexts/ActivityUniversalContext/ActivityUniversalContext";
import ActivityProviders from "../pages/Activity/contexts/ActivityUniversalContext/ActivityUniversalProvider";
import { BlogProvider } from "../pages/Blogs/contexts/BlogContext";
import { SidebarControlsProvider } from "../common-components/SidebarAdvanced/contexts/SidebarControls";
import { SidebarTracingProvider } from "../common-components/SidebarAdvanced/contexts/SidebarTracing";
import { RecentBlogsProvider } from "../pages/Blogs/contexts/RecentBlogsContext";
import { UserInformationProvider } from "../pages/Login/context/UserInformationContext";

const MasterProvider = ({ children, clientId }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UserInformationProvider>
        <RecentBlogsProvider>
          <SidebarTracingProvider>
            <SidebarControlsProvider>
              <BlogProvider>
                <ModalProvider>
                  <PinnedActivityTabResizeProvider>
                    <ActivityUserClickTracingProvider>
                      <Activity_PinnedItemSelectedOptionsProvider>
                        <AcitivitySideBarDropDownProvider>
                          <PinnedActivityTabContextProvider>
                            <AcitivitySideBarPinnedActivityOptionsProvider>
                              <UserClickTracingProvider>
                                <FoodTableDataProvider>
                                  <SideBarProvider>
                                    <MenuProvider>
                                      <TodoProvider>{children}</TodoProvider>
                                    </MenuProvider>
                                  </SideBarProvider>
                                </FoodTableDataProvider>
                              </UserClickTracingProvider>
                            </AcitivitySideBarPinnedActivityOptionsProvider>
                          </PinnedActivityTabContextProvider>
                        </AcitivitySideBarDropDownProvider>
                      </Activity_PinnedItemSelectedOptionsProvider>
                    </ActivityUserClickTracingProvider>
                  </PinnedActivityTabResizeProvider>
                </ModalProvider>
              </BlogProvider>
            </SidebarControlsProvider>
          </SidebarTracingProvider>
        </RecentBlogsProvider>
      </UserInformationProvider>
    </GoogleOAuthProvider>
  );
};

// const MasterProvider = ({ children, clientId }) => {
//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <ModalProvider>
//         <ActivityProviders>
//           <FoodTableDataProvider>
//             <SideBarProvider>
//               <MenuProvider>
//                 <TodoProvider>{children}</TodoProvider>
//               </MenuProvider>
//             </SideBarProvider>
//           </FoodTableDataProvider>
//         </ActivityProviders>
//       </ModalProvider>
//     </GoogleOAuthProvider>
//   );
// };

export default MasterProvider;
