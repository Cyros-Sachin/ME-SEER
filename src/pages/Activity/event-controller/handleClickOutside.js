// src/event-controller/handleClickOutside.js

const handleClickOutside = (ref, callback) => {
  const handleClick = (event) => {
    // if (ref.current && !ref.current.contains(event.target)) {
    //   callback();
    // }
  };

  // Attach and detach the event listener
  document.addEventListener("mousedown", handleClick);

  return () => {
    document.removeEventListener("mousedown", handleClick);
  };
};

export default handleClickOutside;
