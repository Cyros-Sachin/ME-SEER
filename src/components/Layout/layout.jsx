// components/Layout/Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Space/sidebar/sidebar';

const Layout = ({ children }) => {
  const location = useLocation();
  const shouldShowSidebar = !['/login'].includes(location.pathname);
    
  return (
    <div className="h-full w-full border">
      {shouldShowSidebar && <Sidebar />}
        {children}
    </div>
  );
};

export default Layout;
