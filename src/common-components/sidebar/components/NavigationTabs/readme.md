# NavigationTabs Component

## Description

The `NavigationTabs` component is a React component used to create a navigation tab with an optional submenu. This component supports different visual states and navigates to specific routes based on the provided `name` prop. It leverages React Router for navigation and handles submenu toggling.

## Folder Structure

````plaintext
src/
├── components/
│   ├── NavigationTabs/
│   │   ├── NavigationTabs.js
│   │   ├── navigation-tabs.css
│   │   └── component-controller.js
│   └── ...
└── ...


import NavigationTabs from './components/NavigationTabs/NavigationTabs';

const subTabArray = [
  { id: 1, name: 'SubTab 1' },
  { id: 2, name: 'SubTab 2' },
];


```jsx
const App = () => (
  <div>
    <NavigationTabs
      tabImage="path/to/image.png"
      tabAlternate="Tab Image"
      tabTitle="My Tab"
      subTabArray={subTabArray}
      isHover={true}
      isClick={true}
      isButton={false}
      arrowImage="path/to/arrow.png"
      name="activity"
    />
  </div>
);
````

This documentation provides a clear understanding of the component's functionality, its folder structure, and usage details. Let me know if you need any more information or adjustments!
