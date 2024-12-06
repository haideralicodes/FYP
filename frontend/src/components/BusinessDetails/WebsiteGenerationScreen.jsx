import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WebsiteGenerationScreen.css';
import GeneratedSite from '../../Templates/BuetyStore/HomePage';
import { Typography, Skeleton, Button } from "@mui/material";

function WebsiteGenerationScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showContinueButton, setShowContinueButton] = useState(false); 
  const [animatedText1, setAnimatedText1] = useState(''); 
  const [animatedText2, setAnimatedText2] = useState(''); 
  const [isParagraph1Done, setIsParagraph1Done] = useState(false);

  const paragraph1 = `🤖 "Your website is getting ready for you. The design and content is being added to your website. Hold on for a few seconds while your website is getting ready." `;
  const paragraph2 = `🤖 "Greetings! Your website is about to get ready for you. The design and content is added to your website. You can now have a preview of the design of your website." `;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowContinueButton(true); 
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate('/template-view/buety');
  };

  // text animation for para1
  useEffect(() => {
    const words1 = paragraph1.split(' ');
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (words1[currentIndex]) { 
        setAnimatedText1((prev) => prev + words1[currentIndex] + ' ');
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsParagraph1Done(true); 
      }
    }, 200); 

    return () => clearInterval(interval); 
  }, []);

  // text animation for para2
  useEffect(() => {
    if (isParagraph1Done) {
      const words2 = paragraph2.split(' ');
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (words2[currentIndex]) { 
          setAnimatedText2((prev) => prev + words2[currentIndex] + ' ');
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 200); 

      return () => clearInterval(interval); 
    }
  }, [isParagraph1Done]); 

  return (
    <div className="webGenScreen">
      <div className="aiText">
        <div className="txtBox">
          <p>{animatedText1}</p>
          <p>{animatedText2}</p>
          
          {showContinueButton && ( 
            <Button
              variant="outlined"
              color="primary"
              onClick={handleContinue}
              sx={{
                boxShadow: '0px 10px 20px 10px rgba(0,0,0,0.1)',
                backgroundColor: "transparent",
                color: "#000000",
                border: "2px solid #000000",
                width: "300px",
                height: "55px",
                fontSize: "17px",
                fontWeight: "550",
                borderRadius: "70px",
                transition: "0.5s ease-in-out",
                ":hover": {
                  backgroundColor: "#04e762",
                  color: "white",
                  border: "none"
                }
              }}
            >
              Continue with Design {">"}
            </Button>
          )}
        </div>
      </div>

      <div className="aiWebsite">
        {loading ? (
          <>
            <Typography variant="h1">{loading ? <Skeleton /> : 'h1'}</Typography>
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="50%" />
            <Typography variant="h2">{loading ? <Skeleton /> : 'h2'}</Typography>
            <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
            <Typography variant="h1">{loading ? <Skeleton /> : 'h1'}</Typography>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
            <Typography variant="h2">{loading ? <Skeleton /> : 'h2'}</Typography>
            <Skeleton variant="rectangular" width="100%" height={300} animation="wave" />
          </>
        ) : (
          <GeneratedSite className="customGeneratedSite" />
        )}
      </div>
    </div>
  );
}

export default WebsiteGenerationScreen;