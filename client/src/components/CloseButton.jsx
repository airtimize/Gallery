import React from 'react';

const CloseButton = (props) => {
  return (
    <div id="carousel-exit-button">
      <button type="button" onClick={() => props.renderView('gallery')}>
        <svg viewBox="0 0 40 40">
          <path className="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
    </div>
  );
};

export default CloseButton;
