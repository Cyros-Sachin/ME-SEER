import { Title } from "chart.js";
import { nanoid } from "nanoid";
import React from "react";

const ColumnContent = ({
  numberColumns = 2,
  contentArray = [
    {
      id: nanoid(),
      preheader: "MultiFactor Authentication",
      header: "MFA is the best way to, prevent account takeovers",
      subHeader:
        "Stop 99% of the account takeovers in their tracks and provide the level of security your users have to expect",
      content: [
        {
          id: nanoid(),
          title: "SMS passcode",
          content:
            "A text based digital handshake,securly verfiying identity with a unique randomly generated passcode delivered to your mobile phone",
          img: "",
        },
        {
          id: nanoid(),
          title: "SMS passcode",
          content:
            "A text based digital handshake,securly verfiying identity with a unique randomly generated passcode delivered to your mobile phone",
          img: "",
        },
        {
          id: nanoid(),
          title: "SMS passcode",
          content:
            "A text based digital handshake,securly verfiying identity with a unique randomly generated passcode delivered to your mobile phone",
          img: "",
        },
        {
          id: nanoid(),
          title: "SMS passcode",
          content:
            "A text based digital handshake,securly verfiying identity with a unique randomly generated passcode delivered to your mobile phone",
          img: "",
        },
      ],
    },
    {
      id: nanoid(),
      preheader: "MultiFactor Authentication",
      header: "MFA is the best way to, prevent account takeovers",
      subHeader:
        "Stop 99% of the account takeovers in their tracks and provide the level of security your users have to expect",
      content: [
        {
          id: nanoid(),
          title: "SMS passcode",
          content:
            "A text based digital handshake,securly verfiying identity with a unique randomly generated passcode delivered to your mobile phone",
          img: "",
        },
        {
          id: nanoid(),
          title: "SMS passcode",
          content:
            "A text based digital handshake,securly verfiying identity with a unique randomly generated passcode delivered to your mobile phone",
          img: "",
        },
        {
          id: nanoid(),
          title: "SMS passcode",
          content:
            "A text based digital handshake,securly verfiying identity with a unique randomly generated passcode delivered to your mobile phone",
          img: "",
        },
        {
          id: nanoid(),
          title: "SMS passcode",
          content:
            "A text based digital handshake,securly verfiying identity with a unique randomly generated passcode delivered to your mobile phone",
          img: "",
        },
      ],
    },
  ],
}) => {
  return (
    <div
      style={{ fontFamily: "var(--primary-font-family)" }}
      className={`w-[95%] bg-[#ededed] p-20 rounded-lg mt-4 gap-20 grid grid-cols-${numberColumns}`}
    >
      {contentArray.map((content) => {
        return (
          <div className="w-full p-4  border-r-2 border-b-2 shadow-sm border-b-black border-r-black flex flex-col justify-center bg-[#ffffff] rounded-lg text-[#5a5a5a]">
            <div className="text-xs font-medium">{content.preheader}</div>
            <div className="text-2xl font-medium mt-4 w-4/5">
              {content.header}
            </div>
            <div className="text-xs w-3/5 mt-2">{content.subHeader}</div>
            <div className="flex flex-col mt-4">
              {content.content.map((data) => {
                return (
                  <div className="text-xs">
                    <img />
                    <div className="mt-8 w-[65%]">
                      <strong>{data.title}</strong>. {data.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ColumnContent;
