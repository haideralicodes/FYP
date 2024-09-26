import React, { useState } from 'react';
import CustomizeWebsiteSidebar from './CustomizeWebsiteSidebar';
import HomePage from '../../Templates/FashionStoreOne/HomePage';
import PlusMenu from './PlusMenu';
import './CustomizeWebsiteScreen.css'

function CustomizeWebsiteScreen() {
  const [showMenu, setShowMenu] = useState(false);
  const [headings, setHeadings] = useState([]);

  const handleItemClick = (id) => {
    if (id === 'plus') {
      setShowMenu(true);
    }
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleAddHeading = (newHeading) => {
    setHeadings([newHeading, ...headings]);
  };

  const handleAddSectionClick = () => {
    setShowMenu(true);
  };

  return (
    <div style={{ display: 'flex', width: '100vw' }}>
      <CustomizeWebsiteSidebar onItemClick={handleItemClick} />
      {showMenu && (
        <div style={{ width: '60%' }}>
          <PlusMenu onClose={handleCloseMenu} onAddHeading={handleAddHeading} />
        </div>
      )}
      <div style={{ width: showMenu ? '60%' : 'calc(100vw - 60px)', marginLeft: showMenu ? '0' : '60px' }}>
        <HomePage onAddSectionClick={handleAddSectionClick} />
      </div>
    </div>
  );
}

export default CustomizeWebsiteScreen;
