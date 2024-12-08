import React, { useState, useRef } from 'react';
import { Close } from '@mui/icons-material';
import Navbar from '../FashionStoreOne/Navbar';
import HeroSection from '../FashionStoreOne/HeroSection';
import TopPicks from '../FashionStoreOne/TopPicks';
import SpecialOffers from '../FashionStoreOne/SpecialOffers';
import OurStory from '../FashionStoreOne/OurStory';
import Footer from '../FashionStoreOne/Footer';

import { Menu, MenuItem, Divider, IconButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import PaletteIcon from '@mui/icons-material/Palette';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { SketchPicker } from 'react-color';
import 'react-quill/dist/quill.snow.css';

function HomePage({ onAddSectionClick, headings=[], onRemoveHeading }) {
  const [isSelected, setIsSelected] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [textColor, setTextColor] = useState('black');

  const heroRef = useRef(null);

  // State to track which section should have a new section added above it
  const [sectionToAddAbove, setSectionToAddAbove] = useState(null);

  // Modify the add section click handler to track the specific section
  const handleAddSectionClick = (sectionName) => {
    setSectionToAddAbove(sectionName);
    onAddSectionClick(sectionName);
  };

  // Function to render headings above a specific section
  const renderHeadingsAboveSection = (sectionName) => {
    return headings
      .filter((heading) => heading.section === sectionName)
      .map((heading, index) => (
        <div key={index} style={{display:"flex"}}>
          <span
            contentEditable
            suppressContentEditableWarning
            onContextMenu={(e) => openContextMenu(e, heading)}
            style={{
              fontFamily: 'Times New Roman',
              fontSize: heading.fontSize,
              width:"100%", 
              padding:"4%"
            }}
          >
            {heading.text}
          </span>
          <Close
            onClick={() => onRemoveHeading(index)}
            style={{
              cursor: 'pointer',
              marginTop: '60px',
              color: 'red',
            }}
          />
        </div>
      ));
  };

  const openContextMenu = (event, element) => {
    event.preventDefault();
    setSelectedElement(event.currentTarget);
    setAnchorEl(event.currentTarget);
    // Set current color of the selected element
    setTextColor(elementStyles[element]?.color || 'black');
  };

  const closeContextMenu = () => {
    setAnchorEl(null);
    setColorPickerVisible(false);
  };

  const applyStyle = (style) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      switch (style) {
        case 'bold':
          document.execCommand('bold');
          break;
        case 'italic':
          document.execCommand('italic');
          break;
        case 'underline':
          document.execCommand('underline');
          break;
        default:
          break;
      }
    }
  };

  const applyAlignment = (alignment) => {
    if (selectedElement) {
      selectedElement.style.textAlign = alignment;
    }
    closeContextMenu();
  };

  const applyColor = (color) => {
    if (selectedElement) {
      setElementStyles((prevStyles) => ({
        ...prevStyles,
        [selectedElement]: {
          ...prevStyles[selectedElement],
          color: color,
        },
      }));
    }
    closeContextMenu();
  };

  return (
    <div>
      <Navbar />

      {renderHeadingsAboveSection('hero')}
      <HeroSection onAddSectionClick={() => handleAddSectionClick('hero')} />

      {renderHeadingsAboveSection('topPicks')}
      <TopPicks onAddSectionClick={() => handleAddSectionClick('topPicks')} />

      {renderHeadingsAboveSection('specialOffers')}
      <SpecialOffers
        onAddSectionClick={() => handleAddSectionClick('specialOffers')}
      />

      {renderHeadingsAboveSection('ourStory')}
      <OurStory
        onAddSectionClick={() => handleAddSectionClick('ourStory')}
      />

      {renderHeadingsAboveSection('footer')}
      <Footer onAddSectionClick={() => handleAddSectionClick('footer')} />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeContextMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          '& .MuiPaper-root': {
            width: '240px',
          },
        }}
      >
        <MenuItem onClick={() => applyAlignment('left')}>
          <FormatAlignLeftIcon /> Align Left
        </MenuItem>
        <MenuItem onClick={() => applyAlignment('center')}>
          <FormatAlignCenterIcon /> Align Center
        </MenuItem>
        <MenuItem onClick={() => applyAlignment('right')}>
          <FormatAlignRightIcon /> Align Right
        </MenuItem>
        <Divider/>
        <MenuItem onClick={() => applyStyle('bold')}>
          <FormatBoldIcon /> Bold
        </MenuItem>
        <MenuItem onClick={() => applyStyle('italic')}>
          <FormatItalicIcon /> Italic
        </MenuItem>
        <MenuItem onClick={() => applyStyle('underline')}>
          <FormatUnderlinedIcon /> Underline
        </MenuItem>
        <Divider/>
        <MenuItem onClick={() => setColorPickerVisible(!colorPickerVisible)}>
          <FormatColorFillIcon /> Background Color
        </MenuItem>
        <MenuItem onClick={() => setColorPickerVisible(!colorPickerVisible)}>
          <PaletteIcon /> Text Color
        </MenuItem>
        {colorPickerVisible && (
          <div style={{ padding: '10px' }}>
            <SketchPicker
              color={textColor}
              onChangeComplete={(color) => applyColor(color.hex)}
            />
          </div>
        )}
      </Menu>

    </div>
  );
}

export default HomePage;
