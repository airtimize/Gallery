import React from 'react';
import Image from './Image';
import CloseButton from './CloseButton';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidePhotoList: false
    };
  }

  render() {
    const { images, imageClickHandler, renderView } = this.props;
    const { hidePhotoList } = this.state;
    return (
      <>
        <CloseButton renderView={renderView} />
        <div className="carousel-container">
          <div className="carousel-main-image">
            <img alt="" src={images[0].ImageUrl} />
            <div id="carousel-main-below">
              <div id="carousel-caption-verified">
                <div id="carousel-main-caption">{images[0].Caption}</div>
                <div id="carousel-main-verified">
                  {(images[0].Verified) === 1 ? 'Verified Photo' : null }
                </div>
              </div>
              <div id="toggle-photo">
                <button onClick={() => this.setState({ hidePhotoList : !hidePhotoList })} type="button" id="toggle-photo-button">
                  { (hidePhotoList === false)
                    ? ( <span>Hide photo list <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentcolor"><path d="M12 21l-12-18h24z"/></svg></span> )
                    : <span>Show photo list <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentcolor"><path d="M12 3l12 18h-24z"/></svg></span>}
                </button>
              </div>
            </div>
          </div>
        </div>
        {(hidePhotoList) === false
          ? (
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
          ) : null}
      </>
    );
  }
}

export default Carousel;
