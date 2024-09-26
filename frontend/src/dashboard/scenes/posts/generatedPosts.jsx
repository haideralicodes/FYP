import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Skeleton } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';

const GeneratedPosts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { generatedImages = [], generatedData = [], loading } = location.state || {};
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (generatedImages.length) {
      const image = new Image();
      image.src = generatedImages[0];
      image.onload = () => setIsImageLoaded(true);
    }
  }, [generatedImages]);

  const handleCardClick = (index) => {
    const selectedPost = {
      image: generatedImages[index],
      content: generatedData[index].text,
      hashtags: generatedData[index].hashtags
    };
    navigate('/dashboard/GeneratedPostScheduler', { state: { selectedPost } });
  };

  return (
    <Box p={4}>
      <Typography variant="h2" mb={3} textAlign="center" sx={{ fontSize: '30px' }}>
        AI Social Post Generator
      </Typography>

      <Grid container spacing={3} alignItems="stretch">
        {loading ? (
          // Display skeletons while loading
          Array(3).fill(0).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={2} sx={{ borderRadius: '16px' }}>
                <CardContent>
                  <Skeleton variant="text" width="100%" height={10} animation="wave" />
                  <br />
                  <Skeleton variant="text" width="100%" height={10} animation="wave" />
                </CardContent>
                <Skeleton style={{marginLeft:"5px"}}  variant="rectangular" width={350} height={400} animation="wave" />
              </Card>
            </Grid>
          ))
        ) : (
          generatedData.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                elevation={2}
                sx={{ 
                  cursor: 'pointer', 
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
                onClick={() => handleCardClick(index)}
              >
                <CardContent>
                  <Typography variant="body1" color="black" sx={{ fontSize: '1rem' }}>
                    {data.text || 'No text generated'}
                    <br />
                    {data.hashtags && <Typography variant="body2" color="blue" sx={{ fontSize: '1rem' }}>{data.hashtags}</Typography>}
                  </Typography>
                </CardContent>

                <CardMedia
                  component="img"
                  height="400"
                  image={generatedImages[index]}  
                  alt="Generated Post Image"
                />
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default GeneratedPosts;