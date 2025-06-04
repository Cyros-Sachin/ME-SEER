import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchInput from "../../../../activity-main-components/SearchInput/SearchInput";
import InputField from "../../../../activity-main-components/InputField/InputField";
import Dropdown from "../../../../activity-main-components/Dropdown/Dropdown";
import { toast } from "react-toastify";
import { ModalContext } from "../../../../../../common-components/ModalComponent/context/ModalContext";
import SpecialText from "../../../../activity-main-components/SpecialText/SpecialText";
import DateSelector from "../../../../activity-main-components/DateSelector/DateSelector";
import { useSidebarTracing } from "../../../../../../common-components/SidebarAdvanced/contexts/SidebarTracing";

// calling the handler link now
import handler from "../../../../../../common-components/sidebar/sidebar_handler";
import { nanoid } from "nanoid";

const LoadTemplate = ({ template }) => {
  const [fetchedTemplate, setFetchedTemplate] = useState({});
  const [modifiedFetchedTemplate, setModifiedFetchedTemplate] = useState([]);
  const [componentCount, setComponentCount] = useState(1);
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const activityTrigger = useSelector(
    (state) => state.userSelectedParams.activityTrigger
  );
  const collective_id = useSelector(
    (state) => state.userSelectedParams.collectiveIdSelectedByUser
  );
  const trigger = useSelector(
    (state) => state.userSelectedParams.activityTrigger
  );

  // When the user will select a subspace
  const [space_id, setSpace_id] = useState();

  const [postDataBody, setPostDataBody] = useState({
    cat_qty_id1: collective_id,
    cat_qty_id2: 0,
    cat_qty_id3: 0,
    cat_qty_id4: 0,
    cat_qty_id5: 0,
    cat_qty_id6: 0,
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
  });

  const [userSubspaces, setUserSubspaces] = useState([]);

  useEffect(() => {
    const getTemplate = async () => {
      try {
        const response = await axios.get(
          `https://meseer.com/dog/generic/templates/${template.a_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Special handling if a_id === 29
        let processedTemplate = { ...response.data };

        if (template.a_id === 29 && processedTemplate["item_id5"]) {
          processedTemplate["item_id5"][0]["item_type"] = "category";

          try {
            const subspaces = await axios.get(
              `https://meseer.com/dog/space-subspace/${localStorage.getItem(
                "userId"
              )}`
            );

            let structuredSubspaces = subspaces.data;
            const keys = Object.keys(structuredSubspaces);

            // Flattened result using flatMap
            const traversedObject = keys.flatMap((key) => {
              let space_id = Number(key.split(",")[0][1]);
              let space_name = key.split(",")[1].split("]")[0].trim();

              let innerObject = structuredSubspaces[key];

              return innerObject.map((inner) => {
                let subspace_name = Object.keys(inner)[0];
                let subspace_id = inner[subspace_name];

                return {
                  space_id: space_id,
                  space_name: space_name,
                  subspace_id,
                  subspace_name,
                };
              });
            });

            console.log(traversedObject);

            console.log(processedTemplate);
            let templateItems = { ...processedTemplate["item_id5"][0] };
            processedTemplate["item_id5"] = [templateItems, ...traversedObject];
          } catch (err) {
            console.error(`Something went wrong`, err.message);
          }
        }

        setFetchedTemplate(processedTemplate); // ✅ Set processed template here
      } catch (err) {
        console.error("Error fetching template:", err.message);
      }
    };

    if (template) {
      console.log("What is template", template);
      getTemplate();
    }
  }, [template]);

  // Modify template and set state
  useEffect(() => {
    console.log(fetchedTemplate);

    if (!fetchedTemplate || Object.keys(fetchedTemplate).length === 0) return;

    let updatedTemplate = { ...fetchedTemplate };

    let updatedPostData = {};
    let count = 0;
    let modifiedTemplates = [];
    let entriesObject = Object.entries(updatedTemplate);

    if (Object.entries(updatedTemplate)) {
      Object.entries(updatedTemplate)
        .slice(1) // skip 'description'
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
              if (items[1].name === "text") {
                newObj.type = "text";
                count += 1;
              } else if (items[1].name.includes("/dd/yyyy")) {
                newObj.type = "date+dropdown";
                count += 2;
              } else {
                newObj.type = "input+dropdown";
                count += 2;
              }
              newObj.data_array = items.slice(1);
              newObj.title = items[0].item_name;
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
        });

      setPostDataBody((prev) => ({
        ...prev,
        ...updatedPostData,
      }));
      setModifiedFetchedTemplate(modifiedTemplates);
      setComponentCount(count);
    }
  }, [fetchedTemplate, activityTrigger]);

  const handleUpdate = (key, value) => {
    console.log(key, value);
    setPostDataBody((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    let event_time = new Date().toISOString().split(".")[0];

    let finalTriggers = {
      8: "meal",
      9: "meal",
      11: "workout",
      20: "budget",
      24: "goal",
      27: "task",
      29: "todo_creation",
      30: "action",
      31: "action",
      32: "action",
    };

    // let trigger_final = trigger === "movement" ? "workout" : trigger;
    // let trigger_final = finalTriggers[template.a_id];

    let trigger_final = fetchedTemplate.trigger;

    if (template.a_id === 30) {
      postDataBody.cat_qty_id2 = 1;
    } else if (template.a_id === 31) {
      postDataBody.cat_qty_id2 = 2;
    } else if (template.a_id === 32) {
      postDataBody.cat_qty_id2 = 3;
    }

    const body = {
      a_id: template.a_id,
      at_id: template.at_id,
      flag: template.flag,
      trigger: trigger_final,
      is_active: true,
      user_id: localStorage.getItem("userId"),
      description: "Test",
      event_time,
      ...postDataBody,
    };

    console.error("BODY PASSED IS : ", template.a_id, "and ", body);

    try {
      const postData = await axios.post(
        template.a_id === 29
          ? `https://meseer.com/dog/add-data/primary-mwb/`
          : `https://meseer.com/dog/user_activity_insert`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // when the template a_id ===29 I.E build task

      // if (template.a_id === 29) {
      //   let created_date = new Date().toISOString(); // Correct format
      //   let last_updated = new Date().toISOString();

      //   try {
      //     let body = {
      //       space_id: space_id,
      //       subspace_id: postDataBody.cat_qty_id5,
      //       user_id: localStorage.getItem("userId"),
      //       name: "Task A",
      //       refresh_type: "monthly",
      //       last_state: true,
      //       created_date,
      //       last_updated,
      //     };

      //     console.log(body);
      //     const addTodoResponse = await axios.post(
      //       "https://meseer.com/dog/todos",
      //       body,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${localStorage.getItem("token")}`,
      //         },
      //       }
      //     );

      //     console.log(addTodoResponse);
      //   } catch (err) {
      //     console.error(err.message);
      //   }
      // }

      console.log("Post Successful:", postData);
      // setIsModalOpen(false);
      toast(`Data Added Successfully`);
    } catch (err) {
      console.error("Post Error:", err.message);
    }
  };

  return (
    <div
      className={`scrollbar ${
        componentCount > 4 ? "w-[1000px]" : "w-[750px]"
      } max-h-80 bg-[#2e2c2c] rounded-lg text-gray-500 p-4 overflow-auto`}
    >
      <div className="pb-4 border-b border-b-gray-500 text-lg font-semibold">
        {template?.name?.charAt(0).toUpperCase() + template?.name?.slice(1)}
      </div>

      <div
        className="mt-4 grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${componentCount}, minmax(0, 1fr))`,
        }}
      >
        {modifiedFetchedTemplate?.map(
          (item, index) =>
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
                  />
                )}
                {item.type === "input+dropdown" && (
                  <>
                    <InputField
                      value={postDataBody[item.value_id]}
                      onChange={(value) => handleUpdate(item.value_id, value)}
                      readOnly={false}
                      title={item.title}
                      type="number"
                    />
                    <Dropdown
                      items={item.data_array}
                      selected={postDataBody[item.cat_qty_id]}
                      onSelect={({ id }) => handleUpdate(item.cat_qty_id, id)}
                      readonly={false}
                    />
                  </>
                )}
                {item.type === "date+dropdown" && (
                  <>
                    <DateSelector
                      cat_qty_track={postDataBody[item.cat_qty_id]}
                      passedData={item}
                      onChange={({ name }) => {
                        handleUpdate(item.value_id, name);
                      }}
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
                    differentData={template.a_id === 29 ? true : false}
                    setSpace_id={setSpace_id}
                  />
                )}
                {item.type === "text" && (
                  <SpecialText
                    title={item.title}
                    passedData={item?.data_array?.[0]?.unit_id}
                    readOnly={false}
                    onChange={({ name, id }) => {
                      handleUpdate(item.value_id, name);
                      handleUpdate(item.cat_qty_id, id);
                    }}
                  />
                )}
              </React.Fragment>
            )
        )}
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

export default LoadTemplate;
