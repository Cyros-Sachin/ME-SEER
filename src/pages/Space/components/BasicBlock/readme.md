# BasicBlock Component

## Overview

The `BasicBlock` component is a reusable React component that displays a list of selectable options to the user. These options allow the user to interact with various functionalities related to a to-do item. Each option, when clicked, triggers a specific event handler defined in the `eventController` to handle the selected action.

## Folder Structure

Here's an overview of the relevant project folder structure to understand where the `BasicBlock` component fits in:

## Component Purpose

The `BasicBlock` component is designed to display a set of selectable options that allow users to interact with to-do items in the application. The options are dynamically generated based on the context provided and each option can perform a specific function, such as adding a new item, marking it as urgent, or any other action defined in the event handlers.

### Component Functionality

- **Display Options**: Renders a list of options (buttons with icons and labels) that users can interact with.
- **Handle Events**: Each option triggers an event handler defined in the `eventController` to perform the corresponding action.
- **Context Integration**: Uses context from `BasicBlockContext` and `TodoContext` to access and manipulate the application's global state.

### Props

| Prop                | Type       | Description                                                                 |
| ------------------- | ---------- | --------------------------------------------------------------------------- |
| `todoIndex`         | `number`   | The index of the current to-do item that the options are related to.        |
| `setBasicBlocks`    | `function` | State setter function to manage the visibility of the basic block options.  |
| `setShowBasicBlock` | `function` | State setter function to control whether the basic block options are shown. |

### Import Dependencies

- **React**: JavaScript library for building user interfaces.
- **useContext**: React hook for accessing context values.
- **CSS (`basic-block.css`)**: Component-specific styling for the `BasicBlock` component.
- **eventController**: A module that contains functions to handle events triggered by the user.
- **contextController**: Provides access to context such as `BasicBlockContext` and `TodoContext` that manage global state for the component.

### Usage

To use the `BasicBlock` component, simply import it and include it within your JSX with the required props:

```jsx
import BasicBlock from "./components/basic-block/BasicBlock";

function Example() {
  const [showBasicBlock, setShowBasicBlock] = useState(true);
  const [basicBlocks, setBasicBlocks] = useState([]);

  return (
    <div>
      {showBasicBlock && (
        <BasicBlock
          todoIndex={0}
          setBasicBlocks={setBasicBlocks}
          setShowBasicBlock={setShowBasicBlock}
        />
      )}
    </div>
  );
}
```

### Explanation

- **JSDoc** provides detailed comments on the component's purpose, props, dependencies, and usage, making it easier for other developers to understand and maintain the code.
- **`README.md`** explains the purpose and usage of the `BasicBlock` component, as well as its dependencies, props, and how it fits into the overall project structure.

/project-root
│
├── /src
│ ├── /components
│ │ ├── /notepad
│ │ │ └── context-controller.js
│ │ ├── /basic-block
│ │ │ ├── BasicBlock.jsx
│ │ │ └── basic-block.css
│ │ └── ...
│ ├── /context
│ │ ├── todos-context.js
│ │ ├── basic-block-context.js
│ │ └── resize-context.js
│ └── /controllers
│ ├── event-controller.js
│ └── ...
└── README.md
