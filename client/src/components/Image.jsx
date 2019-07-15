import React from 'react';
import style from '../style.css';

const Image = (props) => {
  const { ImageUrl, imageClickHandler, imageHoverHandler, imageUnHoverHandler, ImageID, hoverClass } = props;

  return <img onClick={ () => { imageClickHandler(ImageID) } } onMouseEnter={ imageHoverHandler && (() => imageHoverHandler(ImageID)) } onMouseLeave={ imageUnHoverHandler && (() => imageUnHoverHandler()) } className={style.galleryImage + ' ' + hoverClass} alt="listing" src={ImageUrl} />;
};

export default Image;
