import React, {
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import InputDropdown from "../InputDropdown/InputDropdown";
import SearchInput from "../SearchInput/SearchInput";
import Dropdown from "../Dropdown/Dropdown";
import DropdownDisplay from "../DropdownDisplay/DropdownDisplay";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import { ModalContext } from "../../../../common-components/ModalComponent/context/ModalContext";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import SpecialText from "../SpecialText/SpecialText";

const SingleUserActivityItemRow = ({
  rowdata,
  trigger,
  remainingDetails,
  index,
}) => {
  const [newRowData, setNewRowData] = useState(null);
  const [modifiedRowData, setModifiedRowData] = useState([]);
  const [totalComponents, setTotalComponents] = useState(0); // Initialize with 0 instead of null
  const userId = localStorage.getItem("userId");
  const { modalType, setModalType } = useContext(ModalContext);
  const [isEditRow, setIsEditRow] = useState(false);

  useEffect(() => {
    console.log("Row data is :", rowdata);
    setNewRowData(rowdata);
  }, [rowdata]);

  const [postBody, setPostBody] = useState({
    cat_qty_id1: remainingDetails.collective_id,
    cat_qty_id2: "None",
    cat_qty_id3: "None",
    cat_qty_id4: "None",
    cat_qty_id5: "None",
    cat_qty_id6: "None",
    value1: "None",
    value2: "None",
    value3: "None",
    value4: "None",
    value5: "None",
    value6: "None",
  });

  // useEffect(() => {
  //   console.log("New Row", newRowData);
  // }, [newRowData]);

  useEffect(() => {
    if (!newRowData) return;

    const keys = Object.keys(newRowData);
    let modifiedRowPlus = {};
    let modifiedRow = keys
      .map((key, index) => {
        /**
         * keys are coming as a_id , at_id , cat_qty_id1 , value1 , flag etc etc
         * i want the method to return when the key is not containing cat_qty_id or value
         */

        if (!key.startsWith("cat_qty_id") && !key.startsWith("value")) {
          modifiedRowPlus[key] = true;
          return {
            category_id: key,
            value_id: "None",
            data_array: newRowData[key],
            value: "None",
            type: "None",
          };
        }

        let extractedLastInteger = key.slice(-1);
        let cat = `cat_qty_id${extractedLastInteger}`;
        let val = `value${extractedLastInteger}`;
        let component_type = `None`;

        // if (key.startsWith("value")) console.log(cat);

        //  is already processed then leave the key
        if (modifiedRowPlus[cat])
          return {
            category_id: "None",
            value_id: "None",
            data_array: "None",
            value: "None",
            type: "None",
          };

        modifiedRowPlus[cat] = true;

        if (
          newRowData[cat] &&
          Array.isArray(newRowData[cat]) &&
          newRowData[cat].length > 0
        ) {
          let item_type = newRowData[cat][0]?.item_type;

          if (item_type === "unit") {
            // if item_type is unit
            let item_name = newRowData[cat][1]?.name;

            if (item_name === "text") {
              component_type = "text";
            } else {
              component_type = "input+dropdown";
            }
          } else if (item_type === "category") {
            component_type = "dropdown";
          }
        }

        if (newRowData[cat] && typeof newRowData[cat] === "number") {
          if (remainingDetails.optionName === "cool down time") {
            console.log(newRowData);
          }
          if (newRowData[val] !== "") {
            component_type = "search";
          }
        } else if (
          newRowData[cat] &&
          newRowData[cat].length === 1 &&
          newRowData[cat][0].item_type === "food item Search or exercise Search"
        ) {
          if (newRowData[val] !== "") {
            component_type = "search";
          }
        }
        return {
          category_id: cat,
          value_id: val,
          data_array: newRowData[cat],
          value: newRowData[val],
          type: component_type,
        };
      })
      .filter((data) => data.data_array !== undefined);

    setModifiedRowData(modifiedRow);
  }, [newRowData]);

  // useEffect(() => {
  //   console.log(modifiedRowData);
  // }, [modifiedRowData]);

  // Counting the total number of components displaying
  useEffect(() => {
    if (modifiedRowData.length === 0) return;

    let total = 0; // Local variable to track count

    modifiedRowData.forEach((row) => {
      if (row.type === "search") total += 1;
      if (row.type === "input+dropdown") total += 2;
      if (row.type === "dropdown") total += 1;
      if (row.type === "text") total += 1;
    });

    console.log(total);
    setTotalComponents(total);
  }, [modifiedRowData]);

  const handleEditRow = () => {
    setIsEditRow(true);
  };

  const handleUpdate = (key, value) => {
    setPostBody((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  };

  const handleUpdateData = async () => {
    let { a_id, at_id, flag, collective_id, is_active, trigger, user_id } =
      remainingDetails;
    let ua_id = rowdata.ua_id;

    // First fetch the current data from newRowData.
    // new row data me we will be havong cat_id and valueId
    // and populate the postBody

    // prepopulate the data

    // let triggerFinal = trigger === "meal" ? "userfooditem" : "Something";

    //   data = {
    //     "ua_id": 411,
    //     "a_id": 9,
    //     "at_id": 1,
    //     "flag": "PN",
    //     "cat_qty_id1": 148,
    //     "value1": None,
    //     "cat_qty_id2": 506,
    //     "value2": "jam (strawberry)",
    //     "cat_qty_id3":26,
    //     "value3": 20,
    //     "cat_qty_id4":None,
    //     "value4": None,
    //     "cat_qty_id5":None,
    //     "value5": None,
    //     "cat_qty_id6":None,
    //     "value6": None,
    //     "trigger": "userfooditem",
    //     "is_active": "true",
    //     "description": "updating a test food item",
    //     "action":'UPDATE',
    // }

    let event_time = new Date().toISOString().split(".")[0]; // Correct usage

    const body = {
      ua_id,
      a_id,
      at_id,
      flag,
      trigger,
      is_active,
      user_id,
      description: "updated test",
      // event_time: event_time,
      action: "UPDATE",
      ...postBody,
    };

    console.log(body);

    try {
      let response = await axios.post(
        `https://meseer.com/dog/update-delete-data/primary-mwb`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      toast("Upadated Successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`flex flex-col mt-8 text-xs ${
        isEditRow ? "bg-red-200 p-2 rounded-md" : ""
      }`}
    >
      <div className="flex justify-end items-end">
        {isEditRow ? (
          <div className=" flex justify-between items-center w-10">
            <IoIosCheckmarkCircle
              size={20}
              onClick={handleUpdateData}
              className="cursor-pointer"
            />
            <MdCancel
              className="cursor-pointer"
              size={20}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditRow(false);
              }}
            />
          </div>
        ) : (
          <MdModeEdit
            className="cursor-pointer"
            size={20}
            onClick={() => handleEditRow(rowdata)}
          />
        )}
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${totalComponents}, minmax(0, 1fr))`,
        }}
        className={`grid gap-4 -mt-2`}
      >
        {modifiedRowData.map((mod_row_data, index) => {
          // console.log(mod_row_data);
          if (mod_row_data.type === "None") return;

          if (mod_row_data.type === "input+dropdown") {
            return (
              <InputDropdown
                passedData={mod_row_data}
                title={mod_row_data.data_array[0].item_name}
                readonly={!isEditRow} // Change here
                postBody={postBody}
                setPostBody={setPostBody}
                onChange={({ name, id }) => {
                  handleUpdate(mod_row_data.category_id, id);
                }}
              />
            );
          }

          if (mod_row_data.type === "search") {
            // if (remainingDetails.optionName === "cool down time") {
            // }
            return (
              <SearchInput
                passedData={mod_row_data}
                trigger={trigger}
                readOnly={!isEditRow} // Change here
                isUpdated={true}
                onChange={({ name, id }) => {
                  handleUpdate(mod_row_data.value_id, name);
                  handleUpdate(mod_row_data.category_id, id);
                }}
              />
            );
          }

          if (mod_row_data.type === "dropdown") {
            return (
              <DropdownDisplay
                key={index}
                items={mod_row_data?.data_array}
                readonly={!isEditRow} // Change here
                onSelect={({ name, id }) => {
                  handleUpdate(mod_row_data.category_id, id);
                }}
                title={mod_row_data.data_array[0]?.item_name}
              />
            );
          }
          if (mod_row_data.type === "text") {
            return (
              <SpecialText
                text={mod_row_data.value}
                key={index}
                passedData={mod_row_data?.data_array?.[1]?.unit_id}
                // items={mod_row_data?.data_array}
                onChange={({ name, id }) => {
                  handleUpdate(mod_row_data.value_id, name);
                  handleUpdate(mod_row_data.category_id, id);
                }}
                title={mod_row_data.data_array[0]?.item_name}
                readOnly={!isEditRow}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default SingleUserActivityItemRow;
