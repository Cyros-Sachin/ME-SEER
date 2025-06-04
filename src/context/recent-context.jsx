import React, { Children, createContext, useState } from "react";

const RecentContext = createContext();

const RecentProvider = ({ children }) => {
  const [recents, setRecents] = useState([
    {
      id: 1,
      title: "Work",
      img: "",
      alt: "work-img",
      route: "/work",
    },
    {
      id: 2,
      title: "Activity",
      img: "",
      alt: "activity-img",
      route: "/activity",
    },
    {
      id: 3,
      title: "Plan",
      img: "",
      alt: "plan-img",
      route: "/plan",
    },
    {
      id: 4,
      title: "Self",
      img: "",
      alt: "self-img",
      route: "/self",
    },
    {
      id: 5,
      title: "Relations",
      img: "",
      alt: "relations-img",
      route: "/relation",
    },
  ]);

  return (
    <RecentContext.Provider value={{ recents, setRecents }}>
      {children}
    </RecentContext.Provider>
  );
};

export { MenuContext, MenuProvider };
