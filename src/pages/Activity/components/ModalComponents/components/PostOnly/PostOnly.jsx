import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../../../common-components/ModalComponent/context/ModalContext";
import { Activity_PinnedItemSelectedOptionsContext } from "../../../../contexts/Activity_PinnedItemSelectedOptions";
import { AcitivitySideBarPinnedActivityOptionsContext } from "../../../../contexts/ActivitySideBarPinnedActivityOptionsContext";
import { templates } from "../../../meal-resize/components/Template";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

const Dropdown = ({ cat_qty_id, options, setInputs, label }) => {
  const [dropdown, setDropdown] = useState(options[1]?.name || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionSelect = (option) => {
    const selectedOption = option.name;
    const optionId = option.cat_id || option.unit_id;

    setDropdown(selectedOption);
    setInputs((prev) => {
      prev[cat_qty_id] = optionId;
      return { ...prev }; // Ensure state is updated correctly
    });
    setIsDropdownOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.target.closest(".dropdown-container")) return; // Check if clicked inside the dropdown
      setIsDropdownOpen(false); // Close dropdown if clicked outside
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown); // Cleanup event listener
  }, []);

  return (
    <div className="flex flex-col relative">
      {label && (
        <label className="text-[10px] text-gray-400">{label && label}</label>
      )}
      <div
        onClick={handleToggleDropdown}
        className={`${
          !label ? `mt-[15px]` : ""
        } border border-black w-full items-center flex flex-col justify-center text-xs rounded-md h-[26px] relative dropdown-container cursor-pointer`}
      >
        {dropdown || "Select an option"}
      </div>
      {isDropdownOpen && (
        <div className="scrollbar z-50 w-full absolute top-full border border-black min-h-10 max-h-40 bg-white overflow-auto">
          {options &&
            options.length > 0 &&
            options.map((option, index) => {
              if (index === 0) return null; // Skip first option if necessary
              return (
                <div
                  key={option.cat_id}
                  onClick={() => handleOptionSelect(option)}
                  className="hover:bg-blue-700 cursor-pointer px-2 py-1 text-black text-xs"
                >
                  {option.name}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

const Input = ({ valueid, label, type, setInputs }) => {
  const [input, setInput] = useState("");
  const setInputMethod = (e) => {
    const value = e.target.value;
    setInput(value);

    setInputs((prev) => {
      prev[valueid] = value;
      return { ...prev }; // Ensure state is updated correctly
    });
  };

  return (
    <div className="flex flex-col">
      <label className="text-[10px] text-[#9c9c9c]">{label}</label>
      <input
        value={input}
        onChange={setInputMethod}
        type={type}
        className="border border-black rounded-md"
      />
    </div>
  );
};

const PostOnly = () => {
  const { modalType, setModalType, isModalOpen, setIsModalOpen } =
    useContext(ModalContext);
  const { activitySidebarOptionsForSelectedActivity } = useContext(
    AcitivitySideBarPinnedActivityOptionsContext
  );

  const [templateId, setTemplateId] = useState(null);
  const [renderTemplate, setRenderTemplate] = useState([]);
  const [totalComponents, setTotalComponents] = useState(0);
  const [activeActivity, setActiveActivity] = useState(null);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const activity = activitySidebarOptionsForSelectedActivity.find(
      (item) => item.name === modalType
    );

    if (activity) {
      setTemplateId(activity.a_id);
      setActiveActivity(activity);
    }
  }, [activitySidebarOptionsForSelectedActivity, modalType]);

  useEffect(() => {
    if (!templateId || !templates[templateId]) return;

    const loadTemplateObject = templates[templateId];
    const keys = Object.keys(loadTemplateObject || {});
    let componentCount = 0;
    const result =
      keys.length > 0
        ? keys
            .map((key, index) => {
              if (index === 0) return null; // Skip first key

              const item = loadTemplateObject[key]?.[0];
              let cat_qty_id = `cat_qty_id${index}`;
              let value = `value${index}`;

              if (!item || item.item_id === "None") return null;

              if (item.item_type === "unit") {
                componentCount += 2;
                return {
                  component: "input+dropdown",
                  label: item.item_name,
                  options: loadTemplateObject[key],
                  catqty: cat_qty_id,
                  val: value,
                };
              }

              if (item.item_type === "category") {
                componentCount += 1;
                return {
                  component: "dropdown",
                  label: item.item_name,
                  options: loadTemplateObject[key],
                  catqty: cat_qty_id,
                };
              }

              return null;
            })
            .filter(Boolean)
        : [];

    setRenderTemplate(result);
    setTotalComponents(componentCount);
  }, [templateId]);

  const postMethod = async () => {
    const { a_id, at_id, flag } = activeActivity;
    const body = {
      a_id,
      at_id,
      flag,
      trigger: "",
      is_active: true,
      user_id: localStorage.getItem("userId"),
      description: "Description 1",
      event_time: new Date(Date.now()),
      ...inputs,
    };

    console.log(body);

    // try {
    //   const response = await axios.post(
    //     `https://meseer.com/dog/user_activity_insert`,
    //     body
    //   );

    //   console.log(response);
    // } catch (err) {
    //   console.error(
    //     `Something went wrong in Post method in PostOnly Component`
    //   );
    // }
  };

  const resetMethod = () => {
    setInputs({});
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative scrollbar min-w-[650px] min-h-80 max-h-96 bg-white rounded-lg flex flex-col p-4 overflow-auto">
      <div className="w-full flex justify-between mt-4">
        <div className="">
          {modalType[0].toUpperCase() + modalType.slice(1)}
        </div>
        <div
          onClick={closeModal}
          className="font-bold cursor-pointer -mt-6 -mr-2 rounded-full text-sm text-white w-8 h-8 flex items-center justify-center"
        >
          <MdCancel size={25} color="black" />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(
            Math.max(totalComponents, 1),
            2
          )}, 1fr)`,
        }}
        className="mt-4 gap-2"
      >
        {renderTemplate.map((render, index) => {
          if (render.component === "input+dropdown") {
            return (
              <React.Fragment key={index}>
                <Input
                  valueid={render.val}
                  label={render.label}
                  type="number"
                  setInputs={setInputs}
                />
                <Dropdown
                  cat_qty_id={render.catqty}
                  options={render.options}
                  setInputs={setInputs}
                />
              </React.Fragment>
            );
          } else if (render.component === "dropdown") {
            return (
              <Dropdown
                cat_qty_id={render.catqty}
                options={render.options}
                setInputs={setInputs}
                label={render.label}
              />
            );
          }
        })}
      </div>
      <div className="mt-8 p-2 flex justify-evenly items-center text-sm text-white">
        <button
          className="bg-gray-200 w-40 text-black p-2 rounded-md"
          onClick={resetMethod}
        >
          Reset
        </button>
        <button
          className="bg-blue-500 w-40 p-2 rounded-md"
          onClick={postMethod}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PostOnly;
