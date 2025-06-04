import { PlusCircle } from "@phosphor-icons/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import RenderFields from "./components/RenderFieldsComponent/RenderFields"; // Assuming you save RenderFields in a separate file.
import { ActivityUserClickTracingContext } from "../../../../contexts/ActivityUserClickTracing";
import { Activity_PinnedItemSelectedOptionsContext } from "../../../../contexts/Activity_PinnedItemSelectedOptions";

const CreateActivityTemplate = ({ act }) => {
  const [renderItems, setRenderItems] = useState({});
  const [keysToRender, setKeysToRender] = useState([]);
  const [name, setName] = useState("");
  const { activitySelected } = useContext(ActivityUserClickTracingContext);

  console.log(act); // contains flags

  console.log(keysToRender);
  const handleAddItem = () => {
    const newItems = [
      "description",
      "item_id1",
      "item_id2",
      "item_id3",
      "item_id4",
      "item_id5",
      "item_id6",
    ];

    if (name === "food item") {
      setKeysToRender((prevState) => [...prevState, newItems]);
    }
  };

  useEffect(() => {
    // console.log(keysToRender);
  }, [keysToRender]);

  useEffect(() => {
    if (!act) return;

    const { a_id: act_id, name: actName } = act;
    setName(actName);

    const getTemplate = async () => {
      try {
        const response = await axios.get(
          `https://meseer.com/dog/generic/templates/${act_id}`
        );
        if (response.data && typeof response.data === "object") {
          setRenderItems(response.data);
          setKeysToRender([Object.keys(response.data)]); // Ensure keys are added as an array
        } else {
          console.error("Unexpected response format", response.data);
        }
      } catch (error) {
        console.error("Error fetching template", error);
      }
    };

    getTemplate();
  }, [act]);

  return (
    <div className="meal-container p-4 rounded-md shadow-md mt-4">
      <div className="meal-header flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-bold">
          {name && name[0].toUpperCase() + name.slice(1)}
        </h2>
        {act.flag === "PN" && (
          <PlusCircle
            size={25}
            onClick={handleAddItem}
            className="cursor-pointer text-blue-500 hover:text-blue-600"
          />
        )}
      </div>
      <div className="meal-content grid gap-4">
        {keysToRender.map((keyGroup, index) => (
          <RenderFields
            key={index}
            keysArray={keyGroup}
            renderItems={renderItems}
            name={name}
            a_id={act.a_id}
            at_id={activitySelected}
            flag={act.flag}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateActivityTemplate;
