import React from 'react';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0
    };
  }

  render() {
    const { images } = this.props;
    return (
      <>
        <div className="carousel-main-image"><img alt="" src={images[0].ImageUrl}/></div>
        <div className="carousel-image-list">
          { images.map((image) => {
            return (
              <div>
                <img alt="" src={image.ImageUrl} />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Carousel;
