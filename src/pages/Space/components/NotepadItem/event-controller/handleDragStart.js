// notepadItemHandlers/handleDragStart.js

const handleDragStart = (e, todoIndex, noteItemIndex) => {
  e.dataTransfer.setData("text/plain", `${todoIndex}-${noteItemIndex}`);
  e.dataTransfer.effectAllowed = "move";
};

export default handleDragStart;
