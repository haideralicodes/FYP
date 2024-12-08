// import React, { useState, useEffect } from 'react';
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import List from '@mui/material/List';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
// import ListItemText from '@mui/material/ListItemText';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import product1 from './assets/product1.webp';
// import product2 from './assets/product2.webp';
// import product3 from './assets/product3.webp';
// import product4 from './assets/product4.webp';
// import product5 from './assets/product5.webp';
// import Navbar from './Navbar';
// import CustomizeWebsiteSidebar from '../../pages/CustomizeWebsite/CustomizeWebsiteSidebar';
// import logo from '../../../../frontend/src/assets/logo.png';
// import '../../pages/CustomizeWebsite/CustomizeWebsiteScreen.css';

// function Products() {
//     const [cartItems, setCartItems] = useState([]);
//     const [activeMenu, setActiveMenu] = useState(null);

//     useEffect(() => {
//         const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//         setCartItems(storedCartItems);
//     }, []);

//     const addToCart = (product) => {
//         const updatedCartItems = [...cartItems, product];
//         setCartItems(updatedCartItems);
//         localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
//         alert(`${product.name} added to cart!`);
//     };

//     const products = [
//         { name: 'Product1 Name', price: 2000, image: product1 },
//         { name: 'Product2 Name', price: 3000, image: product2 },
//         { name: 'Product3 Name', price: 3000, image: product3 },
//     ];

//     const handleClick = () => {
//         navigate('../dashboard');
//     };

//     const handleSave = () => {
//         navigate('../dashboard');
//     };
    
//     const handleOnClick = () => {
//         navigate('../Payment');
//     };

//     return (
//         <Box>
            
//             <div
//                 style={{
//                     width: activeMenu ? '60%' : 'calc(100vw - 60px)',
//                     marginLeft: activeMenu ? '0' : '60px',
//                 }}
//             >
//                 <section className="preview">
//                   <div className="previewRectangle">
//                     <div className="previewbar">
//                       <img
//                         src={logo}
//                         alt="Logo"
//                         style={{ cursor: 'pointer' }}
//                         onClick={handleClick}
//                       />
//                     </div>
//                     <div className="mybtns">
//                       <button style={{border:"1px solid blue", backgroundColor:"white", color:"blue"}} onClick={handleSave}
//                       >
//                         Save Design
//                       </button>
//                       <button onClick={handleOnClick}>Publish</button>
//                     </div>
//                   </div>
//                 </section>
        
//             </div>

//             <div style={{marginLeft:"60px"}}>
//                 <Navbar />
//             </div>
//             <CustomizeWebsiteSidebar />
//             <Box sx={{ display: "flex", flexDirection: "column", margin: "auto", ml: 7, gap: "20px" }}>
//                 <Box sx={{ pt: 5, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
//                     {products.map((product, index) => (
//                         <Box key={index} sx={{ boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)', p: 3, backgroundColor: "#f8fafc", height: "500px", borderRadius: "20px", width: "310px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
//                             <img src={product.image} height="350px" style={{ borderRadius: "20px" }} alt={product.name} />
//                             <Typography variant='h6' fontWeight="bold">{product.name}</Typography>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     sx={{
//                                         backgroundColor: "#04e762", color: "black", border: "2px solid black", width: "150px", height: "42px", fontSize: "15px", fontWeight: "550", borderRadius: "70px", transition: "0.5s ease-in-out",
//                                         ":hover": { backgroundColor: "black", color: "white" }
//                                     }}
//                                     onClick={() => addToCart(product)} 
//                                 >
//                                     Add to Cart
//                                 </Button>
//                                 <Typography variant='h6' fontWeight="bold">Rs {product.price}</Typography>
//                             </Box>
//                         </Box>
//                     ))}
//                 </Box>

//                 <br /><br />

//             </Box>
//         </Box>
//     );
// }

// export default Products;




















































import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    Stack,
    Snackbar,
    Alert,
  } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from './Navbar';
import CustomizeWebsiteSidebar from '../../pages/CustomizeWebsite/CustomizeWebsiteSidebar';
import logo from '../../../../frontend/src/assets/logo.png';
import '../../pages/CustomizeWebsite/CustomizeWebsiteScreen.css';
import axios from 'axios'; 

function Products() {
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQunatity] = useState([]);
    const [products, setProducts] = useState([]); 
    const [activeMenu, setActiveMenu] = useState(null);

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/products/getProduct'); 
                setProducts(response.data); 
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(); 
    }, []);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const addToCart = async (product) => {

        const userId = localStorage.getItem('userId');

        if(!userId){
            alert('User is not logged in!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/carts/add-to-cart', {
                userId: userId,  
                productId: product._id,
                quantity: 1,  
            });
    
            alert(`${product.name} added to cart!`);
        } catch (error) {
            console.error('Error adding to cart:', error);
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
                                style={{
                                    border: '1px solid blue',
                                    backgroundColor: 'white',
                                    color: 'blue',
                                }}
                                onClick={handleSave}
                            >
                                Save Design
                            </button>
                            <button onClick={handleOnClick}>Publish</button>
                        </div>
                    </div>
                </section>
            </div>

            <div style={{ marginLeft: '60px' }}>
                <Navbar />
            </div>
            <CustomizeWebsiteSidebar />
            
            <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'space-around', 
                gap: '5px', 
                margin: 'auto', 
                ml:8,
                pt: 5 ,
                mb:2
            }}
            >
                {products.map((product, index) => (
                    <Box
                        key={index}
                        sx={{
                            boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)',
                            p: 3,
                            backgroundColor: '#f8fafc',
                            height: '500px',
                            borderRadius: '20px',
                            width: '350px', 
                            mb:2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px',
                        }}
                    >
                        <img src={product.images?.[0]} style={{ width: 300, height: 350, objectFit: 'cover', borderRadius:"20px" }} alt={product.name} />
                        <Typography variant="h6" fontWeight="bold">
                            {product.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    backgroundColor: '#04e762',
                                    color: 'black',
                                    border: '2px solid black',
                                    width: '170px',
                                    height: '42px',
                                    fontSize: '15px',
                                    fontWeight: '550',
                                    borderRadius: '70px',
                                    transition: '0.5s ease-in-out',
                                    ':hover': { backgroundColor: 'black', color: 'white' },
                                }}
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </Button>
                            <TextField
                                sx={{ width: '30%', height:"10px", mb:6 }} 
                                label="Quantity"
                                name="price"
                                type="number"
                                value={quantity}
                                onChange={setQunatity}
                                margin="normal"
                                variant="outlined"
                                required
                            />
                            <Typography variant="h6" fontWeight="bold">
                                Rs {product.price}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>

        </Box>
    );
}

export default Products;
