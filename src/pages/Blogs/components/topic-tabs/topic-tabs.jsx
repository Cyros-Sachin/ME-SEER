import React, { useEffect, useState } from "react";

const TopicTabs = ({ title, route }) => {
  const [tabTitle, setTabTitle] = useState(null);

  const getTitle = (originalTitle) => {
    return originalTitle.slice(0, 45);
  };

  useEffect(() => {
    let compressedTitle = getTitle(title);
    setTabTitle(compressedTitle);
  }, []);

  return (
    <div className="flex mt-2 cursor-pointer">
      <div className="text-[#4f4f4f9f] text-[16px]">{tabTitle}</div>
    </div>
  );
};

export default TopicTabs;
