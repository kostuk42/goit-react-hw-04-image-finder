import PropTypes from "prop-types";

import React from 'react';

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className="Button" onClick={onLoadMore}>
      Load more
    </button>
  );
}

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};


