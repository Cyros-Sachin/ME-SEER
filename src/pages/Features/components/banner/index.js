import React from "react";

import assetController from "./asset-controller";

const Banner = () => {
  return (
    <img
      className="border h-60 w-[90%]"
      src={assetController.bannerImage}
      alt="bannerimage"
    />
  );
};

export default Banner;
