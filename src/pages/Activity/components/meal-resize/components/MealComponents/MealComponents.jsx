import { useEffect, useState } from "react";
import MealDropdown from "../MealDropdown/MealDropdown";

const MealComponents = ({ dat }) => {
  const [componentRender, setComponentRender] = useState([]);

  useEffect(() => {
    const items = dat?.data?.items || dat?.data;

    if (items) {
      const renderTree = Array.isArray(items)
        ? items.map(processItem)
        : [processItem(items)];

      setComponentRender(renderTree);
    }
  }, [dat]);

  const processItem = (item) => {
    const keys = Object.keys(item);
    const keysToExclude = [
      "a_id",
      "at_id",
      "event_time",
      "flag",
      "ua_id",
      "user_id",
    ];
    const groupedComponents = [];
    let pairItem = null;

    keys
      .filter((key) => !keysToExclude.includes(key))
      .forEach((key) => {
        const value = item[key];

        if (Array.isArray(value) && value.length > 1) {
          // If it's a dropdown
          const isUnit = value[0]?.item_type === "unit";
          groupedComponents.push({
            type: "dropdown",
            data: value,
            key,
            isUnit,
          });
        } else if (typeof value === "string") {
          const convertedNumber = Number(value);

          if (
            !isNaN(convertedNumber) &&
            Number.isInteger(convertedNumber) &&
            value.trim() !== ""
          ) {
            // If it's a valid pairable number
            pairItem = { type: "pair", data: convertedNumber, key };
          } else if (value.trim() !== "") {
            // If it's plain text
            groupedComponents.push({
              type: "text",
              data: value,
              key,
              weight: key,
            });
          }
        } else if (typeof value === "number") {
          // If it's a number
          groupedComponents.push({ type: "id", data: value, key });
        }
      });

    // Attach pairItem to the first unit dropdown or add separately
    if (pairItem) {
      const dropdownIndex = groupedComponents.findIndex(
        (comp) => comp.type === "dropdown" && comp.isUnit
      );
      if (dropdownIndex !== -1) {
        groupedComponents[dropdownIndex] = {
          ...groupedComponents[dropdownIndex],
          pair: pairItem,
        };
      } else {
        groupedComponents.push(pairItem);
      }
    }

    // console.log(groupedComponents);
    return groupedComponents;
  };

  // Function to clean label by removing numeric parts
  const cleanLabel = (label) => {
    return label.replace(/\d+/g, "").trim();
  };

  // useEffect(() => {
  //   console.log(componentRender);
  // }, [componentRender]);

  return (
    <div className="flex items-center w-full">
      <div className="w-[150px]">
        {dat?.data?.name?.[0].toUpperCase() + dat?.data?.name?.slice(1)}
      </div>
      <div className="flex flex-col mt-4 w-full">
        {componentRender.length > 0 &&
          componentRender.map((itemComponents, index) => (
            <div className="flex justify-between items-center" key={index}>
              {itemComponents.map((itemsComp, innerIndex) => {
                if (itemsComp.type === "text") {
                  return (
                    <div className="flex flex-col w-1/3 m-1" key={innerIndex}>
                      <label className="text-[10px] text-gray-500 w-full">
                        {itemsComp.weight
                          ? cleanLabel(
                              itemsComp.weight[0].toUpperCase() +
                                itemsComp.weight.slice(1)
                            )
                          : ""}
                      </label>
                      <input
                        value={itemsComp.data}
                        readOnly
                        className="p-1 text-xs rounded-md border border-black w-full"
                      />
                    </div>
                  );
                } else if (itemsComp.type === "dropdown") {
                  return (
                    <div className="flex w-2/3 items-center" key={innerIndex}>
                      {itemsComp.pair && (
                        <div className="flex flex-col w-full mr-2">
                          <label className="text-[10px] text-gray-500">
                            {cleanLabel(itemsComp.pair.key)}
                          </label>
                          <input
                            value={itemsComp.pair.data}
                            readOnly
                            className="p-1 text-xs rounded-md border border-black w-full"
                          />
                        </div>
                      )}
                      <MealDropdown unit={itemsComp} options={itemsComp.data} />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MealComponents;
