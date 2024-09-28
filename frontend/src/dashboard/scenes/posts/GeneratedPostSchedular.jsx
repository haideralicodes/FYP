// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Box, Typography, Button, FormControl, Select, MenuItem, InputLabel, Checkbox, ListItemText, OutlinedInput, Card, CardMedia, Grid, CircularProgress } from "@mui/material";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// const platforms = ["Instagram", "Facebook", "LinkedIn", "Twitter"];

// const GeneratedPostScheduler = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { selectedPost } = location.state || {};

//     const [selectedPlatforms, setSelectedPlatforms] = useState([]);
//     const [postContent, setPostContent] = useState(selectedPost?.content || '');
//     const [hashtags, setHashtags] = useState(selectedPost?.hashtags || '');
    
//     const [facebookAccessToken, setFacebookAccessToken] = useState(null);
//     const [sdkLoaded, setSdkLoaded] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [success, setSuccess] = useState(false);
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         const loadFacebookSDK = () => {
//             window.fbAsyncInit = function () {
//                 window.FB.init({
//                     appId: '1288915622474778',
//                     cookie: true,
//                     xfbml: true,
//                     version: 'v16.0',
//                 });
    
//                 window.FB.getLoginStatus(response => {
//                     if (response.status === 'connected') {
//                         setFacebookAccessToken(response.authResponse.accessToken);
//                     }
//                 });
    
//                 setSdkLoaded(true); // This ensures SDK is marked as loaded
//             };
    
//             (function (d, s, id) {
//                 let js,
//                     fjs = d.getElementsByTagName(s)[0];
//                 if (d.getElementById(id)) return;
//                 js = d.createElement(s);
//                 js.id = id;
//                 js.src = 'https://connect.facebook.net/en_US/sdk.js';
//                 fjs.parentNode.insertBefore(js, fjs);
//             })(document, 'script', 'facebook-jssdk');
//         };
    
//         loadFacebookSDK();
    
//         return () => {
//             const fbScript = document.getElementById('facebook-jssdk');
//             if (fbScript) fbScript.remove();
//         };
//     }, []);
    

//     useEffect(() => {
//         const checkTokenValidity = async () => {
//             if (facebookAccessToken) {
//                 try {
//                     const response = await fetch(`https://graph.facebook.com/debug_token?input_token=${facebookAccessToken}&access_token=${facebookAccessToken}`);
//                     const data = await response.json();
//                     if (!data.data.is_valid) {
//                         setFacebookAccessToken(null);
//                         handleFacebookLogin();
//                     }
//                 } catch (error) {
//                     console.error('Error validating token:', error);
//                 }
//             }
//         };

//         checkTokenValidity();
//     }, [facebookAccessToken]);

//     const handlePlatformChange = (event) => {
//         const { target: { value } } = event;
//         setSelectedPlatforms(typeof value === 'string' ? value.split(',') : value);
//     };

//     const handleConnectProfile = () => {
//         navigate('/dashboard/LinkSocialAccounts');
//     };

//     const handleFacebookLogin = () => {
//         if (!sdkLoaded) {
//             console.error('Facebook SDK is not loaded yet.');
//             return;
//         }
    
//         window.FB.login(response => {
//             if (response.status === 'connected') {
//                 // Fetch the page access token
//                 window.FB.api('/me/accounts', function(pageResponse) {
//                     const page = pageResponse.data.find(p => p.id === '455144771007246');
//                     if (page) {
//                         setFacebookAccessToken(page.access_token);
//                         console.log("Page access token:", page.access_token);
//                     }
//                 });
//             }
//         }, { scope: 'pages_manage_posts, pages_read_engagement' });
//     };
      

//     const uploadToCloudinary = async (file) => {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'BBuddyPreset');
//         formData.append('cloud_name', 'dlzjpoblh');
        
//         try {
//             const response = await fetch('https://api.cloudinary.com/v1_1/dlzjpoblh/image/upload', {
//                 method: 'POST',
//                 body: formData,
//             });
//             const data = await response.json();
//             return data.secure_url; 
//         } catch (error) {
//             console.error('Error uploading to Cloudinary:', error);
//             throw error;
//         }
//     };
  
//     const handlePostNow = async () => {
//         console.log("hello")
//         console.log(facebookAccessToken)

//         if (!sdkLoaded) {
//             console.error('Facebook SDK not yet loaded');
//             return;
//         }

//         if (!facebookAccessToken) {
//             handleFacebookLogin();
//             return;
//         }
    
//         try {
//             const response = await fetch(selectedPost.image); // Fetch the image from the selectedPost
//             const blob = await response.blob(); // Convert the image to blob
        
//             // Upload the image to Cloudinary
//             const imageUrl = await uploadToCloudinary(blob);
//             console.log("Image URL from Cloudinary: ", imageUrl);
        
//             // Prepare the post message
//             const postMessage = {
//                 message: `${postContent}\n\n${hashtags}`, // Combine post content and hashtags
//                 link: imageUrl, // Use the Cloudinary image URL as the link to be posted
//                 access_token: facebookAccessToken // Use the page access token
//             };
        
//             // Post the message to the Facebook page
//             FB.api(
//                 '/455144771007246/feed', // Replace with your Facebook Page ID
//                 'POST',
//                 postMessage,
//                 function(response) {
//                     if (response && !response.error) {
//                         console.log('Post successful:', response);
//                         setSuccess(true); // Show success state
//                     } else {
//                         console.error('Error posting to Facebook:', response.error);
//                         setLoading(false); // Hide loading indicator if there was an error
//                     }
//                 }
//             );
//         } catch (error) {
//             console.error('Error uploading image or posting to Facebook:', error);
//             setLoading(false); // Hide loading indicator if there was an error
//         }
//     };
                  

//     if (!selectedPost) {
//         return <Typography variant="h5" align="center">No post selected! Please select a post to edit.</Typography>;
//     }

//     return (
//         <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto', display: "flex", flexDirection: "column", alignItems: "center" }}>
//             <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: '20px' }}>
//                 <Box display="flex" alignItems="center">
//                     <Typography onClick={handleConnectProfile} variant="body1" underline="hover" sx={{ fontSize: '18px', cursor: 'pointer' }}>
//                         Connect profiles
//                     </Typography>
//                     <ArrowForwardIosIcon fontSize="small" sx={{ marginLeft: '5px' }} />
//                 </Box>
//             </Grid>

//             <Typography variant="h4" mb={4} sx={{ fontSize: '30px' }}>Edit Post</Typography>

//             <FormControl fullWidth sx={{ width: '570px', marginBottom: '20px' }}>
//                 <InputLabel>Select Social Profiles</InputLabel>
//                 <Select
//                     multiple
//                     value={selectedPlatforms}
//                     onChange={handlePlatformChange}
//                     input={<OutlinedInput label="Select Social Profiles" />}
//                     renderValue={(selected) => selected.join(', ')}
//                     sx={{ fontSize: '18px' }}
//                 >
//                     {platforms.map((platform) => (
//                         <MenuItem key={platform} value={platform}>
//                             <Checkbox checked={selectedPlatforms.indexOf(platform) > -1} />
//                             <ListItemText primary={platform} sx={{ fontSize: '18px' }} />
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>

//             <Grid item xs={12} md={6}>
//                 <Card elevation={3} style={{ height: "auto", width: "400px" }}>
//                     <Box p={2}>
//                         <Typography variant="body1" sx={{ fontSize: '18px' }}>
//                             {postContent}
//                         </Typography>
//                         <Typography variant="caption" sx={{ fontSize: '16px', color: "blue" }}>
//                             {selectedPost.hashtags}
//                         </Typography>
//                     </Box>
//                     <CardMedia
//                         component="img"
//                         height="400"
//                         image={selectedPost.image}
//                         alt="Selected Post Preview"
//                     />
//                 </Card>
//             </Grid>

//             {loading && (
//                 <Box
//                     sx={{
//                         width: '500px',
//                         height: '500px',
//                         border: '2px solid blue',
//                         borderRadius: '8px',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         animation: 'popOut 0.5s ease-in-out',
//                         mt: 4,
//                     }}
//                 >
//                     <CircularProgress variant="determinate" value={progress} />
//                 </Box>
//             )}

//             {success && (
//                 <Box
//                     sx={{
//                         width: '500px',
//                         height: '500px',
//                         border: '2px solid blue',
//                         borderRadius: '8px',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         animation: 'fadeIn 0.5s ease-in-out',
//                         mt: 4,
//                     }}
//                 >
//                     <CheckCircleIcon color="success" sx={{ fontSize: 100 }} />
//                 </Box>
//             )}

//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handlePostNow}
//                 sx={{ marginTop: '20px' }}
//             >
//                 Post Now
//             </Button>
//         </Box>
//     );
// };

// export default GeneratedPostScheduler;



















































































import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid2, Box, Typography, Button, FormControl, Select, MenuItem, InputLabel, Checkbox, ListItemText, OutlinedInput, Card, CardMedia, Grid, CircularProgress } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const platforms = ["Facebook", "Instagram"];

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

    const [scheduleDate, setScheduleDate] = useState(dayjs());
    const [openSchedule, setOpenSchedule] = useState(false);

    // Load Facebook SDK
    useEffect(() => {
        const loadFacebookSDK = () => {
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: '1288915622474778', // Your App ID
                    cookie: true,
                    xfbml: true,
                    version: 'v16.0',
                });

                window.FB.getLoginStatus(response => {
                    if (response.status === 'connected') {
                        const token = response.authResponse.accessToken;
                        setFacebookAccessToken(response.authResponse.accessToken);
                        localStorage.setItem('facebookAccessToken', token);
                    }
                });

                setSdkLoaded(true); // Mark SDK as loaded
            };

            // Load the SDK script
            (function (d, s, id) {
                let js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk.js';
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
        };

        loadFacebookSDK();

        return () => {
            const fbScript = document.getElementById('facebook-jssdk');
            if (fbScript) fbScript.remove();
        };
    }, []);

    // Check if the access token is valid
    useEffect(() => {
        const checkTokenValidity = async () => {
            if (facebookAccessToken) {
                try {
                    const response = await fetch(`https://graph.facebook.com/debug_token?input_token=${facebookAccessToken}&access_token=${facebookAccessToken}`);
                    const data = await response.json();
                    if (!data.data.is_valid) {
                        setFacebookAccessToken(null);
                        localStorage.removeItem('facebookAccessToken'); // Remove from localStorage if invalid
                        handleFacebookLogin(); // Re-login if token is invalid
                    }
                } catch (error) {
                    console.error('Error validating token:', error);
                }
            }
        };

        checkTokenValidity();
    }, [facebookAccessToken]);

    // Handle platform selection
    const handlePlatformChange = (event) => {
        const { target: { value } } = event;
        setSelectedPlatforms(typeof value === 'string' ? value.split(',') : value);
    };

    // Handle navigation to connect social profiles
    const handleConnectProfile = () => {
        navigate('/dashboard/LinkSocialAccounts');
    };

    // Handle Facebook login
    const handleFacebookLogin = () => {
        if (!sdkLoaded) {
            console.error('Facebook SDK is not loaded yet.');
            return;
        }

        window.FB.login(response => {
            if (response.status === 'connected') {
                window.FB.api('/me/accounts', function(pageResponse) {
                    const page = pageResponse.data.find(p => p.id === '455144771007246'); // Replace with your Page ID
                    if (page) {
                        setFacebookAccessToken(page.access_token);
                        localStorage.setItem('facebookAccessToken', page.access_token); // Save to localStorage
                        console.log("Page access token:", page.access_token);
                    }
                });
            }
        }, { scope: 'pages_manage_posts, pages_read_engagement' });
    };

    // Upload to Cloudinary
    const uploadToCloudinary = async (file) => {

        console.log("inside cloudinary")

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
            console.log("\nCloudinary Image URL:", data.secure_url, "\n");
            return data.secure_url; 
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            throw error;
        }
    };

    // Handle Post Now button click

    // Advertisement for a brand's sale upto 40% off on summer collection with the brand name as Outfitters
    const handlePostNow = async () => {

        console.log("Posting the Image.....")

        if (!sdkLoaded) {
            console.error('Facebook SDK not yet loaded');
            return;
        }

        if (!facebookAccessToken) {
            handleFacebookLogin();
            return;
        }

        try {

            const imageUrl = selectedPost.image;

            if (!imageUrl) {
                console.error('No image URL available.');
                return;
            }

            console.log("Selected Post Image URL:", imageUrl);

            // Fetch the image and convert it to a Blob
            const response = await fetch(imageUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }

            const blob = await response.blob(); // Convert the response to Blob

            // Upload the image to Cloudinary
            const imageUrlFromCloudinary = await uploadToCloudinary(blob);
            console.log("Image URL from Cloudinary: ", imageUrlFromCloudinary);


            // Prepare the post message
            const postMessage = {
                message: `${postContent}\n\n${hashtags}`, // Combine post content and hashtags
                link: imageUrlFromCloudinary, // Use the Cloudinary image URL
                access_token: facebookAccessToken // Use the page access token
            };

            console.log("Post Message: ", postMessage.message, "Post link: ", postMessage.link, " ", postMessage.access_token)

            // Post the message to Facebook page
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
                        setLoading(false); // Hide loading indicator if error occurs
                    }
                }
            );
        } catch (error) {
            console.error('Error uploading image or posting to Facebook:', error);
            setLoading(false); // Hide loading indicator if error occurs
        }
    };

    const handleTextareaChange = (e) => {
        const value = e.target.value;
        const parts = value.split(/\s/); // Split by whitespace
        const newContent = parts.slice(0, -1).join(' '); // All but the last part
        const newHashtags = parts.slice(-1); // Last part as hashtags

        setPostContent(newContent);
        setHashtags(newHashtags.join(' '));

        // Call onUpdatePost to update the selected post
        onUpdatePost({
            ...selectedPost,
            content: newContent,
            hashtags: newHashtags, 
        });
    };
    

    const handleScheduleClick = () => {
        setOpenSchedule(true);
    };

    const handleSchedulePost = async () => {
        setLoading(true);
        try {
            console.log("Scheduled date and time:", scheduleDate.format());

            // Assuming you have an image file to upload. Replace with your actual image handling logic.
            const file = selectedPost.image; // This should be a File object
            console.log("File here is: ", file)

            const imageUrl = await uploadToCloudinary(file);
            await postToFacebook(imageUrl, postContent, hashtags);

            console.log("postContent: ", postContent)
            console.log("hashtags: ", hashtags)
            console.log("imgUrl: ", selectedPost.image)

            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.error('Error scheduling post:', error);
            setLoading(false);
        }
    };

    if (!selectedPost) {
        return <Typography variant="h5" align="center">No post selected! Please select a post to edit.</Typography>;
    }

    return (
        // <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto', display: "flex", flexDirection: "column", alignItems: "center" }}>
        //     <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: '20px' }}>
        //         <Box display="flex" alignItems="center">
        //             <Typography onClick={handleConnectProfile} variant="body1" underline="hover" sx={{ fontSize: '18px', cursor: 'pointer' }}>
        //                 Connect profiles
        //             </Typography>
        //             <ArrowForwardIosIcon fontSize="small" sx={{ marginLeft: '5px' }} />
        //         </Box>
        //     </Grid>

        //     <Typography variant="h4" mb={4} sx={{ fontSize: '30px' }}>Edit Post</Typography>

        //     <FormControl fullWidth sx={{ width: '570px', marginBottom: '20px' }}>
        //         <InputLabel>Select Social Profiles</InputLabel>
        //         <Select
        //             multiple
        //             value={selectedPlatforms}
        //             onChange={handlePlatformChange}
        //             input={<OutlinedInput label="Select Social Profiles" />}
        //             renderValue={(selected) => selected.join(', ')}
        //             sx={{ fontSize: '18px' }}
        //         >
        //             {platforms.map((platform) => (
        //                 <MenuItem key={platform} value={platform}>
        //                     <Checkbox checked={selectedPlatforms.indexOf(platform) > -1} />
        //                     <ListItemText primary={platform} sx={{ fontSize: '18px' }} />
        //                 </MenuItem>
        //             ))}
        //         </Select>
        //     </FormControl>

        //     <Grid item xs={12} md={6}>
        //         <Card elevation={3} style={{ height: "auto", width: "400px" }}>
        //             <Box p={2}>
        //                 <Typography variant="body1" sx={{ fontSize: '18px' }}>
        //                     {postContent}
        //                 </Typography>
        //                 <Typography variant="caption" sx={{ fontSize: '16px', color: "blue" }}>
        //                     {selectedPost.hashtags}
        //                 </Typography>
        //             </Box>
        //             <CardMedia
        //                 component="img"
        //                 height="400"
        //                 image={selectedPost.image}
        //                 alt="Selected Post"
        //             />
        //         </Card>
        //     </Grid>

        //     <Box display="flex" justifyContent="center" alignItems="center" height={300} width={300} border="3px solid blue" marginTop="40px">
        //         {loading ? (
        //             <CircularProgress />
        //         ) : success ? (
        //             <CheckCircleIcon style={{ fontSize: "100px", color: "green" }} />
        //         ) : (
        //             <Button onClick={handlePostNow} variant="contained" sx={{ backgroundColor: '#3498db', fontSize: '18px', padding: '10px 20px' }}>
        //                 Post Now
        //             </Button>
        //         )}
        //     </Box>
        // </Box>

        <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto', display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: '20px' }}>
                <Box display="flex" alignItems="center">
                    <Typography onClick={handleConnectProfile} variant="body1" underline="hover" sx={{ fontSize: '18px', cursor: 'pointer' }}>
                        Connect profiles
                    </Typography>
                    <ArrowForwardIosIcon fontSize="small" sx={{ marginLeft: '5px' }} />
                </Box>
            </Grid> */}

            {/* <Typography variant="h4" sx={{ width:"70vw", border:"2px solid red", fontSize: '30px', textAlign:"left" }}>Edit Post</Typography> */}
            <Grid2 item xs={12} sx={{display: "flex", alignItems: "center", width:"75vw"}}>
                <lord-icon
                  src="https://cdn.lordicon.com/yxyampao.json"
                  trigger="in"
                  colors="primary:#8B79D9"
                  style={{height:"80px", width:"80px"}}>
                </lord-icon>
                <Typography variant="h1" sx={{ fontSize: "35px", fontWeight: "550", ml: 3 }}>Upload Your Post</Typography>
            </Grid2>

            <Grid2 sx={{display:"flex", alignItems:"center", gap:"100px"}}>
                <Grid2 item xs={12} sx={{display:"flex", alignItems:"center", flexDirection:"column", gap:"10px"}}>
                    <FormControl sx={{ mt:-14, ml:9, width: '570px', marginBottom: '20px', borderRadius:"30px" }}>
                        <InputLabel sx={{fontWeight:"550", pt:0.5, pl:1}}>Select Social Profiles</InputLabel>
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
                    <Box>
                        <textarea
                            type="text"
                            value={`${postContent} ${hashtags}`} // Concatenate content and hashtags for display
                            onChange={handleTextareaChange}
                            style={{
                                fontSize: "16px",
                                padding: "10px",
                                border: "1px solid black",
                                textAlign: "justify",
                                marginLeft: "68px",
                                width: "570px",
                                height: "300px"
                            }}
                        />
                    </Box>
                </Grid2>
                        
                <Grid item xs={12} md={6} sx={{display:"flex", alignItems:'center', flexDirection:"column"}}>
                    <Box sx={{borderRadius:"25px", backgroundColor:"#06245c", display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"center", height:"500px", width:"335px"}}>
                        <Box style={{ display:"flex", alignItems:"center", flexDirection:"column", height: "510px", width: "330px" }}>
                            <img
                                height="400px"
                                width="300px"
                                src={selectedPost.image}
                                style={{borderRadius:"20px", marginTop:"15px"}}
                            />
                            <Box sx={{textAlign:"justify", mt:2.5, mb:2.5, width:"300px"}}>
                                <Typography variant="body1" sx={{ fontSize: '18px', color:"white" }}>
                                    {postContent}
                                </Typography>
                                <Typography variant="caption" sx={{ fontSize: '16px', color: "lightblue"}}>
                                    {hashtags}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{display:"flex", alignItems:'center', gap:"20px"}}>
                        <Button sx={{mt:1, backgroundColor: "#25a244", color:"white", width:"150px", fontSize:"14px", fontWeight:"550", borderRadius:"30px", transition:"0.5s ease-in-out",
                            ":hover":{
                                backgroundColor: "black",
                                color:"white"
                            }
                        }} onClick={handleScheduleClick} >Schedule
                            <lord-icon
                                src="https://cdn.lordicon.com/abfverha.json"
                                trigger="loop"
                                delay="1000"
                                colors="primary:#ffffff"
                                style={{height:"32px", width:"40px"}}>
                            </lord-icon>
                        </Button>

                        <Button sx={{mt:1, backgroundColor: "#06245c", color:"white", width:"150px", fontSize:"14px", fontWeight:"550", borderRadius:"30px", transition:"0.5s ease-in-out",
                            ":hover":{
                                backgroundColor: "black",
                                color:"white"
                            }
                        }} onClick={handlePostNow} >Upload
                            <lord-icon
                                src="https://cdn.lordicon.com/smwmetfi.json"
                                trigger="loop"
                                delay="1000"
                                colors="primary:#ffffff"
                                style={{height:"32px", width:"40px"}}>
                            </lord-icon>
                        </Button>
                    </Box>
                </Grid>


            </Grid2>

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
                        backgroundColor:"white",
                        padding:"10px"
                    }}
                >
                    <CircularProgress variant="determinate" value={progress} />
                </Box>
            )}

            {/* Date and Time Picker Modals */}
            {openSchedule && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 9999,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '10px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                maxWidth: '400px',
                                width: '100%',
                                animation: 'scale-in 0.3s ease-in-out', // Add animation here
                                '@keyframes scale-in': {
                                    '0%': {
                                        transform: 'scale(0.8)', // Start smaller
                                        opacity: 0, // Start invisible
                                    },
                                    '100%': {
                                        transform: 'scale(1)', // End at full size
                                        opacity: 1, // End fully visible
                                    },
                                },
                            }}
                        >
                            <Typography variant="h4" sx={{ textAlign:"center", mb: 3, fontWeight:"550" }}>
                                Pick date and time
                            </Typography>

                            <Box sx={{display:'flex', flexDirection:"column", gap:"20px", justifyContent:"center", alignItems:'center'}}>
                            
                                <DatePicker
                                    value={scheduleDate}
                                    onChange={(newValue) => setScheduleDate(newValue)}
                                    renderInput={(params) => <OutlinedInput fullWidth {...params} />}
                                    sx={{ mb: 2 }}
                                />

                                <Typography variant="h4" sx={{ textAlign:"center", color:"black" }}>
                                ───────Time───────
                                </Typography>

                                <TimePicker
                                    value={scheduleDate}
                                    onChange={(newValue) => setScheduleDate(newValue)}
                                    renderInput={(params) => <OutlinedInput fullWidth {...params} />}
                                    sx={{ mb: 2 }}
                                />
                            
                                <Box sx={{display:"flex", alignItems:'center', gap:"15px"}}>

                                    <Button
                                        onClick={() => setOpenSchedule(false)}
                                        sx={{
                                            fontSize: '14px',
                                            color: 'black',
                                            textAlign: 'center',
                                            borderRadius: "30px",
                                            fontSize:"15px",
                                            height:"35px",
                                            width:"130px",
                                            border:"2px solid black",
                                            transition: "0.5s ease-in-out",
                                            ":hover": {
                                                backgroundColor: "black",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        sx={{
                                            backgroundColor: "#25a244",
                                            color: "white",
                                            fontWeight: "550",
                                            borderRadius: "30px",
                                            fontSize:"15px",
                                            height:"35px",
                                            width:"130px",
                                            transition: "0.5s ease-in-out",
                                            ":hover": {
                                                backgroundColor: "black",
                                                color: "white",
                                            },
                                        }}
                                        fullWidth
                                        onClick={handleSchedulePost}
                                    >
                                        Done
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </LocalizationProvider>
            )}


            
            {/* <Button
                variant="contained"
                color="primary"
                onClick={handlePostNow}
                sx={{ marginTop: '20px' }}
            >
                Post Now
            </Button> */}
        </Box>

    );
};

export default GeneratedPostScheduler;
