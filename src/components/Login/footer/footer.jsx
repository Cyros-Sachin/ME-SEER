import React from "react";
import assetController from "./asset-controller";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center w-full items-center p-6 md:p-10 bg-white mt-20">
      <div className="border-t-2 w-[98%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 p-4">
        {/* One Column */}
        <div className="flex flex-col items-center h-auto md:h-[350px] pl-0 md:pl-2">
          <div className="flex items-center w-full mt-2">
            <img
              className="h-12 md:h-14"
              src={assetController.applogo}
              alt="app-logo"
            />
            <div className="ml-1 text-xl md:text-2xl font-semibold">MeSeer</div>
          </div>

          <div className="flex w-full mt-6 md:mt-8 space-x-3 md:space-x-2 justify-center md:justify-start">
            <img className="h-5" src={assetController.i} alt="instagram" />
            <img className="h-5" src={assetController.y} alt="youtube" />
            <img className="h-5" src={assetController.l} alt="linkedin" />
            <img className="h-5" src={assetController.f} alt="facebook" />
            <img className="h-5" src={assetController.t} alt="twitter" />
          </div>

          <div className="flex w-full mt-16 md:mt-20 justify-center md:justify-start">
            <div className="flex items-center justify-center border border-[#757575a1] w-2/4 md:w-auto h-10 rounded-sm hover:bg-[#79797932] cursor-pointer">
              English
            </div>
          </div>

          <div className="flex w-full mt-4 font-normal justify-center md:justify-start text-center md:text-left">
            <div className="flex items-center text-[14px] h-10 rounded-sm hover:bg-[#79797932] cursor-pointer">
              Do Not Sell or Share My Info
              <br /> Cookie settings
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="flex flex-col items-center md:items-start h-auto md:h-[350px] pl-0 md:pl-8">
          <div className="flex font-semibold mt-4 w-full justify-center md:justify-start">
            Company
          </div>

          <div
            onClick={() => navigate("/blogs")}
            className="font-semibold mt-2 text-[#505050a9] cursor-pointer w-full text-center md:text-left"
          >
            Blogs
          </div>

          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            About Us
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Careers
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Security
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Status
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Terms and Privacy
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-col items-center md:items-start h-auto md:h-[350px] pl-0 md:pl-8">
          <div className="font-semibold mt-4 w-full text-center md:text-left">
            Download
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            iOS & Android
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Mac & Windows
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Calendar
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Web Clipper
          </div>
        </div>

        {/* Fourth Column */}
        <div className="flex flex-col items-center md:items-start h-auto md:h-[350px] pl-0 md:pl-8">
          <div className="font-semibold mt-4 w-full text-center md:text-left">
            Resources
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Help Center
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Pricing
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Blogs
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Community
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Integrations
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Templates
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Affiliates
          </div>
        </div>

        {/* Fifth Column */}
        <div className="flex flex-col items-center md:items-start h-auto md:h-[350px] pl-0 md:pl-8">
          <div className="font-semibold mt-4 w-full text-center md:text-left">
            MeSeer for
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Enterprise
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Small business
          </div>
          <div className="font-semibold mt-2 text-[#505050a9] w-full text-center md:text-left">
            Personal
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
