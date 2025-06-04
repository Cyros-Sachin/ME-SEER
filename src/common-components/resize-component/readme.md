# ResizeComponent

## Overview

The `ResizeComponent` is a reusable React component designed to manage the resizing and display of to-do or notepad items. It provides a user interface that allows for interactive resizing of components and handles events like clicks outside the component to close it.

## Folder Structure

Here's an overview of the relevant project folder structure:

/project-root │ ├── /src │ ├── /components │ │ ├── /resize │ │ │ ├── ResizeComponent.jsx │ │ │ └── resize.css │ │ └── ... │ ├── /context │ │ └── context-controller.js │ ├── /assets │ │ └── asset-controller.js │ ├── /controllers │ │ └── component-controller.js │ └── App.jsx └── README.md

- **`ResizeComponent.jsx`**: The main JavaScript file containing the `ResizeComponent` code.
- **`resize.css`**: The CSS file for styling the `ResizeComponent`.
- **`context-controller.js`**: Provides context management for the component.
- **`asset-controller.js`**: Manages the assets (images) used in the component.
- **`component-controller.js`**: Contains subcomponents like `TodoResizeComponent` and `NotepadResizeComponent`.

## Component Purpose

The `ResizeComponent` is designed to handle the resizing and dynamic display of content (to-do items or notepad entries) within a defined area. It interacts with context to manage global state and uses assets for visual elements such as icons.

### Component Functionality

- **Dynamic Resizing**: Adjusts its content size based on the `isResize` state.
- **Handle Click Outside**: Closes the component if a user clicks outside of it.
- **Context Integration**: Uses `TodoContext` for accessing and updating the global state.
- **Content Display**: Dynamically displays either a to-do item or a notepad entry, based on the type provided.

### Props

| Prop Name  | Type       | Description                                                                      |
| ---------- | ---------- | -------------------------------------------------------------------------------- |
| `todoItem` | `number`   | The index of the to-do item to be displayed in the resize component.             |
| `isResize` | `boolean`  | A flag indicating whether the component should be in a resized (expanded) state. |
| `onClose`  | `function` | A callback function to close the component when clicking outside of it.          |

### Import Dependencies

- **React**: JavaScript library for building user interfaces.
- **useContext, useEffect, useRef**: React hooks for accessing context, handling side effects, and managing component references.
- **CSS (`resize.css`)**: Component-specific styling for the `ResizeComponent`.
- **contextController**: Provides access to `TodoContext` to manage the global state.
- **assetController**: Manages assets like icons used within the component.
- **componentController**: Contains subcomponents such as `TodoResizeComponent` and `NotepadResizeComponent` used for displaying content.

## Example Usage

To use the `ResizeComponent` in your project, import it and include it within your JSX with the required props:

```jsx
import React, { useState } from "react";
import ResizeComponent from "./components/resize/ResizeComponent";

const App = () => {
  const [isResize, setIsResize] = useState(false);

  const handleClose = () => {
    setIsResize(false);
  };

  return (
    <ResizeComponent todoItem={0} isResize={isResize} onClose={handleClose} />
  );
};

export default App;
```
