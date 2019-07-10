import React from 'react';

const Image = (props) => {
  const { ImageUrl, imageClickHandler, imageHoverHandler, imageUnHoverHandler, ImageID, hoverClass } = props;
  return <img onClick={ () => { imageClickHandler(ImageID) } } onMouseEnter={ ()=> imageHoverHandler(ImageID) } onMouseLeave={ () => imageUnHoverHandler() } className={`gallery-image ${hoverClass}`} alt="listing" src={ImageUrl} />;
};

export default Image;
