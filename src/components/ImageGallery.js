import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from "prop-types";

class ImageGallery extends React.Component {
  galleryRef = React.createRef();

  componentDidUpdate(prevProps) {
    if (prevProps.images.length !== this.props.images.length) {
      this.scrollDown();
    }
  }

  scrollDown() {
    const { lastChild } = this.galleryRef.current;
    if (lastChild) {
      lastChild.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    const { images, onClick } = this.props;

    return (
      <ul className="ImageGallery" ref={this.galleryRef}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            imageUrl={image.webformatURL}
            onClick={() => onClick(image.largeImageURL)}
          />
        ))}
      </ul>
    );
  }
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
