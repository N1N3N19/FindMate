import React, { useState, useEffect } from 'react';
import '../src/UserPlaceholder.css';

const UserAgreement = () => {
  const [randomImage, setRandomImage] = useState('');
  const imageUrls = [
    '../src/assets/oui.jpg',
    '../src/assets/itiswhatitis.jpg',
    '../src/assets/pinku.png',
    '../src/assets/pain.jpg',
    '../src/assets/nene.jpg',
    '../src/assets/noellandnine.jpg'
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    setRandomImage(imageUrls[randomIndex]);
  }, []);

  return (
    <div className='text-white h-[100vh] flex flex-col justify-center items-center bg-cover' style={{ "backgroundImage": "url('../src/assets/bg.jpg')" }}>
      <div className="text-center text-3xl p-4">
        <strong>Terms & Conditions and Privacy Policy</strong>
      </div>
      <div className="bg-white border border-amber-400 rounded-lg p-10 w-550px box-border shadow-lg backdrop-filter backdrop-blur-lg relative transition-all duration-200">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={randomImage} alt="Random" style={{ width: '500px', height: '500px' }} />
        </div>
      </div>
      <div className="text-center p-4">
        <span>Wolfgang: Triple-N © 2023</span>
      </div>
    </div>
  );
};

export default UserAgreement;
