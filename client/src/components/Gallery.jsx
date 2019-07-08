import React from 'react';
import Image from './Image';

const Gallery = (props) => {
  return props.images.map((image, index) => {
    const { ImageID, ImageUrl, Caption, Verified } = image;
    const cssId = props.id || `image-${index}`;
    return (index < 4) ? (
      <div id={cssId}>
        <Image
          caption={Caption}
          ImageID={ImageID}
          ImageUrl={ImageUrl}
          Verified={Verified}
        />
      </div>
    ) : (
      null
    );
  });
};

export default Gallery;
