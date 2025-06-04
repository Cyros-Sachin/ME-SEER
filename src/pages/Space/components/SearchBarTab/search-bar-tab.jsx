import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./search-bar-tab.css";

// controller
import assetController from "./asset-controller";

/**
 * SearchBarTabs
 *
 * A React component that provides a search bar functionality with a modal popup.
 * It allows users to open a search modal, enter search queries, and displays recent spaces.
 *
 * @component
 * @returns {JSX.Element} The rendered SearchBarTabs component.
 */

const SearchBarTabs = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toggle search modal visibility
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Close search modal when clicking outside of it
  const handleOutsideClick = (e) => {
    if (e.target.className === "search-modal-overlay") {
      toggleSearch();
    }
  };

  // Render the search modal
  const renderSearchModal = () => {
    return ReactDOM.createPortal(
      <div className="search-modal-overlay" onClick={handleOutsideClick}>
        <div className="search-modal">
          <button className="close-btn" onClick={toggleSearch}>
            X
          </button>
          <input type="text" placeholder="Search..." className="search-input" />
          <div className="recent-spaces">
            <h4>Recent Spaces</h4>
            {/* Sample Recent Spaces, replace with actual data */}
            <ul>
              <li>Plan</li>
              <li>Learn Philosophy</li>
              <li>Goal</li>
              <li>Finance</li>
            </ul>
          </div>
        </div>
      </div>,
      document.body // Render outside the root DOM node
    );
  };

  return (
    <div className="search-bar-tabs-container">
      <div onClick={toggleSearch} className="navigation-tab-container-main">
        <img src={assetController.search} alt="search" />
        <div className="navigation-tab-title-container">SEARCH</div>
      </div>

      {/* Render Modal if isSearchOpen is true */}
      {isSearchOpen && renderSearchModal()}
    </div>
  );
};

export default SearchBarTabs;
