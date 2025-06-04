import React from "react";

import assetController from "./asset-controller";
import Navtab from "../navtab/navtab";
import { useNavigate } from "react-router-dom";

const withBlackBackground = (WrappedComponent) => {
  return ({ title, route }) => (
    <div className="bg-black text-white rounded flex justify-center items-center ml-5 text-[12px]">
      <WrappedComponent title={title} route={route} />
    </div>
  );
};

const BlackNavtab = withBlackBackground(Navtab);

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ fontFamily: "var(--primary-font-family)" }}
      className="bg-[#FFFFFF] flex shadow h-14 sticky top-0 z-10"
    >
      <div className="flex items-center ml-4">
        <img src={assetController.applogo} alt="me-logo" />
        <div className="ml-2 font-semibold text-[18px]">MeSeer</div>
      </div>

      <div className="flex ml-4 items-center">
        <div className="ml-3" onClick={() => navigate("/features")}>
          <Navtab title="Features" />
        </div>
        <div className="ml-3">
          <Navtab title="Solutions" />
        </div>
        <div className="ml-3" onClick={() => navigate("/blogs")}>
          <Navtab title="Blogs" />
        </div>

        <div className="ml-3" onClick={() => navigate("/tutorials")}>
          <Navtab title="Tutorials" />
        </div>
        <div className="ml-3" onClick={() => navigate("/pricing")}>
          <Navtab title="Pricing" />
        </div>
      </div>

      <div className="flex ml-auto items-center mr-4">
        <div onClick={() => navigate("/login")}>
          <Navtab title="Login" />
        </div>
        <BlackNavtab title="Get MeSeer free" />
      </div>
    </div>
  );
};

export default Navbar;
