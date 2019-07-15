import React from 'react';
import Image from './Image';
import style from '../style.css';

const Gallery = (props) => {
  const { imageClickHandler, imageHoverHandler, imageUnHoverHandler } = props;
  return props.images.map((image, index) => {
    const { ImageID, ImageUrl, Caption, Verified, hoverClass } = image;
    const cssId = props.id || style.galleryImage + index;
    return (index < 4) ? (
      <div id={cssId}>
        <Image
          imageUnHoverHandler={imageUnHoverHandler}
          imageHoverHandler={imageHoverHandler}
          imageClickHandler={imageClickHandler}
          caption={Caption}
          ImageID={ImageID}
          ImageUrl={ImageUrl}
          Verified={Verified}
          hoverClass={hoverClass}
        />
      </div>
    ) : (
      null
    );
  });
};

export default Gallery;
