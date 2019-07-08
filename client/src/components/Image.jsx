import React from 'react';

const Image = (props) => {
  const { ImageUrl } = props;
  return <img className="image" alt="listing" src={ImageUrl} />;
};

export default Image;
