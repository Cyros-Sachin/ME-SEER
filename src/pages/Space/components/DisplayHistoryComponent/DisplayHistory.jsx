import React, { useEffect, useState } from "react";
import { DotOutline } from "@phosphor-icons/react";
const DisplayHistory = ({ history }) => {
  const [displayHistoryData, setDisplayHistoryData] = useState(null);

  const transformWordpadString = (content) => {
    if (!content || typeof content !== "string") return [];

    let delimiters = content.match(/<h>|<num>|<par>|<bul>|<\d+>/g);

    if (!delimiters) {
      return [{ delim: "<p>", content: content.trim() }];
    }

    let myNewContent = [];
    let currentIndex = 0;

    for (let i = 0; i < delimiters.length; i++) {
      let delimiterIndex = content.indexOf(delimiters[i], currentIndex);
      let extractedContent = extractString(
        content,
        delimiterIndex + delimiters[i].length
      );

      let newObj = {
        delim: delimiters[i],
        content: extractedContent,
      };

      myNewContent.push(newObj);
      currentIndex =
        delimiterIndex + delimiters[i].length + extractedContent.length;
    }

    if (currentIndex < content.length) {
      myNewContent.push({
        delim: "<par>",
        content: content.slice(currentIndex).trim(),
      });
    }

    return myNewContent;
  };

  const extractString = (s, start) => {
    let string = "";
    let i = start;

    while (i < s.length && s[i] !== "<") {
      string += s[i];
      i++;
    }

    return string.trim();
  };

  const calculateSno = (obj, data) => {
    if (obj.delim !== "<num>") {
      return;
    }

    let sno = 1;

    for (let i = 0; i < data.indexOf(obj); i++) {
      if (data[i].delim === "<num>") {
        sno++;
      }
    }

    return sno;
  };

  const isNumericDelim = (delim) => /^<\d+>$/.test(delim);

  function calculateWeekly(version) {
    let year = new Date().getFullYear();
    const week1 = new Date(year, 0, 4);
    let monday = new Date(week1);
    monday.setDate(week1.getDate() - ((week1.getDay() + 6) % 7));

    let mondayOfWeek = new Date(monday);
    mondayOfWeek.setDate(monday.getDate() + (version - 1) * 7);

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return (
      days[mondayOfWeek.getDay()] +
      " " +
      String(mondayOfWeek.getDate()).padStart(2, "0") +
      "/" +
      String(mondayOfWeek.getMonth() + 1).padStart(2, "0") +
      "/" +
      mondayOfWeek.getFullYear()
    );
  }

  const getMonthUsingContentVersion = (version) => {
    if (!version || isNaN(version) || version < 1 || version > 12) {
      return "Unknown Month";
    }

    const month = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return month[Number(version)];
  };

  useEffect(() => {
    if (history && history.length > 0 && !displayHistoryData) {
      history.forEach((singleHistoryData) => {
        let refresh_type = singleHistoryData.refresh_type;
        let version = singleHistoryData.version;
        let content = singleHistoryData.content;
        let last_updated = singleHistoryData.last_updated;
        let calculatedDate = calculateWeekly(version);
        let date =
          refresh_type === "daily"
            ? last_updated.split("T")[0]
            : refresh_type === "monthly"
            ? getMonthUsingContentVersion(version)
            : calculatedDate;

        setDisplayHistoryData((prev) => {
          const newData = { ...prev };

          if (!newData[date]) {
            newData[date] = { date, content: [] };
          }

          newData[date] = {
            ...newData[date],
            content: [...newData[date].content, content],
          };

          return newData;
        });
      });
    }
  }, [history]);

  useEffect(() => {
    console.log(displayHistoryData);
  }, [displayHistoryData]);

  return (
    <div className="w-full">
      {displayHistoryData && Object.keys(displayHistoryData).length > 0 ? (
        Object.entries(displayHistoryData).map(([date, data]) => (
          <div key={date} className="w-full">
            <div className="bg-[#ececec] flex justify-center items-center text-xs font-bold text-black p-[2px] w-full rounded-sm">
              {date}
            </div>
            <div className="mt-2">
              {data.content.map((con, index) => {
                const contentArray = transformWordpadString(con);

                return (
                  <div key={index} className="w-full">
                    {contentArray.map((conArr, i) => (
                      <div className="mt-1" key={i}>
                        {conArr.delim === "<p>" || conArr.delim === "<par>" ? (
                          <div className="text-sm">{conArr.content}</div>
                        ) : conArr.delim === "<h>" ? (
                          <div className="text-xl">{conArr.content}</div>
                        ) : conArr.delim === "<bul>" ? (
                          <div className="text-sm ml-1 flex">
                            <DotOutline size={18} />
                            <div>{conArr.content}</div>
                          </div>
                        ) : isNumericDelim(conArr.delim) ||
                          conArr.delim === "<num>" ? (
                          <div className="text-sm flex">
                            <div>{calculateSno(conArr, contentArray)}.</div>
                            <div className="ml-1">{conArr.content}</div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DisplayHistory;
