const handleClickOutside = (e, deleteRef, setIsHovered) => {
  if (deleteRef.current && !deleteRef.current.contains(e.target)) {
    setIsHovered(false);
  }
};

export default handleClickOutside;
