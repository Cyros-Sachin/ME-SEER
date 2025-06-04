import React from "react";
import assetController from "../../controllers/assetController";

const SidebarAdvancedLogo = ({ isExpanded }) => {
  return (
    <div
      className={`mt-2 ${
        !isExpanded ? "p-2" : "p-6"
      } border-b border-b-[#979797] flex justify-center items-center`}
    >
      {!isExpanded ? (
        <img src={assetController.companyLogoSingle} />
      ) : (
        <img src={assetController.companyLogo} />
      )}
    </div>
  );
};

export default SidebarAdvancedLogo;
