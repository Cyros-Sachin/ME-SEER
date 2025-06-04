// src/components/notepad-item/event-controller/renderedNumberedList.js

const renderedNumberedList = (noteItemIndex, todos, todoIndex) => {
  let totalNumberedItems = 1;
  for (let i = noteItemIndex - 1; i >= 0; i--) {
    if (todos[todoIndex].sections[i].type === "numbered") {
      totalNumberedItems++;
    } else {
      break;
    }
  }
  return (
    <div className="renderedList-container-main">{totalNumberedItems}.</div>
  );
};

export default renderedNumberedList;
