import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import { Flag } from "@phosphor-icons/react";

const ActivityPopulated = ({ activityItems }) => {
  const [populatedItem, setPopulatedItem] = useState([]);
  const [renderCycle, setRenderCycle] = useState([]); // Items to render
  const [activityName, setActivityName] = useState(
    activityItems && activityItems.optionname
  );

  useEffect(() => {
    const dataToRender = activityItems.data;
    if (Array.isArray(dataToRender)) {
      // Handle if data is an array of objects
      setPopulatedItem((prevState) => [...prevState, ...dataToRender]);
    } else {
      // Handle if data is a single object with multiple keys
      const key = Object.keys(dataToRender);
      const targetKeyItem = dataToRender[key];
      setPopulatedItem((prevState) => [...prevState, targetKeyItem]);
    }
  }, [activityItems]);

  // Generate renderCycle based on populatedItem
  useEffect(() => {
    const response = populatedItem.map((popItem) => {
      const items = Object.keys(popItem);
      return items
        .map((key) => {
          if (key.includes("cat_qty_id")) {
            let render = "";
            let integerPart = parseInt(key.slice(-1));
            const catQtyId = `cat_qty_id${integerPart}`;
            const valueKey = `value${integerPart}`;

            const cat_at_integer = popItem[catQtyId];
            const val_at_integer = popItem[valueKey];

            if (typeof cat_at_integer === "number" && val_at_integer === "") {
              render = "none";
            } else if (
              typeof cat_at_integer === "number" &&
              val_at_integer !== ""
            ) {
              render = "input";
            } else if (
              typeof cat_at_integer !== "number" &&
              val_at_integer !== ""
            ) {
              render = "input+dropdown";
            } else if (
              typeof cat_at_integer !== "number" &&
              val_at_integer === ""
            ) {
              render = "dropdown";
            }

            return {
              id: key,
              cat_qty_id: popItem[key],
              value: popItem[valueKey],
              render,
            };
          }
          return null; // Explicitly return null for non-cat_qty_id keys
        })
        .filter(Boolean); // Filter out null values
    });

    setRenderCycle(response);
  }, [populatedItem]);

  const handlePnItem = () => {};

  // // Rendering the items
  return (
    <div className="mt-4 p-2 w-full flex">
      <div className="min-w-[120px] text-sm flex items-center">
        {activityName[0].toUpperCase() + activityName.slice(1)}
      </div>
      <div className="w-full flex flex-col">
        {renderCycle &&
          renderCycle.length > 0 &&
          renderCycle.map((oneCycle, index) => {
            return (
              <div key={index} className="m-2 p-2 flex">
                {oneCycle &&
                  oneCycle.length > 0 &&
                  oneCycle.map((cycle, idx) => {
                    return (
                      <div key={idx} className="flex">
                        {cycle.render === "input" ? (
                          <div className="text-xs m-1">
                            <Input selectedValue={cycle.value} />
                          </div>
                        ) : cycle.render === "input+dropdown" ? (
                          <div className="flex text-xs m-1">
                            <Input selectedValue={cycle.value} />
                            <Dropdown options={cycle.cat_qty_id} />
                          </div>
                        ) : cycle.render === "dropdown" ? (
                          <div>
                            <Dropdown options={cycle.cat_qty_id} />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      {activityItems.flag === "PN" && (
        <div className="p-2 justify-center items-center flex">
          <div
            onClick={handlePnItem}
            className="border-2 border-black p-2 rounded-full"
          >
            +
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityPopulated;
