import React from 'react';

import Header from '../components/Header';

interface LayoutProps {
}

const BaseLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
        <Header />
        <div className="">{children}</div>
    </div>
  );
};

export default BaseLayout;
