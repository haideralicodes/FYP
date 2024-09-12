import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

const GeneratedPosts = () => {
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);

  const generatedPosts = [
    {
      content: "Pack your bags, we're taking you on a dream 2-week holiday in Mexico for under $999! 🇲🇽 Say 'Hola' to endless sunshine and sandy beaches.",
      hashtags: "#MexicoHoliday #TravelDeal",
      image: "/path/to/image1.jpg",
    },
    {
      content: "🌴 Swap your office view for a beach-side vista! 2 unforgettable weeks in sunny Mexico for under $999.",
      hashtags: "#TravelGoals #MexicoGetaway",
      image: "/path/to/image2.jpg",
    },
    {
      content: "Unwind in paradise for less! Experience the enchanting beauty of Mexico on a 2-week holiday.",
      hashtags: "#EpicEscape #MexicoOnBudget",
      image: "/path/to/image3.jpg",
    }
  ];

  return (
    <Box p={4}>
      <Typography variant="h2" mb={3} textAlign="center" sx={{ fontSize: '40px' }}>
        AI Social Post Generator
      </Typography>

      <Grid container spacing={3}>
        {generatedPosts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              variant={selectedPostIndex === index ? "outlined" : "elevation"}
              elevation={selectedPostIndex === index ? 8 : 2}
              sx={{ 
                cursor: 'pointer', 
                borderColor: selectedPostIndex === index ? 'primary.main' : 'transparent', 
                borderRadius: '16px' // Adjust this value to make corners more or less rounded
              }}
              onClick={() => setSelectedPostIndex(index)}
            >
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
                  {post.content}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '1.1rem', mt: 1 }}>
                  {post.hashtags}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                height="400"
                image={post.image}
                alt="Generated Post Image"
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GeneratedPosts;
