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

  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/template-gen-screen');
    console.log(address+"\n")
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
        <h2>Provide Your Brand Location</h2>
        <input
          id="inputField"
          type="text"
          required
          placeholder="Business Location"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="continueBtn" onClick={handleContinue}>
          Generate Website
        </button>
      </div>
    </div>
  );
}

export default ProvideBusinessLocation;
