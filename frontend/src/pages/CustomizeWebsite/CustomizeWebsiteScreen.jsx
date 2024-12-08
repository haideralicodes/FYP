import React, { useState } from 'react';
import CustomizeWebsiteSidebar from './CustomizeWebsiteSidebar';
import HomePage from '../../Templates/FashionStoreOne/HomePage';
import PlusMenu from './PlusMenu';
import AddNewSectionMenu from './AddNewSectionMenu';
import './CustomizeWebsiteScreen.css';
import logo from '../../../../frontend/src/assets/logo.png';
import { useNavigate } from 'react-router-dom';

function CustomizeWebsiteScreen() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [sectionToAddHeadingTo, setSectionToAddHeadingTo] = useState(null);

  const navigate = useNavigate();

  const handleItemClick = (id) => {
    if (id === 'plus') {
      setActiveMenu('plus');
    } 
    else if (id === 'addNewSection') {
      setActiveMenu('addNewSection');
    }
  };

  const handleCloseMenu = () => {
    setActiveMenu(null); 
  };

  const handleAddHeading = (newHeading, fontSize) => {
    setHeadings([
      {
        text: newHeading,
        fontSize: fontSize,
        section: sectionToAddHeadingTo,
      },
      ...headings,
    ]);
    setActiveMenu(null);
  };

  const onRemoveHeading = (index) => {
    setHeadings((prevHeadings) => prevHeadings.filter((_, i) => i !== index));
  };

  const handleAddSectionClick = (sectionName) => {
    setSectionToAddHeadingTo(sectionName);
    setActiveMenu('addNewSection');
  };

  const handleClick = () => {
    navigate('../dashboard');
  };

  const handleSave = () => {
    navigate('../dashboard');
  };

  const handleOnClick = () => {
    navigate('../Payment');
  };

  return (
    <div style={{ display: 'flex', width: '98.9vw' }}>
      <CustomizeWebsiteSidebar onItemClick={handleItemClick} />
      {activeMenu === 'plus' && (
        <div style={{ width: '60%' }}>
          <PlusMenu onClose={handleCloseMenu} onAddHeading={handleAddHeading} />
        </div>
      )}
      {activeMenu === 'addNewSection' && (
        <div style={{ width: '60%' }}>
          <AddNewSectionMenu onClose={handleCloseMenu} />
        </div>
      )}

      <div
        style={{
          width: activeMenu ? '60%' : 'calc(100vw - 60px)',
          marginLeft: activeMenu ? '0' : '60px',
        }}
      >
        <section className="preview">
          <div className="previewRectangle">
            <div className="previewbar">
              <img
                src={logo}
                alt="Logo"
                style={{ cursor: 'pointer' }}
                onClick={handleClick}
              />
            </div>
            <div className="mybtns">
              <button style={{border:"1px solid blue", backgroundColor:"white", color:"blue"}} onClick={handleSave}
              >
                Save Design
              </button>
              <button onClick={handleOnClick}>Publish</button>
            </div>
          </div>
        </section>
        <HomePage
          onAddSectionClick={handleAddSectionClick}
          headings={headings}
          onRemoveHeading={onRemoveHeading}
        />
      </div>
      
    </div>
  );
}

export default CustomizeWebsiteScreen;
