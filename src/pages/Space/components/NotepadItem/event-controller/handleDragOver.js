// notepadItemHandlers/handleDragOver.js

const handleDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
};

export default handleDragOver;
