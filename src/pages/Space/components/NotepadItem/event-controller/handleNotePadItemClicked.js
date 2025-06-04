// src/components/notepad-item/event-controller/handleNotePadItemClicked.js

const handleNotePadItemClicked = (e, setIsNotePadItemClicked) => {
  e.stopPropagation();
  setIsNotePadItemClicked(true);
};

export default handleNotePadItemClicked;
