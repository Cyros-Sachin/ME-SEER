import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Input from "../Inputs/Inputs";
import Dropdown from "../Dropdowns/Dropdown";
import { CheckCircle } from "@phosphor-icons/react";
import { ActivityUserClickTracingContext } from "../../../../../../contexts/ActivityUserClickTracing";
import SearchableInput from "../SearchInput/SearchInput";

const RenderFields = ({ keysArray, renderItems, name, a_id, at_id, flag }) => {
  const { collectiveId } = useContext(ActivityUserClickTracingContext);
  const [isValueSubmitted, setIsValueSubmitted] = useState(false);
  const [indexOrder, setOrder] = useState(1);

  useEffect(() => {
    console.log(renderItems);
  }, [renderItems]);

  const [fieldValues, setFieldValues] = useState({
    cat_qty_id1: collectiveId,
    value1: 0,
    cat_qty_id2: 0,
    value2: "",
    cat_qty_id3: 0,
    value3: "",
    cat_qty_id4: 0,
    value4: "",
    cat_qty_id5: 0,
    value5: "",
    cat_qty_id6: 0,
    value6: "",
  });

  // Set the order only once when the component mounts or keysArray changes
  useEffect(() => {
    setOrder(1);
  }, [keysArray]);

  const handleInputChange = (valueKey, inputKey, value, source) => {
    console.log(valueKey, inputKey, value, source);

    setFieldValues((prevState) => {
      const updatedValues = { ...prevState };
      if (source === "dropdown") {
        updatedValues[inputKey] = value.id; // For dropdown
        // updatedValues[valueKey] = value.name; // For SearchableInput
      } else if (source === "input") {
        updatedValues[valueKey] = value; // For basic Input
      } else if (source === "searchableInput") {
        updatedValues[valueKey] = value.value; // For SearchableInput
        updatedValues[inputKey] = value.cat_qty_id;
      }

      console.log(updatedValues);
      return updatedValues;
    });
  };

  const handlePostMethod = async () => {
    const user_id = localStorage.getItem("userId");
    const description = "test-descript1";
    const event_time = "2025-01-01T12:13:56";
    const trigger = "meal";

    const body = {
      ...fieldValues,
      a_id,
      at_id,
      flag,
      is_active: true,
      user_id,
      description,
      event_time,
      trigger,
    };

    console.log("Field Values Submitted: ", body);
    setIsValueSubmitted(true);

    //Uncomment to enable API call
    try {
      const response = await axios.post(
        "https://meseer.com/dog/user_activity_insert",
        body
      );
      console.log("All fields updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating all fields:", error);
    }
  };

  console.log(keysArray);

  return (
    <div className="meal-field flex items-center justify-between bg-white p-4 rounded-md shadow-sm">
      <div className="flex flex-wrap gap-4">
        {keysArray.map((key, index) => {
          // Skip the first iteration (index 0)   id1
          if (index < 1) return null;

          const items = renderItems[key];
          const inputKey = `cat_qty_id${index}`;
          const valueKey = `value${index}`;

          // Handle SearchableInput for a specific condition (for index 1)  only for id2
          if (name === "food item" && index === 2) {
            return (
              <SearchableInput
                key={`searchable_${inputKey}`}
                onValueChange={(data) =>
                  handleInputChange(valueKey, inputKey, data, "searchableInput")
                }
              />
            );
          }

          // Render Dropdown for "category" type
          if (items[0].item_type === "category") {
            return (
              <Dropdown
                key={`dropdown_${inputKey}`}
                options={items}
                onSelect={(selectedId) =>
                  handleInputChange(
                    valueKey,
                    inputKey,
                    { id: selectedId, name: null },
                    "dropdown"
                  )
                }
              />
            );
          }

          // Render Input and Dropdown for "unit" type
          if (items[0].item_type === "unit") {
            return (
              <div key={`unit_${key}`} className="flex gap-2">
                <Input
                  type="number"
                  value={fieldValues[valueKey] || ""} // Ensure value is always controlled
                  onValueChange={(value) =>
                    handleInputChange(valueKey, inputKey, value, "input")
                  }
                />
                <Dropdown
                  options={items}
                  onSelect={(selectedId) =>
                    handleInputChange(
                      valueKey,
                      inputKey,
                      { id: selectedId, name: null },
                      "dropdown"
                    )
                  }
                />
              </div>
            );
          }

          return null;
        })}
      </div>
      {!isValueSubmitted && (
        <CheckCircle
          size={32}
          className="text-green-500 hover:text-green-600 cursor-pointer"
          onClick={handlePostMethod}
        />
      )}
    </div>
  );
};

export default RenderFields;
