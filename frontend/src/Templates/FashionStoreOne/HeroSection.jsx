import React, { useState, useEffect, useRef } from 'react';
import { Menu, MenuItem, Divider, IconButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import PaletteIcon from '@mui/icons-material/Palette';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { SketchPicker } from 'react-color';
import 'react-quill/dist/quill.snow.css';
import './HeroSection.css';
import portrait from './assets/portrait.webp';

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

function HeroSection({ onAddSectionClick }) {
  const [isSelected, setIsSelected] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [textColor, setTextColor] = useState('black');

  // New state to track element-specific styles
  const [elementStyles, setElementStyles] = useState({
    heading: { color: 'black' },
    paragraph: { color: 'black' }
  });

  const [content, setContent] = useState({
    heading: 'Discover Our Style',
    paragraph: 'Fashion for All Ages',
  });

  const heroRef = useRef(null);

  const handleClickInside = () => {
    setShowButton(true);
    setIsSelected(true);
  };

  const handleContentChange = (value, field) => {
    const newContent = { ...content, [field]: value };
    setContent(newContent);
    localStorage.setItem('heroContent', JSON.stringify(newContent));
  };

  useEffect(() => {
    const savedContent = JSON.parse(localStorage.getItem('heroContent'));
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (heroRef.current && !heroRef.current.contains(event.target)) {
        setShowButton(false);
        setIsSelected(false);
        setSelectedElement(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sectionStyle = {
    border: isSelected ? '3px solid blue' : 'none',
  };

  const handleBlur = (field) => {
    const element = document.querySelector(`.${field}`);
    handleContentChange(element.innerText, field);
  };

  const openContextMenu = (event, element) => {
    event.preventDefault();
    setSelectedElement(element);
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

  //NOT WORKING YET!!!!!!!!!!!
  const applyColor = (color) => {
    if (selectedElement) {
      
      setElementStyles(prevStyles => ({
        ...prevStyles,
        [selectedElement]: {
          ...prevStyles[selectedElement],
          color: color
        }
      }));
    }
    closeContextMenu();
  };

  const applyAlignment = (alignment) => {
    if (selectedElement) {
      selectedElement.style.textAlign = alignment;
    }
    closeContextMenu();
  };

  return (
    <section
      ref={heroRef}
      className="hero-section"
      onClick={handleClickInside}
      style={sectionStyle}
    >
      {showButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddSectionClick();
            setShowButton(false);
          }}
          style={{
            position: 'absolute',
            top: '122px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '16px',
            zIndex: 10,
          }}
        >
          + Add Section
        </button>
      )}
      <div>
        <h1
          className="editable heading"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={() => handleBlur('heading')}
          onContextMenu={(e) => openContextMenu(e, 'heading')}
          style={elementStyles.heading}
        >
          {content.heading}
        </h1>
        <p
          className="editable paragraph"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={() => handleBlur('paragraph')}
          onContextMenu={(e) => openContextMenu(e, 'paragraph')}
          style={elementStyles.paragraph}
        >
          {content.paragraph}
        </p>
        <img
          src={portrait}
          alt="Portrait"
          onContextMenu={(e) => openContextMenu(e, 'image')}
        />
      </div>

      {/* Context Menu */}
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

    </section>
  );
}

export default HeroSection;