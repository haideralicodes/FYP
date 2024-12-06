import React from 'react'
import './Posters.css'
import schedulePost from '../../../assets/schedulePost.png';
import CheckIcon from '@mui/icons-material/Check';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import { useNavigate } from 'react-router-dom'; 
import { Grid2, Box, Typography, Button, } from '@mui/material';
import img1 from '../../../../src/assets/1.png'
import img2 from '../../../../src/assets/2.png'
import img3 from '../../../../src/assets/3.png'
import img4 from '../../../../src/assets/4.png'
import img5 from '../../../../src/assets/5.png'

function Posters() {

    const navigate = useNavigate();

    const handleCreateWithAI = ()=>{
        navigate('/dashboard/posts')
    }

  return (
    <div >
      <Grid2>
        <Box sx={{display:"flex", alignItems:'center', flexDirection:'column'}}>
            <Box sx={{width:"82vw", display:"flex", alignItems:'center', flexDirection:'column', p:3, gap:"10px",}}>
                <Box sx={{display:"flex", alignItems:'center', mt: 1, width:"76vw", gap:"325px"}}>
                    <Box sx={{display:"flex", alignItems:'center', gap:"10px", justifyContent:"center"}}>
                        <Typography variant="h1" sx={{ display: "inline-flex", fontWeight: "550", gap:"10px", color:"black" }}>
                        {/* <lord-icon
                            src="https://cdn.lordicon.com/vduvxizq.json"
                            trigger="loop"
                            delay="1000"
                            colors="primary:#000000"
                            style={{height:"50px", width:"50px"}}>
                        </lord-icon> */}
                            Get ur post ready, using</Typography>
                        <Typography variant="h1" sx={{display: "inline-flex", ml:1, fontWeight: "550", color:"black", mt:1 }}>AI
                            <lord-icon
                                src="https://cdn.lordicon.com/lqxfrxad.json"
                                trigger="loop"
                                state="loop-scale"
                                colors="primary:#000000"
                                style={{height:"50px", width:"50px", marginTop:"7px", marginLeft:"3px"}}>
                            </lord-icon>
                        </Typography>
                    </Box>

                    <Button sx={{backgroundColor: "#06245c", color:"white", width:"210px", fontSize:"16px", fontWeight:"550", borderRadius:"30px", transition:"0.5s ease-in-out",
                        ":hover":{
                            backgroundColor: "black",
                            color:"white"
                        }
                    }} onClick={handleCreateWithAI}>Create With AI
                        <lord-icon
                            src="https://cdn.lordicon.com/yxyampao.json"
                            trigger="loop"
                            delay="1000"
                            colors="primary:#ffffff"
                            style={{height:"50px", width:"50px"}}>
                        </lord-icon>
                    </Button>
                </Box>
              
                <div style={{ marginTop:"10px", marginLeft:"-890px", position: "relative", width: "300px" }}>
                  
                <Button sx={{backgroundColor: "#06245c", color:"white", width:"270px", fontSize:"16px", fontWeight:"550", borderRadius:"30px", transition:"0.5s ease-in-out",
                        ":hover":{
                            backgroundColor: "black",
                            color:"white"
                        }
                    }} onClick={handleCreateWithAI}>View Some Examples
                        <lord-icon
                            src="https://cdn.lordicon.com/utqytqrt.json"
                            trigger="loop"
                            delay="1000"
                            colors="primary:#ffffff"
                            style={{height:"50px", width:"50px"}}>
                        </lord-icon>
                    </Button>
                </div>
                
                <style>
                {`
                  input::placeholder {
                    color: white;
                  }
                `}
                </style>


                <Box sx={{display:"flex", alignItems:'center', gap:"20px", mt: 1.5, mb:6.5}}>

                    <Box sx={{p:2.1, borderRadius:"25px", height:"400px", display:"flex", alignItems:'center', gap:"20px", flexDirection:"column", backgroundColor:"#06245c"}}>
                        <img src={img1} height="280px"  width="250px" style={{borderRadius:"20px"}} />
                        <Box sx={{display:"flex", gap:"5px", width:"16vw"}}>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"80%"}}>
                                <Typography variant="h5" sx={{ color:"white", fontWeight:"550" }} >Makeup Products</Typography>
                                <Typography variant="h6" sx={{ color:"white" }} >Get 50% on ur fav products and enjoy this Eid!</Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"30%"}}>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, borderRadius:"20px", width:"80px", textAlign:"center" }} >Make Up</Typography>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, ml:2.2, mt:0.3, borderRadius:"100px", width:"40px", height:"40px", textAlign:"center" }} >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/xyboiuok.json"
                                        trigger="loop"
                                        state="morph-in"
                                        colors="primary:#ffffff"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                    ></lord-icon>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
    
                    <Box sx={{p:2.1, borderRadius:"25px", height:"400px", display:"flex", alignItems:'center', gap:"20px", flexDirection:"column", backgroundColor:"#06245c"}}>
                        <img src={img4} height="280px"  width="250px" style={{borderRadius:"20px"}} />
                        <Box sx={{display:"flex", gap:"5px", width:"16vw"}}>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"80%"}}>
                                <Typography variant="h5" sx={{ color:"white", fontWeight:"550" }} >Modern Shoes</Typography>
                                <Typography variant="h6" sx={{ color:"white" }} >Get upto 30% discount on shoes 2.0!</Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"30%"}}>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, borderRadius:"20px", width:"80px", textAlign:"center" }} >Shoes</Typography>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, ml:2.2, mt:0.3, borderRadius:"100px", width:"40px", height:"40px", textAlign:"center" }} >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/xyboiuok.json"
                                        trigger="loop"
                                        state="morph-in"
                                        colors="primary:#ffffff"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                    ></lord-icon>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
        
                    <Box sx={{p:2.1, borderRadius:"25px", height:"400px", display:"flex", alignItems:'center', gap:"20px", flexDirection:"column", backgroundColor:"#06245c"}}>
                        <img src={img5} height="280px"  width="250px" style={{borderRadius:"20px"}} />
                        <Box sx={{display:"flex", gap:"5px", width:"16vw"}}>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"80%"}}>
                                <Typography variant="h5" sx={{ color:"white", fontWeight:"550" }} >Black Friday Sale</Typography>
                                <Typography variant="h6" sx={{ color:"white" }} >Big Sale, 50% off on all winter collection!</Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"30%"}}>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, borderRadius:"20px", width:"80px", textAlign:"center" }} >Clothes</Typography>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, ml:2.2, mt:0.3, borderRadius:"100px", width:"40px", height:"40px", textAlign:"center" }} >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/xyboiuok.json"
                                        trigger="loop"
                                        state="morph-in"
                                        colors="primary:#ffffff"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                    ></lord-icon>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{p:2.1, borderRadius:"25px", height:"400px", display:"flex", alignItems:'center', gap:"20px", flexDirection:"column", backgroundColor:"#06245c"}}>
                        <img src={img2} height="280px"  width="250px" style={{borderRadius:"20px"}} />
                        <Box sx={{display:"flex", gap:"5px", width:"16vw"}}>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"80%"}}>
                                <Typography variant="h5" sx={{ color:"white", fontWeight:"550" }} >Serum 2.0 Sale</Typography>
                                <Typography variant="h6" sx={{ color:"white" }} >Get 50% on ur fav Skin care products, shop now!</Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"30%"}}>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, borderRadius:"20px", width:"80px", textAlign:"center" }} >Skin Care</Typography>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, ml:2.2, mt:0.3, borderRadius:"100px", width:"40px", height:"40px", textAlign:"center" }} >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/xyboiuok.json"
                                        trigger="loop"
                                        state="morph-in"
                                        colors="primary:#ffffff"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                    ></lord-icon>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
    
                </Box>

                <Box sx={{display:"flex", alignItems:'center', gap:"20px", mt: 1.5, mb:6.5}}>
                    
                    <Box sx={{p:2.1, borderRadius:"25px", height:"400px", display:"flex", alignItems:'center', gap:"20px", flexDirection:"column", backgroundColor:"#06245c"}}>
                        <img src={img1} height="280px"  width="250px" style={{borderRadius:"20px"}} />
                        <Box sx={{display:"flex", gap:"5px", width:"16vw"}}>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"80%"}}>
                                <Typography variant="h5" sx={{ color:"white", fontWeight:"550" }} >Makeup Products</Typography>
                                <Typography variant="h6" sx={{ color:"white" }} >Get 50% on ur fav products and enjoy this Eid!</Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"30%"}}>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, borderRadius:"20px", width:"80px", textAlign:"center" }} >Make Up</Typography>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, ml:2.2, mt:0.3, borderRadius:"100px", width:"40px", height:"40px", textAlign:"center" }} >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/xyboiuok.json"
                                        trigger="loop"
                                        state="morph-in"
                                        colors="primary:#ffffff"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                    ></lord-icon>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
    
                    <Box sx={{p:2.1, borderRadius:"25px", height:"400px", display:"flex", alignItems:'center', gap:"20px", flexDirection:"column", backgroundColor:"#06245c"}}>
                        <img src={img4} height="280px"  width="250px" style={{borderRadius:"20px"}} />
                        <Box sx={{display:"flex", gap:"5px", width:"16vw"}}>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"80%"}}>
                                <Typography variant="h5" sx={{ color:"white", fontWeight:"550" }} >Modern Shoes</Typography>
                                <Typography variant="h6" sx={{ color:"white" }} >Get upto 30% discount on shoes 2.0!</Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"30%"}}>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, borderRadius:"20px", width:"80px", textAlign:"center" }} >Shoes</Typography>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, ml:2.2, mt:0.3, borderRadius:"100px", width:"40px", height:"40px", textAlign:"center" }} >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/xyboiuok.json"
                                        trigger="loop"
                                        state="morph-in"
                                        colors="primary:#ffffff"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                    ></lord-icon>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
        
                    <Box sx={{p:2.1, borderRadius:"25px", height:"400px", display:"flex", alignItems:'center', gap:"20px", flexDirection:"column", backgroundColor:"#06245c"}}>
                        <img src={img5} height="280px"  width="250px" style={{borderRadius:"20px"}} />
                        <Box sx={{display:"flex", gap:"5px", width:"16vw"}}>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"80%"}}>
                                <Typography variant="h5" sx={{ color:"white", fontWeight:"550" }} >Black Friday Sale</Typography>
                                <Typography variant="h6" sx={{ color:"white" }} >Big Sale, 50% off on all winter collection!</Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"30%"}}>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, borderRadius:"20px", width:"80px", textAlign:"center" }} >Clothes</Typography>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, ml:2.2, mt:0.3, borderRadius:"100px", width:"40px", height:"40px", textAlign:"center" }} >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/xyboiuok.json"
                                        trigger="loop"
                                        state="morph-in"
                                        colors="primary:#ffffff"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                    ></lord-icon>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{p:2.1, borderRadius:"25px", height:"400px", display:"flex", alignItems:'center', gap:"20px", flexDirection:"column", backgroundColor:"#06245c"}}>
                        <img src={img2} height="280px"  width="250px" style={{borderRadius:"20px"}} />
                        <Box sx={{display:"flex", gap:"5px", width:"16vw"}}>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"80%"}}>
                                <Typography variant="h5" sx={{ color:"white", fontWeight:"550" }} >Serum 2.0 Sale</Typography>
                                <Typography variant="h6" sx={{ color:"white" }} >Get 50% on ur fav Skin care products, shop now!</Typography>
                            </Box>
                            <Box sx={{display:"flex", flexDirection:"column", gap:"5px", width:"30%"}}>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, borderRadius:"20px", width:"80px", textAlign:"center" }} >Skin Care</Typography>
                                <Typography variant="h6" sx={{ color:"white", border:"2px solid blue", p:0.6, ml:2.2, mt:0.3, borderRadius:"100px", width:"40px", height:"40px", textAlign:"center" }} >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/xyboiuok.json"
                                        trigger="loop"
                                        state="morph-in"
                                        colors="primary:#ffffff"
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                        }}
                                    ></lord-icon>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
    
                </Box>

            </Box>
        </Box>
      </Grid2>
    </div>
  )
}

export default Posters