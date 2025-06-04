import React, { createContext, useContext, useEffect, useState } from "react";

const UserInformationContext = createContext();

const UserInformationProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("userInformationStorage")) || {};
    } catch (error) {
      console.error("Error parsing userInformationStorage data:", error);
      return {};
    }
  });

  useEffect(() => {
    if (Object.keys(userInformation).length === 0) return;

    try {
      localStorage.setItem(
        "userInformationStorage",
        JSON.stringify(userInformation)
      );
    } catch (error) {
      console.error("Error updating userInformationStorage:", error);
    }
  }, [userInformation]);

  return (
    <UserInformationContext.Provider
      value={{ userInformation, setUserInformation }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

const useUserInformation = () => useContext(UserInformationContext);

export { UserInformationProvider, useUserInformation };
