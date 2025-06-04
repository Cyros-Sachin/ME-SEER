import axios from "axios";
import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import SearchInput from "../SearchInput/SearchInput";
import { Check } from "@phosphor-icons/react";
const ActivityTemplate = ({ activityItems }) => {
  const [activityOptionName, setActivityOptionName] = useState(
    activityItems.optionname || ""
  );

  const [templateItem, setTemplateItem] = useState([]);
  const [renderTree, setRenderTree] = useState([]);

  useEffect(() => {
    console.log(activityItems);
  }, [activityItems]);

  useEffect(() => {
    const getTemplate = async () => {
      try {
        const response = await axios.get(
          `https://meseer.com/dog/generic/templates/${activityItems.a_id}`
        );

        setTemplateItem(response.data);
      } catch (err) {
        console.error("Error fetching template data:", err);
      }
    };

    if (!activityItems.render) {
      getTemplate();
    }
  }, [activityItems]);

  useEffect(() => {
    const keys = Object.keys(templateItem || {});
    const response =
      keys.length > 0 &&
      keys.map((key, index) => {
        let render = "";
        let integer = key.slice(-1);
        let cat = `cat_qty_id${integer}`;
        let val = `value${integer}`;

        if (index <= 0) return null;

        if (index === 1 && activityOptionName === "food item") {
          render = "searchInput";
        }

        if (index === 2 && activityOptionName === "food item") {
          return null;
        }

        if (index > 3 && activityOptionName === "food item") return null;

        let itemIdContent = templateItem[`item_id${integer}`];

        if (itemIdContent?.length === 1 && index !== 1) {
          render = "input";
        } else if (
          itemIdContent?.length > 1 &&
          itemIdContent[0]?.item_type === "unit"
        ) {
          render = "input+dropdown";
        } else if (
          itemIdContent?.length > 1 &&
          itemIdContent[0]?.item_type === "category"
        ) {
          render = "dropdown";
        }

        return {
          catergoryId: cat,
          valueId: "",
          content: itemIdContent,
          render: render,
        };
      });

    // console.log(response);
    setRenderTree(response);
  }, [templateItem]);

  return (
    <div className="mt-4 p-2 flex items-center">
      <div className="min-w-[120px] text-sm">
        {activityOptionName &&
          activityOptionName[0].toUpperCase() + activityOptionName.slice(1)}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${renderTree.length - 2}, 1fr)`,
          gap: "3px",
          justifyContent: "space-between",
        }}
        className={`w-full text-xs items-center`}
      >
        {renderTree
          ? renderTree.map((template, index) => {
              if (!template) return null;

              if (template.render === "searchInput") {
                return (
                  <div className="m-1">
                    <SearchInput />
                  </div>
                );
              }

              if (template.render === "input") {
                return (
                  <div className="m-1">
                    <Input />
                  </div>
                );
              } else if (template.render === "input+dropdown") {
                return (
                  <div className="flex m-1">
                    <Input />
                    <Dropdown
                      selectedValue={template.content[1].name}
                      options={template.content}
                    />
                  </div>
                );
              } else if (template.render === "dropdown") {
                return (
                  <div className="m-1">
                    <Dropdown
                      selectedValue={template.content[1].name}
                      options={template.content}
                    />
                  </div>
                );
              } else {
                return null;
              }
            })
          : ""}
      </div>
      <div className="m-1 w-[30px] h-[30px] flex justify-center items-center border-2 border-black rounded-full p-2 cursor-pointer">
        <Check size={20} />
      </div>
    </div>
  );
};

export default ActivityTemplate;
