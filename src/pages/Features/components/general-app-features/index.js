import React, { useEffect, useState } from "react";

import assetController from "./asset-controller";

const GeneralAppFeature = ({
  header = "Prebuilt Components,Feature at your hand",
  passedimagesArray = [
    assetController.scr1,
    assetController.scr2,
    assetController.src3,
  ],
}) => {
  const [imagesArray, setImagesArray] = useState(passedimagesArray);
  const [showIndex, setShowIndex] = useState(0);

  // Set imagesArray to passedimagesArray once the component mounts
  useEffect(() => {
    setImagesArray(passedimagesArray);
  }, [passedimagesArray]);

  // Carousel effect to change image every 1 second
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowIndex((prevIndex) =>
        prevIndex + 1 >= imagesArray.length ? 0 : prevIndex + 1
      );
    }, 5000);

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, [showIndex, imagesArray.length]); // Ensure effect runs only when showIndex or imagesArray.length changes

  return (
    <div
      style={{ fontFamily: "var(--primary-font-family)" }}
      className="w-[95%] p-20 rounded-lg mt-4 flex"
    >
      <div className="w-3/4 justify-center min-h-[450px] mr-2">
        <div className="text-xs font-medium">Supreme Features</div>
        <div className="text-2xl mt-2 font-semibold">
          <div>{header.split(",")[0]},</div>
          <div>{header.split(",")[1]}</div>
        </div>

        <div className="flex flex-col mt-8">
          <div className="w-3/4 text-sm">Simplify your daily tracking.</div>
          <div className="w-5/5 text-sm">
            Find everything on one single tap.
          </div>
          <div className="w-3/4 text-sm">Finance at one go</div>
        </div>

        <button className="shadow-md w-2/4 mt-2 border p-2 rounded-lg bg-black text-white font-semibold text-sm">
          Explore More
        </button>

        <div className="flex flex-col mt-14 text-2xl font-semibold ">
          <div className="w-3/4">Simplify your daily tracking.</div>
          <div className="w-5/5">Find everything on one single tap.</div>
          <div className="w-3/4">Finance at one go.</div>
        </div>
      </div>

      {/* Image Component which is a carousel */}
      <div className="w-2/3 p-12 h-[450px] shadow-md rounded-md">
        <div className="border p-2 rounded-md h-full flex justify-center items-center">
          <img
            className="h-full w-full brightness-[80%] rounded-md"
            src={imagesArray[showIndex]}
            alt="carousel"
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          {imagesArray.map((ele, index) => {
            return (
              <div
                className={`${
                  index === showIndex ? "bg-[#000000]" : "bg-[#c2c2c275]"
                } p-1 m-2 rounded`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GeneralAppFeature;
