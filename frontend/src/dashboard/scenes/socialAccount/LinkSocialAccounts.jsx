import React, { useState, useEffect } from 'react';
import instaLogo from '../../../assets/insta.webp';
import facebookLogo from '../../../assets/facebook.webp';
import twitterLogo from '../../../assets/twitter.webp';

import Button from '@mui/material/Button';
import { Grid2 } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

import img1 from '../../../../src/assets/1.png'
import img2 from '../../../../src/assets/2.png'
import img3 from '../../../../src/assets/3.png'
import img4 from '../../../../src/assets/4.png'
import img5 from '../../../../src/assets/5.png'



function LinkSocialAccounts() {

  const navigate = useNavigate()
  
  const [facebookPageDetails, setFacebookPageDetails] = useState(() => {
    const savedDetails = localStorage.getItem('facebookPageDetails');
    return savedDetails ? JSON.parse(savedDetails) : null;
  });

  const [instagramDetails, setInstagramDetails] = useState(() => {
    const savedDetails = localStorage.getItem('instagramAccountDetails');
    return savedDetails ? JSON.parse(savedDetails) : null;
  });

  const [instagramAccessToken, setInstagramAccessToken] = useState(null);
  const [instagramAccountId, setInstagramAccountId] = useState(null);

  // Load Facebook SDK
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1288915622474778',
        cookie: true,
        xfbml: true,
        version: 'v16.0',
      });
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  // const handleFacebookAccountLink = () => {
  //   window.FB.login(

  //     function (response) {

  //       if (response.authResponse) {

  //         const { accessToken, userID } = response.authResponse;

  //         // Step 1: Save short-lived token temporarily
  //         localStorage.setItem('facebookAccessToken', accessToken);
  //         localStorage.setItem('facebookUserID', userID);
  //         console.log('Saved info to L.S FB_AT: ', accessToken, ", for ", userID);
          
  //         window.FB.api('/me/accounts', function (response) {
  //           if (response.data && response.data.length > 0) {
  //             const page = response.data[0];
  //             window.FB.api(`/${page.id}?fields=picture,name`, function (pageData) {
  //               const details = {
  //                 name: pageData.name,
  //                 imageUrl: pageData.picture.data.url,
  //               };
  //               // Save details to localStorage
  //               localStorage.setItem('facebookPageDetails', JSON.stringify(details));
  //               setFacebookPageDetails(details);
  //             });
  //           }
  //         });
  //       } else {
  //         console.log('User cancelled login or did not fully authorize.');
  //       }
  //     },
  //     { scope: 'pages_show_list' }
  //   );
  // };
  
  const handleFacebookAccountLink = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          const { accessToken, userID } = response.authResponse;
          
          // Step 1: Save short-lived token temporarily
          localStorage.setItem('facebookAccessToken', accessToken);
          localStorage.setItem('facebookUserID', userID);
          console.log('Saved short-lived token to L.S: ', accessToken, ", for ", userID);
  
          // Step 2: Exchange short-lived token for long-lived token
          fetch(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=1288915622474778&client_secret=6f1104dc8c77997376f39f8281fa1c8b&fb_exchange_token=${accessToken}`)
            .then(response => response.json())
            .then(data => {
              if (data.access_token) {
                
                // Step 3: Save long-lived token to localStorage
                const longLivedToken = data.access_token;
                localStorage.setItem('facebookAccessToken', longLivedToken);
                console.log('Exchanged for long-lived token: ', longLivedToken);
  
                // Use the long-lived token for further API calls
                window.FB.api('/me/accounts', function (response) {
                  if (response.data && response.data.length > 0) {
                    const page = response.data[0];
                    window.FB.api(`/${page.id}?fields=picture,name`, function (pageData) {
                      const details = {
                        name: pageData.name,
                        imageUrl: pageData.picture.data.url,
                      };
                      localStorage.setItem('facebookPageDetails', JSON.stringify(details));
                      setFacebookPageDetails(details);
                      handleInstagramAccountLink(page.id, longLivedToken);
                    });
                  }
                });
              }
            })
            .catch(error => {
              console.error('Error exchanging token: ', error);
            });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'pages_show_list, pages_manage_posts, pages_read_engagement' }
    );
  };

  const handleInstagramAccountLink = (pageId, longLivedToken) => {
    // Fetch Instagram account info after Facebook page details are set
    window.FB.api(
        `/${pageId}?fields=instagram_business_account`,
        'GET',
        { access_token: longLivedToken }, // Use long-lived token here
        function (igResponse) {
            if (igResponse.instagram_business_account) {
                const instagramAccountId = igResponse.instagram_business_account.id;
                
                // Fetch additional Instagram account details
                window.FB.api(
                    `/${instagramAccountId}?fields=profile_picture_url,username`,
                    'GET',
                    { access_token: longLivedToken },
                    function (accountDetailsResponse) {
                        if (accountDetailsResponse && !accountDetailsResponse.error) {
                            const instagramDetails = {
                                id: instagramAccountId,
                                accessToken: longLivedToken, // Save access token for future use
                                profileImage: accountDetailsResponse.profile_picture_url,
                                username: accountDetailsResponse.username,
                            };
                            localStorage.setItem('instagramAccountDetails', JSON.stringify(instagramDetails));
                            console.log('Instagram account details saved: ', instagramDetails);
                        } else {
                            console.error('Error fetching Instagram account details: ', accountDetailsResponse.error);
                        }
                    }
                );
            } else {
                console.error('Instagram account not linked.');
            }
        }
    );
  };

  const handleInstagramLogout = () =>{
    // Clear Instagram account details from local storage
    localStorage.removeItem('instagramAccountDetails');
    setInstagramDetails(null);
    console.log('Instagram account logged out and details cleared from local storage.');
  }

  const handleFacebookLogout = () => {
    // Check if the user is logged in before trying to log out
    window.FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        // The user is logged in and authenticated
        window.FB.logout(function (response) {
          localStorage.removeItem('facebookPageDetails');
          localStorage.removeItem('facebookAccessToken');
          localStorage.removeItem('facebookUserID');
          setFacebookPageDetails(null);
          console.log('User logged out');
        });
      } else {
        // User is not logged in, so just clear the local storage
        console.log('No active session found');
        localStorage.removeItem('facebookPageDetails');
        localStorage.removeItem('facebookAccessToken');
        localStorage.removeItem('facebookUserID');
        setFacebookPageDetails(null);
      }
    });
  };

  const handleViewPosts = ()=>{
    navigate('../ViewSavedPosts')
  }

  return (
    <>
      <Grid2 sx={{display:"flex", alignItems:"center", justifyItems:"center", ml:4}} >
        <lord-icon
          src="https://cdn.lordicon.com/yxyampao.json"
          trigger="loop"
          colors="primary:#f21b3f"
          style={{height:"70px", width:"70px"}}>
        </lord-icon>
        <Typography variant="h1" sx={{ ml: 1, fontSize: "35px", fontWeight: "550"}} >Connect Social Media Profiles</Typography>
      </Grid2>

      <Grid2 sx={{display: "flex"}}>

        <Grid2 sx={{ mb: -2.25, mt:3, display: "flex", flexDirection:"column"}}>
            {/* Facebook Link Section */}
            <Box
              sx={{
                ml:5,
                mb:4,
                width:"37vw",
                height:"35vh",
                backgroundColor: "#88D4AB",
                boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.2)',
                borderRadius:"20px"
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#88D4AB",
                  width:"100%",
                  p: 4,
                  textAlign: 'left',
                  borderRadius:"20px"
                }}
              >
                <Box sx={{ marginBottom: '10px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      width:"112%",
                      alignItems: 'center',
                      paddingTop: '15px',
                      paddingBottom: '15px',
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/vduvxizq.json"
                      trigger="in"
                      colors="primary:#14746F"
                      style={{height:"60px", width:"60px"}}>
                    </lord-icon>
                    <Typography
                        flexGrow={1}
                        variant="h3"
                        fontWeight="600"
                        color="white"
                        marginLeft="10px"
                    >
                      Link <Typography variant="h3" fontWeight="600" color="#106bff">Facebook</Typography>
                      </Typography>
                    <Button
                      variant="outlined"
                      onClick={handleFacebookAccountLink}
                      sx={{
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        color: 'white',
                        borderRadius: '30px',
                        fontSize:"14px",
                        fontWeight: 550,
                        height:"50px",
                        width:"190px",
                        backgroundColor: "#469D89",
                        border:"none",
                        boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.2)',
                        transition: "0.4s ease",
                        ':hover': {
                          backgroundColor: "#04a6c2",
                          color: "white",
                        },
                      }}
                    >
                      <FacebookOutlinedIcon/>
                      Link Facebook
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* Display Facebook Page Details */}
              {facebookPageDetails && (
                <Box
                  sx={{
                    ml:12.5,
                    display:"flex",
                    width:"500px",
                    alignItems:"center",
                    justifyContent:"space-between",
                    mt:-5,
                  }}
                >
                  <Box sx={{mt:1, display:"flex", flexDirection:"column"}}>
                    <img src={facebookPageDetails.imageUrl} style={{marginLeft:"10px", marginBottom:"2px", borderRadius: "100%", width: "60px", height: "60px"}} />
                    <Typography variant="h4" textAlign="center" fontWeight="600" color="#ffffff">{facebookPageDetails.name}</Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={handleFacebookLogout}
                    sx={{
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      color: 'white',
                      borderRadius: '30px',
                      fontSize: "13px",
                      fontWeight: "700",
                      height:"50px",
                      width:"195px",
                      backgroundColor: "#ff1744",
                      border: "none",
                      boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.2)',
                      transition: "0.4s ease",
                      ml:-30,
                      mt:6.5,
                      ':hover': {
                        backgroundColor: "#ff4d6b",
                        color: "white",
                      },
                    }}
                  >
                    <ExitToAppRoundedIcon/>
                    Logout Facebook
                  </Button>
                </Box>
              )}
            </Box>
            
            <Box
              sx={{
                ml:5,
                mb:2,
                width:"37vw",
                height:"35vh",
                backgroundColor: "#88D4AB",
                boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.2)',
                borderRadius:"20px"
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#88D4AB",
                  width:"100%",
                  p: 4,
                  textAlign: 'left',
                  borderRadius:"20px"
                }}
              >
                <Box sx={{ marginBottom: '10px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      width:"112%",
                      alignItems: 'center',
                      paddingTop: '15px',
                      paddingBottom: '15px',
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/vduvxizq.json"
                      trigger="in"
                      colors="primary:#14746f"
                      style={{height:"60px", width:"60px"}}>
                    </lord-icon>
                    <Typography
                      flexGrow={1}
                      variant="h3"
                      fontWeight="600"
                      color="white"
                      marginLeft="10px"
                    >
                      Link <Typography variant="h3" fontWeight="600" color="#0061ff">Instagram</Typography>
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        color: 'white',
                        borderRadius: '30px',
                        fontSize:"14px",
                        fontWeight: 550,
                        height:"50px",
                        width:"190px",
                        backgroundColor: "#469D89",
                        border:"none",
                        boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.2)',
                        transition: ".4s ease",
                        ':hover': {
                          backgroundColor: "#04a6c2",
                          color: "white",
                        },
                      }}
                    >
                      <InstagramIcon/>
                      Link Instgram
                    </Button>
                  </Box>
                </Box>
              </Box>
              {/* Display Instagram Page Details */}
              {instagramDetails && (
                <Box
                  sx={{
                    ml:12.5,
                    display:"flex",
                    width:"500px",
                    alignItems:"center",
                    justifyContent:"space-between",
                    mt:-5,
                  }}
                >
                  <Box sx={{mt:1, display:"flex", flexDirection:"column"}}>
                    <img src={instagramDetails.profileImage} style={{marginLeft:"10px", marginBottom:"2px", borderRadius: "100%", width: "60px", height: "60px"}} />
                    <Typography variant="h4" width="60px" textAlign="center" fontWeight="600" color="#ffffff">{instagramDetails.username}</Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={handleInstagramLogout}
                    sx={{
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '20px',
                      color: 'white',
                      borderRadius: '30px',
                      fontSize: "14px",
                      fontWeight: 550,
                      height:"50px",
                      width:"190px",
                      backgroundColor: "#ff1744",
                      border: "none",
                      boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.2)',
                      transition: "0.4s ease",
                      ml:-30,
                      mt:6.5,
                      ':hover': {
                        backgroundColor: "#ff4d6b",
                        color: "white",
                      },
                    }}
                  >
                    <ExitToAppRoundedIcon/>
                    Logout Insta
                  </Button>
                </Box>
              )}
            </Box>
        </Grid2>

        {/* recent Posts */}
        <Box
          sx={{
            mt:3,
            ml:7,
            width:"37vw",
            height:"75vh",
            backgroundColor: "#EFF0EF",
            boxShadow: '30px 30px 40px 30px rgba(0,0,0,0.2)',
            borderRadius:"20px",
          }}
        >
          <Box
                sx={{
                  display: 'flex',
                  width:"100%",
                  alignItems: 'center',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                }}
              >
                <Box sx={{ml:2, mt:1, display:"flex", alignItems:"center", gap:"20px", flexDirection:"column" }}>
                  
                  <Box sx={{display:"flex", alignItems:"center", gap:"150px" }}>
                    <Box sx={{display:"flex", alignItems:"center", gap:"20px" }}>
                      <Box sx={{backgroundColor:"#c4c4c4", p:1.1, borderRadius:"60px", display:"flex" }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/xyboiuok.json"
                          trigger="in"
                          colors="primary:#ef233c"
                          style={{height:"30px"}}
                        >
                        </lord-icon>
                      </Box>
                      <Typography variant="h4" sx={{fontWeight: "550", color:"2b2c28"}} >Saved Posts</Typography>
                    </Box>
                    
                    <Box sx={{display:"flex", alignItems:"center", justifyContent:"left", gap:"20px" }}>
                      <Button onClick={handleViewPosts} sx={{boxShadow: '30px 10px 30px 10px rgba(0,0,0,0.1)', backgroundColor:"#92E6A7", p:1.5, borderRadius:"60px", display:"flex", ":hover":{backgroundColor:"#2DC653"} }}>
                        <Typography variant="h5" sx={{fontWeight: "550", color:"2b2c28"}}>View Posts</Typography>
                        <lord-icon
                          src="https://cdn.lordicon.com/yxyampao.json"
                          trigger="loop"
                          state="morph-heart"
                          colors="primary:#000000"
                          style={{height:"30px"}}
                        >
                        </lord-icon>
                      </Button>
                    </Box>
                    
                  </Box>

                  <Box sx={{ display:"flex", flexDirection:"column", gap:"20px", overflowY: "auto", height: "400px", pr:1, "&::-webkit-scrollbar": {
                      width: "13px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#f5fcf8",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#888",
                      borderRadius: "10px",
                      border: "3px solid transparent",
                      backgroundClip: "padding-box",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#555",
                    },}}
                  >
                    <Box sx={{ display:"flex", gap:"20px"}}>
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/kthelypq.json"
                                trigger="in"
                                colors="primary:#000000"
                                style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                        </Box>
                        <Box sx={{mt:2, borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                          <img src={img5} height="170px" width="205px" style={{borderRadius:"10px"}} />
                        </Box>
                        
                        <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                          <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyboiuok.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/fdxqrdfe.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/ercyvufy.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{ mt:1.5, display:"flex", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/prjooket.json"
                              trigger="morph"
                              colors="primary:#000000"
                              style={{height:"22px"}}
                            >
                            </lord-icon>
                          </Box>
                      </Box>
                    </Box>
                      
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img1} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    <Box sx={{ display:"flex", gap:"20px"}}>
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/kthelypq.json"
                                trigger="in"
                                colors="primary:#000000"
                                style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                        </Box>
                        <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                          <Box sx={{ borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <img src={img3} height="170px" width="205px" style={{borderRadius:"10px"}} />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                          <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyboiuok.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/fdxqrdfe.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/ercyvufy.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{ mt:1.5, display:"flex", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/prjooket.json"
                              trigger="morph"
                              colors="primary:#000000"
                              style={{height:"22px"}}
                            >
                            </lord-icon>
                          </Box>
                      </Box>
                    </Box>
                      
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img2} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    <Box sx={{ display:"flex", gap:"20px"}}>
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/kthelypq.json"
                                trigger="in"
                                colors="primary:#000000"
                                style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                        </Box>
                        <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                          <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <img src={img5} height="170px" width="205px" style={{borderRadius:"10px"}} />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                          <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyboiuok.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/fdxqrdfe.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/ercyvufy.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{ mt:1.5, display:"flex", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/prjooket.json"
                              trigger="morph"
                              colors="primary:#000000"
                              style={{height:"22px"}}
                            >
                            </lord-icon>
                          </Box>
                      </Box>
                    </Box>
                      
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img4} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    <Box sx={{ display:"flex", gap:"20px"}}>
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/kthelypq.json"
                                trigger="in"
                                colors="primary:#000000"
                                style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                        </Box>
                        <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                          <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <img src={img3} height="170px" width="205px" style={{borderRadius:"10px"}} />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                          <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyboiuok.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/fdxqrdfe.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/ercyvufy.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{ mt:1.5, display:"flex", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/prjooket.json"
                              trigger="morph"
                              colors="primary:#000000"
                              style={{height:"22px"}}
                            >
                            </lord-icon>
                          </Box>
                      </Box>
                    </Box>
                      
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img2} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    <Box sx={{ display:"flex", gap:"20px"}}>
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/kthelypq.json"
                                trigger="in"
                                colors="primary:#000000"
                                style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                        </Box>
                        <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                          <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <img src={img1} height="170px" width="205px" style={{borderRadius:"10px"}} />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                          <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyboiuok.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/fdxqrdfe.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/ercyvufy.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{ mt:1.5, display:"flex", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/prjooket.json"
                              trigger="morph"
                              colors="primary:#000000"
                              style={{height:"22px"}}
                            >
                            </lord-icon>
                          </Box>
                      </Box>
                    </Box>
                      
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img4} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    <Box sx={{ display:"flex", gap:"20px"}}>
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/kthelypq.json"
                                trigger="in"
                                colors="primary:#000000"
                                style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                        </Box>
                        <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                          <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <img src={img2} height="170px" width="205px" style={{borderRadius:"10px"}} />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                          <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyboiuok.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/fdxqrdfe.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/ercyvufy.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{ mt:1.5, display:"flex", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/prjooket.json"
                              trigger="morph"
                              colors="primary:#000000"
                              style={{height:"22px"}}
                            >
                            </lord-icon>
                          </Box>
                      </Box>
                    </Box>
                      
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img3} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    <Box sx={{ display:"flex", gap:"20px"}}>
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/kthelypq.json"
                                trigger="in"
                                colors="primary:#000000"
                                style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                        </Box>
                        <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                          <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <img src={img4} height="170px" width="205px" style={{borderRadius:"10px"}} />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                          <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyboiuok.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/fdxqrdfe.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/ercyvufy.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{ mt:1.5, display:"flex", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/prjooket.json"
                              trigger="morph"
                              colors="primary:#000000"
                              style={{height:"22px"}}
                            >
                            </lord-icon>
                          </Box>
                      </Box>
                    </Box>
                      
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img1} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    <Box sx={{ display:"flex", gap:"20px"}}>
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/kthelypq.json"
                                trigger="in"
                                colors="primary:#000000"
                                style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                        </Box>
                        <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                          <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <img src={img5} height="170px" width="205px" style={{borderRadius:"10px"}} />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                          <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyboiuok.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/fdxqrdfe.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/ercyvufy.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{ mt:1.5, display:"flex", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/prjooket.json"
                              trigger="morph"
                              colors="primary:#000000"
                              style={{height:"22px"}}
                            >
                            </lord-icon>
                          </Box>
                      </Box>
                    </Box>
                      
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img2} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    <Box sx={{ display:"flex", gap:"20px"}}>
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/kthelypq.json"
                                trigger="in"
                                colors="primary:#000000"
                                style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                        </Box>
                        <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                          <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <img src={img3} height="170px" width="205px" style={{borderRadius:"10px"}} />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                          <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyboiuok.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/fdxqrdfe.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/ercyvufy.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{ mt:1.5, display:"flex", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/prjooket.json"
                              trigger="morph"
                              colors="primary:#000000"
                              style={{height:"22px"}}
                            >
                            </lord-icon>
                          </Box>
                      </Box>
                    </Box>
                      
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img1} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    <Box sx={{ display:"flex", gap:"20px"}}>
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/kthelypq.json"
                                trigger="in"
                                colors="primary:#000000"
                                style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                        </Box>

                        <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                          <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <img src={img2} height="170px" width="205px" style={{borderRadius:"10px"}} />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                          <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyboiuok.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/fdxqrdfe.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/ercyvufy.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{ mt:1.5, display:"flex", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/prjooket.json"
                              trigger="morph"
                              colors="primary:#000000"
                              style={{height:"22px"}}
                            >
                            </lord-icon>
                          </Box>
                      </Box>
                    </Box>
                      
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img4} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    <Box sx={{ display:"flex", gap:"20px"}}>
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/kthelypq.json"
                                trigger="in"
                                colors="primary:#000000"
                                style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                        </Box>

                        <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                          <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <img src={img1} height="170px" width="205px" style={{borderRadius:"10px"}} />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                          <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyboiuok.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/fdxqrdfe.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/ercyvufy.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{ mt:1.5, display:"flex", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/prjooket.json"
                              trigger="morph"
                              colors="primary:#000000"
                              style={{height:"22px"}}
                            >
                            </lord-icon>
                          </Box>
                      </Box>
                    </Box>
                      
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img3} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    <Box sx={{ display:"flex", gap:"20px"}}>
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/kthelypq.json"
                                trigger="in"
                                colors="primary:#000000"
                                style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                        </Box>

                        <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                          <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <img src={img2} height="170px" width="205px" style={{borderRadius:"10px"}} />
                          </Box>
                        </Box>
                        
                        <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                          <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyboiuok.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/fdxqrdfe.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/ercyvufy.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"25px"}}
                            >
                            </lord-icon>
                          </Box>
                          <Box sx={{ mt:1.5, display:"flex", alignItems:"left" }}>
                            <lord-icon
                              src="https://cdn.lordicon.com/prjooket.json"
                              trigger="morph"
                              colors="primary:#000000"
                              style={{height:"22px"}}
                            >
                            </lord-icon>
                          </Box>
                      </Box>
                    </Box>
                      
                      <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img5} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>

                      </Box>
                    </Box>

                    <Box sx={{display:"flex", gap:"20px", mb:5}}>
                    <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '20px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img4} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>
                    </Box>

                    <Box sx={{backgroundColor:"#E3FEEA", boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.1)', p:1.1, borderRadius:"20px", display:"flex", flexDirection:"column", alignItems:"center", width:"250px", height:"300px"}}>
                        
                        <Box sx={{ display:"flex", gap:"20px", alignItems:"center" }}>
                          <Box sx={{backgroundColor:"#acacac", borderRadius:"50%", p:0.5, ml:-4, mt:1}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/kthelypq.json"
                              trigger="in"
                              colors="primary:#000000"
                              style={{height:"30px", width:"35px"}}
                            >
                            </lord-icon>
                            </Box>
                            <Box sx={{backgroundColor:"#acacac", borderRadius:"10px", width:"110px", height:"10px"}}></Box>
                          </Box>
                          
                          <Box sx={{mt:2, backgroundColor:"#acacac", borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                            <Box sx={{borderRadius:"10px", display:"flex", alignItems:"center", height:"170px", width:"205px", }}>
                              <img src={img3} height="170px" width="205px" style={{borderRadius:"10px"}} />
                            </Box>
                          </Box>
                          
                            <Box sx={{ display:"flex", gap:"70px", alignItems:"center", }}>
                              <Box sx={{ mt:1.5, display:"flex", gap:"5px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/xyboiuok.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/fdxqrdfe.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                                <lord-icon
                                  src="https://cdn.lordicon.com/ercyvufy.json"
                                  trigger="in"
                                  colors="primary:#000000"
                                  style={{height:"25px"}}
                                >
                                </lord-icon>
                              </Box>
                              <Box sx={{ mt:1.5, display:"flex", gap:"10px", alignItems:"left" }}>
                                <lord-icon
                                  src="https://cdn.lordicon.com/prjooket.json"
                                  trigger="morph"
                                  colors="primary:#000000"
                                  style={{height:"22px"}}
                                >
                                </lord-icon>
                          </Box>
                        </Box>
                    </Box>
                    </Box>
                    
                    
                  </Box>
                </Box>
              </Box>
        </Box>

      </Grid2>
    </>
  );
}

export default LinkSocialAccounts;