// src/components/notepad-item/event-controller/handleClickOutside.js

const handleClickOutside = (
  e,
  notepadRef,
  setIsNotePadItemClicked,
  setBasicBlocks
) => {
  if (
    notepadRef.current &&
    !notepadRef.current.contains(e.target) &&
    !document.getElementById("basic-block-id")?.contains(e.target)
  ) {
    setIsNotePadItemClicked(false);
    setBasicBlocks(false);
  }
};

export default handleClickOutside;
