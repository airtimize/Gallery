import React from 'react';
import Image from './Image';
import CloseButton from './CloseButton';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0
    };
  }

  render() {
    const { images, imageClickHandler, renderView } = this.props;
    return (
      <>
        <CloseButton renderView={renderView} />
        <div className="carousel-container">
          <div className="carousel-main-image">
            <img alt="" src={images[0].ImageUrl} />
            {images[0].Caption}
          </div>
        </div>
        <div className="carousel-image-list">
          { images.map((image) => {
            const { ImageID, ImageUrl, Caption, Verified } = image;
            return (
              <div>
                <Image
                  imageClickHandler={imageClickHandler}
                  caption={Caption}
                  ImageID={ImageID}
                  ImageUrl={ImageUrl}
                  Verified={Verified}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Carousel;
