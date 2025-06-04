import React from "react";

import assetController from "./asset-controller";
import componentController from "./component-controller";

const NotFound = () => {
  return (
    <div>
      <componentController.Navbar />
      <div className="flex flex-col items-center mb-40">
        <div className="text-[48px] font-bold mt-14">Nothing Found Here.</div>
        <div className="font-semibold text-[24px] mt-2">Error 404</div>
        <div className="mt-14 w-2/3 flex items-center justify-center">
          <div className="mr-10">
            <img src={assetController.notFounddoodle} alt="not-found" />
          </div>
          <div className="flex items-center justify-center bg-black w-[20%] p-2 rounded-lg text-white">
            Join MeSeer
          </div>
        </div>
      </div>

      <componentController.Footer />
    </div>
  );
};

export default NotFound;
