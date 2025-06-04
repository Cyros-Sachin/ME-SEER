# NotepadItem Component

## Description

The `NotepadItem` component is a React component designed to represent an individual item within a notepad or todo list. It offers various interactive features such as drag-and-drop, resizing, and editing capabilities. The component handles different item types including numbered lists, bullet points, and headers, and provides context-sensitive actions based on user interactions.

## Folder Structure

```plaintext
src/
├── components/
│   ├── NotepadItem/
│   │   ├── NotepadItem.js
│   │   ├── notepad-item.css
│   │   ├── event-controller.js
│   │   ├── asset-controller/
│   │   │   └── index.js
│   │   └── context-controller.js
│   └── ...
└── ...
```

```plaintext

NotepadItem.js
Defines the NotepadItem component. It imports:

React, useState, useEffect, useContext, useRef from 'react' for component state, lifecycle management, context, and refs.
eventController from ./event-controller for handling various events related to the notepad item, including drag-and-drop and input handling.
assetControllers from ./asset-controller/index for accessing static assets such as images.
contextController from ./context-controller to use the Todo context for managing todo items.
notepad-item.css
Contains the CSS styles specific to the NotepadItem component. This file should be placed in the same directory as NotepadItem.js and should style the component elements as described in the class names used.

event-controller.js
Provides functions for handling events in the NotepadItem component, including drag-and-drop actions, hover effects, and input changes.

asset-controller/index.js
Exports static assets (images) used in the NotepadItem component, such as icons for adding items, dragging, and bullet points.

context-controller.js
Provides the TodoContext used to manage and access the todo items within the application.

Props
item (Object): The data representing the notepad item. This includes properties such as type (e.g., "numbered", "bullet", "header") and content.
noteItemIndex (number): The index of the item within its section in the todo list.
todoIndex (number): The index of the todo item that contains this notepad item.
setShowBasicBlock (Function): Function to control the display of the BasicBlock component.

```

## Usage

```jsx
import NotepadItem from "./components/NotepadItem/NotepadItem";

const handleResize = (todoIndex) => {
  // Implement resize logic
};

const App = () => (
  <div>
    <NotepadItem
      item={{ type: "header", content: "Sample Header" }}
      noteItemIndex={0}
      todoIndex={0}
      setShowBasicBlock={(value) => console.log(value)}
    />
  </div>
);
```

## Information

```plaintext
CSS Styling
The component uses the following CSS classes:

.notepad-item-container-main
.notepad-item-controllers-container
.notepad-item-image
.notepad-item-container
.dot-container-main
.notepad-item-container-input
These classes should be defined in notepad-item.css to style the various elements of the NotepadItem component.

Development
To run the component in your development environment, ensure you have all necessary dependencies installed, including react, and any related packages.
```
