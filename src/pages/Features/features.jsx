import React, { useState } from "react";

// component controller
import componentController from "./component-controller";

const Features = () => {
  const [componentArray, setComponentArray] = useState([
    <componentController.SocialSSOIntegration />,
  ]);

  return (
    <div className="w-full">
      <componentController.Navbar />
      <div className="p-20 justify-center flex flex-col">
        <div className="flex justify-center items-center">
          <componentController.SocialSSOIntegration />
        </div>
        <div className="mt-20 flex justify-center items-center">
          <componentController.SocialFeature />
        </div>

        <div className="mt-20 flex justify-center items-center">
          <componentController.Banners />
        </div>

        <div className="mt-20 flex justify-center items-center">
          <componentController.GeneralAppFeature />
        </div>

        <div className="mt-20 flex justify-center items-center">
          <componentController.ColumnContent />
        </div>
        <div className="mt-20 flex justify-center items-center">
          <componentController.ScrollingPictureSection />
        </div>

        <div className="mt-20 flex justify-center items-center">
          <componentController.Banners />
        </div>
      </div>
      <componentController.Footer />
    </div>
  );
};

export default Features;
