import React, { useState } from "react"; 
import axios from 'axios';
import { Box, Typography, Button, Skeleton } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function GenerateImagePage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [generatedData, setGeneratedData] = useState([]);
  const navigate = useNavigate();

  const generateContent = async (data) => {
    try {
      const geminiResponse = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAWuemTK-eF-Upx9hBtqHPmUNz2fKYehns",
        {
          "contents": [
            {
              "parts": [
                {
                  "text": data.inputs
                }
              ]
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const rawText = geminiResponse.data.candidates[0].content.parts[0].text;
      // const firstSentence = rawText.split('.')[0].trim(); 
      const firstSentence = rawText.split('*').slice(0, 2).join('').trim(); // Extract first sentence
      const extractedHashtags = rawText.match(/#\w+/g)?.join(' ') || ''; // Extract hashtags

      
      return { text: firstSentence, hashtags: extractedHashtags };
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  };

  const fetchImageFromAPI = async (url, data, token) => {
    const response = await fetch(
      url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Error fetching image: ' + response.statusText);
    }
    
    return response.blob();
  };

  const query = async (data) => {
    setLoading(true);

    try {
      // API URLs and tokens
      const apiDetails = [
        {
          url: "https://api-inference.huggingface.co/models/multimodalart/vintage-ads-flux",
          token: "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"
        },
        {
          url: "https://api-inference.huggingface.co/models/XLabs-AI/flux-RealismLora",
          token: "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"
        },
        {
          url: "https://api-inference.huggingface.co/models/jakedahn/flux-midsummer-blues",
          token: "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"
        }
      ];

      // Generate images from all APIs
      const imagePromises = apiDetails.map(api => fetchImageFromAPI(api.url, data, api.token));
      const results = await Promise.all([
        generateContent(data),
        generateContent(data),
        generateContent(data)
      ]);
      
      // Get the blob of each image
      const imageBlobs = await Promise.all(imagePromises);

      // Convert blob to image URL
      const imageUrls = imageBlobs.map(blob => URL.createObjectURL(blob));

      // Set the generated images and data
      setGeneratedImages(imageUrls);
      setGeneratedData(results);
      setLoading(false);

    } catch (error) {
      console.error('Error generating image or text:', error);
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    await query({ inputs: prompt });
  };

  const handleCardClick = (index) => {
    navigate('/dashboard/GeneratedPostScheduler', {
      state: {
        selectedPost: {
          image: generatedImages[index],
          content: generatedData[index]?.text || '',
          hashtags: generatedData[index]?.hashtags || '',
        }
      }
    });
  };

  // const handlePostSave = async (index) => {
  //   const userId = localStorage.getItem('userId'); 
  //   const yourToken = localStorage.getItem('token');

  //   console.log("\n User Id: ", userId)
  //   console.log("\n User Token: ", yourToken)

  //   if (!userId || !yourToken) {
  //     console.error('User ID or token is missing.');
  //     return;
  // }

  //   const postData = {
  //     userId: userId, 
  //     text: generatedData[index]?.text || '',
  //     hashtags: generatedData[index]?.hashtags || '',
  //     imageUrl: generatedImages[index]
  //   };

  //   console.log("Post data before saving: ", postData)
  
  //   try {
  //     console.log("DB: ", postData)
  //     const response = await axios.post('http://localhost:4000/api/posts/save', postData, {
  //       headers: {
  //         Authorization: `Bearer ${yourToken}`, 
  //       },
  //     });

  //     console.log('Post saved successfully:', response.data.message); 

  //   } 
  //   catch (error) {
  //     console.error('Error saving post:', error.response ? error.response.data : error.message);
  //   }
  // };
  

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

  const handlePostSave = async (index) => {
    const userId = localStorage.getItem('userId'); 
    const yourToken = localStorage.getItem('token');
  
    if (!userId || !yourToken) {
      console.error('User ID or token is missing.');
      return;
    }
  
    try {
      // Convert the image URL (blob) to a file object
      const response = await fetch(generatedImages[index]);
      const blob = await response.blob();
      
      // Upload the file (blob) to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(blob);
  
      // Prepare post data including the Cloudinary URL
      const postData = {
        userId: userId, 
        text: generatedData[index]?.text || '',
        hashtags: generatedData[index]?.hashtags || '',
        imageUrl: cloudinaryUrl  // Using Cloudinary URL instead of the local blob URL
      };
  
      console.log("Post data before saving: ", postData);
  
      // Save the post data to your database
      const saveResponse = await axios.post('http://localhost:4000/api/posts/save', postData, {
        headers: {
          Authorization: `Bearer ${yourToken}`, 
        },
      });
  
      console.log('Post saved successfully:', saveResponse.data.message); 
  
    } catch (error) {
      console.error('Error saving post:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <Box sx={{ margin: "auto", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#edf2fb", width: "78vw", p: 2.4, borderTopRightRadius: "30px", borderTopLeftRadius: "30px", boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.1)' }}>
      
      {/* Generated Content Box */}
      {!loading && generatedImages.length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "30px", mb: 2.5 }}>
          {generatedImages.map((image, index) => (
            <Box key={index} sx={{ p: 1.5, borderRadius: "25px", height: "550px", width: "360px", display: "flex", flexDirection: "column", backgroundColor: "#0a2472", alignItems: "center", gap: "10px", boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
              <img onClick={() => handleCardClick(index)} src={image} alt="Generated" height="300px" width="320px" style={{ borderRadius: "20px" }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px"}}>
                <Typography variant="h6" sx={{ ml:2, color: "white", fontWeight: "bold", width:"280px", textAlign:"justify" }}>{generatedData[index]?.text || ''}</Typography>
                <lord-icon
                  src="https://cdn.lordicon.com/prjooket.json"
                  trigger="click"
                  onClick={() => handlePostSave(index)}
                  state="morph-marked-bookmark"
                  colors="primary:#ffffff"
                  style={{height:"30px", width:"25px"}}>
                </lord-icon>
              </Box>
              <Typography variant="h6" sx={{ ml:1.5, color: "#90caf9", fontWeight: "bold" }}>{generatedData[index]?.hashtags || ''}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Prompt Box */}
      <Box sx={{ boxShadow: '0px 10px 30px 10px rgba(0,0,0,0.1)', display: "flex", alignItems: "center", gap: "30px", p: 0.5, backgroundColor: "#979dac", height: "70px", width: "1050px", borderRadius: "50px"}}>
        <input
          type="text"
          placeholder="eg. 20% off on shoes"
          style={{ marginLeft: "8px", fontSize: "20px", color: "white", marginTop: "20px", borderRadius: "30px", height: "50px", width: "800px", border: "3px solid white", paddingLeft: "20px" }}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={handleGenerate} sx={{
          p: 2,
          backgroundColor: "#06245c",
          color: "white",
          height: "50px",
          fontSize: "14px",
          fontWeight: "550",
          borderRadius: "30px",
          transition: "0.5s ease-in-out",
          ":hover": {
            backgroundColor: "black",
            color: "white"
          }
        }}>
          Generate with AI
          <lord-icon
            src="https://cdn.lordicon.com/yxyampao.json"
            trigger="loop"
            delay="1000"
            colors="primary:#ffffff"
            style={{ height: "35px", width: "35px" }}>
          </lord-icon>
        </Button>
      </Box>

      {/* MUI Skeletons */}
      {loading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "40px", mt: 2, mb: 2.5 }}>
          {[...Array(3)].map((_, index) => (
            <Box key={index} sx={{ p: 2.1, borderRadius: "25px", height: "500px", width: "320px", display: "flex", flexDirection: "column", backgroundColor: "#06245c", alignItems: "center", gap: "20px" }}>
              <Skeleton variant="rectangular" animation="wave" width={280} height={280} sx={{ borderRadius: "20px", bgcolor: 'rgba(255, 255, 255, 0.3)' }} />
              <Skeleton width="90%" animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
              <Skeleton width="80%" animation="wave" sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default GenerateImagePage;