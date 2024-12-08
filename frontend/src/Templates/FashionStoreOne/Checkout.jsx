import React, { useState, useEffect } from 'react'
import logo from '../../../../../Business Buddy/frontend/src/assets/logo.png';
import Navbar from './Navbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CustomizeWebsiteSidebar from '../../pages/CustomizeWebsite/CustomizeWebsiteSidebar';

function Checkout() {

    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState(null);

    const handleClick = () => {
        navigate('../dashboard');
    };

    const handleSave = () => {
        navigate('../dashboard');
    };

    const handleOnClick = () => {
        navigate('../Payment');
    };

    const handleCheckout = () => {
        alert("hello")
        navigate('/customize-website-screen/checkout');
    };

  return (
    <>
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
                    <button
                        style={{ border: "1px solid blue", backgroundColor: "white", color: "blue" }}
                        onClick={handleSave}
                    >
                        Save Design
                    </button>
                    <button onClick={handleOnClick}>Publish</button>
                </div>
            </div>
        </section>
        </div>

        <div style={{ marginLeft: "60px" }}>
            <Navbar />
        </div>

        <Box>
            <Typography variant='h3' mt={5} ml={20} fontWeight={600} fontSize={40}>Shopping Cart.</Typography>
        </Box>

        <CustomizeWebsiteSidebar />

    </>
  )
}

export default Checkout