import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, FormControl, Select, MenuItem, InputLabel, Checkbox, ListItemText, OutlinedInput, Card, CardMedia, Grid, CircularProgress } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const platforms = ["Instagram", "Facebook", "LinkedIn", "Twitter"];

const GeneratedPostScheduler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedPost } = location.state || {};

    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [postContent, setPostContent] = useState(selectedPost?.content || '');
    const [hashtags, setHashtags] = useState(selectedPost?.hashtags || '');
    
    const [facebookAccessToken, setFacebookAccessToken] = useState(null);
    const [sdkLoaded, setSdkLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const loadFacebookSDK = () => {
            window.fbAsyncInit = function() {
                window.FB.init({
                    appId: ' 1288915622474778',
                    cookie: true,
                    xfbml: true,
                    version: 'v16.0'
                });

                window.FB.getLoginStatus(response => {
                    if (response.status === 'connected') {
                        setFacebookAccessToken(response.authResponse.accessToken);
                    }
                });

                setSdkLoaded(true);
            };

            (function(d, s, id) {
                let js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) { return; }
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        };

        loadFacebookSDK();

        return () => {
            const fbScript = document.getElementById('facebook-jssdk');
            if (fbScript) fbScript.remove();
        };
    }, []);

    useEffect(() => {
        const checkTokenValidity = async () => {
            if (facebookAccessToken) {
                try {
                    const response = await fetch(`https://graph.facebook.com/debug_token?input_token=${facebookAccessToken}&access_token=${facebookAccessToken}`);
                    const data = await response.json();
                    if (!data.data.is_valid) {
                        setFacebookAccessToken(null);
                        handleFacebookLogin();
                    }
                } catch (error) {
                    console.error('Error validating token:', error);
                }
            }
        };

        checkTokenValidity();
    }, [facebookAccessToken]);

    const handlePlatformChange = (event) => {
        const { target: { value } } = event;
        setSelectedPlatforms(typeof value === 'string' ? value.split(',') : value);
    };

    const handleConnectProfile = () => {
        navigate('/dashboard/LinkSocialAccounts');
    };

    const handleFacebookLogin = () => {
        if (sdkLoaded) {
            window.FB.login(response => {
                if (response.status === 'connected') {
                    // Fetch the page access token
                    window.FB.api('/me/accounts', function(pageResponse) {
                        const page = pageResponse.data.find(p => p.id === '455144771007246');
                        if (page) {
                            setFacebookAccessToken(page.access_token);
                            console.log("page: ", page.access_token)
                        }
                    });
                }
            }, { scope: 'pages_manage_posts, pages_read_engagement' });
        }
    };    

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'BBuddyPreset');
        formData.append('cloud_name', 'dlzjpoblh');
        
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dlzjpoblh/image/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data.secure_url; 
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            throw error;
        }
    };
  
    const handlePostNow = async () => {
        console.log("he;;o")
        console.log(facebookAccessToken)
        if (facebookAccessToken==null) {
            handleFacebookLogin();
            return;
        }
    
        try {
            const response = await fetch(selectedPost.image); // Fetch the image from the selectedPost
            const blob = await response.blob(); // Convert the image to blob
        
            // Upload the image to Cloudinary
            const imageUrl = await uploadToCloudinary(blob);
            console.log("Image URL from Cloudinary: ", imageUrl);
        
            // Prepare the post message
            const postMessage = {
                message: `${postContent}\n\n${hashtags}`, // Combine post content and hashtags
                link: imageUrl, // Use the Cloudinary image URL as the link to be posted
                access_token: facebookAccessToken // Use the page access token
            };
        
            // Post the message to the Facebook page
            FB.api(
                '/455144771007246/feed', // Replace with your Facebook Page ID
                'POST',
                postMessage,
                function(response) {
                    if (response && !response.error) {
                        console.log('Post successful:', response);
                        setSuccess(true); // Show success state
                    } else {
                        console.error('Error posting to Facebook:', response.error);
                        setLoading(false); // Hide loading indicator if there was an error
                    }
                }
            );
        } catch (error) {
            console.error('Error uploading image or posting to Facebook:', error);
            setLoading(false); // Hide loading indicator if there was an error
        }
    };
                  

    if (!selectedPost) {
        return <Typography variant="h5" align="center">No post selected! Please select a post to edit.</Typography>;
    }

    return (
        <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto', display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: '20px' }}>
                <Box display="flex" alignItems="center">
                    <Typography onClick={handleConnectProfile} variant="body1" underline="hover" sx={{ fontSize: '18px', cursor: 'pointer' }}>
                        Connect profiles
                    </Typography>
                    <ArrowForwardIosIcon fontSize="small" sx={{ marginLeft: '5px' }} />
                </Box>
            </Grid>

            <Typography variant="h4" mb={4} sx={{ fontSize: '30px' }}>Edit Post</Typography>

            <FormControl fullWidth sx={{ width: '570px', marginBottom: '20px' }}>
                <InputLabel>Select Social Profiles</InputLabel>
                <Select
                    multiple
                    value={selectedPlatforms}
                    onChange={handlePlatformChange}
                    input={<OutlinedInput label="Select Social Profiles" />}
                    renderValue={(selected) => selected.join(', ')}
                    sx={{ fontSize: '18px' }}
                >
                    {platforms.map((platform) => (
                        <MenuItem key={platform} value={platform}>
                            <Checkbox checked={selectedPlatforms.indexOf(platform) > -1} />
                            <ListItemText primary={platform} sx={{ fontSize: '18px' }} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Grid item xs={12} md={6}>
                <Card elevation={3} style={{ height: "auto", width: "400px" }}>
                    <Box p={2}>
                        <Typography variant="body1" sx={{ fontSize: '18px' }}>
                            {postContent}
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: '16px', color: "blue" }}>
                            {selectedPost.hashtags}
                        </Typography>
                    </Box>
                    <CardMedia
                        component="img"
                        height="400"
                        image={selectedPost.image}
                        alt="Selected Post Preview"
                    />
                </Card>
            </Grid>

            {loading && (
                <Box
                    sx={{
                        width: '500px',
                        height: '500px',
                        border: '2px solid blue',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        animation: 'popOut 0.5s ease-in-out',
                        mt: 4,
                    }}
                >
                    <CircularProgress variant="determinate" value={progress} />
                </Box>
            )}

            {success && (
                <Box
                    sx={{
                        width: '500px',
                        height: '500px',
                        border: '2px solid blue',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        animation: 'fadeIn 0.5s ease-in-out',
                        mt: 4,
                    }}
                >
                    <CheckCircleIcon color="success" sx={{ fontSize: 100 }} />
                </Box>
            )}

            <Button
                variant="contained"
                color="primary"
                onClick={handlePostNow}
                sx={{ marginTop: '20px' }}
            >
                Post Now
            </Button>
        </Box>
    );
};

export default GeneratedPostScheduler;
