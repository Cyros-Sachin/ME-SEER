# Sidebar Component

## Overview

The `Sidebar` component is a versatile and interactive navigation menu designed for a React application. It includes various navigational and control tabs that allow users to perform actions like adding tasks, navigating between different sections, and accessing recent items. The component is dynamically aware of the application's routing and adjusts its content based on the current path.

## Folder Structure

Here's an overview of the relevant project folder structure:

/project-root │ ├── /src │ ├── /components │ │ ├── /sidebar │ │ │ ├── Sidebar.jsx │ │ │ └── sidebar.css │ ├── /context │ │ └── context-controller.js │ ├── /assets │ │ └── asset-controller.js │ ├── /controllers │ │ └── component-controller.js │ └── App.jsx └── README.md

- **`Sidebar.jsx`**: The main JavaScript file containing the `Sidebar` component code.
- **`sidebar.css`**: The CSS file for styling the `Sidebar` component.
- **`context-controller.js`**: Provides context management for the sidebar, including user profile and menu state.
- **`asset-controller.js`**: Manages the assets (images/icons) used in the component.
- **`component-controller.js`**: Contains subcomponents used within the `Sidebar` component, like `NavigationTabs`, `SearchBarTabs`, `ControlTabs`, etc.

## Component Purpose

The `Sidebar` component is designed to serve as a comprehensive navigational tool for a React web application. It provides users with an easy-to-use interface to:

- Navigate between different sections such as "Activity," "Dashboard," and "Help and Support."
- Access and manage recent spaces.
- Add new tasks (to-do items, notepad entries, etc.) based on the current route.
- Perform specific actions dynamically based on the application's state or the user's interaction.

### Component Functionality

- **Dynamic Navigation**: Displays different tabs for various sections, which users can navigate.
- **Control Tabs**: Offers buttons for actions like adding to-do items or notepad entries.
- **Context Integration**: Utilizes multiple contexts (`SidebarContext`, `MenuContext`, `TodoContext`) for managing state and behavior.
- **Route Awareness**: Changes content dynamically based on the current route (using `useLocation` from `react-router-dom`).
- **Responsive Interactivity**: Reacts to user inputs like clicks on tabs or buttons to open modals or add items.

### Import Dependencies

- **React**: JavaScript library for building user interfaces.
- **useContext, useLocation**: React hooks for accessing context and getting the current path from the router.
- **CSS (`sidebar.css`)**: Component-specific styling for the `Sidebar`.
- **contextController**: Provides context management for global state.
- **assetController**: Manages assets like icons used within the component.
- **componentController**: Contains subcomponents like `Profile`, `NavigationTabs`, `SearchBarTabs`, and `ControlTabs`.

## Example Usage

To use the `Sidebar` component in your project, import it and include it within your JSX:

```jsx
import React from "react";
import Sidebar from "./components/sidebar/Sidebar";

const App = () => {
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default App;
```

```jsx
{
  pathname === "/" && (
    <div className="navigation-seperation">
      <div className="navigation-heading">ADD</div>
      <componentController.ControlTabs
        tabTitle="ADD TODO"
        clickHandler={() => handler.handle_AddTodo(todos, setTodos)}
      />
      <componentController.ControlTabs
        tabTitle="ADD NOTEPAD"
        clickHandler={() => handler.handle_AddNotepad(todos, setTodos)}
      />
      <componentController.ControlTabs tabTitle="ADD MULTINOTEPAD" />
    </div>
  );
}
```

The Sidebar component provides a structured and user-friendly interface for navigating through different sections of the application, managing tasks, and accessing recent spaces. By leveraging the React Context API and dynamic routing, it enhances the overall interactivity and usability of the application.
