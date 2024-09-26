import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid2, Box, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

function SavedPosts() {
    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSavedPosts = async () => {
        const yourToken = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:4000/api/posts/saved', {
                headers: {
                    Authorization: `Bearer ${yourToken}`,
                },
            });
            setSavedPosts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching saved posts:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedPosts();
    }, []);

    const shortenText = (text) => {
        const firstSentence = text.split('*').slice(0, 2).join('').trim();
        return firstSentence;
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={30} />
            </Box>
        ); 
    }

    return (
        <div>
            <Grid2 container spacing={2}>
                <Box sx={{ p: 10, margin:"auto", display: "flex", alignItems: 'center', flexDirection: 'column', width: '80vw' }}>
                    <Button sx={{top:-60, backgroundColor: "#06245c", color:"white", width:"300px", fontSize:"20px", fontWeight:"550", borderRadius:"30px"}}>
                        <lord-icon
                            src="https://cdn.lordicon.com/vduvxizq.json"
                            trigger="loop"
                            state="hover-ternd-flat-2"
                            colors="primary:#ffffff"
                            style={{height:"50px", width:"50px"}}></lord-icon>
                        Your Saved Posts
                    </Button>
                    
                    <Box sx={{p:3, backgroundColor:"#cfdaec", borderTopLeftRadius:"20px", borderTopRightRadius:"20px", width:"78vw", mt:-5}}>
                        <Grid2 container spacing={6}>
                            {savedPosts.map((post) => (
                                <Grid2 item xs={12} sm={4} key={post._id}>
                                    <Box sx={{ p: 2.1, display: "flex", flexDirection: "column", alignItems: 'center', gap: "20px", backgroundColor: "#06245c", borderRadius: "25px", mt: 1, width: "100%", height: "550px" }}>
                                        <img src={post.imageUrl} height="350px" width="315px" style={{ borderRadius: "20px" }} />
                                        <Box sx={{ width: "290px" }}>
                                            <Typography variant="h6" sx={{ textAlign: "justify", fontSize: "13px", color: "white", fontWeight: "550"}}> {shortenText(post.text)} </Typography>
                                            <Typography variant="h6" sx={{ mt: 2, textAlign: "justify", color: "#9cf6f6" }}>{post.hashtags}</Typography>
                                        </Box>
                                        <Box>

                                            <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
                                                <Box sx={{ mt: -1, display: "flex", alignItems: "center", border: "2px solid white", borderRadius: "30px", height: "40px", width: "150px" }}>
                                                    <Typography variant="h6" sx={{ color: "white", pl: 2.5, pr: 2.5, width: "130px", fontWeight: "bold", mr: -2 }} >Saved Image</Typography>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/prjooket.json"
                                                        trigger="in"
                                                        state="morph-marked-bookmark"
                                                        colors="primary:#ffffff"
                                                        style={{ width: "20px", height: "20px" }}
                                                    ></lord-icon>
                                                </Box>
                                                <Box sx={{ mt: -1, display: "flex", alignItems: "center", border: "2px solid white", borderRadius: "30px", height: "40px", width: "100px" }}>
                                                    <Typography variant="h6" sx={{ color: "white", pl: 2.5, pr: 2.5, fontWeight: "bold", mr: -2 }} >Delete</Typography>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                        trigger="click"
                                                        state="morph-trash-full-to-empty"
                                                        colors="primary:#ffffff"
                                                        style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                                    ></lord-icon>
                                                </Box>
                                            </Box>

                                        </Box>
                                    </Box>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Box>
                </Box>
            </Grid2>
        </div>
    );
}

export default SavedPosts;
