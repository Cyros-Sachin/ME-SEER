import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSidebarTracing } from "../../../contexts/SidebarTracing";

const SidebarAdvancedSettings = ({ isExpanded = true }) => {
  const [settings] = useState([
    {
      name: "Profile",
      settings: [
        { name: "Name", settingsUrl: "url/settings/profile/name" },
        { name: "Email", settingsUrl: "url/settings/profile/email" },
        {
          name: "Change Password",
          settingsUrl: "url/settings/profile/password",
        },
      ],
    },
    {
      name: "Fitness Preferences",
      settings: [
        { name: "Workout Goals", settingsUrl: "url/settings/fitness/goals" },
        {
          name: "Preferred Workout Types",
          settingsUrl: "url/settings/fitness/types",
        },
        { name: "Daily Step Goal", settingsUrl: "url/settings/fitness/steps" },
      ],
    },
    {
      name: "Nutrition",
      settings: [
        {
          name: "Dietary Preferences",
          settingsUrl: "url/settings/nutrition/preferences",
        },
        {
          name: "Calorie Goals",
          settingsUrl: "url/settings/nutrition/calories",
        },
        { name: "Allergies", settingsUrl: "url/settings/nutrition/allergies" },
      ],
    },
    {
      name: "Lifestyle",
      settings: [
        { name: "Sleep Tracking", settingsUrl: "url/settings/lifestyle/sleep" },
        {
          name: "Water Intake Goal",
          settingsUrl: "url/settings/lifestyle/water",
        },
        {
          name: "Meditation Reminders",
          settingsUrl: "url/settings/lifestyle/meditation",
        },
      ],
    },
    {
      name: "Notifications",
      settings: [
        {
          name: "Workout Reminders",
          settingsUrl: "url/settings/notifications/workouts",
        },
        {
          name: "Nutrition Tips",
          settingsUrl: "url/settings/notifications/nutrition",
        },
        {
          name: "Progress Updates",
          settingsUrl: "url/settings/notifications/progress",
        },
      ],
    },
    {
      name: "Privacy",
      settings: [
        {
          name: "Data Sharing Preferences",
          settingsUrl: "url/settings/privacy/data-sharing",
        },
        { name: "Connected Apps", settingsUrl: "url/settings/privacy/apps" },
        {
          name: "Download My Data",
          settingsUrl: "url/settings/privacy/download",
        },
      ],
    },
    {
      name: "Account",
      settings: [
        {
          name: "Email & Password",
          settingsUrl: "url/settings/account/security",
        },
        {
          name: "Subscription Plan",
          settingsUrl: "url/settings/account/subscription",
        },
        { name: "Delete Account", settingsUrl: "url/settings/account/delete" },
      ],
    },
    { name: "Theme", settings: [] },
    { name: "Time Zone", settings: [] },
  ]);

  const { sidebarUrl, updateSidebarUrl } = useSidebarTracing();

  const navigateSidebarUrl = () => {
    updateSidebarUrl("/");
  };
  return (
    <div
      className={`scrollbar text-xs ${
        isExpanded
          ? "w-[220px] flex flex-col"
          : "w-[70px] flex flex-col items-center"
      } fixed h-screen shadow-md shadow-[#00000077] p-2 bg-white overflow-auto`}
    >
      <div className="flex w-full items-center justify-between mt-4">
        <div
          onClick={navigateSidebarUrl}
          className="bg-black p-1 cursor-pointer ml-2"
        >
          <IoIosArrowBack size={15} color="white" />
        </div>
        <div className="mr-16 text-lg">SETTINGS</div>
      </div>

      {settings.map((setting, settingIndex) => (
        <div key={settingIndex} className="mt-4 p-2 w-full">
          <div className="text-gray-400 text-sm pb-2 border-b border-b-[#aeaeae]">
            {setting.name}
          </div>
          <div>
            {setting.settings.map((subSetting, subIndex) => (
              <div
                key={subIndex}
                className="mt-2 flex items-center justify-between"
              >
                <div>{subSetting.name}</div>
                <div
                  onClick={() => updateSidebarUrl(subSetting.settingsUrl)}
                  className="bg-gray-200 p-1 hover:bg-black hover:text-white cursor-pointer"
                >
                  <IoIosArrowForward />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarAdvancedSettings;
