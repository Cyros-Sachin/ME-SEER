import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../../../activity-main-components/SearchInput/SearchInput";
import InputField from "../../../../activity-main-components/InputField/InputField";
import Dropdown from "../../../../activity-main-components/Dropdown/Dropdown";
import { toast } from "react-toastify";
import { ModalContext } from "../../../../../../common-components/ModalComponent/context/ModalContext";
import { modifyUserPinnedActivities } from "../../../../Redux/PinnedItems";

const CreateTask = () => {
  const [fetchedTemplate, setFetchedTemplate] = useState([]);
  const [modifiedFetchedTemplate, setModifiedFetchedTemplate] = useState([]);
  const [componentCount, setComponentCount] = useState(1);
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const dispatch = useDispatch();

  //#region  ------------------------ REDUX VARIABLES

  const activityTrigger = useSelector(
    (state) => state.userSelectedParams.activityTrigger
  );
  const collective_id = useSelector(
    (state) => state.userSelectedParams.collectiveIdSelectedByUser
  );

  const trigger = useSelector(
    (state) => state.userSelectedParams.activityTrigger
  );

  const collectiveIdSelectedByUser = useSelector(
    (state) => state.userSelectedParams.collectiveIdSelectedByUser
  );

  const userPinnedActivityMap = useSelector(
    (state) => state.pinnedActivities.userPinnedActivityMap
  );

  console.log("Pinned acts are heere : ", userPinnedActivityMap);

  const [postDataBody, setPostDataBody] = useState({
    cat_qty_id1: 0,
    cat_qty_id2: collectiveIdSelectedByUser, // Should be the goal id associated with it passed within the selected goal
    cat_qty_id3: 0,
    cat_qty_id4: 0,
    cat_qty_id5: 0,
    cat_qty_id6: 0,
    value1: "0",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
  });

  useEffect(() => {
    const getTemplate = async () => {
      try {
        const response = await axios.get(
          `https://meseer.com/dog/generic/templates/27`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFetchedTemplate(response.data);
      } catch (err) {
        console.error("Something went wrong with fetching the template.");
      }
    };

    getTemplate();
  }, []);

  useEffect(() => {
    if (!fetchedTemplate || Object.keys(fetchedTemplate).length === 0) return;

    let updatedPostData = {};
    let count = 0;
    let modifiedTemplates = [];

    Object.entries(fetchedTemplate)
      .slice(1)
      .forEach(([key, items]) => {
        let lastInteger = key.split("_")[1];
        let integer = lastInteger?.slice(-1);
        if (
          !items ||
          items.length === 0 ||
          (items.length === 1 && items[0].item_id === "None")
        )
          return;

        let newObj = {
          cat_qty_id: `cat_qty_${lastInteger}`,
          value_id: `value${integer}`,
          title: "",
        };

        if (
          items.length === 1 &&
          items[0].item_type === "food item Search or exercise Search"
        ) {
          newObj.type = "search";
          newObj.data_array = [];
          newObj.trigger = activityTrigger;
          count++;
        } else if (items.length > 1) {
          if (items[0].item_type === "unit") {
            newObj.type = "input+dropdown";
            newObj.data_array = items.slice(1);
            newObj.title = items[0].item_name;
            count += 2;
          } else if (items[0].item_type === "category") {
            newObj.type = "dropdown";
            newObj.data_array = items;
            newObj.title = items[0].item_name;
            count += 1;
          }
        }

        updatedPostData[newObj.cat_qty_id] = 0;
        updatedPostData[newObj.value_id] = "";

        modifiedTemplates.push(newObj);
        // count++;
      });

    setPostDataBody((prev) => ({
      ...prev,
      ...updatedPostData,
    }));

    console.log("Count is : ", count);
    setModifiedFetchedTemplate(modifiedTemplates);
    setComponentCount(count);
  }, [fetchedTemplate, activityTrigger]);

  useEffect(() => {
    console.log("Updated Post Data Body:", postDataBody);
  }, [postDataBody]);

  const handleUpdate = (key, value) => {
    setPostDataBody((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  };

  const handleSubmit = async () => {
    let event_time = new Date().toISOString().split(".")[0]; // Correct usage

    const body = {
      user_id: localStorage.getItem("userId"),
      flag: "PP",
      at_id: 301,
      a_id: 27,
      ...postDataBody,
      trigger: "task",
      is_active: "Y",
      description: `Task is added at ${event_time}`,
      event_time: event_time,
    };

    try {
      const postData = await axios.post(
        `https://meseer.com/dog/add-data/primary-mwb/`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // The goal selected by user
      let parentGoalId = collectiveIdSelectedByUser;
      let matchedKey = null;

      for (let key in userPinnedActivityMap) {
        let [id, name] = key.split(",");
        id = id.split("[")[1];
        if (id === parentGoalId) {
          matchedKey = key;
          break;
        }
      }

      if (matchedKey) {
        const tasksArray = userPinnedActivityMap[matchedKey];
        // Do what you want with tasksArray

        let obj = {
          created_timestamp: event_time,
          goal_id: parentGoalId,
          task_id: postData.data.collective_id.collective_Id,
          task_name: postDataBody.value3,
          ua_id: postData.data.collective_id.ua_id || "",
        };

        dispatch(
          modifyUserPinnedActivities({
            key: parentGoalId,
            type: "addTaskToGoal",
            item: obj,
          })
        );
      } else {
        console.warn("No matching key found for goal ID", parentGoalId);
      }

      console.log("Response is : ", postData); // returns a collective id

      setIsModalOpen(false);
      toast(`Data Added`);

      // Once the data is posted in the template then transfer it to response array
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div
      className={`scrollbar ${
        componentCount > 4 ? "w-[1500px]" : "w-[750px]"
      } max-h-80 bg-[#2e2c2c] rounded-lg text-gray-500 p-4 overflow-auto`}
    >
      <div className="pb-4 border-b border-b-gray-500 text-lg font-semibold">
        Create Task
      </div>
      <div
        className="mt-4 grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${componentCount}, minmax(0, 1fr))`,
        }}
      >
        {modifiedFetchedTemplate?.map((item, index) => {
          return (
            item?.type && (
              <React.Fragment key={index}>
                {item.type === "search" && (
                  <SearchInput
                    passedData={{ value: postDataBody[item.value_id] }}
                    trigger={item.trigger}
                    readOnly={false}
                    onChange={({ name, id }) => {
                      handleUpdate(item.value_id, name);
                      handleUpdate(item.cat_qty_id, id);
                    }}
                    // title={item.title}
                  />
                )}

                {item.type === "input+dropdown" && (
                  <>
                    <InputField
                      value={postDataBody[item.value_id]}
                      onChange={(value) => handleUpdate(item.value_id, value)}
                      readOnly={false}
                      title={item.title}
                      type="text"
                    />
                    <Dropdown
                      items={item.data_array}
                      selected={postDataBody[item.cat_qty_id]}
                      onSelect={({ id }) => handleUpdate(item.cat_qty_id, id)}
                      readonly={false}
                    />
                  </>
                )}

                {item.type === "dropdown" && (
                  <Dropdown
                    items={item.data_array}
                    selected={postDataBody[item.cat_qty_id]}
                    onSelect={({ id }) => handleUpdate(item.cat_qty_id, id)}
                    readonly={false}
                    category
                    title={item.title}
                  />
                )}
              </React.Fragment>
            )
          );
        })}
      </div>

      <div className="mt-8 flex space-x-2">
        <button
          className="p-2 bg-gray-600 text-white rounded"
          onClick={() => {
            setPostDataBody((prev) =>
              Object.keys(prev).reduce(
                (acc, key) => ({ ...acc, [key]: "" }),
                {}
              )
            );
          }}
        >
          Reset
        </button>
        <button
          className="p-2 bg-blue-600 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
