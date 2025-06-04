import React, { useEffect, useRef, useState } from "react";
import "./profile.css";

/**
 * Profile Component
 *
 * A React component that displays a user profile section. This component includes the user's name, profile image, and a settings tab that toggles open or closed when the arrow icon is clicked. It also handles clicks outside the settings tab to close it.
 *
 * @component
 * @example
 * return (
 *   <Profile
 *     name="John Doe"
 *     image="path/to/profile.jpg"
 *     arrowimage="path/to/arrow-down.png"
 *     uparrow="path/to/arrow-up.png"
 *     settings={[
 *       { id: 1, src: 'path/to/setting1.png', alt: 'Setting 1', setting: 'Account Settings' },
 *       { id: 2, src: 'path/to/setting2.png', alt: 'Setting 2', setting: 'Privacy Settings' }
 *     ]}
 *   />
 * )
 *
 * @param {Object} props - Properties to configure the Profile component.
 * @param {string} props.name - The name of the user to display.
 * @param {string} props.image - The URL of the user's profile image.
 * @param {string} props.arrowimage - The URL of the down arrow image.
 * @param {string} props.uparrow - The URL of the up arrow image, shown when settings are open.
 * @param {Array} props.settings - An array of setting items to display in the settings tab. Each item should be an object with `id`, `src` (image URL), `alt` (image alt text), and `setting` (text for the setting).
 * @returns {JSX.Element} The rendered Profile component.
 */

const Profile = ({ name, image, arrowimage, settings, uparrow }) => {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const settingRef = useRef(null);

  const handleSettingsTab = (e) => {
    e.preventDefault();
    setSettingsIsOpen(!settingsIsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingRef.current && !settingRef.current.contains(event.target)) {
        setSettingsIsOpen(false);
      }
    };

    if (settingsIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsIsOpen]);

  return (
    <div ref={settingRef} className="p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={image} alt="profile-img" />
          <div className="text-sm ml-2 font-semibold">{name}</div>
        </div>

        <img
          onClick={(e) => handleSettingsTab(e)}
          className="profile-arrow"
          src={settingsIsOpen ? uparrow : arrowimage}
          alt="arrow-img"
        />
      </div>
      {settingsIsOpen && (
        <div className="border mt-2 bg-white rounded-lg shadow-md shadow-[#00000061]">
          {settings.map((setting) => {
            return (
              <div
                key={setting.id}
                className="mt-2 mb-2 flex h-8 items-center p-2 cursor-pointer"
              >
                <i className="ph ph-wrench"></i>
                <div className="ml-2 text-sm font-medium">
                  {setting.setting}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;
