// src/components/notepad-item/event-controller/handleAddItemBasicBlock.js

const handleAddItemBasicBlock = (e, setShowBasicBlock) => {
  e.stopPropagation();
  // setBasicBlocks(true);
  setShowBasicBlock(true);
};

export default handleAddItemBasicBlock;
