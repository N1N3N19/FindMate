import React, { useState, useEffect, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import defaultAvatar from '../src/assets/avatar.png';
import Modal from 'react-modal';

const Avatar = ({ onImageUpload }) => {
  const [displayUploadButton, setDisplayUploadButton] = useState(true);
  const [imageSrc, setImageSrc] = useState(defaultAvatar);
  const [scale, setScale] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const editorRef = useRef();

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
        setModalIsOpen(true);
      });

      reader.readAsDataURL(choosedFile);
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL();
      setImageSrc(croppedImage);
      if (onImageUpload) {
        onImageUpload(croppedImage);
      }
      setDisplayUploadButton(false);
      setModalIsOpen(false);
    }
  };

  useEffect(() => {
    // Set the default image when the component mounts
    setImageSrc(defaultAvatar);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        className="profile-pic-div relative w-40 h-40 rounded-full border border-gray-300 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          id="photo"
          src={imageSrc}
          alt="Profile"
          className="w-full h-full"
        />
        {displayUploadButton && (
          <label
            htmlFor="file"
            className="file-input-label absolute w-full h-12 bottom-0 left-1/2 transform -translate-x-1/2 text-center bg-opacity-70 bg-gray-800 text-white text-sm font-sans cursor-pointer flex items-center justify-center"
          >
            Upload Photo
          </label>
        )}
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Image Crop Modal"
      >
        <div className="text-center">
          <h2>Crop Your Image</h2>
          <AvatarEditor
            ref={editorRef}
            image={imageSrc}
            width={160}
            height={160}
            border={0}
            borderRadius={80}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={scale}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default Avatar;
