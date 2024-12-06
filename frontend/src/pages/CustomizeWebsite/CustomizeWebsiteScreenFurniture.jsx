import React, { useState } from 'react';
import CustomizeWebsiteSidebar from './CustomizeWebsiteSidebar';
import HomePage from '../../Templates/FurnitureStore/HomePage';
import PlusMenu from './PlusMenu';
import './CustomizeWebsiteScreen.css'
import logo from '../../../../frontend/src/assets/logo.png'
import { useNavigate } from 'react-router-dom';
import './CustomizeWebsiteScreen.css'

function CustomizeWebsiteScreenFurniture() {

  const [showMenu, setShowMenu] = useState(false);
  const [headings, setHeadings] = useState([]);

  const navigate = useNavigate();

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

  const onRemoveHeading = (index) => {
    setHeadings((prevHeadings) => prevHeadings.filter((_, i) => i !== index));
  };

  const handleAddSectionClick = () => {
    setShowMenu(true);
  };

  const handleClick= ()=>{
    navigate('../dashboard')
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
        <section className='preview'>
          <div className='previewRectangle'>
            <div className='previewbar'>
              <img src={logo} alt="Logo" style={{cursor:"pointer"}} onClick={handleClick}/>
            </div>
            <div className='mybtns'>
              <button>Publish</button>
            </div>
          </div>
        </section>
        <HomePage onAddSectionClick={handleAddSectionClick} headings={headings} onRemoveHeading={onRemoveHeading} />
      </div>
    </div>
  );
}

export default CustomizeWebsiteScreenFurniture;
