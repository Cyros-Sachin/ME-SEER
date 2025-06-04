import React from "react";

const InformationTab = ({ title, data, percentages, green }) => {
  return (
    <div className="flex w-60 border border-[#74737377] p-2 h-20 items-center justify-between rounded-lg">
      <div className="w-2/3 flex flex-col h-full items-center justify-between">
        <div className="text-[#72717180] w-full pl-2">{title}</div>
        <div className="text-3xl font-semibold w-full pl-2">{data}</div>
      </div>

      <div className="w-1/3 h-full flex items-end justify-end">
        <div
          className={`${
            green
              ? "bg-[#d4fce6] text-[#219f3c]"
              : `bg-[#ffeeee] text-[#f83c3f]`
          } font-semibold p-1 w-20 rounded-lg text-sm flex justify-end items-end`}
        >
          {percentages}
        </div>
      </div>
    </div>
  );
};

export default InformationTab;
