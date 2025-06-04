import React, { useState, useEffect } from "react";
import Navbar from "../../../../components/Login/navbar/navbar";
import assetController from "../../asset-controller/index";
import axios from "axios";
import Footer from "../../../../components/Login/footer/footer";
import { MdArrowRight } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";

const TutorialPage = () => {
  const { tutorialId } = useParams();
  const navigate = useNavigate();
  const [tutorialsSide, setTutorialSide] = useState(null);
  const [tutorialsBlock, setTutorialsBlock] = useState(null);
  const [parsedContent, setParsedContent] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState({});

  useEffect(() => {
    console.log("Tutorial ID:", tutorialId);

    const fetchTutorialDetails = async () => {
      try {
        const response = await axios.get(
          `https://meseer.com/dog/tutorial_help/${tutorialId}`
        );
        setTutorialsBlock(response.data);
        setParsedContent(createArrayFromContent(response.data?.content || ""));
      } catch (err) {
        console.error("Error fetching tutorial details:", err);
      }
    };

    if (tutorialId) {
      fetchTutorialDetails();
    }
  }, [tutorialId]);

  useEffect(() => {
    const fetchSidebarContent = async () => {
      try {
        const response = await axios.get(
          `https://meseer.com/dog/get_tutorial_ss`
        );
        setTutorialSide(response.data);
      } catch (err) {
        console.error("Error fetching sidebar content:", err);
      }
    };

    fetchSidebarContent();
  }, []);

  const createArrayFromContent = (content) => {
    if (!content) return [];

    let delimiters = content.match(/<h[1-6]>|<img |<par>|<bul>/g) || [];
    let myNewContent = [];
    let currentIndex = 0;

    delimiters.forEach((delim) => {
      let delimiterIndex = content.indexOf(delim, currentIndex);
      let extractedContent = content
        .substring(delimiterIndex + delim.length)
        .split("<")[0]
        .trim();

      myNewContent.push({ delim, content: extractedContent });
      currentIndex = delimiterIndex + delim.length + extractedContent.length;
    });

    return myNewContent;
  };

  const toggleExpand = (key) => {
    setExpandedKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNavigation = (tutorialId) => {
    navigate(`/tutorials/page/${tutorialId}`);
  };

  return (
    <div>
      <Navbar />
      <div
        style={{ fontFamily: "var(--primary-font-family)" }}
        className="flex"
      >
        {/* Sidebar */}
        <div className="z-1 relative w-[20%]">
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
                className="pl-2 outline-none text-xs"
              />
            </div>

            <div className="w-[70%] h-[8%] mt-4">
              <img
                className="h-full w-full"
                src={assetController.help}
                alt="help-icon"
              />
            </div>

            <div className="w-[70%] mt-4 flex flex-col justify-center text-[#a7a7a7]">
              {tutorialsSide ? (
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
                          key={item.id}
                          className="ml-4 text-xs mt-2 hover:text-black cursor-pointer"
                          onClick={() => handleNavigation(item.id)}
                        >
                          {item.title}
                        </div>
                      ))}
                  </div>
                ))
              ) : (
                <p className="text-center mt-4">Loading...</p>
              )}
            </div>
          </div>
        </div>

        {/* Tutorial Content */}
        <div className="w-[80%] p-4">
          {parsedContent.length > 0 ? (
            parsedContent.map((item, index) => {
              if (item.delim.startsWith("<h1>"))
                return (
                  <h1 key={index} className="text-2xl font-bold mt-4">
                    {item.content}
                  </h1>
                );
              if (item.delim.startsWith("<h2>"))
                return (
                  <h2 key={index} className="text-xl font-semibold mt-4">
                    {item.content}
                  </h2>
                );
              if (item.delim.startsWith("<h3>"))
                return (
                  <h3 key={index} className="text-lg font-medium mt-3">
                    {item.content}
                  </h3>
                );
              if (item.delim.startsWith("<par>"))
                return (
                  <p key={index} className="mt-2">
                    {item.content}
                  </p>
                );
              if (item.delim.startsWith("<bul>"))
                return (
                  <li key={index} className="ml-6 list-disc">
                    {item.content}
                  </li>
                );
              if (item.delim.startsWith("<img ")) {
                const srcMatch = item.content.match(/src="(.*?)"/);
                const altMatch = item.content.match(/alt="(.*?)"/);
                return (
                  <img
                    key={index}
                    src={srcMatch ? srcMatch[1] : ""}
                    alt={altMatch ? altMatch[1] : "Image"}
                    className="my-4 max-w-full"
                  />
                );
              }
              return null;
            })
          ) : (
            <p>Loading tutorial...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TutorialPage;
