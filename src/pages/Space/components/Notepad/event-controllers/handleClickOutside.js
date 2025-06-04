// handleClickOutside.js

const handleClickOutside = (
  e,
  headerInputRef,
  deleteRef,
  setIsHeaderClicked,
  setIsHovered
) => {
  // Check if headerInputRef is not null and the target is outside
  if (headerInputRef.current && !headerInputRef.current.contains(e.target)) {
    setIsHeaderClicked(false);
  }
  // Check if deleteRef is not null and the target is outside
  if (deleteRef.current && !deleteRef.current.contains(e.target)) {
    setIsHovered(false);
  }
};

export default handleClickOutside;
