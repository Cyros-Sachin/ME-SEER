import React, { createContext, useState } from "react";
//assets
import wrench from "./../assets/sidebar/wrench.png";
import profile from "./../assets/sidebar/user.png";

const SidebarContext = createContext();

const SideBarProvider = ({ children }) => {
  const [profileName, setProfileName] = useState("Seer:Nancy");
  const [isMealOpen, setIsMealOpen] = useState(false);
  const [settings, setSettings] = useState([
    {
      id: 1,
      src: wrench,
      setting: "Settings",
      alt: "setting-img",
    },
    {
      id: 2,
      src: profile,
      setting: "Profile",
      alt: "profile-img",
    },
  ]);

  const [subSpaceId, setSubSpaceId] = useState("1");

  return (
    <SidebarContext.Provider
      value={{
        profileName,
        setProfileName,
        settings,
        setSettings,
        isMealOpen,
        setIsMealOpen,
        subSpaceId,
        setSubSpaceId,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SideBarProvider };
