import React from 'react';
import style from '../style.css';

const CloseButton = (props) => {
  return (
    <div id={style.carouselExitButton}>
      <button type="button" onClick={() => props.renderView('gallery')}>
        <svg viewBox="0 0 40 40">
          <path className={style.closeX} d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
    </div>
  );
};

export default CloseButton;
