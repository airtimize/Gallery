import React from 'react';
import Image from './Image';
import CloseButton from './CloseButton';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePhotoList: false,
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    const { images, imageClickHandler } = this.props;
    const prevPhoto = images[images.length-1].ImageID;
    const nextPhoto = images[1].ImageID;
    if (e.key === 'ArrowLeft') {
      imageClickHandler(prevPhoto);
    }
    if (e.key === 'ArrowRight') {
      imageClickHandler(nextPhoto);
    }
  }

  render() {
    const { images, imageClickHandler, renderView } = this.props;
    const { hidePhotoList } = this.state;
    const nextPhoto = images[1].ImageID;
    const prevPhoto = images[images.length-1].ImageID;
    return (
      <>
        <CloseButton renderView={renderView} />
        <div className="carousel-container">
          <div onClick={()=> imageClickHandler(prevPhoto)}><svg viewBox="0 0 18 18" width="4.8em" height="4.8em" fill="rgb(255, 255, 255)"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd" /></svg></div>
          <div className="carousel-main-image">
            <img alt="" src={images[0].ImageUrl} />
          </div>
          <div onClick={()=> imageClickHandler(nextPhoto)}>
            <svg viewBox="0 0 18 18" width="4.8em" height="4.8em" fill="rgb(255, 255, 255)">
              <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd" />
            </svg>
          </div>
        </div>
        <div id="carousel-main-below" className={hidePhotoList ? 'carousel-caption-drop' : 'carousel-caption-up'}>
          <div id="carousel-row">
            <div id="carousel-caption-verified">
              <div id="carousel-main-caption">{images[0].Caption}</div>
            </div>
            <div id="toggle-photo">
              <button onClick={() => this.setState({ hidePhotoList: !hidePhotoList })} type="button" id="toggle-photo-button">
                { (hidePhotoList === false)
                  ? (
                    <span>
                      Hide photo list
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentcolor">
                        <path d="M12 21l-12-18h24z" />
                      </svg>
                    </span>
                  )
                  : (
                    <span>
                      Show photo list
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentcolor">
                        <path d="M12 3l12 18h-24z" />
                      </svg>
                    </span>
                  )}
              </button>
            </div>
          </div>
              <div id="carousel-main-verified">
                {(images[0].Verified) === 1 ? 'Verified Photo' : null }
              </div>
          {(hidePhotoList) === false
            ? (
              <div className="carousel-image-list">
                { images.map((image) => {
                  const {
                    ImageID, ImageUrl, Caption, Verified,
                  } = image;
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
            ) : null}
        </div>
      </>
    );
  }
}

export default Carousel;
