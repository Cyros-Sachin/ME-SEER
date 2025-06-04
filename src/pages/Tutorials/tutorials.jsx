import React, { useEffect, useState } from "react";
import assetController from "./asset-controller";
import componentController from "./component-controller";
import axios from "axios";
import { MdArrowRight, MdArrowDown } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Tutorials = () => {
  const [tutorialsSide, setTutorialSide] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState({});
  const [tutorialBlocks, setTutorialsBlock] = useState([]);
  const navigate = useNavigate();

  const toggleExpand = (key) => {
    setExpandedKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const transformData = (data) => {
    let resultArray = [];

    Object.keys(data).forEach((category) => {
      data[category].forEach((item) => {
        resultArray.push({
          ...item,
          category: category, // Adding the category as a key
        });
      });
    });

    return resultArray;
  };

  const handleNavigation = (tutorialId) => {
    navigate(`/tutorials/page/${tutorialId}`);
  };

  useEffect(() => {
    const getTutorials = async () => {
      try {
        const response = await axios.get(
          `https://meseer.com/dog/get_tutorial_ss`
        );
        setTutorialSide(response.data);
        setTutorialsBlock(transformData(response.data));
      } catch (err) {
        console.error(`Something went wrong with fetching left side api`);
      }
    };

    getTutorials();
  }, []);

  return (
    <div>
      <div>
        <componentController.Navbar />
        <div
          style={{ fontFamily: "var(--primary-font-family)" }}
          className="flex"
        >
          <div className="z-1 relative w-[20%] ">
            <div className="w-full h-[500px] sticky top-20 left-0 flex flex-col items-center mt-20 mb-20 border-r-2 border-[#5555552f]">
              <div className="border border-[#a7a7a7] rounded-sm flex p-2 items-center w-[70%]">
                <img
                  className="h-4"
                  src={assetController.search}
                  alt="search-icon"
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-2 outline-none text-xs w-full"
                />
              </div>

              <div className="w-[70%] h-[7%] mt-4 ">
                <img
                  className="h-full w-full"
                  src={assetController.help}
                  alt="help-icon"
                />
              </div>

              <div className="w-[70%] mt-4 flex flex-col justify-center text-[#a7a7a7]">
                {tutorialsSide &&
                  Object.keys(tutorialsSide).map((key) => (
                    <div key={key} className="mt-2 w-full">
                      <div
                        className="text-lg flex items-center cursor-pointer"
                        onClick={() => toggleExpand(key)}
                      >
                        {expandedKeys[key] ? (
                          <IoMdArrowDropdown />
                        ) : (
                          <MdArrowRight />
                        )}
                        {key}
                      </div>

                      {expandedKeys[key] &&
                        Array.isArray(tutorialsSide[key]) &&
                        tutorialsSide[key].map((item) => (
                          <div
                            onClick={() => handleNavigation(item.id)}
                            key={item.id}
                            className="ml-4 text-xs mt-2 hover:text-black cursor-pointer"
                          >
                            {item.title}
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <main className="w-full p-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Explore Tutorials
            </h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tutorialBlocks.map((tutorial) => (
                <div
                  onClick={() => handleNavigation(tutorial.id)}
                  key={tutorial.id}
                  className="bg-white shadow-md rounded-xl overflow-hidden transform hover:scale-[1.03] transition-all duration-300 hover:shadow-lg"
                >
                  <img
                    src={assetController.defaultImage}
                    alt={tutorial.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-md font-medium text-gray-900">
                      {tutorial.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Category: {tutorial.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
        <componentController.Footer />
      </div>
    </div>
  );
};

export default Tutorials;
