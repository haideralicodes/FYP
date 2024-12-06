import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import product1 from './assets/product1.webp';
import product2 from './assets/product2.webp';
import product3 from './assets/product3.webp';
import product4 from './assets/product4.webp';
import product5 from './assets/product5.webp';
import Navbar from './Navbar';
import CustomizeWebsiteSidebar from '../../pages/CustomizeWebsite/CustomizeWebsiteSidebar';

function Products() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const addToCart = (product) => {
        const updatedCartItems = [...cartItems, product];
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        alert(`${product.name} added to cart!`);
    };

    const products = [
        { name: 'Product1 Name', price: 2000, image: product1 },
        { name: 'Product2 Name', price: 3000, image: product2 },
        { name: 'Product3 Name', price: 3000, image: product3 },
        { name: 'Product4 Name', price: 3000, image: product4 },
    ];

    return (
        <Box>
            <Navbar />
            <CustomizeWebsiteSidebar />
            <Box sx={{ display: "flex", flexDirection: "column", margin: "auto", ml: 7, gap: "20px" }}>
                {/* Row 1 */}
                <Box sx={{ pt: 5, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
                    {products.map((product, index) => (
                        <Box key={index} sx={{ boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)', p: 3, backgroundColor: "#f8fafc", height: "500px", borderRadius: "20px", width: "310px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                            <img src={product.image} height="350px" style={{ borderRadius: "20px" }} alt={product.name} />
                            <Typography variant='h6' fontWeight="bold">{product.name}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: "#04e762", color: "black", border: "2px solid black", width: "150px", height: "42px", fontSize: "15px", fontWeight: "550", borderRadius: "70px", transition: "0.5s ease-in-out",
                                        ":hover": { backgroundColor: "black", color: "white" }
                                    }}
                                    onClick={() => addToCart(product)} // Add onClick event
                                >
                                    Add to Cart
                                </Button>
                                <Typography variant='h6' fontWeight="bold">Rs {product.price}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Row 2 */}
                <Box sx={{ pt: 5, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
                    {products.map((product, index) => (
                        <Box key={index} sx={{ boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)', p: 3, backgroundColor: "#f8fafc", height: "500px", borderRadius: "20px", width: "310px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                            <img src={product.image} height="350px" style={{ borderRadius: "20px" }} alt={product.name} />
                            <Typography variant='h6' fontWeight="bold">{product.name}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: "#04e762", color: "black", border: "2px solid black", width: "150px", height: "42px", fontSize: "15px", fontWeight: "550", borderRadius: "70px", transition: "0.5s ease-in-out",
                                        ":hover": { backgroundColor: "black", color: "white" }
                                    }}
                                    onClick={() => addToCart(product)} // Add onClick event
                                >
                                    Add to Cart
                                </Button>
                                <Typography variant='h6' fontWeight="bold">Rs {product.price}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Row 3 */}
                <Box sx={{ pt: 5, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
                    {products.map((product, index) => (
                        <Box key={index} sx={{ boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)', p: 3, backgroundColor: "#f8fafc", height: "500px", borderRadius: "20px", width: "310px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                            <img src={product.image} height="350px" style={{ borderRadius: "20px" }} alt={product.name} />
                            <Typography variant='h6' fontWeight="bold">{product.name}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: "#04e762", color: "black", border: "2px solid black", width: "150px", height: "42px", fontSize: "15px", fontWeight: "550", borderRadius: "70px", transition: "0.5s ease-in-out",
                                        ":hover": { backgroundColor: "black", color: "white" }
                                    }}
                                    onClick={() => addToCart(product)} // Add onClick event
                                >
                                    Add to Cart
                                </Button>
                                <Typography variant='h6' fontWeight="bold">Rs {product.price}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Row 4 */}
                <Box sx={{ pt: 5, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
                    {products.map((product, index) => (
                        <Box key={index} sx={{ boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)', p: 3, backgroundColor: "#f8fafc", height: "500px", borderRadius: "20px", width: "310px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                            <img src={product.image} height="350px" style={{ borderRadius: "20px" }} alt={product.name} />
                            <Typography variant='h6' fontWeight="bold">{product.name}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: "#04e762", color: "black", border: "2px solid black", width: "150px", height: "42px", fontSize: "15px", fontWeight: "550", borderRadius: "70px", transition: "0.5s ease-in-out",
                                        ":hover": { backgroundColor: "black", color: "white" }
                                    }}
                                    onClick={() => addToCart(product)} // Add onClick event
                                >
                                    Add to Cart
                                </Button>
                                <Typography variant='h6' fontWeight="bold">Rs {product.price}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Row 5 */}
                <Box sx={{ pt: 5, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
                    {products.map((product, index) => (
                        <Box key={index} sx={{ boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)', p: 3, backgroundColor: "#f8fafc", height: "500px", borderRadius: "20px", width: "310px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                            <img src={product.image} height="350px" style={{ borderRadius: "20px" }} alt={product.name} />
                            <Typography variant='h6' fontWeight="bold">{product.name}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: "#04e762", color: "black", border: "2px solid black", width: "150px", height: "42px", fontSize: "15px", fontWeight: "550", borderRadius: "70px", transition: "0.5s ease-in-out",
                                        ":hover": { backgroundColor: "black", color: "white" }
                                    }}
                                    onClick={() => addToCart(product)} // Add onClick event
                                >
                                    Add to Cart
                                </Button>
                                <Typography variant='h6' fontWeight="bold">Rs {product.price}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Row 6 */}
                <Box sx={{ pt: 5, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
                    {products.map((product, index) => (
                        <Box key={index} sx={{ boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)', p: 3, backgroundColor: "#f8fafc", height: "500px", borderRadius: "20px", width: "310px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                            <img src={product.image} height="350px" style={{ borderRadius: "20px" }} alt={product.name} />
                            <Typography variant='h6' fontWeight="bold">{product.name}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: "#04e762", color: "black", border: "2px solid black", width: "150px", height: "42px", fontSize: "15px", fontWeight: "550", borderRadius: "70px", transition: "0.5s ease-in-out",
                                        ":hover": { backgroundColor: "black", color: "white" }
                                    }}
                                    onClick={() => addToCart(product)} // Add onClick event
                                >
                                    Add to Cart
                                </Button>
                                <Typography variant='h6' fontWeight="bold">Rs {product.price}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Row 7 */}
                <Box sx={{ pt: 5, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
                    {products.map((product, index) => (
                        <Box key={index} sx={{ boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)', p: 3, backgroundColor: "#f8fafc", height: "500px", borderRadius: "20px", width: "310px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                            <img src={product.image} height="350px" style={{ borderRadius: "20px" }} alt={product.name} />
                            <Typography variant='h6' fontWeight="bold">{product.name}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: "#04e762", color: "black", border: "2px solid black", width: "150px", height: "42px", fontSize: "15px", fontWeight: "550", borderRadius: "70px", transition: "0.5s ease-in-out",
                                        ":hover": { backgroundColor: "black", color: "white" }
                                    }}
                                    onClick={() => addToCart(product)} // Add onClick event
                                >
                                    Add to Cart
                                </Button>
                                <Typography variant='h6' fontWeight="bold">Rs {product.price}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Row 8 */}
                <Box sx={{ pt: 5, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
                    {products.map((product, index) => (
                        <Box key={index} sx={{ boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)', p: 3, backgroundColor: "#f8fafc", height: "500px", borderRadius: "20px", width: "310px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                            <img src={product.image} height="350px" style={{ borderRadius: "20px" }} alt={product.name} />
                            <Typography variant='h6' fontWeight="bold">{product.name}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: "#04e762", color: "black", border: "2px solid black", width: "150px", height: "42px", fontSize: "15px", fontWeight: "550", borderRadius: "70px", transition: "0.5s ease-in-out",
                                        ":hover": { backgroundColor: "black", color: "white" }
                                    }}
                                    onClick={() => addToCart(product)} // Add onClick event
                                >
                                    Add to Cart
                                </Button>
                                <Typography variant='h6' fontWeight="bold">Rs {product.price}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

            </Box>
        </Box>
    );
}

export default Products;