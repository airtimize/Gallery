import React from 'react';
import Image from './Image';

const Gallery = (props) => {
  return props.images.map((image) => {
    const { ImageID, ImageUrl, Caption, Verified } = image;
    return (<Image caption={Caption}
                    ImageID={ImageID}
                    ImageUrl={ImageUrl}
                    Verified={Verified}
                                      />)
          }
  )
};

export default Gallery;
