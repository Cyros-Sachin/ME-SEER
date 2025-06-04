import React, { useState } from "react";

import assetController from "./asset-controller";
import componentController from "./component-controller";

const TutorialSelectionTab = ({
  title,
  subTutorials,
  showData,
  setShowData,
}) => {
  const [tabClicked, setTabClicked] = useState(false);

  return (
    <div className="mt-1 flex flex-col">
      <div className="flex items-center">
        <img
          onClick={() => setTabClicked(!tabClicked)}
          src={tabClicked ? assetController.down : assetController.right}
          className="h-3"
        />
        <div
          onClick={() => setTabClicked(!tabClicked)}
          className="ml-2 text-sm text-[#989898] cursor-pointer font-medium hover:text-[#000000]"
        >
          {title}
        </div>
      </div>
      <div className="w-[90%] ml-6 mt-2 flex flex-col">
        {tabClicked &&
          subTutorials &&
          subTutorials.length > 0 &&
          subTutorials.map((subTutorial) => {
            console.log(subTutorial);
            return (
              <componentController.SubTutorialsTab
                title={subTutorial.title}
                showData={showData}
                setShowData={setShowData}
                content={subTutorial}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TutorialSelectionTab;
