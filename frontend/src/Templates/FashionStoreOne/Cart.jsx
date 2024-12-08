import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import CustomizeWebsiteSidebar from '../../pages/CustomizeWebsite/CustomizeWebsiteSidebar';
import logo from '../../../../frontend/src/assets/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [activeMenu, setActiveMenu] = useState(null);

    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:4000/carts/getCartItems', {
                    params: { userId }
                });
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems(); // Fetch cart items on component mount
    }, []);

    const handleRemoveFromCart = async (productId) => {
        try {
            await axios.delete('http://localhost:4000/carts/remove-from-cart', {
                params: { userId, productId }, // Send parameters in query
            });
    
            // Remove from the local state after successful removal
            setCartItems(cartItems.filter(item => item.productId._id !== productId));
            alert('Product removed from cart!');
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
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

    const handleCheckout = () => {
        navigate('/customize-website-screen/checkout');
    };

    return (
        <Box>
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

            <CustomizeWebsiteSidebar />

            <Box sx={{ display: "flex", flexDirection: "column", margin: "auto", ml: 7 }}>
                <Box sx={{ display: "flex", alignItems:"center", justifyContent:"center", gap: "67%"}}>
                    <Typography variant='h3' mt={2}>Your Cart</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            mt:2,
                            backgroundColor: "blue", color: "white", pt: 1, pl: 2, width: "150px", height: "42px", fontSize: "16px", fontWeight: "550", borderRadius: "70px", transition: "0.5s ease-in-out",
                            ":hover": { backgroundColor: "black", color: "white", cursor: "pointer" }
                        }}
                        onClick={handleCheckout}
                    >
                        Checkout
                    </Button>
                </Box>
                <Box sx={{ pt: 3, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
                    {cartItems.length === 0 ? (
                        <Typography variant='h6'>Your cart is empty</Typography>
                    ) : (
                        cartItems.map((item, index) => (
                            <Box key={index} sx={{
                                boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)',
                                p: 3,
                                backgroundColor: "#f8fafc",
                                height: "550px",
                                borderRadius: "20px",
                                width: "360px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "20px"
                            }}>
                                <img src={item.productId.images?.[0]} alt={item.productId.name} style={{ width: 320, height: 350, objectFit: 'cover', borderRadius:"20px" }} />
                                <Typography variant='h6' fontWeight="bold">{item.productId.name}</Typography>
                                <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            backgroundColor: "#04e762", color: "black", pt: 1, pl: 2, border: "2px solid black", width: "200px", height: "42px", fontSize: "16px", fontWeight: "550", borderRadius: "70px", transition: "0.5s ease-in-out",
                                            ":hover": { backgroundColor: "black", color: "white", cursor: "pointer" }
                                        }}
                                        onClick={() => handleRemoveFromCart(item.productId._id)}
                                    >
                                        Remove Item
                                    </Button>
                                    <Typography variant='h6' fontWeight="bold">Rs {item.productId.price}</Typography>
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Cart;
