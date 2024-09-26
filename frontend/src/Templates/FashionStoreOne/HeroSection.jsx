import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';
import portrait from './assets/portrait.webp';

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

  const handleContentChange = (e, field) => {
    const newContent = { ...content, [field]: e.target.innerText };
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
            top: '63px',
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
          contentEditable="true"
          className="editable"
          onClick={(e) => {
            e.stopPropagation();
            handleElementClick('heading');
          }}
          onInput={(e) => handleContentChange(e, 'heading')}
          style={getElementStyle('heading')}
        >
          {content.heading}
        </h1>
        <p
          contentEditable="true"
          className="editable"
          onClick={(e) => {
            e.stopPropagation();
            handleElementClick('paragraph');
          }}
          onInput={(e) => handleContentChange(e, 'paragraph')}
          style={getElementStyle('paragraph')}
        >
          {content.paragraph}
        </p>
        <img
          src={portrait}
          alt="Portrait"
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
