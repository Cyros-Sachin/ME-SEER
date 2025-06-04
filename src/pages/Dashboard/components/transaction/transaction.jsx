import React from "react";

const Transaction = ({ data }) => {
  return (
    <div className="rounded-lg mt-2 flex items-center justify-center p-2 w-[90%]">
      <div className="flex items-center justify-center">
        <img className="h-10 w-12" src={data.img} />
      </div>
      <div className="ml-2 w-2/4">
        <div className="text-[14px] font-semibold">{data.transactionName}</div>
        <div className="text-xs text-[#8181818b] font-semibold">
          {data.transactionType}
        </div>
      </div>

      <div className="mr-2 w-2/4">
        <div className="text-[14px] font-semibold w-full flex justify-end items-center">
          ${data.amount}
        </div>
        <div className="text-[10px] text-[#8181818b] font-semibold  flex items-end justify-end">
          {data.transactionDate}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
