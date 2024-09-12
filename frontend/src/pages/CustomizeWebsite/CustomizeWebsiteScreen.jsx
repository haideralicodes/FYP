import React, { useState } from 'react';
import CustomizeWebsiteSidebar from './CustomizeWebsiteSidebar';
import HomePage from '../../Templates/FashionStoreOne/HomePage';
import PlusMenu from './PlusMenu';

function CustomizeWebsiteScreen() {
  const [showMenu, setShowMenu] = useState(false);
  const [newHeading, setNewHeading] = useState('');

  const handleItemClick = (id) => {
    if (id === 'plus') {
      setShowMenu(true);
    }
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleAddHeading=(heading)=>{
    setNewHeading(heading)
  }

  return (
    <div style={{ display: 'flex', width: '98.9vw' }}>
      <CustomizeWebsiteSidebar onItemClick={handleItemClick} />
      {showMenu && (
        <div style={{ width: '60%' }}>
          <PlusMenu onClose={handleCloseMenu} onAddHeading={handleAddHeading} />
        </div>
      )}
      <div style={{ width: showMenu ? '60%' : 'calc(100vw - 60px)', marginLeft: showMenu ? '0' : '60px' }}>
        <HomePage newHeading={newHeading} />
      </div>
    </div>
  );
}

export default CustomizeWebsiteScreen;
