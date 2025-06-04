import { nanoid } from "nanoid";
import React from "react";
import "./index.css";

import assetController from "./asset-controller";

const ScrollingPictureSection = ({
  imagesArray = [
    assetController.assetController1.scr1,
    assetController.assetController1.scr2,
    assetController.assetController1.src3,
  ],
  preheader = "Session Management",
  header = "Speed up appication with submillisecond authentication",
  subheader = "Clerk managed the full session lifecycle, including critical security features like active device monitoring and session revocation",
  content = [
    {
      id: nanoid(),
      title: "Dont let auth slow your critical path",
      description:
        "Clerk session management architechture is purpose-built to the extremely performant and low latency across the edge of the globe. Avoid the effort and completely it takes to build session.",
    },
    {
      id: nanoid(),
      title: "Dont let auth slow your critical path",
      description:
        "Clerk session management architechture is purpose-built to the extremely performant and low latency across the edge of the globe. Avoid the effort and completely it takes to build session.",
    },
    {
      id: nanoid(),
      title: "Dont let auth slow your critical path",
      description:
        "Clerk session management architechture is purpose-built to the extremely performant and low latency across the edge of the globe. Avoid the effort and completely it takes to build session.",
    },
  ],
}) => {
  return (
    <div
      style={{ fontFamily: "var(--primary-font-family)" }}
      className="flex flex-col w-[95%] p-20 rounded-lg mt-4 relative"
    >
      {/* Make it marquee */}
      <div className="absolute left-[65%] flex-col top-[20%] w-1/3 p-10 h-[450px] border overflow-hidden">
        {imagesArray.map((images) => {
          return (
            <div className="h-80 w-full marquee border mt-14">
              <img src={images} className="rounded-lg h-full w-full" />
            </div>
          );
        })}
      </div>

      {/*  */}
      <div className="text-xs font-semibold">{preheader}</div>
      <div className="mt-4 text-2xl font-semibold w-[35%]">{header}</div>
      <div className="mt-4 text-sm w-[45%]">{subheader}</div>
      <div className="flex flex-col text-xs">
        {content.map((con) => {
          return (
            <div className="flex flex-col mt-10 w-2/4">
              <div className="flex">
                <img
                  className="h-4 w-4 mr-2"
                  src={assetController.information}
                  alt="infomration"
                />
                <div className="font-semibold">{con.title}</div>
              </div>
              <div className="w-3/4 mt-2">
                <em>{con.description}</em>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollingPictureSection;
