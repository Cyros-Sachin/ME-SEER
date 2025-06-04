import React, { useEffect } from "react";
import { useUserInformation } from "../../../../pages/Login/context/UserInformationContext";
import { useNavigate } from "react-router-dom";
import { useSidebarTracing } from "../../contexts/SidebarTracing";

const SidebarAdvancedProfile = ({ isExpanded }) => {
  const { userInformation, setUserInformation } = useUserInformation();
  const navigate = useNavigate();

  const { updateSidebarUrl } = useSidebarTracing();

  const handleNavigationRoute = (url) => {
    navigate(url);
    updateSidebarUrl(url);
  };

  useEffect(() => {
    if (!userInformation || Object.keys(userInformation).length === 0) {
      try {
        const storedData = JSON.parse(
          localStorage.getItem("userInformationStorage")
        );
        if (storedData) setUserInformation(storedData);
      } catch (error) {
        console.error(
          "Error retrieving user information from localStorage:",
          error
        );
      }
    }
  }, [userInformation, setUserInformation]);

  // Utility function to safely extract initials
  const getInitials = (name = "") => {
    const words = name.split(" ").filter(Boolean);
    return words.length > 1 ? words[0][0] + words[1][0] : words[0]?.[0] || "?";
  };

  // Utility function to truncate text
  const truncateText = (text = "", maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div
      className={`mb-4 ${
        isExpanded ? "p-2" : "p-1"
      } pt-4 w-full border-t-[#a1a1a1] border-t shadow-t shadow-white`}
    >
      <div
        onClick={() => handleNavigationRoute("/settings")}
        className="bg-gray-300 rounded-full p-2 flex cursor-pointer"
      >
        <div
          className={`${
            !isExpanded ? "h-8 w-8" : "h-10 w-10"
          } rounded-full bg-white flex justify-center items-center font-semibold`}
        >
          {getInitials(userInformation?.name)}
        </div>
        {isExpanded && (
          <div className="flex flex-col w-2/3 ml-2">
            <div
              className="text-sm truncate max-w-[100px]"
              title={userInformation?.name}
            >
              {truncateText(userInformation?.name, 12) || "Unknown User"}
            </div>
            <div
              className="text-[10px] truncate max-w-[100px]"
              title={userInformation?.email}
            >
              {truncateText(userInformation?.email, 20) || "No Email"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarAdvancedProfile;
