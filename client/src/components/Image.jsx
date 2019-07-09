import React from 'react';

const Image = (props) => {
  const { ImageUrl, imageClickHandler, ImageID } = props;
  return <img onClick={ () => { imageClickHandler(ImageID) } } className="gallery-image" alt="listing" src={ImageUrl} />;
};

export default Image;
