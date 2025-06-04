const handlePagesController = (
  passedIndex,
  setIndex,
  indexes,
  index,
  setSelectedPart
) => {
  const clampedIndex = Math.max(0, Math.min(passedIndex, indexes.length - 1));
  if (clampedIndex !== index) {
    setIndex(clampedIndex);
  }
  setSelectedPart(indexes[clampedIndex]);
};

export default handlePagesController;
