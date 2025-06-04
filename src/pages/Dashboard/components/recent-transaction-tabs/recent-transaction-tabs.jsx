import React from "react";

const RecentTransactionTabs = ({
  title,
  data,
  setHandlers,
  name,
  selectedTab,
}) => {
  const handleUserClicks = () => {
    const { setDisplayData, setSelectedTab } = setHandlers;
    setDisplayData(data);
    setSelectedTab(name);
  };

  return (
    <div
      onClick={() => handleUserClicks()}
      className={`${
        selectedTab === name ? "border-[#2fff48] border-b-2" : ""
      } cursor-pointer text-sm ml-3 p-1 font-semibold`}
    >
      <div>{title}</div>
    </div>
  );
};

export default RecentTransactionTabs;
