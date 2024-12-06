import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';
import portrait from './assets/shoe1.png';

function HeroSection({ onAddSectionClick }) {
  const [isSelected, setIsSelected] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);

  const [content, setContent] = useState({
    heading: 'Discover Our Style',
    paragraph: 'Fashion for All Ages',
  });

  const heroRef = useRef(null);

  const handleClickInside = () => {
    setShowButton(true);
    setIsSelected(true);
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
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

  const innerElementsStyle = {
    border: isSelected ? '1px solid blue' : 'none',
  };

  const style1 = {
    borderLeft: isSelected ? '2px dotted black' : 'none',
    borderRight: isSelected ? '2px dotted black' : 'none',
    borderLeftStyle: isSelected ? 'dashed' : 'none',
    borderRightStyle: isSelected ? 'dashed' : 'none',
  };

  const getElementStyle = (element) => {
    return selectedElement === element
      ? { border: '2px solid blue' }
      : innerElementsStyle;
  };

  const handleBlur = (field) => {
    const element = document.querySelector(`.${field}`);
    handleContentChange(element.innerText, field);
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
            visibility: showButton ? 'visible' : 'hidden',
            opacity: showButton ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          + Add Section
        </button>
      )}
      <div style={style1}>
        <br />
        <br />
        <h1
          className='editable heading'
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={() => handleBlur('heading')}
          style={getElementStyle('heading')}
          onClick={(e) => {
            e.stopPropagation();
            handleElementClick('heading');
          }}
        >
          {content.heading}
        </h1>
        <p
          className='editable paragraph'
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={() => handleBlur('paragraph')}
          style={getElementStyle('paragraph')}
          onClick={(e) => {
            e.stopPropagation();
            handleElementClick('paragraph');
          }}
        >
          {content.paragraph}
        </p>
        <img
          src={portrait}
          onClick={(e) => {
            e.stopPropagation();
            handleElementClick('image');
          }}
          style={getElementStyle('image')}
        />
      </div>
    </section>
  );
}

export default HeroSection;