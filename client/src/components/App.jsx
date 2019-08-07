import React from 'react';
import axios from 'axios';
import Gallery from './Gallery';
import Carousel from './Carousel';
import style from '../style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        // {
        //   listing_id: 11,
        //   image_id: 34,
        //   ImageUrl: 'https://sdcimages0001.s3-us-west-1.amazonaws.com/images2/databaseimg598.jpg',
        //   caption: 'suscipit qui tempore',
        //   verified: 1,
        // },
      ],
      view: 'gallery',
      carouselStart: 1,
    };


    this.getData = this.getData.bind(this);
    this.renderView = this.renderView.bind(this);
    this.imageClickHandler = this.imageClickHandler.bind(this);
    this.imageHoverHandler = this.imageHoverHandler.bind(this);
    this.imageUnHoverHandler = this.imageUnHoverHandler.bind(this);
  }


  componentDidMount() {
    if (this.state.images.length === 0) {
      this.getData();
    }
  }

  getData() {
    const listing = window.location.href.split('/')[3]; // this should get a listing id. I would like to console log this, but i'm not sure how to do that in this file. When I test in the consol I get "d".

    axios.get(`/api/${listing}/images`) // axios get request

      // axios.get(`/api/${12345}/images`) // axios get request // this will get the image info for listing 12345

      .then((response) => { // if successful do thi func with the response as the argument
        this.setState({ images: response.data }); // set images to response data. I would also like to console.log this... again I'm not sure how in this file.
      })
      .catch((err) => { // if there is an err, console.log err
        console.log(err);
      });
  }

  imageClickHandler(imageID) {
    this.setState({ carouselStart: imageID });
    this.renderView('carousel');
  }

  imageHoverHandler(imageID) {
    const { view, images } = this.state;
    if (view === 'gallery') {
      for (let i = 0; i < images.length; i++) {
        if (images[i].ImageID !== imageID) {
          images[i].hoverClass = style.galleryImageHover;
        }
      }
      this.setState({ images });
    }
  }

  imageUnHoverHandler() {
    const { view, images } = this.state;
    if (view === 'gallery') {
      for (let i = 0; i < images.length; i++) {
        images[i].hoverClass = '';
      }
    }
    this.setState({ images });
  }

  renderView(option) {
    this.setState({ view: option });
  }

  render() {
    const { images, view, carouselStart } = this.state;
    console.log(images.slice(0, 1))
    switch (view) {
      case 'gallery':
        return (
          <>
            <div className={style.galleryBody}>
              <div className={style.galleryContainer1}>
                <Gallery imageClickHandler={this.imageClickHandler} imageHoverHandler={this.imageHoverHandler} imageUnHoverHandler={this.imageUnHoverHandler} id={style.galleryBigImage} images={images.slice(0, 1)} />
                <div className={style.galleryContainer2}>
                  <Gallery imageClickHandler={this.imageClickHandler} imageHoverHandler={this.imageHoverHandler} imageUnHoverHandler={this.imageUnHoverHandler} images={images.slice(1)} />
                </div>
              </div>
            </div>
          </>
        );
      case 'carousel':
        for (let i = 0; i < images.length; i++) {
          if (images[i].ImageID === carouselStart) {
            var startID = i;
          }
        }
        const imagesStartingAtClicked = images.slice(startID).concat(images.slice(0, startID));
        return (
          <div className={style.galleryCarouselBody}>
            <Carousel imageClickHandler={this.imageClickHandler} renderView={this.renderView} images={imagesStartingAtClicked} />
          </div>
        );
      default:
        return null;
    }
  }
}

export default App;
