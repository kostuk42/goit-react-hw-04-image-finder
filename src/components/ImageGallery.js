import React, { useRef, useEffect, useState } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';

function ImageGallery({ images, onClick }) {
  const galleryRef = useRef(null);
  const [shouldScrollDown, setShouldScrollDown] = useState(false);

  useEffect(() => {
    if (shouldScrollDown) {
      scrollDown();
    }
  }, [shouldScrollDown]);

  useEffect(() => {
    const prevImagesLength = galleryRef.current.children.length;
    if (prevImagesLength !== images.length) {
      setShouldScrollDown(true);
    }
  }, [images]);

  const scrollDown = () => {
    const { lastChild } = galleryRef.current;
    if (lastChild) {
      lastChild.scrollIntoView({ behavior: 'smooth' });
    }
    setShouldScrollDown(false);
  };

  return (
    <ul className="ImageGallery" ref={galleryRef}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          imageUrl={image.webformatURL}
          onClick={() => onClick(image.largeImageURL)}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
