import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useRef } from 'react';
import { Link } from 'react-router-dom'; 
import './PlusMenu.css';

const PlusMenu = ({ onClose, onAddHeading }) => {

    const headingsRef = useRef(null);
    const titlesRef = useRef(null);
    const paragraphsRef = useRef(null);

    const handleClick = (ref) => {
        console.log('Scrolling to ref:', ref.current);
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const addHeading=(heading)=>{
        onAddHeading(heading);
        console.log("onlick called \n")
    }

    return (
        <div className="plus-menu-overlay">
            <div className="plus-menu">
                <div className="menu-header">
                    <h2>Add Elements</h2>
                    <FaTimes className="close-icon" onClick={onClose} />
                </div>
                <div className="menu-body">
                    <div className="menu-section">
                        <ul>
                            <li><Link to="#">Text</Link></li>
                            <li><Link to="#">Image</Link></li>
                            <li><Link to="#">Button</Link></li>
                        </ul>
                    </div>
                    <div className="menu-section">
                        <ul>
                            <li onClick={() => handleClick(headingsRef)}><Link to="#">Themed Text</Link></li>
                            <li onClick={() => handleClick(titlesRef)}><Link to="#">Titles</Link></li>
                            <li onClick={() => handleClick(paragraphsRef)}><Link to="#">Paragraphs</Link></li>
                        </ul>
                    </div>
                    <div className="menu-preview">
                        <div ref={headingsRef} className='themedText'>
                            <p style={{ fontSize: "19px" }}>Themed Text</p>
                            <hr />
                            <h1 onClick={() => addHeading('Hello World')} style={{fontSize:"57px"}}>Add Heading 1</h1>
                            <h2 onClick={() => addHeading('Hello World')} style={{fontSize:"48px"}}>Add Heading 2</h2>
                            <h3 onClick={() => addHeading('Hello World')} style={{fontSize:"39px"}}>Add Heading 3</h3>
                            <h4 onClick={() => addHeading('Hello World')} style={{fontSize:"30px"}}>Add Heading 4</h4>
                            <h5 onClick={() => addHeading('Hello World')} style={{fontSize:"22px"}}>Add Heading 5</h5>
                            <h6 onClick={() => addHeading('Hello World')} style={{fontSize:"17px"}}>Add Heading 6</h6>
                            <br />
                            <p>I'm a paragraph. Click here to add your own text and edit me. It's easy.</p>
                            <p>I'm a paragraph. Click here to add your own text and edit me. It's easy.</p>
                            <p>I'm a paragraph. Click here to add your own text and edit me. It's easy.</p>
                        </div>
                        <div ref={titlesRef} className='titles' style={{marginTop:"40px" }}>
                            <p style={{ fontSize: "19px"}}>TiTles</p>
                            <hr />
                            <h1 style={{fontFamily:"Times New Roman"}}>ROMAN TITLE</h1>
                            <h1 style={{fontFamily:"Impact"}}>Georgia TITLE</h1>
                            <h1 style={{fontFamily:"Roboto", fontSize:"20px"}}>Small Title</h1>
                            <h1 style={{fontFamily:"Anton", fontSize:"48px"}}>HUGE Title</h1>
                            <h1 style={{fontFamily:"Oswald", fontWeight:"700"}}>Bold Title</h1>
                            <h1 style={{fontFamily:"Segoe Script", fontWeight:"700"}}>Cursive Title</h1>
                            <h1 style={{fontFamily:"Playfair Display"}}>Elegent Title</h1>
                            <h1 style={{fontFamily:"Arial"}}>Arial Title</h1>
                            <h1 style={{fontFamily:"Bebas Neue"}}>TALL TITLE</h1>
                            <h1 style={{fontFamily:"Lato", fontWeight:"100"}}>Thin Title</h1>
                            <h1 style={{fontFamily:"Cursive"}}>HandWritten Title</h1>

                        </div>
                        <div ref={paragraphsRef} className='paraElement' style={{marginTop:"100px" }}>
                            <p style={{ fontSize: "19px"}}>Paragraphs</p>
                            <hr />
                            <p style={{fontFamily:"Arial", fontSize:"20px", fontWeight:"600"}}>Arial dolor sit amet consectetur adipisicing elit. Blanditiis nam eum earum veritatis et error totam eligending.</p>
                            <p style={{fontFamily:"Segoe Script", fontSize:"22px"}}>Helvatica ipsum consectetur adipisicing elit Blanditiis nam eum earum, Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <p style={{fontFamily:"Helvatica", fontSize:"19px"}}>Titl` dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elite.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlusMenu;
