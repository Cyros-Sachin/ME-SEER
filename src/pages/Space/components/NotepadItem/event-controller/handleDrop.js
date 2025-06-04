// notepadItemHandlers/handleDrop.js

const handleDrop = (e, todos, setTodos, todoIndex, noteItemIndex) => {
  e.preventDefault();
  const [fromTodoIndex, fromNoteIndex] = e.dataTransfer
    .getData("text/plain")
    .split("-");
  const toTodoIndex = todoIndex;
  const toNoteIndex = noteItemIndex;

  if (fromTodoIndex !== toTodoIndex || fromNoteIndex !== toNoteIndex) {
    let newTodos = [...todos];
    const [movedItem] = newTodos[fromTodoIndex].sections.splice(
      fromNoteIndex,
      1
    );
    newTodos[toTodoIndex].sections.splice(toNoteIndex, 0, movedItem);
    setTodos(newTodos);
  }
};

export default handleDrop;
