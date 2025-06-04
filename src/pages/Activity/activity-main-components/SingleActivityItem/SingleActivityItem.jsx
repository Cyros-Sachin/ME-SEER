import React from "react";
import SingleUserActivityItemRow from "../SingleUserActivityItemRow/SingleUserActivityItemRow";

const SingleActivityItem = ({ userActivityData, index }) => {
  console.log("uSer act data", userActivityData);
  return (
    <div className={`${index === 0 ? `mt-4` : "mt-8"}`}>
      <div className="pb-3 border-b border-b-gray-500 pl-2">
        {userActivityData.optionName[0].toUpperCase() +
          userActivityData.optionName.slice(1)}
      </div>

      <div className="mt-8">
        {userActivityData &&
          userActivityData.content &&
          userActivityData.content.length > 0 &&
          userActivityData.content.map((userAct, index) => {
            console.log("User Actionsdsdsadsadasd : ", userAct);
            return (
              <SingleUserActivityItemRow
                rowdata={userAct}
                trigger={userActivityData.trigger}
                remainingDetails={userActivityData}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SingleActivityItem;
