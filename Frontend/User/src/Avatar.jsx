import React, { useState, useEffect } from 'react';
import defaultAvatar from '../src/assets/avatar.png';

const Avatar = ({ onImageUpload }) => {
  const [displayUploadButton, setDisplayUploadButton] = useState(true);
  const [imageSrc, setImageSrc] = useState(defaultAvatar);

  const handleMouseEnter = () => {
    setDisplayUploadButton(true);
  };

  const handleMouseLeave = () => {
    setDisplayUploadButton(false);
  };

  const handleFileChange = (event) => {
    const choosedFile = event.target.files[0];

    if (choosedFile) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
        if (onImageUpload) {
          onImageUpload(reader.result);
        }
        setModalShow(true);
      });

      reader.readAsDataURL(choosedFile);
    }
  };

  useEffect(() => {
    setImageSrc(defaultAvatar);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        className="profile-pic-div relative w-40 h-40 rounded-full border border-gray-300 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img id="photo" src={imageSrc} alt="Profile" className="w-full h-full" />
        {displayUploadButton && (
          <label
            htmlFor="file"
            className="file-input-label absolute w-full h-12 bottom-0 left-1/2 transform -translate-x-1/2 text-center bg-opacity-70 bg-gray-800 text-white text-sm font-sans cursor-pointer flex items-center justify-center"
          >
            Upload Photo
          </label>
        )}
        <input type="file" id="file" className="hidden" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default Avatar;