import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { useContext } from "react";
import { AcitivitySideBarDropDownContext } from "../../../../contexts/ActivitySideBarDropdownOption/ActivitySideBarDropDownOptionContext";

// A row component is basically responsible for post and get requests and showing the content
const Input = ({
  valueid,
  selectedvalue,
  label,
  type,
  postDataBody,
  setPostDataBody,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm(selectedvalue);
  }, [selectedvalue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Update the postDataBody for the specific valueid key
    setPostDataBody((prev) => ({
      ...prev,
      [valueid]: value, // Update only the valueid key
    }));
  };

  useEffect(() => {
    // console.log(valueid);
  }, [searchTerm]);

  return (
    <div className="flex flex-col">
      <label className="text-[10px]">
        {label[0].toUpperCase() + label.slice(1)}
      </label>
      <input
        type={type ? type : "text"}
        className="p-1 border border-gray-400 rounded-lg w-full text-xs"
        value={searchTerm}
        onChange={(e) => handleInputChange(e)}
        placeholder=""
      />
    </div>
  );
};

// Search Input
const SearchInput = ({
  catid,
  valueid,
  selectedvalue,
  readonly = false,
  options = [],
  label,
  postDataBody,
  setPostDataBody,
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedvalue || "");
  const [searchResults, setSearchResults] = useState([]);
  const [isReadonly, setIsReadonly] = useState(readonly);

  // Function to handle API call
  const fetchFoodItems = async (query) => {
    try {
      if (!query) {
        setSearchResults([]);
        return;
      }
      const response = await axios.get(
        `https://meseer.com/dog/food-items/search/${query}`
      );
      setSearchResults(response.data || []); // Assuming API returns an `items` array
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  useEffect(() => {
    // console.log(searchResults);
  }, [searchResults]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchFoodItems(value);
  };

  // Handle item selection
  const handleSelect = (item) => {
    // console.log(item);
    setSearchTerm(item.name);
    setSearchResults([]);
    setPostDataBody((prev) => ({
      ...prev,
      [catid]: item.f_db_id, // Update the catid key with the selected f_db_id
      [valueid]: item.name, // Update the valueid key with the selected name
    }));
  };

  // Handle readonly div click
  const handleReadonlyClick = () => {
    if (readonly) {
      setIsReadonly(false);
    }
  };

  useEffect(() => {
    if (selectedvalue) {
      setSearchTerm(selectedvalue);
    }
  }, [selectedvalue]);

  return (
    <div className="relative flex flex-col">
      <label className="text-[10px]">{label}</label>
      {isReadonly ? (
        <div
          className="p-1 border border-gray-400 rounded-lg bg-gray-100 cursor-pointer text-xs"
          onClick={handleReadonlyClick}
        >
          {searchTerm || "Click to edit"}
        </div>
      ) : (
        <input
          type="text"
          className="p-1 border border-gray-400 rounded-lg w-full text-xs"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for food items..."
        />
      )}

      {/* Display dropdown for search results */}
      {searchResults.length > 0 && (
        <ul className="absolute top-full text-xs left-0 right-0 bg-white border border-gray-300 max-h-40 overflow-y-auto mt-1 z-10">
          {searchResults.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Dropdown = ({
  catid,
  options = [],
  selectedvalue,
  label = "v",
  onChange,
  postDataBody,
  setPostDataBody,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(selectedvalue || "");

  // console.log(catid);

  const handleOptionClick = (value) => {
    let id = value.unit_id || value.cat_id;

    setCurrentValue(value.name);
    setIsOpen(false);

    // Update the postDataBody for the specific catid key
    setPostDataBody((prev) => ({
      ...prev,
      [catid]: id, // Update only the catid key
    }));

    // if (onChange) onChange(value);
  };

  return (
    <div className="flex flex-col relative">
      <label
        className={`text-[10px] ${
          label === "V" ? `text-[#00000000]` : `text-black`
        }`}
      >
        {label}
      </label>
      <div
        id={`dropdown-${catid}`}
        className="p-1 border border-gray-400 rounded-lg w-full text-xs cursor-pointer bg-white overflow-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentValue || "Select an option"}
      </div>
      {isOpen && (
        <div className="absolute top-full z-10 border border-gray-400 rounded-lg bg-white w-full max-h-40 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id || option.value}
              className={`p-2 text-xs cursor-pointer hover:bg-gray-100 ${
                currentValue === option.name ? "bg-gray-200" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label || option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const RowComponent = ({
  rowData,
  optionName,
  response,
  template,
  a_id,
  at_id,
  flag,
  collective_id,
  responseData,
  setResponseData,
  templateData,
  setTemplateData,
  // trigger,
}) => {
  // console.log("Trigger is :", trigger);
  const [componentCount, setComponentCount] = useState();
  const gridColumns = rowData.length;
  const [responseCount, setResponseCount] = useState(null);
  const [templateCount, setTemplateCount] = useState(null);
  const [postDataBody, setPostDataBody] = useState({
    cat_qty_id1: collective_id,
    cat_qty_id2: 0,
    cat_qty_id3: 0,
    cat_qty_id4: 0,
    cat_qty_id5: 0,
    cat_qty_id6: 0,
    value1: 0,
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
  });

  useEffect(() => {
    let totalComponents = 0;

    if (!Array.isArray(rowData)) return;
    rowData.forEach((element) => {
      let dataArray = element.dataArray;
      let value = element.value;

      if (dataArray && dataArray.length <= 0) {
        console.warn("Skipping invalid dataArray:", dataArray);
        return;
      }

      if (dataArray && dataArray.length > 0 && dataArray[0].item_id === "None")
        return;

      if (typeof dataArray === "number" && value === "") return;

      if (
        dataArray &&
        dataArray.length === 1 &&
        value === undefined &&
        dataArray[0].item_type === "food item Search or exercise Search"
      ) {
        totalComponents += 1;
      }
      if (typeof dataArray === "number" && value !== "") {
        totalComponents += 1;
      }

      if (
        dataArray &&
        dataArray.length > 0 &&
        dataArray[0].item_type === "unit"
      ) {
        totalComponents += 2;
      }

      if (
        dataArray &&
        dataArray.length > 0 &&
        dataArray[0].item_type === "category"
      ) {
        totalComponents += 1;
      }
    });

    if (template) {
      totalComponents += 1;
    }
    console.warn(totalComponents);

    setResponseCount(totalComponents);
  }, [rowData]);

  // useEffect(() => {
  //   console.warn(trigger);
  // }, [trigger]);

  const { trigger } = useContext(AcitivitySideBarDropDownContext);

  const transformData = (newData) => {
    return Object.keys(newData)
      .filter((key) => key.startsWith("cat_qty_id")) // Filtering category IDs
      .map((catKey, index) => {
        const valueKey = `value${index + 1}`;
        return {
          cat_qty_id: catKey,
          collective_id: newData[catKey], // Using the respective cat_qty_id value
          item_id: `item_id${index + 1}`,
          value: newData[valueKey] || undefined, // Assigning value if available
          value_id: valueKey,
          dataArray: [], // Keeping an empty array for now
        };
      });
  };

  const handleDataPost = async (a_id, at_id, flag, trigger) => {
    // console.warn("Response Data :", responseData);
    // console.warn("Template Data is : ", templateData);
    // console.warn("Post Body", postDataBody);

    // console.log("Response data should look like the below");
    // console.log(transformData(postDataBody));

    console.log(a_id, at_id, flag);
    // I need more data here
    // let a_id = a_id;
    // let at_id = at_id;
    // let flag = flag;
    let actualTrigger = "";
    if (trigger) {
      console.log(trigger);
      if ((trigger = "movement")) {
        actualTrigger = "workout";
      }
    } else {
      console.error(`Trigger is not found`);
      return;
    }

    // const userInput = prompt("Please enter trigger:");
    // trigger = userInput;
    // if (!trigger) return;

    const body = {
      a_id: at_id,
      at_id: a_id,
      flag,
      trigger,
      is_active: true,
      user_id: localStorage.getItem("userId"),
      description: "Test",
      event_time: `2025-01-01T12:13:56`,
      ...postDataBody,
    };

    console.log(body);

    // Post data
    try {
      const postData = await axios.post(
        `https://meseer.com/dog/user_activity_insert`,
        body
      );
      console.log(postData);

      // Once the data is posted in the template then transfer it to response array
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${responseCount}, minmax(100px, 1fr))`, // Dynamic columns
        gap: "10px", // Space between grid items
      }}
      className={`${template ? "bg-blue-200" : ""} rounded-md w-full mt-2 p-2`}
    >
      {response &&
        rowData &&
        rowData.length > 0 &&
        rowData.map((row, index) => {
          if (typeof row.dataArray === "number" && row.value === "") {
            return null;
          }

          // food item Search or exercise Search
          if (
            rowData &&
            rowData.dataArray &&
            row.dataArray.length === 1 &&
            row.value !== "" &&
            row.dataArray[0]?.item_type ===
              "food item Search or exercise Search"
          ) {
            return (
              <SearchInput
                readonly
                selectedvalue={row.value}
                label={`${
                  optionName.includes("exerciser") ? "Exercise" : "Food"
                }`}
                setPostDataBody={setPostDataBody}
              />
            );
          }

          if (
            typeof row.dataArray === "number" &&
            row.value !== "" &&
            row.dataArray
          ) {
            return (
              <Input
                valueid={row.value_id}
                selectedvalue={row.value}
                label={row.dataArray[0]?.item_name || "No Label"}
              />
            );
          }

          if (
            Array.isArray(row.dataArray) &&
            row.value !== "" &&
            row.dataArray.length > 0 &&
            row.dataArray[0]?.item_type === "unit"
          ) {
            const array =
              row.dataArray.find((item) => item.Selected) ||
              row.dataArray.find((item) => item.flag === "selected");

            return (
              <>
                <Input
                  valueid={row.value_id}
                  selectedvalue={row.value}
                  label={row.dataArray[0]?.item_name || "No Label"}
                />
                <Dropdown
                  catid={row.cat_qty_id}
                  options={row.dataArray}
                  selectedvalue={array?.name || ""}
                  label="V"
                />
              </>
            );
          }

          if (
            Array.isArray(row.dataArray) &&
            row.value === "" &&
            row.dataArray.length > 1 &&
            row.dataArray[0]?.item_type === "category"
          ) {
            const array = row.dataArray.find(
              (item) => item.flag === "selected"
            );
            return (
              <Dropdown
                catid={row.cat_qty_id}
                options={row.dataArray}
                selectedvalue={array?.name || ""}
                label={row.dataArray[0]?.item_name || "No Label"}
              />
            );
          }
        })}
      {template &&
        rowData &&
        rowData.length > 0 &&
        rowData.map((row, index) => {
          console.log(row);

          if (index === 0) return null;
          if (row.dataArray === "undefined" && row.value === "undefined")
            return null;

          if (
            row.dataArray &&
            row.dataArray.length === 1 &&
            row.dataArray[0].item_id === "None"
          )
            return null;

          if (
            row.dataArray.length === 1 &&
            row.value !== "" &&
            row.dataArray[0]?.item_type ===
              "food item Search or exercise Search"
          ) {
            return (
              <SearchInput
                readonly
                selectedvalue={row.value}
                label={`${
                  optionName.includes("exercise") ? "Exercise" : "Food"
                }`}
                setPostDataBody={setPostDataBody}
                catid={row.cat_qty_id}
                valueid={row.value_id}
              />
            );
          }

          if (
            Array.isArray(row.dataArray) &&
            row.dataArray.length > 1 &&
            row.dataArray[0].item_type === "category"
          ) {
            return (
              <Dropdown
                catid={row.cat_qty_id}
                label={row.dataArray && row.dataArray[0].item_name}
                options={row.dataArray}
                selectedvalue={row.dataArray[1].name}
                postDataBody={postDataBody}
                setPostDataBody={setPostDataBody}
              />
            );
          }

          if (
            Array.isArray(row.dataArray) &&
            row.dataArray.length > 1 &&
            row.dataArray[0].item_type === "unit"
          ) {
            return (
              <>
                <Input
                  valueid={row.value_id}
                  selectedvalue={row.value}
                  label={row.dataArray && row.dataArray[0].item_name}
                  postDataBody={postDataBody}
                  setPostDataBody={setPostDataBody}
                  type="number"
                />
                <Dropdown
                  catid={row.cat_qty_id}
                  label={row.dataArray && row.dataArray[0].item_name}
                  options={row.dataArray}
                  selectedvalue={row.dataArray[1].name}
                  postDataBody={postDataBody}
                  setPostDataBody={setPostDataBody}
                />
              </>
            );
          }
        })}
      <div>
        {template && (
          <div className="flex mt-4 w-[150px]">
            <CheckCircle
              size={25}
              onClick={() => handleDataPost(a_id, at_id, flag, trigger)}
            />
            <XCircle size={25} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RowComponent;
