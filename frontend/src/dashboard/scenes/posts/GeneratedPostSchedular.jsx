import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid2, Box, Typography, Button, FormControl, Select, MenuItem, InputLabel, Checkbox, ListItemText, OutlinedInput, Card, CardMedia, Grid, CircularProgress } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const platforms = ["Instagram", "Facebook"];

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
      ...theme.applyStyles('dark', {
        backgroundColor: '#308fe8',
      }),
    },
}));

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

    const [currentEvents, setCurrentEvents] = useState([]);

    const [selectedPostUrl, setSelectedPostUrl] = useState('');

    const [instagramAccessToken, setInstagramAccessToken] = useState(null);
    const [instagramAccountId, setInstagramAccountId] = useState(null);


    // Load Facebook SDK
    useEffect(() => {

        console.log("SDK Loading.....")

        const loadFacebookSDK = () => {
            if (window.FB) {
                // SDK is already loaded
                setSdkLoaded(true);
                return;
            }

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
                if (d.getElementById(id)){
                    setSdkLoaded(true); // If the script is already loaded, mark as loaded
                    return;
                }
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
            setSdkLoaded(false);
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

                        window.FB.api(
                            `/${page.id}?fields=instagram_business_account`,
                            'GET',
                            { access_token: page.access_token },
                            function (igResponse) {
                                if (igResponse.instagram_business_account) {
                                    setInstagramAccountId(igResponse.instagram_business_account.id);
                                    setInstagramAccessToken(page.access_token);
                                } else {
                                    console.error('Instagram account not linked.');
                                }
                            }
                        )

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

            setSelectedPostUrl(data.secure_url);

            console.log("\nCloudinary Image URL:", data.secure_url, "\n");
            return data.secure_url; 
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            throw error;
        }
    };

    // Handle Post Now button click

    // Advertisement for a brand's sale upto 40% off on summer collection with the brand name as Outfitters
    // const handlePostNow = async () => {

    //     console.log("Posting the Image.....")

    //     if (!sdkLoaded) {
    //         console.error('Facebook SDK not yet loaded');
    //         return;
    //     }

    //     if (!facebookAccessToken) {
    //         handleFacebookLogin();
    //         return;
    //     }

    //     try {

    //         const imageUrl = selectedPost.image;

    //         if (!imageUrl) {
    //             console.error('No image URL available.');
    //             return;
    //         }

    //         console.log("Selected Post Image URL:", imageUrl);

    //         // Fetch the image and convert it to a Blob
    //         const response = await fetch(imageUrl);

    //         if (!response.ok) {
    //             throw new Error('Failed to fetch image');
    //         }

    //         const blob = await response.blob(); // Convert the response to Blob

    //         // Upload the image to Cloudinary
    //         const imageUrlFromCloudinary = await uploadToCloudinary(blob);
    //         console.log("Image URL from Cloudinary: ", imageUrlFromCloudinary);


    //         // Prepare the post message
    //         const postMessage = {
    //             message: `${postContent}\n\n${hashtags}`, // Combine post content and hashtags
    //             link: imageUrlFromCloudinary, // Use the Cloudinary image URL
    //             access_token: facebookAccessToken // Use the page access token
    //         };

    //         console.log("Post Message: ", postMessage.message, "Post link: ", postMessage.link, " ", postMessage.access_token)

    //         // Post the message to Facebook page
    //         FB.api(
    //             '/455144771007246/feed', // Replace with your Facebook Page ID
    //             'POST',
    //             postMessage,
    //             function(response) {
    //                 if (response && !response.error) {
    //                     console.log('Post successful:', response);
    //                     setSuccess(true); // Show success state
    //                 } else {
    //                     console.error('Error posting to Facebook:', response.error);
    //                     setLoading(false); // Hide loading indicator if error occurs
    //                 }
    //             }
    //         );
    //     } catch (error) {
    //         console.error('Error uploading image or posting to Facebook:', error);
    //         setLoading(false); // Hide loading indicator if error occurs
    //     }
    // };

    // Handle Post Now with Instagram support
    const handlePostNow = async () => {
        console.log("Posting the Image...");
        setLoading(true);
        setProgress(0);

        if (!sdkLoaded) {
            console.error('Facebook SDK not yet loaded');
            setLoading(false);
            return;
        }

        let accessToken = localStorage.getItem('facebookAccessToken');
        console.log("FB_AT read from L.S: ", accessToken)

        if (!accessToken) {
            handleFacebookLogin();
            setLoading(false);
            return;
        }

        // Retrieve Instagram account information from local storage
        const instagramDetails = JSON.parse(localStorage.getItem('instagramAccountDetails'));
        const instagramAccountId = instagramDetails ? instagramDetails.id : null;
        const instagramAccessToken = instagramDetails ? instagramDetails.accessToken : null;

        try {
            const imageUrl = selectedPost.image;
            if (!imageUrl) {
                console.error('No image URL available.');
                setLoading(false);
                return;
            }

            // Fetch the image and convert it to a Blob
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error('Failed to fetch image');
            const blob = await response.blob();

            // Upload the image to Cloudinary
            const imageUrlFromCloudinary = await uploadToCloudinary(blob);
            console.log("Image URL from Cloudinary: ", imageUrlFromCloudinary);

            console.log("ready...")

            console.log("The acces token is: ", accessToken)

            // Prepare post message
            const postMessage = {
                message: `${postContent}\n\n${hashtags}`,
                link: imageUrlFromCloudinary,
                access_token: accessToken,
            };

            const interval = setInterval(() => {
                setProgress((oldProgress) => {
                  if (oldProgress === 100) {
                    clearInterval(interval);
                    return oldProgress;
                  }
                  const diff = Math.random() * 10;
                  return Math.min(oldProgress + diff, 100);
                });
            }, 500);

            // Post to Facebook if selected
            if (selectedPlatforms.includes('Facebook')) {
                console.log("User wants to Post on FB")
                FB.api(
                    '/455144771007246/feed', 
                    'POST',
                    postMessage,
                    function (response) {
                        console.log("Post Message on Facebook")
                        if (response && !response.error) {
                            console.log('Post successful on Facebook:', response);
                        } else {
                            console.error('Error posting to Facebook:', response.error);
                        }
                    }
                );
            }

            // Post to Instagram if selected
            if (selectedPlatforms.includes('Instagram') && instagramAccountId) {

                console.log("insta id: ", instagramAccountId)

                console.log("User wants to Post on Insta")
                
                // Step 1: Create media on Instagram (image)
                const mediaResponse = await fetch(`https://graph.facebook.com/v16.0/${instagramAccountId}/media`, {
                    method: 'POST',
                    body: JSON.stringify({
                        image_url: imageUrlFromCloudinary,
                        caption: `${postContent}\n\n${hashtags}`,
                        access_token: instagramAccessToken,
                    }),
                    headers: { 'Content-Type': 'application/json' },

                });

                const mediaData = await mediaResponse.json();
                if (!mediaData.id) throw new Error('Error creating Instagram media');

                // Step 2: Publish the created media
                const publishResponse = await fetch(`https://graph.facebook.com/v16.0/${instagramAccountId}/media_publish`, {
                    method: 'POST',
                    body: JSON.stringify({
                        creation_id: mediaData.id,
                        access_token: instagramAccessToken,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                });

                const publishData = await publishResponse.json();
                if (!publishData.id) throw new Error('Error publishing Instagram post');
                console.log('Post successful on Instagram:', publishData);
            }

        } catch (error) {
            console.error('Error posting to Facebook or Instagram:', error);
            setLoading(false);
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
        try {

            // Check if scheduleDate is selected
            if (!scheduleDate) {
                throw new Error('Please select a date and time for scheduling.');
            }

            console.log("Scheduled date and time:", scheduleDate.format());
    
            const imageUrl = selectedPost.image;
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const imageUrlFromCloudinary = await uploadToCloudinary(blob);
    
            const scheduledPost = {
                imageUrl: imageUrlFromCloudinary,
                text: postContent,
                hashtags: hashtags.split(','),
                scheduledTime: scheduleDate.toISOString(), // formatted date and time
            };
    
            // Save scheduled post in DB
            const saveResponse = await fetch('http://localhost:4000/api/scheduled-posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scheduledPost),
            });
    
            if (!saveResponse.ok) {
                throw new Error('Failed to save scheduled post');
            }

            // Schedule post on server then post to FB
            const schedulePostResponse = await fetch('http://localhost:4000/api/schedule-facebook-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accessToken: facebookAccessToken,
                    pageId: '455144771007246',
                    message: postContent,
                    imageUrl: imageUrlFromCloudinary,
                    scheduledTime: scheduleDate.toISOString(), // Send scheduled date & time to backend
                }),
            });

            console.log({
                accessToken: facebookAccessToken,
                pageId: '455144771007246',
                message: postContent,
                imageUrl: imageUrlFromCloudinary,
                scheduledTime: scheduleDate.toISOString(),
            });
            

            if (!schedulePostResponse.ok) {
                const errorData = await schedulePostResponse.json();
                console.error('Failed to schedule Facebook post:', errorData);
                throw new Error(errorData.message);
            }
    
            console.log("Post scheduled successfully \:~)");
            navigate('/dashboard/calendar'); 

        } catch (error) {
            console.error('Error scheduling post:', error);
            alert(`Error scheduling post: ${error.message}`);
        }
    };           

    if (!selectedPost) {
        return <Typography variant="h5" align="center">No post selected! Please select a post to edit.</Typography>;
    }

    return (
        
        <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto', display: "flex", flexDirection: "column", alignItems: "center" }}>

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
                            disabled
                            style={{
                                fontSize: "16px",
                                padding: "10px",
                                border: "1px solid black",
                                textAlign: "justify",
                                marginLeft: "68px",
                                width: "570px",
                                height: "300px",
                                cursor: "not-allowed", 
                                pointerEvents: "none", 
                            }}
                        />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        {loading && <BorderLinearProgress variant="determinate" value={progress} />}
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
                        <Button sx={{mt:1, backgroundColor: "#25a244", color:"white", width:"180px", fontSize:"14px", fontWeight:"550", borderRadius:"30px", transition:"0.5s ease-in-out",
                            ":hover":{
                                backgroundColor: "black",
                                color:"white"
                            }
                        }} onClick={handleScheduleClick} >Schedule Post
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
                        }} onClick={handlePostNow} >Post Now
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

            {/* Date and Time Picker Modals */}
            {openSchedule && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                        sx={{
                            mt:-10
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '10px',
                                maxWidth: '400px',
                                width: '100%',
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
        </Box>

    );
};

export default GeneratedPostScheduler;