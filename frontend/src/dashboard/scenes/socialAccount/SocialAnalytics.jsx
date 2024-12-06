import React from 'react'

import Button from '@mui/material/Button';
import { Grid2 } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import FB_Icon from '../../../../src/assets/FB_icon.png'
import Insta_Icon from '../../../../src/assets/Insta_icon.png'

function SocialAnalytics() {
  return (
    <>
        <Grid2 sx={{display:"flex", alignItems:"center", justifyItems:"center", ml:4}} >
            <lord-icon
                src="https://cdn.lordicon.com/yxyampao.json"
                trigger="loop"
                colors="primary:#f21b3f"
                style={{height:"70px", width:"70px"}}>
            </lord-icon>
            <Typography variant="h1" sx={{ ml: 1, fontSize: "35px", fontWeight: "550"}} >Overall Statistics</Typography>
        </Grid2>

        <Grid2 sx={{display: "flex"}}>

            <Grid2 sx={{ mt:3, display: "flex", flexDirection:"row",}}>
                {/* Facebook Section */}
                <Box
                    sx={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        ml:5,
                        mb:4,
                        width:"37vw",
                        height:"35vh",
                        backgroundColor: "#88D4AB",
                        boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.2)',
                        borderRadius:"20px",
                    }}>
                    
                    <Box sx={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        justifyContent:"center",
                        width:"400px",
                        height:"230px",
                        backgroundColor: "transparent",
                    }}>
                        <Typography ><img style={{height:"90px"}} src={FB_Icon} /></Typography>
                        <Typography variant="h3" sx={{mt:1, color:"white", fontWeight:"550"}} >0</Typography>
                        <Typography variant="h3" sx={{mt:1, color:"#408DF2", fontWeight:"550"}} >Followers</Typography>
                    </Box>

                </Box>

                {/* Insta Section */}
                <Box
                    sx={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        ml:5,
                        mb:4,
                        width:"37vw",
                        height:"35vh",
                        backgroundColor: "#88D4AB",
                        boxShadow: '0px 30px 30px 0px rgba(0,0,0,0.2)',
                        borderRadius:"20px" 
                    }}>
                        <Box sx={{
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center",
                            width:"400px",
                            height:"230px",
                            backgroundColor: "transparent",
                            mt:1.5
                        }}>
                            <Typography ><img style={{height:"90px"}} src={Insta_Icon} /></Typography>
                            <Typography variant="h3" sx={{mt:1, color:"white", fontWeight:"550"}} >0</Typography>
                        <Typography variant="h3" sx={{mt:1, color:"#CB2747", fontWeight:"550"}} >Followers</Typography>
                        </Box>
                </Box>
            </Grid2>

        </Grid2>
    </>
  )
}

export default SocialAnalytics