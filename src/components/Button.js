import React from 'react';
import PropTypes from "prop-types";

class Button extends React.Component {
  render() {
    const { onLoadMore } = this.props;

    return (
      <button type="button" className="Button" onClick={onLoadMore}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
