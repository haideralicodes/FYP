import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";

import { useNavigate } from 'react-router-dom';

// Main Component
const Posts = () => {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [style, setStyle] = useState("Story");
  const [platform, setPlatform] = useState("facebook");

  const handleToneChange = (event, newTone) => {
    if (newTone !== null) {
      setTone(newTone);
    }
  };


  const navigate = useNavigate();

  const handleGeneratePost = () => {
    // Perform your post generation logic here if needed

    // Redirect to the new GeneratedPosts page
    navigate('/dashboard/generatedPosts');
  };

  const handleStyleChange = (event, newStyle) => {
    if (newStyle !== null) {
      setStyle(newStyle);
    }
  };

  const handlePlatformChange = (platform) => {
    setPlatform(platform);
  };

  return (
    <Box
      sx={{
        maxWidth: "1300px",
        height: "700px",
        margin: "auto",
        padding: "20px",
        boxShadow: 3,
        borderRadius: "15px",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h2" textAlign="left" fontWeight="bold" mb={4}>
        Generate your post
      </Typography>

      {/* Message Input */}
      <Box mb={3}>
        <Typography variant="subtitle1" mb={1} sx={{ fontSize: '20px' }}>
          Your message
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          inputProps={{ maxLength: 200 }}
          helperText={`${message.length}/200`}
        />
      </Box>

      {/* Tone of Voice */}
        <Box mb={3}>
          <Typography variant="subtitle1" mb={1} sx={{ fontSize: '18px' }}>
            Tone of voice
          </Typography>
          <ToggleButtonGroup
            value={tone}
            exclusive
            onChange={handleToneChange}
            aria-label="tone of voice"
          >
            {["Polite", "Funny", "Friendly", "Informal", "Serious", "Optimistic", "Motivational"].map(
              (option) => (
                <ToggleButton key={option} value={option} sx={{ fontSize: '16px' }}>
                  {option}
                </ToggleButton>
              )
            )}
          </ToggleButtonGroup>
        </Box>

        {/* Post Style */}
        <Box mb={4}>
          <Typography variant="subtitle1" mb={1} sx={{ fontSize: '18px' }}>
            Post style
          </Typography>
          <ToggleButtonGroup
            value={style}
            exclusive
            onChange={handleStyleChange}
            aria-label="post style"
          >
            {["Work", "Opinion", "Case study", "Story", "Tutorial"].map((option) => (
              <ToggleButton key={option} value={option} sx={{ fontSize: '16px' }}>
                {option}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>


      {/* Generate Post Button */}
          <Box textAlign="center">
          <Button onClick={handleGeneratePost}
            variant="contained"
            color="success"
            size="large"
            sx={{
              borderRadius: "10px",
              width: "20%",  // Full width
              height: "60px", // Increased height
              fontSize: "18px",  // Larger font size
            }}
          >
            Generate post
          </Button>
        </Box>

    </Box>
  );
};

export default Posts;
