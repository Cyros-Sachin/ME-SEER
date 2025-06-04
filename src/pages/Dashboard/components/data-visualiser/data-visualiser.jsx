import React from "react";

const DataVisualiser = ({ data }) => {
  const percentage = Math.floor(data.percentages).toString();

  return (
    <div className="flex w-full items-center mt-1">
      <div>
        <img className="h-12 w-20" src={data.img} />
      </div>

      <div className="w-full flex flex-col p-1">
        <div className="flex justify-between">
          <div className="text-sm font-semibold">{data.name}</div>
          <div className="text-[12px] font-semibold text-[#ff2a2a]">
            ${data.negative}
          </div>
        </div>
        <div className="border border-[#727272ac] w-full">
          <div
            className={`bg-black p-1 `}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="text-sm font-semibold p-1 items-center justify-center">
        {data.percentages}%
      </div>
    </div>
  );
};

export default DataVisualiser;
