import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './PlusMenu.css';
import { Menu, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircularProgress from '@mui/material/CircularProgress';

const AddNewSectionMenu = ({ onClose, onAddHeading }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const headingsRef = useRef(null);

  const handleClick = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const generateContent = async () => {
    setLoading(true);
    setGeneratedText("");
    setGeneratedImage(null);

    const hfToken = "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";
    const hfUrl = "https://api-inference.huggingface.co/models/multimodalart/vintage-ads-flux";

    try {
      // Fetch generated text and image
      const response = await fetch(hfUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Error fetching generated content");
      }

      const data = await response.json();
      const imageBase64 = data.generated_image;

      // Upload image to Cloudinary
      const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/demo/image/upload", {
        method: "POST",
        body: JSON.stringify({
          file: `data:image/png;base64,${imageBase64}`,
          upload_preset: "demo_preset",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const cloudinaryData = await cloudinaryResponse.json();

      // Set generated content
      setGeneratedText(data.generated_text);
      setGeneratedImage(cloudinaryData.secure_url);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plus-menu-overlay">
      <div className="plus-menu">
        <div className="menu-header">
          <h2>Add Sections</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <div className="menu-body">
          <div className="menu-section">
            <ul>
                <li onClick={() => handleClick(headingsRef)}><Link to="#">Add Section</Link></li>
                <li onClick={() => handleClick(headingsRef)}><Link to="#">AI Generator</Link></li>
            </ul>
          </div>
          <div className="menu-preview">

            <br />

            <div style={{cursor:"pointer", height:"120px", width:"400px", backgroundColor:"#E8E59B", display:"flex", flexDirection: "column", textAlign:"center", justifyContent:"center", alignItems:"center"}}>
                <h3 style={{color:"black"}}>Welcome to Our Site</h3>
                <h6>Welcome visitors to your site with a short, engaging introduction. Double click to edit and add your own text.</h6>
            </div>

            <br /><br />

            <div style={{cursor:"pointer", height:"150px", width:"400px", gap:"5px", display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"black"}}>
                <div style={{height:"150px", width:"400px", textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <span style={{color:"white"}}>Welcome</span>
                    <span style={{color:"white"}}>to Our Site</span>
                </div>
                <div style={{height:"150px", width:"200px", textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <p style={{color:"white", fontSize:"12px"}}>Welcome visitors to your site with a short, engaging introduction. Double click to edit and add your own text.</p>
                </div>
            </div>

            <br /><br />

            <div style={{cursor:"pointer", height:"150px", width:"400px", gap:"5px", display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"#A1C7E5"}}>
                <div style={{height:"150px", width:"400px", textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <span style={{color:"black"}}>Welcome</span>
                    <span style={{color:"black"}}>to Our Site</span>
                </div>
                <div style={{height:"150px", width:"200px", textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <img 
                        height="150px"
                        src={"https://plus.unsplash.com/premium_photo-1732730224306-3b469ea9e640?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                </div>
            </div>

            <br /><br />
            <div style={{cursor:"pointer", height:"120px", width:"400px", backgroundColor:"#D5D2CA", display:"flex", flexDirection: "column", textAlign:"center", justifyContent:"center", alignItems:"center"}}>
                <h3 style={{color:"black"}}>Welcome to Our Site</h3>
                <h6>Welcome visitors to your site with a short, engaging introduction. Double click to edit and add your own text.</h6>
            </div>

            <div ref={headingsRef} className="themedText">
                <br /><br />
              <p style={{ fontSize: "20px" }}>Let AI do the work for you</p>
              <p style={{ fontSize: "15px" }}>Tell what you want in your section, and AI will generate a unique and ready-to-use section</p>
              <hr />
              <br />
              <input
                style={{
                  width: "350px",
                  height: "100px",
                  padding: "15px",
                  fontSize: "16px",
                  marginLeft: "11px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  outline: "none",
                  transition: "all 0.3s ease",
                  fontFamily: "'Arial', sans-serif",
                }}
                type="text"
                placeholder="Variety of yoga styles, expert instructions, small classes, in Islamabad"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                style={{
                  marginTop: "20px",
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#04e762",
                  color: "white",
                  border: "2px solid #04e762",
                  width: "170px",
                  height: "40px",
                  marginLeft: "100px",
                  fontSize: "17px",
                  borderRadius: "30px",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                }}
                onClick={generateContent}
              >
                Generate Section
              </button>
              <br />
              {loading ? (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <CircularProgress />
                </div>
              ) : (
                generatedText && (
                  <div style={{ display: "flex", marginTop: "20px" }}>
                    {generatedImage && (
                      <img
                        src={generatedImage}
                        alt="Generated visual"
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "10px",
                          marginRight: "20px",
                        }}
                      />
                    )}
                    <div>
                      <h3 style={{ margin: "0 0 10px" }}>Generated Content</h3>
                      <p style={{ margin: "0" }}>{generatedText}</p>
                    </div>
                  </div>
                )
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewSectionMenu;
