import React from 'react';
import Image from './Image';
import style from '../style.css';

// Shouldn't need to make any changes here. Once the state gets the correct data/structure, everything else should be normal.

const Gallery = (props) => {
  const { imageClickHandler, imageHoverHandler, imageUnHoverHandler } = props;
  return props.images.map((image, index) => { // map through the prop images which is an array of objects // image = an obj
    const { ImageID, ImageUrl, Caption, Verified, hoverClass } = image; // destructure obj img. So when imageID is called, it's actually image.ImageID
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
