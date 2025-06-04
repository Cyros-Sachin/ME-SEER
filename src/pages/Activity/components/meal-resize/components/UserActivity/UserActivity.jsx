import React, { useEffect, useState, useContext } from "react";
import RowComponent from "../RowComponent/RowComponent";
import axios from "axios";

const UserActivity = ({ data, resizeData, setResizeData, index, trigger }) => {
  const [responseData, setResponseData] = useState([]);
  const [templateData, setTemplateData] = useState([]);

  // console.log(data);

  // response
  useEffect(() => {
    if (data.response.length > 0) {
      // Get the data and structure so that it can be pushed into a row component
      let responseArray = data.response;
      // Frame it
      let items = responseArray.map((resp) => {
        // resp looks like
        /*{
        
            cat_qty_id1 : 129
            cat_qty_id2 : 1
            cat_qty_id3 :  (16) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            value1 : ""
            value2 : "Oats"
            value3 : "100"
      }
            */

        // Start pairing
        // extract keys
        const keys = Object.keys(resp);
        // Loop over the keys and make a pair of cat and val
        const response =
          keys &&
          keys.length > 0 &&
          keys.map((key) => {
            if (key.includes(`cat_qty_id`)) {
              // extract the last digit
              const lastDigit = key.slice(-1);
              let catqty = `cat_qty_id${lastDigit}`; // cat_qty_id1
              let val = `value${lastDigit}`; // value1

              return {
                cat_qty_id: catqty,
                value_id: val,
                collective_id: resp.cat_qty_id1,
                value: resp[val],
                dataArray: resp[catqty],
                trigger: trigger,
              };
            }
          });

        return response.filter(Boolean);
      });

      if (responseData) {
        let newResponseData = [...responseData];
        newResponseData.push(items);
        setResponseData(newResponseData[0]);
      }
    }
  }, [data.response]);

  // template
  useEffect(() => {
    if (data.templateArray.length > 0) {
      let templateArray = data.templateArray;

      let items = templateArray.map((temp, index) => {
        // Single temp looks like
        /*
            description: "{'info':'add food item', 'item_id1':'{'get':'ui', 'attribute': meal_id '},'item_id2':{get:'search', attribute:'food_db_id'},'item_id3':{'get':'backend', 'attribute':'food_quaantity'}}"
            item_id1: [{…}]
            item_id2: [{…}]
            item_id3: (16) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            item_id4: [{…}]
            item_id5: [{…}]
            item_id6: [{…}]
        */

        const keys = Object.keys(temp);

        const response =
          keys &&
          keys.length > 0 &&
          keys.map((key, index) => {
            // extract the last digit
            const lastDigit = key.slice(-1);
            let catqty = `cat_qty_id${lastDigit}`; // cat_qty_id1
            let val = `value${lastDigit}`; // value1
            let itemId = `item_id${lastDigit}`;

            if (index > 3 && data.optionName === "food item") return null;

            return {
              cat_qty_id: catqty,
              value_id: val,
              collective_id: data.collectiveId,
              value: temp[val],
              dataArray: temp[itemId],
              item_id: key,
              trigger: trigger,
            };
          });

        return response.filter(Boolean);
      });

      if (templateData) {
        let newTemplateData = [...templateData];
        newTemplateData.push(items);
        setTemplateData(newTemplateData[0]);
      }
    }
  }, [data.templateArray]);

  //   useEffect(() => {
  //     console.log(templateData);
  //   }, [templateData]);

  // useEffect(() => {
  //   console.log("Response data is changed");
  //   console.log(responseData);
  // }, [responseData]);

  // useEffect(() => {
  //   console.log("Template data is changed");
  //   console.log(templateData);
  // }, [templateData]);

  const handleAddItem = async () => {
    try {
      const response = await axios.get(
        `https://meseer.com/dog/generic/templates/${data.at_id}`
      );

      const keys = Object.keys(response.data);

      const response2 =
        keys &&
        keys.length > 0 &&
        keys.map((key, index) => {
          // extract the last digit
          const lastDigit = key.slice(-1);
          let catqty = `cat_qty_id${lastDigit}`; // cat_qty_id1
          let val = `value${lastDigit}`; // value1
          let itemId = `item_id${lastDigit}`;

          if (index > 3 && data.optionName === "food item") return null;

          return {
            cat_qty_id: catqty,
            value_id: val,
            collective_id: data.collectiveId,
            value: response.data[val],
            dataArray: response.data[itemId],
            item_id: key,
          };
        });
      const tempDataSet = response2.filter(Boolean);
      let newTempData = [...templateData];
      newTempData.push(tempDataSet);
      setTemplateData(newTempData);
    } catch (err) {
      console.error(
        `Something went wrong in calling template during button click`
      );
    }
  };

  // console.log(responseData);

  return (
    <div className="p-4 flex flex-col items-center w-full">
      {
        <div className="w-full flex justify-end items-center border-b-[#61616160] border-b pb-4">
          <div className="flex w-full text-md">
            {data.optionName &&
              data.optionName[0].toUpperCase() + data.optionName.slice(1)}
          </div>
          {data && data.flag === "PN" && (
            <div
              onClick={handleAddItem}
              className="cursor-pointer flex rounded-full border border-black h-5 w-5 justify-center items-center"
            >
              +
            </div>
          )}
        </div>
      }
      <div className="flex flex-col w-full mt-4 items-center">
        <div className="w-full flex flex-col items-center">
          {responseData &&
            responseData.length > 0 &&
            responseData.map((respData) => {
              /*           
            0: {cat_qty_id1: '', dataArray: 129} 
            1: {cat_qty_id2: 'Oats', dataArray: 1}
            2: {cat_qty_id3: '100', dataArray: Array(16)}
                */
              return (
                <RowComponent
                  rowData={respData}
                  optionName={data.optionName}
                  response
                  a_id={data.a_id}
                  at_id={data.at_id}
                  flag={data.flag}
                  collective_id={data.collectiveId}
                  trigger={respData.trigger}
                  responseData={responseData}
                  setResponseData={setResponseData}
                  templateData={templateData}
                  setTemplateData={setTemplateData}
                />
              );
            })}

          {templateData &&
            templateData.length > 0 &&
            templateData.map((respData) => {
              /*           
            0: {cat_qty_id1: '', dataArray: 129} 
            1: {cat_qty_id2: 'Oats', dataArray: 1}
            2: {cat_qty_id3: '100', dataArray: Array(16)}
                */

              return (
                <RowComponent
                  rowData={respData}
                  optionName={data.optionName}
                  template
                  a_id={data.a_id}
                  at_id={data.at_id}
                  flag={data.flag}
                  collective_id={data.collectiveId}
                  trigger={respData.trigger}
                  responseData={responseData}
                  setResponseData={setResponseData}
                  templateData={templateData}
                  setTemplateData={setTemplateData}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
