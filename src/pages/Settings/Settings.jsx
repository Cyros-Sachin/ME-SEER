import React, { useContext, useState } from "react";
import { useSidebarTracing } from "../../common-components/SidebarAdvanced/contexts/SidebarTracing";
import SidebarAdvancedSettings from "../../common-components/SidebarAdvanced/components/SidebarUrlComponents/SidebarAdvancedSettings/SidebarAdvancedSettings";
import SidebarAdvanced from "../../common-components/SidebarAdvanced/SidebarAdvanced";
import NameSetting from "./components/NameSetting/NameSetting";
import EmailSetting from "./components/EmailSetting/EmailSetting";
import ChangePassword from "./components/ChangePassword/ChangePassword";

const Settings = () => {
  const { sidebarUrl } = useSidebarTracing();

  const renderSelectedSetting = () => {
    switch (sidebarUrl) {
      case "url/settings/profile/name":
        return <NameSetting />;
      case "url/settings/profile/email":
        return <EmailSetting />;
      case "url/settings/profile/password":
        return <ChangePassword />;
      case "url/settings/fitness/goals":
        return <div>🏋️ Workout Goals</div>;
      case "url/settings/fitness/types":
        return <div>🏃 Preferred Workout Types</div>;
      case "url/settings/fitness/steps":
        return <div>🚶 Daily Step Goal</div>;
      case "url/settings/nutrition/preferences":
        return <div>🥗 Dietary Preferences</div>;
      case "url/settings/nutrition/calories":
        return <div>🔥 Calorie Goals</div>;
      case "url/settings/nutrition/allergies":
        return <div>🚫 Allergies</div>;
      // Add more if needed...
      default:
        return (
          <div className="text-gray-400">Select a setting from the left 👈</div>
        );
    }
  };

  return (
    <>
      <SidebarAdvanced />
      <div className="flex flex-col min-h-screen relative ml-[230px] bg-[#ffffff] p-4">
        {renderSelectedSetting()}
      </div>
    </>
  );
};

export default Settings;
