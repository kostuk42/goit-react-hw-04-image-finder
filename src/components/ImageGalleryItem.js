import React from 'react';
import PropTypes from "prop-types";

class ImageGalleryItem extends React.Component {
  render() {
    const { imageUrl, onClick } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img className="ImageGalleryItem-image" src={imageUrl} alt="" onClick={onClick} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
