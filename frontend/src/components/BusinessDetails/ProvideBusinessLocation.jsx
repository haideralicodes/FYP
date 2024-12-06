import React, { useState } from 'react';
import './ProvideBusinessName.css';
import '../../Templates/FashionStoreOne/HomePage'
import img1 from '../../assets/img1.avif';
import img2 from '../../assets/img2.avif';
import img3 from '../../assets/img3.avif';
import img4 from '../../assets/img4.avif';
import img5 from '../../assets/img5.avif';
import img6 from '../../assets/img6.avif';
import img7 from '../../assets/img7.avif';
import img8 from '../../assets/img8.avif';
import img9 from '../../assets/img9.avif';
import img10 from '../../assets/img10.avif';
import img11 from '../../assets/img11.avif';
import img12 from '../../assets/img12.avif';
import img13 from '../../assets/img6.avif';
import img14 from '../../assets/img7.avif';
import img15 from '../../assets/img8.avif';
import img16 from '../../assets/img9.avif';
import img17 from '../../assets/img10.avif';
import img18 from '../../assets/img11.avif';
import img19 from '../../assets/img12.avif';
import img20 from '../../assets/img5.avif';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios'; 

const images = [
  { imgSrc: img1 },
  { imgSrc: img2 },
  { imgSrc: img3 },
  { imgSrc: img4 },
  { imgSrc: img5 },
  { imgSrc: img6 },
  { imgSrc: img7 },
  { imgSrc: img8 },
  { imgSrc: img9 },
  { imgSrc: img10 },
  { imgSrc: img11 },
  { imgSrc: img12 },
  { imgSrc: img13 },
  { imgSrc: img14 },
  { imgSrc: img15 },
  { imgSrc: img16 },
  { imgSrc: img17 },
  { imgSrc: img18 },
  { imgSrc: img19 },
  { imgSrc: img20 }
];

function ProvideBusinessLocation() {
  const [address, setAddress] = useState('');

  const column1 = images.slice(0, 5);
  const column2 = images.slice(5, 10);
  const column3 = images.slice(10, 15);
  const column4 = images.slice(15, 20);
  const column5 = images.slice(20, 25);

  const [showAnimation, setShowAnimation] = useState(false);

  const navigate = useNavigate();

  const handleContinue = async () => {
    setShowAnimation(true);

    localStorage.setItem('businessLocation', address);
    console.log(address+"\n")

    const businessName = localStorage.getItem('businessName');
    const businessStory = localStorage.getItem('businessStory');
    const businessLocation = localStorage.getItem('businessLocation');

    console.log("Business Data:", { businessName, businessStory, businessLocation });

    setTimeout(() => {
      if (businessStory) {
        const lowerCaseStory = businessStory.toLowerCase();

        if (lowerCaseStory.includes('beauty')) {
            navigate('/template-gen-screen/buety');
        } 

        else if (lowerCaseStory.includes('makeup')) {
          navigate('/template-gen-screen/buety');
        }

        else if (lowerCaseStory.includes('gadgets')) {
          navigate('/template-gen-screen/gadget');
        }
        
        else if (lowerCaseStory.includes('furniture')) {
            navigate('/template-gen-screen/furniture');
        }

        else if (lowerCaseStory.includes('clothing')) {
          navigate('/template-gen-screen/fashion');
        }

        else if (lowerCaseStory.includes('fashion')) {
          navigate('/template-gen-screen/fashion');
        }

        else{
          navigate('/provide-brand-story');
        }
      }
    }, 3000);

  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column">{column1.map((img, idx) => <img key={idx} src={img.imgSrc} alt="" />)}</div>
        <div className="column">{column2.map((img, idx) => <img key={idx} src={img.imgSrc} alt="" />)}</div>
        <div className="column">{column3.map((img, idx) => <img key={idx} src={img.imgSrc} alt="" />)}</div>
        <div className="column">{column4.map((img, idx) => <img key={idx} src={img.imgSrc} alt="" />)}</div>
        <div className="column">{column5.map((img, idx) => <img key={idx} src={img.imgSrc} alt="" />)}</div>
      </div>

      <div className="card">
        <Typography variant="h1" color='#000000' fontWeight={550} fontSize={30} gutterBottom textAlign="center" marginTop="20px" marginBottom="20px">
        Provide Business Location
        </Typography>
        <TextField 
          label="Location"
          variant='outlined'
          required 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{
            '& input:valid + fieldset': {
              borderColor: '#000000',
              borderWidth: 1,
            },
            '&.Mui-focused': {
              borderColor: 'black',
              borderWidth: 1,
            },
          }}
        />
        <Button 
        onClick={handleContinue}
        sx={{position:"fixed", top:280, height:"60px", backgroundColor: "#6943C8", color:"white", border:"none", width:"420px", fontSize:"17px", fontWeight:"550", borderRadius:"10px", transition:"0.5s ease-in-out", 
          ":hover":{backgroundColor:"#3E037E", color:"white"}
          }}
        >
          Continue
          <lord-icon
            src="https://cdn.lordicon.com/vduvxizq.json"
            trigger="loop"
            colors="primary:#ffffff"
            style={{heigh:"50px", width:"50px"}}>
          </lord-icon>
        </Button>

      </div>

      {/* Lord icon animation */}
      {showAnimation && (
          <div className="animation-overlay">
            <lord-icon
              src="https://cdn.lordicon.com/lqxfrxad.json"
              trigger="loop"
              state="loop-expand-alt-2"
              colors="primary:#6943C8"
              style={{ width: '300px', height: '70px' }}
            ></lord-icon>
          </div>
        )}

    </div>
  );
}

export default ProvideBusinessLocation;
