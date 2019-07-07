import React from 'react';

const Image = (props) => {
  const { ImageUrl } = props;
  return <img alt="listing" src={ImageUrl} />;
};

export default Image;
