import React from "react";

const SubTutorialsTab = ({ title, content, showData, setShowData }) => {
  return (
    <div
      onClick={() => setShowData(content.content)}
      className="text-sm cursor-pointer font-medium text-[#989898] hover:text-[#000000]"
    >
      {title}
    </div>
  );
};

export default SubTutorialsTab;
