# Profile Component

## Overview

The `Profile` component is a reusable React component designed to display a user profile section. It shows the user's name, profile image, and a settings tab that can be toggled open or closed by clicking an arrow icon. When the settings tab is open, clicking outside the tab closes it automatically.

## Folder Structure

The recommended folder structure for using this component is as follows:

- **`Profile.jsx`**: The main JavaScript file containing the `Profile` component.
- **`profile.css`**: The CSS file containing styles specific to the `Profile` component.

## Installation

To use the `Profile` component in your project, ensure you have the necessary dependencies installed (React, etc.). Then, import the component into your desired file.

## Example Usage

```jsx
import React from "react";
import Profile from "./components/Profile/Profile";

const App = () => {
  const settings = [
    {
      id: 1,
      src: "path/to/setting1.png",
      alt: "Setting 1",
      setting: "Account Settings",
    },
    {
      id: 2,
      src: "path/to/setting2.png",
      alt: "Setting 2",
      setting: "Privacy Settings",
    },
  ];

  return (
    <Profile
      name="John Doe"
      image="path/to/profile.jpg"
      arrowimage="path/to/arrow-down.png"
      uparrow="path/to/arrow-up.png"
      settings={settings}
    />
  );
};

export default App;
```

## Props

| Prop Name    | Type     | Description                                                                                                        |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `name`       | `string` | The name of the user to display.                                                                                   |
| `image`      | `string` | The URL of the user's profile image.                                                                               |
| `arrowimage` | `string` | The URL of the down arrow image.                                                                                   |
| `uparrow`    | `string` | The URL of the up arrow image, shown when settings are open.                                                       |
| `settings`   | `Array`  | An array of setting items to display in the settings tab. Each item should have `id`, `src`, `alt`, and `setting`. |
