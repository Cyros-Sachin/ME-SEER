const handleMealOpen = (
  isMealOpen,
  setIsMealOpen,
  collectiveIds,
  setCollectiveId,
  setRenderNone,
  setPinnedResizeName,
  name,
  setPinnedIndex
) => {
  setIsMealOpen(true);
  setPinnedIndex(name);
  setPinnedResizeName(name);
  // set the collective id
  if (collectiveIds === "") {
    setRenderNone(true);
  } else {
    setRenderNone(false);
    setCollectiveId(collectiveIds);
  }
};

export default handleMealOpen;
